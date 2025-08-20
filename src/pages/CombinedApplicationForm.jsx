import React, { useState, useEffect } from 'react';
import { initialFormData } from '../components/visaComponent/utils';
import { showErrorToast } from '../components/Toast/Toast';
import { submitCombinedApplication } from '../services/annexeSrvice';
import { PersonalInfoStep } from '../components/visaComponent/PersonalInfoStep';
import { BackgroundHistoryStep } from '../components/visaComponent/BackgroundHistoryStep';
import { FamilyInfoStep } from '../components/visaComponent/FamilyInfoStep';
import { DocumentsStep } from '../components/visaComponent/DocumentsStep';
import Stepper from '../components/visaComponent/Stepper';
import FormNavigation from '../components/visaComponent/FormNavigation';
import { DeclarationSection } from '../components/FormStapper/DeclarationSection';
import { RecipientData } from '../components/visaComponent/RecipientData';
import RecipientModal from '../components/visaComponent/RecipientModal';
import { pdf } from '@react-pdf/renderer';

const CombinedApplicationForme = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const [formData, setFormData] = useState({
        ...initialFormData,
        declarationAgreed: false,
        selectedRecipient: RecipientData.One.email
    });
    const [submitStatus, setSubmitStatus] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});
    const [submittedData, setSubmittedData] = useState(null);
    const [showRecipientModal, setShowRecipientModal] = useState(false);


    useEffect(() => {
        const { nom, prenoms } = formData.formulaireVisa.donneesPersonnelles.nomComplet;
        const dateNaissance = formData.formulaireVisa.donneesPersonnelles.dateNaissance;
        const iuc = formData.formulaireVisa.informationsGenerales.IUC;

        setFormData(prev => ({
            ...prev,
            resident: {
                ...prev.resident,
                nom: nom || prev.resident.nom,
                prenom: prenoms || prev.resident.prenom,
                dateNais: dateNaissance || prev.resident.dateNais,
                iuc: iuc || prev.resident.iuc
            },
            documents: prev.documents.map((section, index) => {
                if (index === 0) {
                    return {
                        ...section,
                        nom: nom || section.nom,
                        prenom: prenoms || section.prenom,
                        dateNais: dateNaissance || section.dateNais,
                        iuc: iuc || section.iuc
                    };
                }
                return section;
            })
        }));
    }, [
        formData.formulaireVisa.donneesPersonnelles.nomComplet.nom,
        formData.formulaireVisa.donneesPersonnelles.nomComplet.prenoms,
        formData.formulaireVisa.donneesPersonnelles.dateNaissance,
        formData.formulaireVisa.informationsGenerales.IUC
    ]);

    const handleRecipientChange = (email) => {
        setFormData(prev => ({
            ...prev,
            selectedRecipient: email
        }));
    };

    // Fonctions de gestion des changements
    const handleChange = (path, value) => {
        const pathParts = path.split('.');
        setFormData(prev => {
            const newState = { ...prev };
            let current = newState.formulaireVisa;

            for (let i = 0; i < pathParts.length - 1; i++) {
                current[pathParts[i]] = { ...current[pathParts[i]] };
                current = current[pathParts[i]];
            }

            current[pathParts[pathParts.length - 1]] = value;
            return newState;
        });
    };

    const handleFamilyChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            familyInfo: {
                ...prev.familyInfo,
                [section]: {
                    ...prev.familyInfo[section],
                    [field]: value
                }
            }
        }));
    };

    const handleArrayChange = (section, path, index, field, value) => {
        setFormData(prev => {
            const pathParts = path.split('.');
            let current = { ...prev[section] };
            let temp = current;

            for (let i = 0; i < pathParts.length - 1; i++) {
                temp = temp[pathParts[i]] = { ...temp[pathParts[i]] };
            }

            const arrayPath = pathParts[pathParts.length - 1];
            const newArray = [...temp[arrayPath]];
            if (!newArray[index]) newArray[index] = {};
            newArray[index][field] = value;
            temp[arrayPath] = newArray;

            return {
                ...prev,
                [section]: current
            };
        });
    };

    const addArrayEntry = (section, path, defaultValue = {}) => {
        const pathParts = path.split('.');
        setFormData(prev => {
            const newSection = JSON.parse(JSON.stringify(prev[section]));

            let current = newSection;
            for (let i = 0; i < pathParts.length - 1; i++) {
                if (!current[pathParts[i]]) {
                    current[pathParts[i]] = {};
                }
                current = current[pathParts[i]];
            }

            const arrayName = pathParts[pathParts.length - 1];
            if (!Array.isArray(current[arrayName])) {
                current[arrayName] = [];
            }

            current[arrayName] = [...current[arrayName], defaultValue];

            return {
                ...prev,
                [section]: newSection
            };
        });
    };

    const removeArrayEntry = (section, path, index) => {
        const pathParts = path.split('.');
        setFormData(prev => {
            const newSection = JSON.parse(JSON.stringify(prev[section]));

            let current = newSection;
            for (let i = 0; i < pathParts.length - 1; i++) {
                if (!current[pathParts[i]]) {
                    return prev;
                }
                current = current[pathParts[i]];
            }

            const arrayName = pathParts[pathParts.length - 1];
            if (!Array.isArray(current[arrayName]) || index < 0 || index >= current[arrayName].length) {
                return prev;
            }

            current[arrayName] = current[arrayName].filter((_, i) => i !== index);

            return {
                ...prev,
                [section]: newSection
            };
        });
    };

    const handleFileUpload = (sectionIndex, docIndex, file) => {
        if (!file) return;

        if (file.size > 4 * 1024 * 1024) {
            alert('La taille maximale du fichier est de 4MB');
            return;
        }

        const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            showErrorToast('Seuls les fichiers PDF, JPEG et PNG sont acceptés');
            return;
        }

        // Récupérer le titre et le type du document
        const document = formData.documents[sectionIndex].corps[docIndex];
        const doc = formData.formulaireVisa.donneesPersonnelles.nomComplet
        const titre = document.titre.replace(/[^a-zA-Z0-9]/g, '_'); // Nettoyer le titre pour le nom de fichier
        const type = doc.nom.toLowerCase();

        // Créer le nouveau nom de fichier
        const originalExtension = file.name.split('.').pop();
        const newFileName = `${titre}_${type}.${originalExtension}`;

        // Créer un nouveau fichier avec le nom modifié
        const renamedFile = new File([file], newFileName, { type: file.type });

        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageData = e.target.result;

                setFormData(prev => {
                    const newDocuments = [...prev.documents];
                    newDocuments[sectionIndex] = {
                        ...newDocuments[sectionIndex],
                        corps: [...newDocuments[sectionIndex].corps]
                    };

                    newDocuments[sectionIndex].corps[docIndex] = {
                        ...newDocuments[sectionIndex].corps[docIndex],
                        provided: true,
                        file: renamedFile, // Utiliser le fichier renommé
                        imageData: imageData,
                        name: newFileName, // Utiliser le nouveau nom
                        size: file.size,
                        type: file.type,
                        uploadDate: new Date().toISOString()
                    };

                    return {
                        ...prev,
                        documents: newDocuments
                    };
                });
            };
            reader.readAsDataURL(renamedFile);
        } else {
            setFormData(prev => {
                const newDocuments = [...prev.documents];
                newDocuments[sectionIndex] = {
                    ...newDocuments[sectionIndex],
                    corps: [...newDocuments[sectionIndex].corps]
                };

                newDocuments[sectionIndex].corps[docIndex] = {
                    ...newDocuments[sectionIndex].corps[docIndex],
                    provided: true,
                    file: renamedFile, // Utiliser le fichier renommé
                    name: newFileName, // Utiliser le nouveau nom
                    size: file.size,
                    type: file.type,
                    uploadDate: new Date().toISOString()
                };

                return {
                    ...prev,
                    documents: newDocuments
                };
            });
        }

        setUploadProgress(prev => ({
            ...prev,
            [`${sectionIndex}-${docIndex}`]: {
                progress: 0,
                fileName: newFileName // Afficher le nouveau nom dans la progression
            }
        }));

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                const currentProgress = prev[`${sectionIndex}-${docIndex}`]?.progress || 0;
                if (currentProgress >= 100) {
                    clearInterval(interval);
                    return prev;
                }
                return {
                    ...prev,
                    [`${sectionIndex}-${docIndex}`]: {
                        ...prev[`${sectionIndex}-${docIndex}`],
                        progress: currentProgress + 10
                    }
                };
            });
        }, 200);
    };

    const handleRemoveFile = (sectionIndex, docIndex) => {
        setFormData(prev => {
            const newDocuments = [...prev.documents];
            newDocuments[sectionIndex] = {
                ...newDocuments[sectionIndex],
                corps: [...newDocuments[sectionIndex].corps]
            };

            newDocuments[sectionIndex].corps[docIndex] = {
                ...newDocuments[sectionIndex].corps[docIndex],
                provided: false,
                file: null
            };

            return {
                ...prev,
                documents: newDocuments
            };
        });
    };

    const handleConditionChange = (sectionIndex, docIndex, value) => {
        setFormData(prev => {
            const newDocuments = [...prev.documents];
            newDocuments[sectionIndex] = {
                ...newDocuments[sectionIndex],
                corps: newDocuments[sectionIndex].corps.map((doc, idx) => {
                    if (idx === docIndex && doc.condition) {
                        return {
                            ...doc,
                            condition: {
                                ...doc.condition,
                                response: value
                            },
                            // Réinitialiser le fichier si la condition passe à 'non'
                            provided: value === 'non' ? false : doc.provided,
                            file: value === 'non' ? null : doc.file
                        };
                    }
                    return doc;
                })
            };

            return {
                ...prev,
                documents: newDocuments
            };
        });
    };

    const validateCurrentStep = (stepIndex) => {
        switch (stepIndex) {
            case 0: // Informations personnelles
                return (
                    formData.formulaireVisa.informationsGenerales.servi !== ""
                    // formData.formulaireVisa.informationsGenerales.visa !== ""
                );

            case 1: // Antécédents et historique
                return (
                    formData.resident.body.military.isOk !== undefined &&
                    formData.resident.body.temoin.isOk !== undefined &&
                    formData.resident.body.affiliation.isOk !== undefined &&
                    formData.resident.body.charges.isOk !== undefined &&
                    formData.resident.body.voyages.isOk !== undefined
                );

            case 2: // Informations familiales
                return (
                    // formData.familyInfo.typeDemande !== "" 
                    formData.familyInfo.applicant.name !== ""
                    // formData.familyInfo.applicant.dob !== "" &&
                    // formData.familyInfo.applicant.country !== "" &&
                    // formData.familyInfo.applicant.occupation !== "" &&
                    // formData.familyInfo.applicant.maritalStatus !== "" &&
                    // formData.familyInfo.applicant.address !== ""
                );

            case 3: // Documents
                return formData.documents.every(section =>
                    section.corps.every(doc =>
                        !doc.required ||
                        (doc.condition && doc.condition.response !== 'oui') ||
                        doc.provided
                    )
                );

            case 4: // Déclaration
                return formData.declarationAgreed;

            default:
                return false;
        }
    };

    const nextStep = () => {
        if (!validateCurrentStep(activeStep)) {
            showErrorToast("Veuillez remplir tous les champs obligatoires avant de passer à l'étape suivante.");
            return;
        }
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const prevStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();
        setSubmitStatus("loading");

        try {
            const formDataToSend = new FormData();
      const dataa = formData.documents[0].corps[3].imageData;
            const filteredPersonalInfo = {
                ...formData.formulaireVisa
            };

            const filteredResident = {
                ...formData.resident,
                body: {
                    military: formData.resident.body.military.isOk === "oui" ? formData.resident.body.military : { isOk: "non", dev: [] },
                    temoin: formData.resident.body.temoin.isOk === "oui" ? formData.resident.body.temoin : { isOk: "non", dev: [] },
                    affiliation: formData.resident.body.affiliation.isOk === "oui" ? formData.resident.body.affiliation : { isOk: "non", dev: [] },
                    charges: formData.resident.body.charges.isOk === "oui" ? formData.resident.body.charges : { isOk: "non", dev: [] },
                    voyages: formData.resident.body.voyages.isOk === "oui" ? formData.resident.body.voyages : { isOk: "non", dev: [] }
                }
            };

            const applicationData = {
                recipientEmail: formData.selectedRecipient,
                formulaireVisa: filteredPersonalInfo,
                resident: filteredResident,
                familyInfo: formData.familyInfo,
                declarationAgreed: formData.declarationAgreed,
                documents: formData.documents.map(section => ({
                    id: section.id,
                    titre: section.titre,
                    corps: section.corps.map(doc => ({
                        id: doc.id,
                        titre: doc.titre,
                        provided: doc.provided,
                        required: doc.required
                    }))
                }))
            };

            await Promise.resolve();    
          const blob = await pdf(<MonPdfDocument datas={formData} dataa={dataa} documents={formData?.documents}/>).toBlob();
    
          formDataToSend.append(
            "pdf",
            blob,
            `${
              "doc_de_"+formData?.formulaireVisa?.donneesPersonnelles?.nomComplet?.nom +
              "_" +
              formData?.formulaireVisa?.donneesPersonnelles?.nomComplet?.prenoms
            }.pdf`
          );
          formDataToSend.append("to", formData?.selectedRecipient);
          formDataToSend.append("name", `${formData?.formulaireVisa?.donneesPersonnelles?.nomComplet?.nom+"_"+formData?.formulaireVisa?.donneesPersonnelles?.nomComplet?.prenoms}`);
    
          console.log([...formDataToSend.entries()]);
          console.log(formData)
    
          await submitCombinedApplication(formDataToSend);


            await submitCombinedApplication(formDataToSend);
            setSubmitStatus("success");
            setSubmittedData(applicationData);
            setShowRecipientModal(false);
        } catch (error) {
            console.error("Erreur de soumission:", error);
            setSubmitStatus("error");
        }
    };

    const handleRecipientChang = (email) => {
        setFormData(prev => ({
            ...prev,
            selectedRecipient: email
        }));
    };

    const handleOpenRecipientModal = () => {
        if (!formData.declarationAgreed) {
            showErrorToast("Veuillez accepter la déclaration avant de soumettre");
            return;
        }
        setShowRecipientModal(true);
    };


    const steps = [
        {
            title: "Informations personnelles",
            component: <PersonalInfoStep
                formData={formData}
                handleChange={handleChange}
                handleArrayChange={handleArrayChange}
                addArrayEntry={addArrayEntry}
                removeArrayEntry={removeArrayEntry}
            />
        },
        {
            title: "Antécédents et historique",
            component: <BackgroundHistoryStep
                formData={formData}
                setFormData={setFormData}
                handleArrayChange={handleArrayChange}
                addArrayEntry={addArrayEntry}
                removeArrayEntry={removeArrayEntry}
            />
        },
        {
            title: "Informations familiales",
            component: <FamilyInfoStep
                formData={formData}
                setFormData={setFormData}
                handleArrayChange={handleArrayChange}
                addArrayEntry={addArrayEntry}
                removeArrayEntry={removeArrayEntry}
            />
        },
        {
            title: "Documents requis",
            component: <DocumentsStep
                formData={formData}
                uploadProgress={uploadProgress}
                handleFileUpload={handleFileUpload}
                handleRemoveFile={handleRemoveFile}
                handleConditionChange={handleConditionChange}
            />
        },
        {
            title: "Déclaration",
            component: (
                <DeclarationSection
                    declarationAgreed={formData.declarationAgreed}
                    onAgreementChange={(e) => setFormData(prev => ({ ...prev, declarationAgreed: e.target.checked }))}
                    showPreview={showPreview}
                    onTogglePreview={() => setShowPreview(!showPreview)}
                    formData={formData}
                />
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 md:w-1/4 opacity-5">
                    <img src="/flag.png" alt="Décor" className="w-full h-auto object-contain" />
                </div>
                <div className="absolute bottom-0 left-0 w-1/3 md:w-1/4 opacity-5 rotate-180">
                    <img src="/flag.png" alt="Décor" className="w-full h-auto object-contain" />
                </div>
            </div>

            <div className="relative px-[6.5%] mx-auto">
                <header className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary-100 rounded-full mb-4">
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Formulaire de demande combinée
                    </h1>
                </header>

                <Stepper
                    steps={steps}
                    activeStep={activeStep}
                    setActiveStep={setActiveStep}
                    validateCurrentStep={validateCurrentStep}
                />

                <div className="bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    <div className="h-2 bg-gray-100">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>

                    <div className="px-6 py-5 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                                    Étape {activeStep + 1} : {steps[activeStep].title}
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    {getStepDescription(activeStep)}
                                </p>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary">
                                {activeStep + 1}/{steps.length}
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                        <div className="px-6 py-5 sm:p-8">
                            {steps[activeStep].component}
                        </div>

                        <FormNavigation
                            activeStep={activeStep}
                            steps={steps}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            validateCurrentStep={validateCurrentStep}
                            submitStatus={submitStatus}
                            formData={formData}
                            onOpenRecipientModal={handleOpenRecipientModal}
                        />
                    </form>

                    <RecipientModal
                        isOpen={showRecipientModal}
                        onClose={() => setShowRecipientModal(false)}
                        selectedRecipient={formData.selectedRecipient}
                        onRecipientChange={handleRecipientChange}
                        onSubmit={handleSubmit} // On passe directement la fonction
                        formData={formData}
                    />
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Besoin d'aide ? <a href="#" className="font-medium text-primary hover:text-primary-700">Contactez notre support</a>
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Vos informations sont sécurisées et ne seront pas partagées.
                    </p>
                </div>
            </div>
        </div>
    );

    function getStepDescription(step) {
        const descriptions = [
            "Remplissez vos informations personnelles. Tous les champs sont obligatoires.",
            "Fournissez vos antécédents complets. Soyez précis et honnête.",
            "Ajoutez les informations sur votre famille immédiate.",
            "Téléchargez tous les documents requis. Formats acceptés : PDF, JPG, PNG.",
            "Lisez attentivement et acceptez la déclaration avant de soumettre."
        ];
        return descriptions[step];
    }
};

export default CombinedApplicationForme;