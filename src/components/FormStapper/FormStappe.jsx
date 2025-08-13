import React, { useState } from 'react';
import { FiCheck, FiX, FiPlus, FiTrash2, FiUpload, FiChevronLeft, FiChevronRight, FiInfo } from 'react-icons/fi';
import { submitCombinedApplication } from '../../services/annexeSrvice';
import { showErrorToast } from '../Toast/Toast';
import DeclarationSection from './DeclarationSection';

const CombinedApplicationForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [showPreview, setShowPreview] = useState(false);

    const [formData, setFormData] = useState({
        // Étape 1: Informations personnelles
        personalInfo: {
            nomFamille: '',
            prenoms: '',
            dateNaissance: '',
            iuc: '',
            sexe: '',
            email: '',
            villeNaissance: '',
            paysNaissance: '',
            citoyennete: '',
            aUtiliseAutreNom: 'non',
            ancienNom: '',
            ancienPrenom: '',
            etatMatrimonial: '',
            dateMariageUnion: '',
            nomConjoint: '',
            prenomConjoint: '',
            paysResidenceActuelle: '',
            statutResidenceActuelle: '',
            residenceAnterieure: 'non',
            paysResidenceAnterieure: '',
            statutResidenceAnterieure: '',
            residenceDe: '',
            residenceA: '',
            demandeAutrePays: 'non',
            paysDemande: '',
            statutDemande: '',
            demandeDe: '',
            demandeA: '',
            voyages: {
                isOk: "non",
                dev: []
            },
            langueMaternelle: '',
            langueAise: '',
            communicationDeuxLangues: '',
            evaluationLangue: '',
            numeroPasseport: '',
            paysDelivrancePasseport: '',
            dateDelivrancePasseport: '',
            dateExpirationPasseport: '',
            passeportTaiwan: '',
            passeportIsrael: '',
            aPieceIdentite: 'non',
            numeroPiece: '',
            paysDelivrancePiece: '',
            dateDelivrancePiece: '',
            dateExpirationPiece: '',
            aCarteVerte: 'non',
            numeroCarteVerte: '',
            expirationCarteVerte: '',
            adressePostale: '',
            villePostale: '',
            provincePostale: '',
            codePostal: '',
            paysPostal: '',
            adresseIdentique: 'non',
            appartementUnite: '',
            numeroRue: '',
            nomRue: '',
            villeVillage: '',
            paysTerritoire: '',
            typeTelephone: 'canada',
            typeTelephoneDetail: '',
            indicatifPays: '',
            numeroTelephone: '',
            posteTelephone: '',
            typeAutreTelephone: 'canada',
            typeAutreTelephoneDetail: '',
            indicatifAutreTelephone: '',
            numeroAutreTelephone: '',
            posteAutreTelephone: '',
            typeTelecopieur: 'canada',
            indicatifTelecopieur: '',
            numeroTelecopieur: '',
            posteTelecopieur: '',
        },

        // Étape 2: Antécédents et historique
        resident: {
            titre: "Demande de statut de résident temporaire",
            body: {
                military: {
                    isOk: "non",
                    dev: []
                },
                temoin: {
                    isOk: "non",
                    dev: []
                },
                affiliation: {
                    isOk: "non",
                    dev: []
                },
                charges: {
                    isOk: "non",
                    dev: []
                },
                voyages: {
                    isOk: "non",
                    dev: []
                }
            }
        },

        // Étape 3: Informations familiales
        familyInfo: {
            applicant: {
                name: '',
                dob: '',
                country: '',
                occupation: '',
                maritalStatus: '',
                address: '',
                coming: false
            },
            epouse: {
                name: '',
                dob: '',
                country: '',
                occupation: '',
                maritalStatus: '',
                address: '',
                coming: false
            },
            father: {
                name: '',
                dob: '',
                country: '',
                occupation: '',
                address: '',
                coming: false
            },
            mother: {
                name: '',
                dob: '',
                country: '',
                occupation: '',
                address: '',
                coming: false
            },
            children: [],
            siblings: []
        },

        // Étape 4: Documents
        documents: [
            {
                titre: "Documents Identité Personnelle",
                corps: [
                    {
                        titre: "ActeNaissance",
                        provided: false,
                        file: null,
                        required: true,
                        type: 'PDF'
                    },
                    {
                        titre: "Passeport",
                        provided: false,
                        file: null,
                        required: true,
                        condition: (data) => data.personalInfo.dateExpirationPasseport &&
                            new Date(data.personalInfo.dateExpirationPasseport) > new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                        type: 'PDF'
                    },
                    {
                        titre: "ActeMariage",
                        provided: false,
                        file: null,
                        required: false,
                        condition: (data) => ['marie', 'union'].includes(data.personalInfo.etatMatrimonial),
                        type: 'PDF'
                    },
                    {
                        titre: "Photo",
                        provided: false,
                        file: null,
                        required: true,
                        specifications: "4*4, fond clair",
                        type: 'IMAGE'
                    },
                    {
                        titre: "CNI",
                        provided: false,
                        file: null,
                        required: true,
                        type: 'PDF'
                    }
                ]
            },
            {
                titre: "Documents Preuves de Fonds",
                corps: [
                    {
                        titre: "DocumentsEntreprise",
                        provided: false,
                        file: null,
                        required: true,
                        condition: (data) => data.personalInfo.occupation === 'independant',
                        type: 'PDF'
                    },
                    {
                        titre: "RelevesBancairesEntreprise",
                        provided: false,
                        file: null,
                        required: true,
                        period: "6 derniers mois",
                        condition: (data) => data.personalInfo.occupation === 'independant',
                        type: 'PDF'
                    },
                    {
                        titre: "RelevesBancairesPersonnels",
                        provided: false,
                        file: null,
                        required: true,
                        period: "6 derniers mois",
                        type: 'PDF'
                    }
                ]
            },
            {
                titre: "Autres Documents",
                corps: [
                    {
                        titre: "VisaAnterieur",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF'
                    },
                    {
                        titre: "AssuranceVoyage",
                        provided: false,
                        file: null,
                        required: false,
                        condition: (data) => {
                            const dob = new Date(data.personalInfo.dateNaissance);
                            const age = new Date().getFullYear() - dob.getFullYear();
                            return age >= 60;
                        },
                        type: 'PDF'
                    },
                    {
                        titre: "ReservationHotel",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF'
                    },
                    {
                        titre: "BilletsAvion",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF'
                    }
                ]
            },
            {
                titre: "Avertissements",
                corps: [
                    {
                        titre: "RefusVisaCanada",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF'
                    },
                    {
                        titre: "DemandeVisaEnCours",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF'
                    },
                    {
                        titre: "TitreSejourEtranger",
                        provided: false,
                        file: null,
                        required: false,
                        condition: (data) => data.personalInfo.paysResidenceActuelle !== data.personalInfo.paysNaissance,
                        type: 'PDF'
                    }
                ]
            }
        ],
        declarationAgreed: false
    });

    const [submitStatus, setSubmitStatus] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    // Fonctions de gestion des changements
    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleFamilyChange = (member, field, value) => {
        setFormData(prev => ({
            ...prev,
            familyInfo: {
                ...prev.familyInfo,
                [member]: {
                    ...prev.familyInfo[member],
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

    const addArrayEntry = (section, arrayPath, defaultValue = {}) => {
        setFormData(prev => {
            const newData = { ...prev };
            const pathParts = arrayPath.split('.');
            let current = newData[section];

            for (let i = 0; i < pathParts.length - 1; i++) {
                current = current[pathParts[i]] = { ...current[pathParts[i]] };
            }

            const lastKey = pathParts[pathParts.length - 1];
            current[lastKey] = [...(current[lastKey] || []), defaultValue];

            return newData;
        });
    };

    const removeArrayEntry = (section, arrayPath, index) => {
        setFormData(prev => {
            const newData = { ...prev };
            const pathParts = arrayPath.split('.');
            let current = newData[section];

            for (let i = 0; i < pathParts.length - 1; i++) {
                current = current[pathParts[i]] = { ...current[pathParts[i]] };
            }

            const lastKey = pathParts[pathParts.length - 1];
            const newArray = [...current[lastKey]];
            newArray.splice(index, 1);
            current[lastKey] = newArray;

            return newData;
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
                        file: file,
                        imageData: imageData,
                        name: file.name,
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
            reader.readAsDataURL(file);
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
                    file: file,
                    name: file.name,
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
                fileName: file.name
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

    const validateCurrentStep = (stepIndex) => {
        switch (stepIndex) {
            case 0: // Informations personnelles
                return (
                    formData.personalInfo.nomFamille
                    // formData.personalInfo.prenoms &&
                    // formData.personalInfo.dateNaissance &&
                    // formData.personalInfo.sexe &&
                    // formData.personalInfo.email &&
                    // formData.personalInfo.villeNaissance &&
                    // formData.personalInfo.paysNaissance &&
                    // formData.personalInfo.citoyennete &&
                    // formData.personalInfo.langueMaternelle &&
                    // formData.personalInfo.langueAise &&
                    // formData.personalInfo.communicationDeuxLangues &&
                    // formData.personalInfo.evaluationLangue &&
                    // formData.personalInfo.numeroPasseport &&
                    // formData.personalInfo.paysDelivrancePasseport &&
                    // formData.personalInfo.dateDelivrancePasseport &&
                    // formData.personalInfo.dateExpirationPasseport &&
                    // formData.personalInfo.passeportTaiwan &&
                    // formData.personalInfo.passeportIsrael &&
                    // formData.personalInfo.adressePostale &&
                    // formData.personalInfo.villePostale &&
                    // formData.personalInfo.paysPostal &&
                    // formData.personalInfo.numeroTelephone
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
                    formData.familyInfo.applicant.name
                    // formData.familyInfo.applicant.dob &&
                    // formData.familyInfo.applicant.country &&
                    // formData.familyInfo.applicant.occupation &&
                    // formData.familyInfo.applicant.maritalStatus &&
                    // formData.familyInfo.applicant.address &&
                    // formData.familyInfo.father.name &&
                    // formData.familyInfo.father.dob &&
                    // formData.familyInfo.father.country &&
                    // formData.familyInfo.father.occupation &&
                    // formData.familyInfo.father.address &&
                    // formData.familyInfo.mother.name &&
                    // formData.familyInfo.mother.dob &&
                    // formData.familyInfo.mother.country &&
                    // formData.familyInfo.mother.occupation &&
                    // formData.familyInfo.mother.address
                );

            case 3: // Documents
                return formData.documents.every(section =>
                    section.corps.every(doc =>
                        !doc.required ||
                        (doc.condition && !doc.condition(formData)) ||
                        doc.provided
                    ));

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
        e.preventDefault();
        setSubmitStatus("loading");

        try {
            const formDataToSend = new FormData();

            // Filtrer les données avant envoi
            const filteredPersonalInfo = {
                ...formData.personalInfo,
                voyages: formData.personalInfo.voyages.isOk === "oui" ? formData.personalInfo.voyages : { isOk: "non", dev: [] }
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
                personalInfo: filteredPersonalInfo,
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

            formDataToSend.append('applicationData', JSON.stringify(applicationData));

            // Ajout des fichiers
            formData.documents.forEach((section, sectionIndex) => {
                section.corps.forEach((doc, docIndex) => {
                    if (doc.provided && doc.file) {
                        formDataToSend.append(`documents[${section.id}][${doc.id}]`, doc.file);
                    }
                });
            });

            console.log(formData);


            await submitCombinedApplication(formDataToSend);
            setSubmitStatus("success");
            setSubmittedData(applicationData);
        } catch (error) {
            console.error("Erreur de soumission:", error);
            setSubmitStatus("error");
        }
    };

    const FileUpload = ({ sectionIndex, docIndex, label, required, specifications, period }) => {
        const docState = formData.documents[sectionIndex].corps[docIndex];
        const uploadState = uploadProgress[`${sectionIndex}-${docIndex}`];

        const getAcceptedFormats = () => {
            switch (docState.type) {
                case 'PDF':
                    return ".pdf";
                case 'IMAGE':
                    return "image/*";
                default:
                    return ".pdf, .jpg, .jpeg, .png";
            }
        };

        const formatDescription = docState.type === 'PDF'
            ? "Format PDF uniquement"
            : docState.type === 'IMAGE'
                ? "Formats image (JPG, JPEG, PNG)"
                : "Formats PDF, JPG, JPEG ou PNG";

        return (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <label className="font-medium text-gray-700">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        {specifications && (
                            <p className="text-xs text-gray-500 mt-1">{specifications}</p>
                        )}
                        {period && (
                            <p className="text-xs text-gray-500 mt-1">Période: {period}</p>
                        )}
                        <p className="text-xs text-primary mt-1">{formatDescription}</p>
                    </div>
                    {docState.provided ? (
                        <span className="flex items-center text-green-600">
                            <FiCheck className="mr-1" /> Fourni
                        </span>
                    ) : (
                        <span className="text-gray-500">Manquant</span>
                    )}
                </div>

                {docState.provided ? (
                    <div className="space-y-2">
                        {docState.type === 'IMAGE' && docState.imageData ? (
                            <div className="flex flex-col items-center bg-white p-3 rounded border border-green-100">
                                <div className="relative mb-2">
                                    <img
                                        src={docState.imageData}
                                        alt="Document visuel"
                                        className="h-32 w-auto object-contain rounded-md border border-gray-200"
                                    />
                                    {docState.specifications && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                                            {docState.specifications}
                                        </div>
                                    )}
                                </div>
                                <div className="w-full text-center">
                                    <p className="text-sm font-medium truncate">{docState.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {(docState.size / 1024).toFixed(1)} KB - {docState.type.split('/')[1]?.toUpperCase() || 'IMAGE'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(sectionIndex, docIndex)}
                                    className="mt-2 text-red-500 hover:text-red-700 p-1"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center bg-white p-3 rounded border border-green-100">
                                <div>
                                    <p className="font-medium">{docState.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {(docState.size / 1024).toFixed(1)} KB - {docState.type.split('/')[1]?.toUpperCase() || 'PDF'}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Téléversé le: {new Date(docState.uploadDate).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(sectionIndex, docIndex)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        )}

                        {uploadState?.progress > 0 && uploadState.progress < 100 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-primary h-2.5 rounded-full"
                                    style={{ width: `${uploadState.progress}%` }}
                                ></div>
                                <p className="text-xs text-gray-500 mt-1">
                                    Téléversement: {uploadState.progress}% - {uploadState.fileName}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">
                            <span className="font-medium text-primary">Cliquer pour uploader</span> ou glisser-déposer
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                            Formats acceptés: {getAcceptedFormats()} (max 3.8MB)
                        </p>
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(sectionIndex, docIndex, e.target.files[0])}
                            accept={docState.type === 'PDF' ? '.pdf' : docState.type === 'IMAGE' ? 'image/*' : ''}
                            required={required && !docState.provided}
                        />
                    </label>
                )}
            </div>
        );
    };

    const renderStepTitle = () => {
        const titles = [
            "Informations personnelles",
            "Antécédents et historique",
            "Informations familiales",
            "Documents requis",
            "Déclaration et soumission"
        ];

        return (
            <div className="mb-6 border-b pb-4">
                <h2 className="text-xl font-bold text-gray-800">
                    Étape {activeStep + 1} : {titles[activeStep]}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    {getStepDescription(activeStep)}
                </p>
            </div>
        );
    };

    const getStepDescription = (step) => {
        const descriptions = [
            "Remplissez vos informations personnelles. Tous les champs sont obligatoires.",
            "Fournissez vos antécédents complets. Soyez précis et honnête.",
            "Ajoutez les informations sur votre famille immédiate.",
            "Téléchargez tous les documents requis. Formats acceptés : PDF, JPG, PNG.",
            "Lisez attentivement et acceptez la déclaration avant de soumettre."
        ];
        return descriptions[step];
    };

    const getDocumentLabel = (docKey, formData) => {
        const labels = {
            'ActeNaissance': 'Acte de Naissance',
            'Passeport': 'Passeport en cours de validité (1 an minimum)',
            'ActeMariage': 'Photocopie Acte de Mariage',
            'Photo': '01 photo couleur format passeport (35x45mm)',
            'CNI': 'Carte Nationale d\'Identité (CNI)',
            'DocumentsEntreprise': 'Documents d\'entreprise (Immatriculation, RC, etc.)',
            'RelevesBancairesEntreprise': 'Relevés bancaires entreprise (6 derniers mois)',
            'RelevesBancairesPersonnels': 'Relevés bancaires personnels (6 derniers mois)',
            'VisaAnterieur': 'Copie scannée visa antérieur',
            'AssuranceVoyage': 'Assurance voyage (obligatoire si 60 ans et plus)',
            'ReservationHotel': 'Preuve de réservation d\'hôtel',
            'BilletsAvion': 'Réservation de billets d\'avion Aller/Retour',
            'RefusVisaCanada': 'Lettre de refus de visa Canada (si applicable)',
            'DemandeVisaEnCours': 'Preuve de demande de visa en cours',
            'TitreSejourEtranger': 'Titre de séjour étranger (si applicable)'
        };

        return labels[docKey] || docKey;
    };


    // Fonction pour déterminer si un document est obligatoire
    const isDocumentRequired = (docKey) => {
        const requiredDocs = [
            'actetenaissance',
            'passeport',
            'photo',
            'relevesbancairespersonnels'
        ];

        // Acte de mariage est requis si marié
        if (docKey.toLowerCase() === 'actemariage' &&
            ['marie', 'union'].includes(formData.personalInfo.etatMatrimonial)) {
            return true;
        }

        return requiredDocs.includes(docKey.toLowerCase());
    };

    const steps = [
        {
            title: "Informations personnelles",
            component: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de famille</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.nomFamille}
                                onChange={e => handleChange('personalInfo', 'nomFamille', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s)</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.prenoms}
                                onChange={e => handleChange('personalInfo', 'prenoms', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.dateNaissance}
                                onChange={e => handleChange('personalInfo', 'dateNaissance', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro IUC</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.iuc}
                                onChange={e => handleChange('personalInfo', 'iuc', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.personalInfo.sexe === 'Homme'}
                                        onChange={() => handleChange('personalInfo', 'sexe', 'Homme')}
                                        required
                                    />
                                    <span className="ml-2">Homme</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.personalInfo.sexe === 'Femme'}
                                        onChange={() => handleChange('personalInfo', 'sexe', 'Femme')}
                                    />
                                    <span className="ml-2">Femme</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.email}
                                onChange={e => handleChange('personalInfo', 'email', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de naissance (Ville)</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.villeNaissance}
                                onChange={e => handleChange('personalInfo', 'villeNaissance', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.paysNaissance}
                                onChange={e => handleChange('personalInfo', 'paysNaissance', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Citoyenneté</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.citoyennete}
                                onChange={e => handleChange('personalInfo', 'citoyennete', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous utilisé un autre nom ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.aUtiliseAutreNom === 'non'}
                                    onChange={() => handleChange('personalInfo', 'aUtiliseAutreNom', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.aUtiliseAutreNom === 'oui'}
                                    onChange={() => handleChange('personalInfo', 'aUtiliseAutreNom', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.personalInfo.aUtiliseAutreNom === "oui" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ancien nom de famille</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.ancienNom}
                                    onChange={e => handleChange('personalInfo', 'ancienNom', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s) utilisé(s)</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.ancienPrenom}
                                    onChange={e => handleChange('personalInfo', 'ancienPrenom', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial actuel</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.etatMatrimonial}
                                onChange={e => handleChange('personalInfo', 'etatMatrimonial', e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionnez --</option>
                                <option value="celibataire">Célibataire</option>
                                <option value="marie">Marié(e)</option>
                                <option value="union">Union de fait</option>
                                <option value="divorce">Divorcé(e)</option>
                                <option value="veuf">Veuf/Veuve</option>
                            </select>
                        </div>
                    </div>

                    {(formData.personalInfo.etatMatrimonial === "marie" || formData.personalInfo.etatMatrimonial === "union") && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date du mariage ou début de l'union</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.dateMariageUnion}
                                    onChange={e => handleChange('personalInfo', 'dateMariageUnion', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de famille du conjoint</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.personalInfo.nomConjoint}
                                        onChange={e => handleChange('personalInfo', 'nomConjoint', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s) du conjoint</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.personalInfo.prenomConjoint}
                                        onChange={e => handleChange('personalInfo', 'prenomConjoint', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays de résidence actuel</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.paysResidenceActuelle}
                                onChange={e => handleChange('personalInfo', 'paysResidenceActuelle', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.statutResidenceActuelle}
                                onChange={e => handleChange('personalInfo', 'statutResidenceActuelle', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Résidence dans un autre pays les 5 dernières années ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.residenceAnterieure === 'non'}
                                    onChange={() => handleChange('personalInfo', 'residenceAnterieure', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.residenceAnterieure === 'oui'}
                                    onChange={() => handleChange('personalInfo', 'residenceAnterieure', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.personalInfo.residenceAnterieure === "oui" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.paysResidenceAnterieure}
                                    onChange={e => handleChange('personalInfo', 'paysResidenceAnterieure', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.statutResidenceAnterieure}
                                    onChange={e => handleChange('personalInfo', 'statutResidenceAnterieure', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.residenceDe}
                                    onChange={e => handleChange('personalInfo', 'residenceDe', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">À</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.residenceA}
                                    onChange={e => handleChange('personalInfo', 'residenceA', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Faites-vous la demande depuis un autre pays ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.demandeAutrePays === 'non'}
                                    onChange={() => handleChange('personalInfo', 'demandeAutrePays', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.demandeAutrePays === 'oui'}
                                    onChange={() => handleChange('personalInfo', 'demandeAutrePays', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.personalInfo.demandeAutrePays === "oui" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.paysDemande}
                                    onChange={e => handleChange('personalInfo', 'paysDemande', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.statutDemande}
                                    onChange={e => handleChange('personalInfo', 'statutDemande', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.demandeDe}
                                    onChange={e => handleChange('personalInfo', 'demandeDe', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">À</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.demandeA}
                                    onChange={e => handleChange('personalInfo', 'demandeA', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Depuis l'âge de 18 ans ou au cours des cinq dernières années, selon la plus récente, avez-vous voyagé vers un pays ou territoire autre que le pays de votre nationalité ou votre pays ou territoire de résidence actuel?
                        </label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.voyages.isOk === "non"}
                                    onChange={() => {
                                        setFormData(prev => ({
                                            ...prev,
                                            personalInfo: {
                                                ...prev.personalInfo,
                                                voyages: {
                                                    isOk: "non",
                                                    dev: []
                                                }
                                            }
                                        }))
                                    }}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.voyages.isOk === "oui"}
                                    onChange={() => {
                                        setFormData(prev => ({
                                            ...prev,
                                            personalInfo: {
                                                ...prev.personalInfo,
                                                voyages: {
                                                    isOk: "oui",
                                                    dev: prev.personalInfo.voyages.dev.length > 0
                                                        ? prev.personalInfo.voyages.dev
                                                        : [{
                                                            du: "",
                                                            au: "",
                                                            endroit: "",
                                                            but: "",
                                                            pays: ""
                                                        }]
                                                }
                                            }
                                        }))
                                    }}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.personalInfo.voyages.isOk === "oui" && (
                        <div className="mt-4 space-y-4">
                            <div className="hidden md:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endroit</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">But du voyage</th>
                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {formData.personalInfo.voyages.dev.map((voyage, index) => (
                                            <tr key={`desktop-${index}`}>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.pays || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'voyages.dev', index, 'pays', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.du || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'voyages.dev', index, 'du', e.target.value)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.au || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'voyages.dev', index, 'au', e.target.value)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.endroit || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'voyages.dev', index, 'endroit', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.but || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'voyages.dev', index, 'but', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeArrayEntry('personalInfo', 'voyages.dev', index)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="md:hidden space-y-4">
                                {formData.personalInfo.voyages.dev.map((voyage, index) => (
                                    <div key={`mobile-${index}`} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                <input
                                                    value={voyage.pays || ''}
                                                    onChange={(e) => handleArrayChange('personalInfo', 'voyages.dev', index, 'pays', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        value={voyage.du || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'voyages.dev', index, 'du', e.target.value)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        value={voyage.au || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'voyages.dev', index, 'au', e.target.value)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Endroit</label>
                                                <input
                                                    value={voyage.endroit || ''}
                                                    onChange={(e) => handleArrayChange('personalInfo', 'voyages.dev', index, 'endroit', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">But du voyage</label>
                                                <input
                                                    value={voyage.but || ''}
                                                    onChange={(e) => handleArrayChange('personalInfo', 'voyages.dev', index, 'but', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayEntry('personalInfo', 'voyages.dev', index)}
                                                    className="text-red-500 hover:text-red-700 flex items-center"
                                                >
                                                    <FiTrash2 className="mr-1" /> Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={() => addArrayEntry('personalInfo', 'voyages.dev', {
                                    du: "",
                                    au: "",
                                    endroit: "",
                                    but: "",
                                    pays: ""
                                })}
                                className="flex items-center text-primary hover:text-primary-dark"
                            >
                                <FiPlus className="mr-1" /> Ajouter un voyage
                            </button>
                        </div>

                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Langue maternelle</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.langueMaternelle}
                                onChange={e => handleChange('personalInfo', 'langueMaternelle', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Langue que vous parlez couramment</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.langueAise}
                                onChange={e => handleChange('personalInfo', 'langueAise', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pouvez-vous communiquer dans les deux langues officielles du Canada ?</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.communicationDeuxLangues}
                                onChange={e => handleChange('personalInfo', 'communicationDeuxLangues', e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionnez --</option>
                                <option value="oui">Oui</option>
                                <option value="non">Non</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà passé une évaluation linguistique ?</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.evaluationLangue}
                                onChange={e => handleChange('personalInfo', 'evaluationLangue', e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionnez --</option>
                                <option value="oui">Oui</option>
                                <option value="non">Non</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de passeport</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.numeroPasseport}
                                onChange={e => handleChange('personalInfo', 'numeroPasseport', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays de délivrance</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.paysDelivrancePasseport}
                                onChange={e => handleChange('personalInfo', 'paysDelivrancePasseport', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de délivrance</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.dateDelivrancePasseport}
                                onChange={e => handleChange('personalInfo', 'dateDelivrancePasseport', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.dateExpirationPasseport}
                                onChange={e => handleChange('personalInfo', 'dateExpirationPasseport', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Passeport délivré par Taïwan ?</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.passeportTaiwan}
                                onChange={e => handleChange('personalInfo', 'passeportTaiwan', e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionnez --</option>
                                <option value="oui">Oui</option>
                                <option value="non">Non</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Passeport délivré par Israël ?</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.personalInfo.passeportIsrael}
                                onChange={e => handleChange('personalInfo', 'passeportIsrael', e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionnez --</option>
                                <option value="oui">Oui</option>
                                <option value="non">Non</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous une autre pièce d'identité ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.aPieceIdentite === 'non'}
                                    onChange={() => handleChange('personalInfo', 'aPieceIdentite', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.aPieceIdentite === 'oui'}
                                    onChange={() => handleChange('personalInfo', 'aPieceIdentite', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.personalInfo.aPieceIdentite === "oui" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de la pièce</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.numeroPiece}
                                    onChange={e => handleChange('personalInfo', 'numeroPiece', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de délivrance</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.paysDelivrancePiece}
                                    onChange={e => handleChange('personalInfo', 'paysDelivrancePiece', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de délivrance</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.dateDelivrancePiece}
                                    onChange={e => handleChange('personalInfo', 'dateDelivrancePiece', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.dateExpirationPiece}
                                    onChange={e => handleChange('personalInfo', 'dateExpirationPiece', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous une carte verte des États-Unis ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.aCarteVerte === 'non'}
                                    onChange={() => handleChange('personalInfo', 'aCarteVerte', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.aCarteVerte === 'oui'}
                                    onChange={() => handleChange('personalInfo', 'aCarteVerte', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.personalInfo.aCarteVerte === "oui" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte verte</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.numeroCarteVerte}
                                    onChange={e => handleChange('personalInfo', 'numeroCarteVerte', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.expirationCarteVerte}
                                    onChange={e => handleChange('personalInfo', 'expirationCarteVerte', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Adresse postale</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.adressePostale}
                                    onChange={e => handleChange('personalInfo', 'adressePostale', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.villePostale}
                                    onChange={e => handleChange('personalInfo', 'villePostale', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Province/État</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.provincePostale}
                                    onChange={e => handleChange('personalInfo', 'provincePostale', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.codePostal}
                                    onChange={e => handleChange('personalInfo', 'codePostal', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.paysPostal}
                                    onChange={e => handleChange('personalInfo', 'paysPostal', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Votre adresse résidentielle est-elle la même que votre adresse postale ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.adresseIdentique === 'oui'}
                                    onChange={() => handleChange('personalInfo', 'adresseIdentique', 'oui')}
                                    required
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.adresseIdentique === 'non'}
                                    onChange={() => handleChange('personalInfo', 'adresseIdentique', 'non')}
                                />
                                <span className="ml-2">Non</span>
                            </label>
                        </div>
                    </div>

                    {formData.personalInfo.adresseIdentique === "non" && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Adresse résidentielle</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Appartement/Unité</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.personalInfo.appartementUnite}
                                        onChange={e => handleChange('personalInfo', 'appartementUnite', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de rue</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.personalInfo.numeroRue}
                                        onChange={e => handleChange('personalInfo', 'numeroRue', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de rue</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.personalInfo.nomRue}
                                        onChange={e => handleChange('personalInfo', 'nomRue', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ville/Village</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.personalInfo.villeVillage}
                                        onChange={e => handleChange('personalInfo', 'villeVillage', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pays/Territoire</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.personalInfo.paysTerritoire}
                                        onChange={e => handleChange('personalInfo', 'paysTerritoire', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Coordonnées téléphoniques</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type de téléphone</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.typeTelephone}
                                    onChange={e => handleChange('personalInfo', 'typeTelephone', e.target.value)}
                                    required
                                >
                                    <option value="canada">Canada/États-Unis</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>
                            {formData.personalInfo.typeTelephone === "autre" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.personalInfo.typeTelephoneDetail}
                                        onChange={e => handleChange('personalInfo', 'typeTelephoneDetail', e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif du pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.indicatifPays}
                                    onChange={e => handleChange('personalInfo', 'indicatifPays', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.numeroTelephone}
                                    onChange={e => handleChange('personalInfo', 'numeroTelephone', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Poste (si applicable)</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.posteTelephone}
                                    onChange={e => handleChange('personalInfo', 'posteTelephone', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type d'autre téléphone</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.typeAutreTelephone}
                                    onChange={e => handleChange('personalInfo', 'typeAutreTelephone', e.target.value)}
                                >
                                    <option value="canada">Canada/États-Unis</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>
                            {formData.personalInfo.typeAutreTelephone === "autre" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.personalInfo.typeAutreTelephoneDetail}
                                        onChange={e => handleChange('personalInfo', 'typeAutreTelephoneDetail', e.target.value)}
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif du pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.indicatifAutreTelephone}
                                    onChange={e => handleChange('personalInfo', 'indicatifAutreTelephone', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.numeroAutreTelephone}
                                    onChange={e => handleChange('personalInfo', 'numeroAutreTelephone', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Poste (si applicable)</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.posteAutreTelephone}
                                    onChange={e => handleChange('personalInfo', 'posteAutreTelephone', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type de télécopieur</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.typeTelecopieur}
                                    onChange={e => handleChange('personalInfo', 'typeTelecopieur', e.target.value)}
                                >
                                    <option value="canada">Canada/États-Unis</option>
                                    <option value="autre">Autre</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif du pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.indicatifTelecopieur}
                                    onChange={e => handleChange('personalInfo', 'indicatifTelecopieur', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de télécopieur</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.numeroTelecopieur}
                                    onChange={e => handleChange('personalInfo', 'numeroTelecopieur', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Poste (si applicable)</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.personalInfo.posteTelecopieur}
                                    onChange={e => handleChange('personalInfo', 'posteTelecopieur', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Antécédents et historique",
            component: (
                <div className="space-y-6">
                    {/* Section Militaire */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Service militaire ou paramilitaire</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous déjà servi dans l'armée, une milice, un service de sécurité civile ou la police?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.resident.body.military.isOk === "non"}
                                        onChange={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                resident: {
                                                    ...prev.resident,
                                                    body: {
                                                        ...prev.resident.body,
                                                        military: {
                                                            isOk: "non",
                                                            dev: []
                                                        }
                                                    }
                                                }
                                            }))
                                        }}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.resident.body.military.isOk === "oui"}
                                        onChange={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                resident: {
                                                    ...prev.resident,
                                                    body: {
                                                        ...prev.resident.body,
                                                        military: {
                                                            isOk: "oui",
                                                            dev: prev.resident.body.military.dev.length > 0
                                                                ? prev.resident.body.military.dev
                                                                : [{
                                                                    pays: "",
                                                                    Endroit: "",
                                                                    Province: "",
                                                                    du: "",
                                                                    au: ""
                                                                }]
                                                        }
                                                    }
                                                }
                                            }))
                                        }}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>

                        {formData.resident.body.military.isOk === "oui" && (
                            <div className="mt-4 space-y-4">
                                {formData.resident.body.military.dev.map((service, index) => (
                                    <div key={`military-${index}`} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                <input
                                                    value={service.pays || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.military.dev', index, 'pays', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Endroit</label>
                                                <input
                                                    value={service.Endroit || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.military.dev', index, 'Endroit', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Province</label>
                                                <input
                                                    value={service.Province || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.military.dev', index, 'Province', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                <input
                                                    type="date"
                                                    value={service.du || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.military.dev', index, 'du', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                <input
                                                    type="date"
                                                    value={service.au || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.military.dev', index, 'au', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-3">
                                            <button
                                                type="button"
                                                onClick={() => removeArrayEntry('resident', 'body.military.dev', index)}
                                                className="text-red-500 hover:text-red-700 flex items-center"
                                            >
                                                <FiTrash2 className="mr-1" /> Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayEntry('resident', 'body.military.dev', {
                                        pays: "",
                                        Endroit: "",
                                        Province: "",
                                        du: "",
                                        au: ""
                                    })}
                                    className="flex items-center text-primary hover:text-primary-dark"
                                >
                                    <FiPlus className="mr-1" /> Ajouter un service
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Section Témoin - Même structure */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Témoin de crimes de guerre ou crimes contre l'humanité</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous été témoin de crimes de guerre ou de crimes contre l'humanité?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.resident.body.temoin.isOk === "non"}
                                        onChange={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                resident: {
                                                    ...prev.resident,
                                                    body: {
                                                        ...prev.resident.body,
                                                        temoin: {
                                                            isOk: "non",
                                                            dev: []
                                                        }
                                                    }
                                                }
                                            }))
                                        }}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.resident.body.temoin.isOk === "oui"}
                                        onChange={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                resident: {
                                                    ...prev.resident,
                                                    body: {
                                                        ...prev.resident.body,
                                                        temoin: {
                                                            isOk: "oui",
                                                            dev: prev.resident.body.temoin.dev.length > 0
                                                                ? prev.resident.body.temoin.dev
                                                                : [{
                                                                    pays: "",
                                                                    Endroit: "",
                                                                    Province: "",
                                                                    du: "",
                                                                    au: ""
                                                                }]
                                                        }
                                                    }
                                                }
                                            }))
                                        }}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>

                        {formData.resident.body.temoin.isOk === "oui" && (
                            <div className="mt-4 space-y-4">
                                {formData.resident.body.temoin.dev.map((temoin, index) => (
                                    <div key={`temoin-${index}`} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                <input
                                                    value={temoin.pays || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.temoin.dev', index, 'pays', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Endroit</label>
                                                <input
                                                    value={temoin.Endroit || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.temoin.dev', index, 'Endroit', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Province</label>
                                                <input
                                                    value={temoin.Province || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.temoin.dev', index, 'Province', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                <input
                                                    type="date"
                                                    value={temoin.du || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.temoin.dev', index, 'du', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                <input
                                                    type="date"
                                                    value={temoin.au || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.temoin.dev', index, 'au', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-3">
                                            <button
                                                type="button"
                                                onClick={() => removeArrayEntry('resident', 'body.temoin.dev', index)}
                                                className="text-red-500 hover:text-red-700 flex items-center"
                                            >
                                                <FiTrash2 className="mr-1" /> Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayEntry('resident', 'body.temoin.dev', {
                                        pays: "",
                                        Endroit: "",
                                        Province: "",
                                        du: "",
                                        au: ""
                                    })}
                                    className="flex items-center text-primary hover:text-primary-dark"
                                >
                                    <FiPlus className="mr-1" /> Ajouter un témoignage
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Section Affiliation - Même structure */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Affiliations ou appartenances</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous été membre ou affilié à une organisation ou association quelconque?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.resident.body.affiliation.isOk === "non"}
                                        onChange={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                resident: {
                                                    ...prev.resident,
                                                    body: {
                                                        ...prev.resident.body,
                                                        affiliation: {
                                                            isOk: "non",
                                                            dev: []
                                                        }
                                                    }
                                                }
                                            }))
                                        }}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.resident.body.affiliation.isOk === "oui"}
                                        onChange={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                resident: {
                                                    ...prev.resident,
                                                    body: {
                                                        ...prev.resident.body,
                                                        affiliation: {
                                                            isOk: "oui",
                                                            dev: prev.resident.body.affiliation.dev.length > 0
                                                                ? prev.resident.body.affiliation.dev
                                                                : [{
                                                                    pays: "",
                                                                    Endroit: "",
                                                                    Province: "",
                                                                    du: "",
                                                                    au: "",
                                                                    nomOrganisation: "",
                                                                    typeOrganisation: ""
                                                                }]
                                                        }
                                                    }
                                                }
                                            }))
                                        }}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>

                        {formData.resident.body.affiliation.isOk === "oui" && (
                            <div className="mt-4 space-y-4">
                                {formData.resident.body.affiliation.dev.map((affiliation, index) => (
                                    <div key={`affiliation-${index}`} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                <input
                                                    value={affiliation.pays || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.affiliation.dev', index, 'pays', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Endroit</label>
                                                <input
                                                    value={affiliation.Endroit || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.affiliation.dev', index, 'Endroit', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Province</label>
                                                <input
                                                    value={affiliation.Province || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.affiliation.dev', index, 'Province', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                <input
                                                    type="date"
                                                    value={affiliation.du || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.affiliation.dev', index, 'du', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                <input
                                                    type="date"
                                                    value={affiliation.au || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.affiliation.dev', index, 'au', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Nom de l'organisation</label>
                                                <input
                                                    value={affiliation.nomOrganisation || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.affiliation.dev', index, 'nomOrganisation', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Type d'organisation</label>
                                                <input
                                                    value={affiliation.typeOrganisation || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.affiliation.dev', index, 'typeOrganisation', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-3">
                                            <button
                                                type="button"
                                                onClick={() => removeArrayEntry('resident', 'body.affiliation.dev', index)}
                                                className="text-red-500 hover:text-red-700 flex items-center"
                                            >
                                                <FiTrash2 className="mr-1" /> Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayEntry('resident', 'body.affiliation.dev', {
                                        pays: "",
                                        Endroit: "",
                                        Province: "",
                                        du: "",
                                        au: "",
                                        nomOrganisation: "",
                                        typeOrganisation: ""
                                    })}
                                    className="flex items-center text-primary hover:text-primary-dark"
                                >
                                    <FiPlus className="mr-1" /> Ajouter une affiliation
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Section Charges - Même structure */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Charges judiciaires</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous déjà été accusé(e), inculpé(e), mis(e) en examen ou condamné(e) pour un crime ou un délit?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.resident.body.charges.isOk === "non"}
                                        onChange={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                resident: {
                                                    ...prev.resident,
                                                    body: {
                                                        ...prev.resident.body,
                                                        charges: {
                                                            isOk: "non",
                                                            dev: []
                                                        }
                                                    }
                                                }
                                            }))
                                        }}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.resident.body.charges.isOk === "oui"}
                                        onChange={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                resident: {
                                                    ...prev.resident,
                                                    body: {
                                                        ...prev.resident.body,
                                                        charges: {
                                                            isOk: "oui",
                                                            dev: prev.resident.body.charges.dev.length > 0
                                                                ? prev.resident.body.charges.dev
                                                                : [{
                                                                    pays: "",
                                                                    Endroit: "",
                                                                    Province: "",
                                                                    du: "",
                                                                    au: "",
                                                                    natureInfraction: ""
                                                                }]
                                                        }
                                                    }
                                                }
                                            }))
                                        }}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>

                        {formData.resident.body.charges.isOk === "oui" && (
                            <div className="mt-4 space-y-4">
                                {formData.resident.body.charges.dev.map((charge, index) => (
                                    <div key={`charge-${index}`} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                <input
                                                    value={charge.pays || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.charges.dev', index, 'pays', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Endroit</label>
                                                <input
                                                    value={charge.Endroit || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.charges.dev', index, 'Endroit', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Province</label>
                                                <input
                                                    value={charge.Province || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.charges.dev', index, 'Province', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                <input
                                                    type="date"
                                                    value={charge.du || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.charges.dev', index, 'du', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                <input
                                                    type="date"
                                                    value={charge.au || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.charges.dev', index, 'au', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Nature de l'infraction</label>
                                                <input
                                                    value={charge.natureInfraction || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.charges.dev', index, 'natureInfraction', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-3">
                                            <button
                                                type="button"
                                                onClick={() => removeArrayEntry('resident', 'body.charges.dev', index)}
                                                className="text-red-500 hover:text-red-700 flex items-center"
                                            >
                                                <FiTrash2 className="mr-1" /> Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayEntry('resident', 'body.charges.dev', {
                                        pays: "",
                                        Endroit: "",
                                        Province: "",
                                        du: "",
                                        au: "",
                                        natureInfraction: ""
                                    })}
                                    className="flex items-center text-primary hover:text-primary-dark"
                                >
                                    <FiPlus className="mr-1" /> Ajouter une charge
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Section Voyages - Même structure */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Refus d'entrée ou expulsion</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous déjà été refusé(e) l'entrée ou expulsé(e) d'un pays, y compris le Canada?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.resident.body.voyages.isOk === "non"}
                                        onChange={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                resident: {
                                                    ...prev.resident,
                                                    body: {
                                                        ...prev.resident.body,
                                                        voyages: {
                                                            isOk: "non",
                                                            dev: []
                                                        }
                                                    }
                                                }
                                            }))
                                        }}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.resident.body.voyages.isOk === "oui"}
                                        onChange={() => {
                                            setFormData(prev => ({
                                                ...prev,
                                                resident: {
                                                    ...prev.resident,
                                                    body: {
                                                        ...prev.resident.body,
                                                        voyages: {
                                                            isOk: "oui",
                                                            dev: prev.resident.body.voyages.dev.length > 0
                                                                ? prev.resident.body.voyages.dev
                                                                : [{
                                                                    pays: "",
                                                                    Endroit: "",
                                                                    Province: "",
                                                                    du: "",
                                                                    au: "",
                                                                    raison: ""
                                                                }]
                                                        }
                                                    }
                                                }
                                            }))
                                        }}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>

                        {formData.resident.body.voyages.isOk === "oui" && (
                            <div className="mt-4 space-y-4">
                                {formData.resident.body.voyages.dev.map((refus, index) => (
                                    <div key={`refus-${index}`} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                <input
                                                    value={refus.pays || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.voyages.dev', index, 'pays', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Endroit</label>
                                                <input
                                                    value={refus.Endroit || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.voyages.dev', index, 'Endroit', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Province</label>
                                                <input
                                                    value={refus.Province || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.voyages.dev', index, 'Province', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                <input
                                                    type="date"
                                                    value={refus.du || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.voyages.dev', index, 'du', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                <input
                                                    type="date"
                                                    value={refus.au || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.voyages.dev', index, 'au', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Raison</label>
                                                <input
                                                    value={refus.raison || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.voyages.dev', index, 'raison', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-3">
                                            <button
                                                type="button"
                                                onClick={() => removeArrayEntry('resident', 'body.voyages.dev', index)}
                                                className="text-red-500 hover:text-red-700 flex items-center"
                                            >
                                                <FiTrash2 className="mr-1" /> Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addArrayEntry('resident', 'body.voyages.dev', {
                                        pays: "",
                                        Endroit: "",
                                        Province: "",
                                        du: "",
                                        au: "",
                                        raison: ""
                                    })}
                                    className="flex items-center text-primary hover:text-primary-dark"
                                >
                                    <FiPlus className="mr-1" /> Ajouter un refus
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        {
            title: "Informations familiales",
            component: (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Informations sur le demandeur principal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.name}
                                    onChange={e => handleFamilyChange('applicant', 'name', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.dob}
                                    onChange={e => handleFamilyChange('applicant', 'dob', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.country}
                                    onChange={e => handleFamilyChange('applicant', 'country', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.occupation}
                                    onChange={e => handleFamilyChange('applicant', 'occupation', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.maritalStatus}
                                    onChange={e => handleFamilyChange('applicant', 'maritalStatus', e.target.value)}
                                    required
                                >
                                    <option value="">-- Sélectionnez --</option>
                                    <option value="celibataire">Célibataire</option>
                                    <option value="marie">Marié(e)</option>
                                    <option value="divorce">Divorcé(e)</option>
                                    <option value="veuf">Veuf/Veuve</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.address}
                                    onChange={e => handleFamilyChange('applicant', 'address', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Accompagne le demandeur au Canada ?</label>
                                <div className="flex gap-4 mt-1">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            checked={formData.familyInfo.applicant.coming === true}
                                            onChange={() => handleFamilyChange('applicant', 'coming', true)}
                                            required
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            checked={formData.familyInfo.applicant.coming === false}
                                            onChange={() => handleFamilyChange('applicant', 'coming', false)}
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {(formData.familyInfo.applicant.maritalStatus === "marie" || formData.familyInfo.applicant.maritalStatus === "divorce" || formData.familyInfo.applicant.maritalStatus === "veuf") && (
                        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations sur l'époux/conjoint</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.familyInfo.epouse.name}
                                        onChange={e => handleFamilyChange('epouse', 'name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.familyInfo.epouse.dob}
                                        onChange={e => handleFamilyChange('epouse', 'dob', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.familyInfo.epouse.country}
                                        onChange={e => handleFamilyChange('epouse', 'country', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.familyInfo.epouse.occupation}
                                        onChange={e => handleFamilyChange('epouse', 'occupation', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.familyInfo.epouse.maritalStatus}
                                        onChange={e => handleFamilyChange('epouse', 'maritalStatus', e.target.value)}
                                        required
                                    >
                                        <option value="">-- Sélectionnez --</option>
                                        <option value="celibataire">Célibataire</option>
                                        <option value="marie">Marié(e)</option>
                                        <option value="divorce">Divorcé(e)</option>
                                        <option value="veuf">Veuf/Veuve</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.familyInfo.epouse.address}
                                        onChange={e => handleFamilyChange('epouse', 'address', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Accompagne le demandeur au Canada ?</label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.familyInfo.epouse.coming === true}
                                                onChange={() => handleFamilyChange('epouse', 'coming', true)}
                                                required
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.familyInfo.epouse.coming === false}
                                                onChange={() => handleFamilyChange('epouse', 'coming', false)}
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Parents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-md font-medium text-gray-800 mb-3">Père</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.father.name}
                                            onChange={e => handleFamilyChange('father', 'name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.father.dob}
                                            onChange={e => handleFamilyChange('father', 'dob', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.father.country}
                                            onChange={e => handleFamilyChange('father', 'country', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.father.occupation}
                                            onChange={e => handleFamilyChange('father', 'occupation', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.father.address}
                                            onChange={e => handleFamilyChange('father', 'address', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Accompagne le demandeur au Canada ?</label>
                                        <div className="flex gap-4 mt-1">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                    checked={formData.familyInfo.father.coming === true}
                                                    onChange={() => handleFamilyChange('father', 'coming', true)}
                                                    required
                                                />
                                                <span className="ml-2">Oui</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                    checked={formData.familyInfo.father.coming === false}
                                                    onChange={() => handleFamilyChange('father', 'coming', false)}
                                                />
                                                <span className="ml-2">Non</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-md font-medium text-gray-800 mb-3">Mère</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.mother.name}
                                            onChange={e => handleFamilyChange('mother', 'name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.mother.dob}
                                            onChange={e => handleFamilyChange('mother', 'dob', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.mother.country}
                                            onChange={e => handleFamilyChange('mother', 'country', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.mother.occupation}
                                            onChange={e => handleFamilyChange('mother', 'occupation', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.mother.address}
                                            onChange={e => handleFamilyChange('mother', 'address', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Accompagne le demandeur au Canada ?</label>
                                        <div className="flex gap-4 mt-1">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                    checked={formData.familyInfo.mother.coming === true}
                                                    onChange={() => handleFamilyChange('mother', 'coming', true)}
                                                    required
                                                />
                                                <span className="ml-2">Oui</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                    checked={formData.familyInfo.mother.coming === false}
                                                    onChange={() => handleFamilyChange('mother', 'coming', false)}
                                                />
                                                <span className="ml-2">Non</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Enfants</h3>
                            <button
                                type="button"
                                onClick={() => addArrayEntry('familyInfo', 'children')}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                <FiPlus className="mr-1" /> Ajouter un enfant
                            </button>
                        </div>

                        {formData.familyInfo.children.length === 0 ? (
                            <p className="text-gray-500 text-sm">Aucun enfant ajouté</p>
                        ) : (
                            <div className="space-y-4">
                                {formData.familyInfo.children.map((child, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={child.name || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'children', index, 'name', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                                <input
                                                    type="date"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={child.dob || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'children', index, 'dob', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={child.country || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'children', index, 'country', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Accompagne le demandeur au Canada ?</label>
                                                <div className="flex gap-4 mt-1">
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                            checked={child.coming === true}
                                                            onChange={() => handleArrayChange('familyInfo', 'children', index, 'coming', true)}
                                                            required
                                                        />
                                                        <span className="ml-2">Oui</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                            checked={child.coming === false}
                                                            onChange={() => handleArrayChange('familyInfo', 'children', index, 'coming', false)}
                                                        />
                                                        <span className="ml-2">Non</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-2">
                                            <button
                                                type="button"
                                                onClick={() => removeArrayEntry('familyInfo', 'children', index)}
                                                className="text-red-500 hover:text-red-700 flex items-center"
                                            >
                                                <FiTrash2 className="mr-1" /> Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Frères et sœurs</h3>
                            <button
                                type="button"
                                onClick={() => addArrayEntry('familyInfo', 'siblings')}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                <FiPlus className="mr-1" /> Ajouter un frère/sœur
                            </button>
                        </div>

                        {formData.familyInfo.siblings.length === 0 ? (
                            <p className="text-gray-500 text-sm">Aucun frère ou sœur ajouté</p>
                        ) : (
                            <div className="space-y-4">
                                {formData.familyInfo.siblings.map((sibling, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={sibling.name || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'siblings', index, 'name', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                                <input
                                                    type="date"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={sibling.dob || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'siblings', index, 'dob', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={sibling.country || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'siblings', index, 'country', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Accompagne le demandeur au Canada ?</label>
                                                <div className="flex gap-4 mt-1">
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                            checked={sibling.coming === true}
                                                            onChange={() => handleArrayChange('familyInfo', 'siblings', index, 'coming', true)}
                                                            required
                                                        />
                                                        <span className="ml-2">Oui</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                            checked={sibling.coming === false}
                                                            onChange={() => handleArrayChange('familyInfo', 'siblings', index, 'coming', false)}
                                                        />
                                                        <span className="ml-2">Non</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-2">
                                            <button
                                                type="button"
                                                onClick={() => removeArrayEntry('familyInfo', 'siblings', index)}
                                                className="text-red-500 hover:text-red-700 flex items-center"
                                            >
                                                <FiTrash2 className="mr-1" /> Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        {
            title: "Documents",
            component: (
                <div className="space-y-8">
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <FiInfo className="h-5 w-5 text-primary" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-primary">Instructions importantes</h3>
                                <div className="mt-2 text-sm text-primary">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Formats de fichiers acceptés :
                                            <ul className="list-disc pl-5 mt-1">
                                                <li>Documents d'identité : PDF uniquement</li>
                                                <li>Photos : JPG, JPEG ou PNG (35x45mm, fond clair)</li>
                                                <li>Relevés bancaires : PDF uniquement</li>
                                                <li>Autres documents : PDF ou images (JPG, JPEG, PNG)</li>
                                            </ul>
                                        </li>
                                        <li>Taille maximale par fichier : 3.8MB</li>
                                        <li>Le passeport doit avoir une validité d'au moins 1 an</li>
                                        <li>Les relevés bancaires doivent couvrir les 6 derniers mois</li>
                                        <li>Les documents dans d'autres langues doivent être traduits et certifiés</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {formData.documents.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">{section.titre}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {section.corps.map((doc, docIndex) => {
                                    // Vérification des conditions
                                    if (doc.condition && !doc.condition(formData)) {
                                        return null;
                                    }

                                    return (
                                        <FileUpload
                                            key={docIndex}
                                            sectionIndex={sectionIndex}
                                            docIndex={docIndex}
                                            label={getDocumentLabel(doc.titre, formData)}
                                            required={doc.required}
                                            specifications={doc.specifications}
                                            period={doc.period}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )
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
            {/* Arrière-plan avec éléments décoratifs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 md:w-1/4 opacity-5">
                    <img
                        src="/flag.png"
                        alt="Décor"
                        className="w-full h-auto object-contain"
                    />
                </div>
                <div className="absolute bottom-0 left-0 w-1/3 md:w-1/4 opacity-5 rotate-180">
                    <img
                        src="/flag.png"
                        alt="Décor"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Conteneur principal */}
            <div className="relative px-[6.5%] mx-auto  ">
                {/* En-tête */}
                <header className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary-100 rounded-full mb-4">
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Formulaire de demande combinée
                    </h1>
                    {/* <p className="mt-3 max-w-3xl mx-auto text-lg md:text-xl text-gray-600">
                        Remplissez soigneusement toutes les sections du formulaire.
                        <br className="hidden sm:block" />
                        Les champs marqués d'un <span className="text-red-500">*</span> sont obligatoires.
                    </p> */}
                </header>

                {/* Stepper amélioré */}
                <div className="mb-10 md:mb-14">
                    <nav className="flex items-center justify-center">
                        <ol className="flex items-center space-x-4 md:space-x-8">
                            {steps.map((step, index) => (
                                <li key={index} className="flex items-center">
                                    <button
                                        type="button"
                                        onClick={() => validateCurrentStep(activeStep) && setActiveStep(index)}
                                        className={`group relative flex flex-col items-center transition-all ${index <= activeStep ? "cursor-pointer" : "cursor-not-allowed"}`}
                                        disabled={!validateCurrentStep(activeStep)}
                                    >
                                        <span
                                            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 ${index === activeStep
                                                ? "bg-primary border-primary text-white shadow-lg scale-110"
                                                : index < activeStep
                                                    ? "bg-green-100 border-green-500 text-green-700"
                                                    : "bg-white border-gray-300 text-gray-400 group-hover:border-gray-400"
                                                }`}
                                        >
                                            {index < activeStep ? (
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <span className="font-medium">{index + 1}</span>
                                            )}
                                        </span>
                                        <span
                                            className={`absolute top-full mt-2 w-32 text-center text-sm font-medium ${index === activeStep
                                                ? "text-primary font-semibold"
                                                : index < activeStep
                                                    ? "text-gray-600"
                                                    : "text-gray-400"
                                                }`}
                                        >
                                            {step.title}
                                        </span>
                                    </button>

                                    {index < steps.length - 1 && (
                                        <div
                                            className={`hidden md:block h-0.5 w-16 mx-2 transition-all duration-500 ${index < activeStep ? "bg-green-500" : "bg-gray-200"
                                                }`}
                                        />
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>

                {/* Carte du formulaire */}
                <div className="bg-white shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                    {/* Barre de progression */}
                    <div className="h-2 bg-gray-100">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                        />
                    </div>

                    {/* En-tête de l'étape */}
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

                    {/* Contenu du formulaire */}
                    <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                        <div className="px-6 py-5 sm:p-8">
                            {steps[activeStep].component}
                        </div>

                        {/* Navigation */}
                        <div className="px-6 py-5 bg-gray-50 sm:px-8">
                            <div className="flex items-center justify-between">
                                {activeStep > 0 ? (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                                    >
                                        <FiChevronLeft className="mr-2" />
                                        Précédent
                                    </button>
                                ) : (
                                    <div></div>
                                )}

                                {activeStep < steps.length - 1 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!validateCurrentStep(activeStep)}
                                        className={`ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all ${validateCurrentStep(activeStep)
                                            ? "bg-primary hover:bg-primary-600"
                                            : "bg-gray-400 cursor-not-allowed"
                                            }`}
                                    >
                                        Suivant
                                        <FiChevronRight className="ml-2" />
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={submitStatus === "loading" || !formData.declarationAgreed}
                                        className={`ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${submitStatus === "loading" || !formData.declarationAgreed
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                                            }`}
                                    >
                                        {submitStatus === "loading" ? (
                                            <>
                                                <svg
                                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    ></path>
                                                </svg>
                                                Envoi en cours...
                                            </>
                                        ) : (
                                            <>
                                                <FiCheck className="mr-2" />
                                                Soumettre la demande
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Aide et informations */}
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
};

export default CombinedApplicationForm;