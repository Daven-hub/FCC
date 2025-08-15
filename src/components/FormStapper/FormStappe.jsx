import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiPlus, FiTrash2, FiUpload, FiChevronLeft, FiChevronRight, FiInfo } from 'react-icons/fi';
import { submitCombinedApplication } from '../../services/annexeSrvice';
import { showErrorToast } from '../Toast/Toast';
import DeclarationSection from './DeclarationSection';

const CombinedApplicationForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [showPreview, setShowPreview] = useState(false);

    const [formData, setFormData] = useState({
        // Étape 1: Informations personnelles
        formulaireVisa: {
            informationsGenerales: {
                IUC: "",
                servi: "", // "Je veux être servi(e) en"
                visa: ""  // type de demande de visa 
            },
            donneesPersonnelles: {
                nomComplet: {
                    nom: "",
                    prenoms: ""
                },
                autreNomUtilise: {
                    utilise: false,
                    nom: "",
                    prenoms: ""
                },
                sexe: "",
                dateNaissance: "",
                lieuNaissance: {
                    villeVillage: "",
                    pays: ""
                },
                citoyennete: ""
            },
            residence: {
                actuelle: {
                    pays: "",
                    statut: "",
                    statutAutre: "",
                    du: "",
                    au: ""

                },
                anterieure: {
                    aVecuAutrePays: false,
                    sejours: []
                },
                paysDemande: {
                    pays: "",
                    memeQueResidence: false,
                    statutAutre: "",
                    autre: "",
                    du: "",
                    au: ""
                }
            },
            etatMatrimonial: {
                etat: "",
                dateMariageOuUnion: "",
                dejaMarieOuUnionFait: false,
                conjoint: {
                    nom: "",
                    prenoms: "",
                    dateNaissance: "",
                }
            },
            mariage: {
                etat: "", // Initialisé à "non" au lieu de ""
                dateMariageOuUnion: "",
                dejaMarieOuUnionFait: false,
                conjoint: {
                    nom: "",
                    prenoms: "",
                    dateNaissance: "",
                    lienParenter: "",
                    genreLienParente: "",
                    du: "",
                    au: ""
                }
            },
            langues: {
                langueMaternelle: "",
                communiqueFrancaisAnglaisDeuxLangues: "",
                languePlusAise: "",
                evaluationOrganismeApprouve: false
            },
            passeport: {
                numero: "",
                paysDelivrance: "",
                dateDelivrance: "",
                dateExpiration: "",
                passeportTaiwanAvecID: false,
                passeportNationalIsraelien: false
            },
            pieceIdentiteNationale: {
                possede: false,
                numero: "",
                paysDelivrance: "",
                dateDelivrance: "",
                dateExpiration: ""
            },
            carteResidentPermanentUSA: {
                possede: false,
                numero: "",
                dateExpiration: ""
            },
            coordonnees: {
                adressePostaleActuelle: {
                    casePostale: "",
                    noAppUnite: "",
                    numeroRue: "",
                    nomRue: "",
                    villeVillage: "",
                    pays: "",
                    provinceEtat: "",
                    codePostal: "",
                    district: ""
                },
                adresseDomicile: {
                    identiqueAdressePostale: false,
                    noAppUnite: "",
                    numeroRue: "",
                    nomRue: "",
                    villeVillage: "",
                    pays: "",
                    provinceEtat: "",
                    codePostal: "",
                    district: ""
                },
                telephone: {
                    type: "",
                    indicatifPays: "",
                    numero: "",
                    poste: ""
                },
                autreTelephone: {
                    type: "",
                    indicatifPays: "",
                    numero: "",
                    poste: ""
                },
                telecopieur: {
                    type: "",
                    indicatifPays: "",
                    numero: "",
                    poste: ""
                },
                adresseElectronique: ""
            },
            visiteCanada: {
                objetVisite: "",
                autre: ""
            },
            antecedents: {
                sante: {
                    tuberculoseDernieresAnnees: false,
                    troublePhysiqueMental: false,
                    details: ""
                },
                statutCanada: {
                    resteApresExpiration: false,
                    refusVisaPermis: false,
                    demandeEntreeCanada: false,
                    details: ""
                },
                infractionsPenales: {
                    commisOuAccuse: false,
                    details: ""
                },
                serviceMilitairePolice: {
                    aFaitPartie: false,
                    details: ""
                },
                appartenanceGroupeViolent: {
                    aEteMembreOuAffilie: false
                },
                temoignageMauvaisTraitements: {
                    aEteTemoinOuParticipe: false
                }
            }
        },

        // Étape 2: Antécédents et historique
        resident: {
            titre: "Demande de statut de résident temporaire",
            nom: "",
            prenom: "",
            dateNais: "",
            iuc: "",
            Demandeur: [],  // Le demandeur principal ou l'epoux, le conjoin , enfant age plus 18 ans 
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
                coming: false,
                maritalStatus: '',
            },
            mother: {
                name: '',
                dob: '',
                country: '',
                occupation: '',
                address: '',
                coming: false,
                maritalStatus: '',
            },
            children: [],
            siblings: [],
            typeDemande: '', // Visiteur, Travailleur, Étudiant, Autre

        },

        // Étape 4: Documents
        documents: [

            {
                titre: "Documents d'Identité Personnelle",
                nom: "",
                prenom: "",
                dateNais: "",
                iuc: "",
                corps: [
                    {
                        titre: "Acte de Naissance",
                        provided: false,
                        file: null,
                        required: true,
                        type: 'PDF'
                    },
                    {
                        titre: "Passeport Valide (1 an minimum)",
                        provided: false,
                        file: null,
                        required: true,
                        type: 'PDF',
                        condition: {
                            question: "Avez-vous un passeport valide avec plus d'un an avant expiration?",
                            response: 'non' // Valeur par défaut
                        }
                    },
                    {
                        titre: "Acte de Mariage",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF',
                        condition: {
                            question: "Êtes-vous marié(e) ou en union de fait?",
                            response: 'non' // Valeur par défaut
                        }
                    },
                    {
                        titre: "Photo d'Identité",
                        provided: false,
                        file: null,
                        required: true,
                        specifications: "35x45mm, fond clair",
                        type: 'IMAGE'
                    },
                    {
                        titre: "Carte Nationale d'Identité",
                        provided: false,
                        file: null,
                        required: true,
                        type: 'PDF'
                    }
                ]
            },
            {
                titre: "Preuves de Fonds Financiers",
                corps: [
                    {
                        titre: "Documents de l'Entreprise",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF',
                        condition: {
                            question: "Êtes-vous travailleur indépendant ou avez-vous une entreprise?",
                            response: 'non' // Valeur par défaut
                        }
                    },
                    {
                        titre: "Relevés Bancaires Professionnels (6 mois)",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF',
                        condition: {
                            question: "Avez-vous des comptes bancaires professionnels?",
                            response: 'non' // Valeur par défaut
                        }
                    },
                    {
                        titre: "Relevés Bancaires Personnels (6 mois)",
                        provided: false,
                        file: null,
                        required: true,
                        type: 'PDF'
                    }
                ]
            },
            {
                titre: "Documents Complémentaires",
                corps: [
                    {
                        titre: "Visa Antérieur",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF'
                    },
                    {
                        titre: "Assurance Voyage",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF',
                        condition: {
                            question: "Avez-vous plus de 60 ans et besoin d'une assurance voyage?",
                            response: 'non' // Valeur par défaut
                        }
                    },
                    {
                        titre: "Réservation d'Hôtel",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF'
                    },
                    {
                        titre: "Billets d'Avion (Aller-Retour)",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF'
                    }
                ]
            },
            {
                titre: "Documents Spécifiques",
                corps: [
                    {
                        titre: "Refus de Visa Canada",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF'
                    },
                    {
                        titre: "Demande de Visa en Cours",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF'
                    },
                    {
                        titre: "Titre de Séjour Étranger",
                        provided: false,
                        file: null,
                        required: false,
                        type: 'PDF',
                        condition: {
                            question: "Résidez-vous actuellement dans un pays différent de votre pays de naissance?",
                            response: 'non'
                        }
                    }
                ]
            }
        ],
        declarationAgreed: false
    });

    const [submitStatus, setSubmitStatus] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    useEffect(() => {
        const { nom, prenoms } = formData.formulaireVisa.donneesPersonnelles.nomComplet;
        const dateNaissance = formData.formulaireVisa.donneesPersonnelles.dateNaissance;
        const iuc = formData.formulaireVisa.informationsGenerales.IUC;

        const dateNais = dateNaissance;

        setFormData(prev => ({
            ...prev,
            resident: {
                ...prev.resident,
                nom: nom || prev.resident.nom,
                prenom: prenoms || prev.resident.prenom,
                dateNais: dateNais || prev.resident.dateNais,
                iuc: iuc || prev.resident.iuc
            }
        }));

        // Mettre à jour l'étape 4 (Documents)
        setFormData(prev => ({
            ...prev,
            documents: prev.documents.map((section, index) => {
                if (index === 0) { // Seulement la première section contient les infos personnelles
                    return {
                        ...section,
                        nom: nom || section.nom,
                        prenom: prenoms || section.prenom,
                        dateNais: dateNais || section.dateNais,
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
        e.preventDefault();
        setSubmitStatus("loading");

        try {
            const formDataToSend = new FormData();

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

            formDataToSend.append('applicationData', JSON.stringify(applicationData));

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

    const FileUpload = ({ sectionIndex, docIndex, label, required, specifications, period, condition, onConditionChange }) => {
        const docState = formData.documents[sectionIndex].corps[docIndex];
        const uploadState = uploadProgress[`${sectionIndex}-${docIndex}`];

        const getAcceptedFormats = () => {
            switch (docState.type) {
                case 'PDF': return ".pdf";
                case 'IMAGE': return "image/*";
                default: return ".pdf, .jpg, .jpeg, .png";
            }
        };

        const formatDescription = docState.type === 'PDF'
            ? "Format PDF uniquement"
            : docState.type === 'IMAGE'
                ? "Formats image (JPG, JPEG, PNG)"
                : "Formats PDF, JPG, JPEG ou PNG";

        return (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                {condition && (
                    <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-100">
                        <p className="text-sm font-medium text-gray-700 mb-2">{condition.question}</p>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={condition.response === 'non'}
                                    onChange={() => onConditionChange(sectionIndex, docIndex, 'non')}
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={condition.response === 'oui'}
                                    onChange={() => onConditionChange(sectionIndex, docIndex, 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>
                )}

                <div className="flex justify-between items-start mb-2">
                    <div>
                        <label className="font-medium text-gray-700">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        {specifications && <p className="text-xs text-gray-500 mt-1">{specifications}</p>}
                        {period && <p className="text-xs text-gray-500 mt-1">Période: {period}</p>}
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

    const isDocumentRequired = (docKey) => {
        const requiredDocs = [
            'actetenaissance',
            'passeport',
            'photo',
            'relevesbancairespersonnels'
        ];

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
                    {/* Section Informations Générales */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Informations Générales</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">IUC (si applicable)</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.informationsGenerales.IUC}
                                    onChange={e => handleChange('informationsGenerales.IUC', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Je veux être servi(e) en</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.informationsGenerales.servi}
                                    onChange={e => handleChange('informationsGenerales.servi', e.target.value)}
                                    required
                                >
                                    <option value="">-- Sélectionnez --</option>
                                    <option value="français">Français</option>
                                    <option value="anglais">Anglais</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type de demande de visa</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.informationsGenerales.visa}
                                    onChange={e => handleChange('informationsGenerales.visa', e.target.value)}
                                    required
                                >
                                    <option value="">-- Sélectionnez --</option>
                                    <option value="visiteur">Visiteur</option>
                                    <option value="travailleur">Transit</option>

                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section Données Personnelles */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Données Personnelles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de famille</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.donneesPersonnelles.nomComplet.nom}
                                    onChange={e => handleChange('donneesPersonnelles.nomComplet.nom', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s)</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.donneesPersonnelles.nomComplet.prenoms}
                                    onChange={e => handleChange('donneesPersonnelles.nomComplet.prenoms', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous utilisé un autre nom ?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.donneesPersonnelles.autreNomUtilise.utilise === false}
                                        onChange={() => handleChange('donneesPersonnelles.autreNomUtilise.utilise', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.donneesPersonnelles.autreNomUtilise.utilise === true}
                                        onChange={() => handleChange('donneesPersonnelles.autreNomUtilise.utilise', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>

                        {formData.formulaireVisa.donneesPersonnelles.autreNomUtilise.utilise && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ancien nom de famille</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.donneesPersonnelles.autreNomUtilise.nom}
                                        onChange={e => handleChange('donneesPersonnelles.autreNomUtilise.nom', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Ancien(s) prénom(s)</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.donneesPersonnelles.autreNomUtilise.prenoms}
                                        onChange={e => handleChange('donneesPersonnelles.autreNomUtilise.prenoms', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.donneesPersonnelles.sexe === "Homme"}
                                        onChange={() => handleChange('donneesPersonnelles.sexe', "Homme")}
                                        required
                                    />
                                    <span className="ml-2">Homme</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.donneesPersonnelles.sexe === "Femme"}
                                        onChange={() => handleChange('donneesPersonnelles.sexe', "Femme")}
                                    />
                                    <span className="ml-2">Femme</span>
                                </label>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.donneesPersonnelles.dateNaissance}
                                onChange={e => handleChange('donneesPersonnelles.dateNaissance', e.target.value)}
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Citoyenneté</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.donneesPersonnelles.citoyennete}
                                onChange={e => handleChange('donneesPersonnelles.citoyennete', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Section Résidence */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Résidence</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de résidence actuelle</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.residence.actuelle.pays}
                                    onChange={e => handleChange('residence.actuelle.pays', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Statut de résidence</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.residence.actuelle.statut}
                                    onChange={e => handleChange('residence.actuelle.statut', e.target.value)}
                                    required
                                >
                                    <option value="">Sélectionnez un statut</option>
                                    <option value="Citoyen">Citoyen</option>
                                    <option value="Résident permanent">Résident permanent</option>
                                    <option value="Personne Protégée">Personne Protégée</option>
                                    <option value="Résident temporaire">Demandeur d'asile</option>
                                    <option value="Étudiant">Étudiant</option>
                                    <option value="Travailleur">Travailleur</option>
                                    <option value="Touriste">Touriste</option>
                                    <option value="Autre">Autre</option>
                                </select>

                                {formData.formulaireVisa.residence.actuelle.statut === "Autre" && (
                                    <div className="mt-2">
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Précisez votre statut"
                                            value={formData.formulaireVisa.residence.actuelle.statutAutre || ''}
                                            onChange={e => handleChange('residence.actuelle.statutAutre', e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Du</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.residence.actuelle.du || ''}
                                        onChange={e => handleChange('residence.actuelle.du', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Au</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.residence.actuelle.au || ''}
                                        onChange={e => handleChange('residence.actuelle.au', e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>



                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous vécu dans un autre pays que votre pays de citoyenneté ou de résidence actuelle ?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={!formData.formulaireVisa.residence.anterieure.aVecuAutrePays}
                                        onChange={() => handleChange('residence.anterieure.aVecuAutrePays', false)}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.residence.anterieure.aVecuAutrePays}
                                        onChange={() => handleChange('residence.anterieure.aVecuAutrePays', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>

                        {formData.formulaireVisa.residence.anterieure.aVecuAutrePays && (
                            <div className="mt-4 space-y-6">
                                {(formData.formulaireVisa.residence.anterieure.sejours || []).map((sejour, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                                        <button
                                            type="button"
                                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                            onClick={() => removeArrayEntry('formulaireVisa', 'residence.anterieure.sejours', index)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </button>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                                    value={sejour.pays || ''}
                                                    onChange={e => handleArrayChange('formulaireVisa', 'residence.anterieure.sejours', index, 'pays', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                                                <select
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                                    value={sejour.statut || ''}
                                                    onChange={e => handleArrayChange('formulaireVisa', 'residence.anterieure.sejours', index, 'statut', e.target.value)}
                                                    required
                                                >
                                                    <option value="">Sélectionnez un statut</option>
                                                    <option value="Citoyen">Citoyen</option>
                                                    <option value="Résident permanent">Résident permanent</option>
                                                    <option value="Personne Protégée">Personne Protégée</option>
                                                    <option value="Résident temporaire">Demandeur d'asile</option>
                                                    <option value="Étudiant">Étudiant</option>
                                                    <option value="Travailleur">Travailleur</option>
                                                    <option value="Touriste">Touriste</option>
                                                    <option value="Autre">Autre</option>
                                                </select>
                                                {sejour.statut === "Autre" && (
                                                    <div className="mt-2">
                                                        <input
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                                            placeholder="Précisez votre statut"
                                                            value={sejour.statutAutre || ''}
                                                            onChange={e => handleArrayChange('formulaireVisa', 'residence.anterieure.sejours', index, 'statutAutre', e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de début (MM/AAAA)</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/AAAA"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                                    value={sejour.du || ''}
                                                    onChange={e => handleArrayChange('formulaireVisa', 'residence.anterieure.sejours', index, 'du', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin (MM/AAAA)</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/AAAA"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                                    value={sejour.au || ''}
                                                    onChange={e => handleArrayChange('formulaireVisa', 'residence.anterieure.sejours', index, 'au', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    onClick={() => addArrayEntry('formulaireVisa', 'residence.anterieure.sejours', {
                                        pays: '',
                                        statut: '',
                                        statutAutre: '',
                                        du: '',
                                        au: ''
                                    })}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Ajouter un autre séjour
                                </button>
                            </div>
                        )}


                        {/* Section pays de demande */}
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Faites-vous la demande depuis un autre pays que votre pays de résidence actuelle ?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.residence.paysDemande.memeQueResidence === true}
                                        onChange={() => handleChange('residence.paysDemande.memeQueResidence', true)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.residence.paysDemande.memeQueResidence === false}
                                        onChange={() => handleChange('residence.paysDemande.memeQueResidence', false)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>

                        {!formData.formulaireVisa.residence.paysDemande.memeQueResidence && (
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pays où vous faites la demande</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.residence.paysDemande.pays || ''}
                                        onChange={e => handleChange('residence.paysDemande.pays', e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Statut dans ce pays</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.residence.paysDemande.statut || ''}
                                        onChange={e => handleChange('residence.paysDemande.statut', e.target.value)}
                                        required
                                    >
                                        <option value="">Sélectionnez un statut</option>
                                        <option value="Citoyen">Citoyen</option>
                                        <option value="Résident permanent">Résident permanent</option>
                                        <option value="Personne Protégée">Personne Protégée</option>
                                        <option value="Résident temporaire">Demandeur d'asile</option>
                                        <option value="Étudiant">Étudiant</option>
                                        <option value="Travailleur">Travailleur</option>
                                        <option value="Touriste">Touriste</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                    {formData.formulaireVisa.residence.paysDemande.statut === "Autre" && (
                                        <div className="mt-2">
                                            <input
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                placeholder="Précisez votre statut"
                                                value={formData.formulaireVisa.residence.paysDemande.statutAutre || ''}
                                                onChange={e => handleChange('residence.paysDemande.statutAutre', e.target.value)}
                                                required
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de début (MM/AAAA)</label>
                                        <input
                                            type="text"
                                            placeholder="MM/AAAA"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.residence.paysDemande.du || ''}
                                            onChange={e => handleChange('residence.paysDemande.du', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin (MM/AAAA)</label>
                                        <input
                                            type="text"
                                            placeholder="MM/AAAA"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.residence.paysDemande.au || ''}
                                            onChange={e => handleChange('residence.paysDemande.au', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Section État Matrimonial */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">État Matrimonial</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial actuel</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.etatMatrimonial.etat}
                                onChange={e => handleChange('etatMatrimonial.etat', e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionnez --</option>
                                <option value="celibataire">Célibataire</option>
                                <option value="union">Conjoint (e) de fait</option>
                                <option value="marie">Marié(e)</option>
                                <option value="inconnu">Inconnu</option>
                                <option value="annule">Mariage annulé</option>
                                <option value="divorce">Divorcé(e)</option>
                                <option value="separe">Séparé (e) légalement</option>
                                <option value="veuf">Veuf (ve)</option>
                            </select>
                        </div>

                        {(formData.formulaireVisa.etatMatrimonial.etat === "marie" || formData.formulaireVisa.etatMatrimonial.etat === "union") && (
                            <>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date du mariage ou début de l'union</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.etatMatrimonial.dateMariageOuUnion}
                                        onChange={e => handleChange('etatMatrimonial.dateMariageOuUnion', e.target.value)}
                                        required
                                    />
                                </div>

                                {/* <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà été marié(e) ou en union de fait ?</label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.etatMatrimonial.dejaMarieOuUnionFait === false}
                                                onChange={() => handleChange('etatMatrimonial.dejaMarieOuUnionFait', false)}
                                                required
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.etatMatrimonial.dejaMarieOuUnionFait === true}
                                                onChange={() => handleChange('etatMatrimonial.dejaMarieOuUnionFait', true)}
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                    </div>
                                </div> */}

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom du conjoint</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.etatMatrimonial.conjoint.nom}
                                            onChange={e => handleChange('etatMatrimonial.conjoint.nom', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s) du conjoint</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.etatMatrimonial.conjoint.prenoms}
                                            onChange={e => handleChange('etatMatrimonial.conjoint.prenoms', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance du conjoint</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.etatMatrimonial.conjoint.dateNaissance}
                                            onChange={e => handleChange('etatMatrimonial.conjoint.dateNaissance', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>


                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        {/* Question principale */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Êtes-vous ou avez-vous déjà été marié(e) ou en union de fait ? *
                            </label>
                            <div className="flex gap-4">
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="mariageEtat"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        checked={formData.formulaireVisa.mariage.etat === "oui"}
                                        onChange={() => {
                                            handleChange('mariage.etat', "oui");
                                            // Réinitialisation des champs si on passe de non à oui
                                            if (formData.formulaireVisa.mariage.etat !== "oui") {
                                                handleChange('mariage.dateMariageOuUnion', "");
                                                handleChange('mariage.conjoint', {
                                                    nom: "",
                                                    prenoms: "",
                                                    dateNaissance: "",
                                                    lienParenter: "",
                                                    genreLienParente: "",
                                                    du: "",
                                                    au: ""
                                                });
                                            }
                                        }}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input
                                        type="radio"
                                        name="mariageEtat"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        checked={formData.formulaireVisa.mariage.etat === "non"}
                                        onChange={() => {
                                            handleChange('mariage.etat', "non");
                                            // Réinitialisation des champs si on passe de oui à non
                                            if (formData.formulaireVisa.mariage.etat !== "non") {
                                                handleChange('mariage.dateMariageOuUnion', "");
                                                handleChange('mariage.conjoint', {
                                                    nom: "",
                                                    prenoms: "",
                                                    dateNaissance: "",
                                                    lienParenter: "",
                                                    genreLienParente: "",
                                                    du: "",
                                                    au: ""
                                                });
                                            }
                                        }}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        {/* Champs conditionnels */}
                        {formData.formulaireVisa.mariage.etat === "oui" && (
                            <div className="space-y-4">
                                {/* Nature et date de l'union */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date du mariage/début d'union
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.mariage.dateMariageOuUnion}
                                            onChange={e => handleChange('mariage.dateMariageOuUnion', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Informations sur le conjoint */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom du conjoint
                                        </label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.mariage.conjoint.nom}
                                            onChange={e => handleChange('mariage.conjoint.nom', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Prénom(s) du conjoint
                                        </label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.mariage.conjoint.prenoms}
                                            onChange={e => handleChange('mariage.conjoint.prenoms', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Lien et dates */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Lien de parenté
                                        </label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.mariage.conjoint.genreLienParente}
                                            onChange={e => handleChange('mariage.conjoint.genreLienParente', e.target.value)}
                                        >
                                            <option value="">-- Sélectionnez --</option>
                                            <option value="conjoint">Marié (e)</option>
                                            <option value="conjoint de fait">Conjoint de fait</option>

                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date de naissance du conjoint
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.mariage.conjoint.dateNaissance}
                                            onChange={e => handleChange('mariage.conjoint.dateNaissance', e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Période de l'union */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date de début
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.mariage.conjoint.du}
                                            onChange={e => handleChange('mariage.conjoint.du', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Date de fin (le cas échéant)
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.mariage.conjoint.au}
                                            onChange={e => handleChange('mariage.conjoint.au', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Section Langues */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Langues</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Langue maternelle</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.langues.langueMaternelle}
                                    onChange={e => handleChange('langues.langueMaternelle', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Communiquez-vous en français ou en anglais ?</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.langues.communiqueFrancaisAnglaisDeuxLangues}
                                    onChange={e => handleChange('langues.communiqueFrancaisAnglaisDeuxLangues', e.target.value)}
                                    required
                                >
                                    <option value="">-- Sélectionnez --</option>
                                    <option value="francais">Français</option>
                                    <option value="anglais">Anglais</option>
                                    <option value="lesDeux">Les deux</option>
                                    <option value="aucun">Aucun</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Langue dans laquelle vous êtes le plus à l'aise</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.langues.languePlusAise}
                                    onChange={e => handleChange('langues.languePlusAise', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous passé une évaluation linguistique par un organisme approuvé ?</label>
                                <div className="flex gap-4 mt-1">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            checked={formData.formulaireVisa.langues.evaluationOrganismeApprouve === false}
                                            onChange={() => handleChange('langues.evaluationOrganismeApprouve', false)}
                                            required
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            checked={formData.formulaireVisa.langues.evaluationOrganismeApprouve === true}
                                            onChange={() => handleChange('langues.evaluationOrganismeApprouve', true)}
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Passeport */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Passeport</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de passeport</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.passeport.numero}
                                    onChange={e => handleChange('passeport.numero', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de délivrance</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.passeport.paysDelivrance}
                                    onChange={e => handleChange('passeport.paysDelivrance', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de délivrance</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.passeport.dateDelivrance}
                                    onChange={e => handleChange('passeport.dateDelivrance', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.passeport.dateExpiration}
                                    onChange={e => handleChange('passeport.dateExpiration', e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Passeport délivré par Taïwan avec numéro d'identification ?</label>
                                <div className="flex gap-4 mt-1">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            checked={formData.formulaireVisa.passeport.passeportTaiwanAvecID === false}
                                            onChange={() => handleChange('passeport.passeportTaiwanAvecID', false)}
                                            required
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            checked={formData.formulaireVisa.passeport.passeportTaiwanAvecID === true}
                                            onChange={() => handleChange('passeport.passeportTaiwanAvecID', true)}
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Passeport national israélien ?</label>
                                <div className="flex gap-4 mt-1">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            checked={formData.formulaireVisa.passeport.passeportNationalIsraelien === false}
                                            onChange={() => handleChange('passeport.passeportNationalIsraelien', false)}
                                            required
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            checked={formData.formulaireVisa.passeport.passeportNationalIsraelien === true}
                                            onChange={() => handleChange('passeport.passeportNationalIsraelien', true)}
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Pièce d'identité nationale */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Pièce d'identité nationale</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Possédez-vous une pièce d'identité nationale ?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.pieceIdentiteNationale.possede === false}
                                        onChange={() => handleChange('pieceIdentiteNationale.possede', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.pieceIdentiteNationale.possede === true}
                                        onChange={() => handleChange('pieceIdentiteNationale.possede', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>

                        {formData.formulaireVisa.pieceIdentiteNationale.possede && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de la pièce d'identité</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.pieceIdentiteNationale.numero}
                                        onChange={e => handleChange('pieceIdentiteNationale.numero', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pays de délivrance</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.pieceIdentiteNationale.paysDelivrance}
                                        onChange={e => handleChange('pieceIdentiteNationale.paysDelivrance', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de délivrance</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.pieceIdentiteNationale.dateDelivrance}
                                        onChange={e => handleChange('pieceIdentiteNationale.dateDelivrance', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.pieceIdentiteNationale.dateExpiration}
                                        onChange={e => handleChange('pieceIdentiteNationale.dateExpiration', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Section Carte de résident permanent des USA */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Carte de résident permanent des États-Unis</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Possédez-vous une carte de résident permanent des États-Unis ?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.carteResidentPermanentUSA.possede === false}
                                        onChange={() => handleChange('carteResidentPermanentUSA.possede', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.carteResidentPermanentUSA.possede === true}
                                        onChange={() => handleChange('carteResidentPermanentUSA.possede', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>

                        {formData.formulaireVisa.carteResidentPermanentUSA.possede && (
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de la carte</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.carteResidentPermanentUSA.numero}
                                        onChange={e => handleChange('carteResidentPermanentUSA.numero', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.carteResidentPermanentUSA.dateExpiration}
                                        onChange={e => handleChange('carteResidentPermanentUSA.dateExpiration', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Section Coordonnées */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Coordonnées</h3>

                        <h4 className="text-md font-medium text-gray-800 mb-2">Adresse postale actuelle</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Case postale</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.casePostale}
                                    onChange={e => handleChange('coordonnees.adressePostaleActuelle.casePostale', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Appartement/Unité</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.noAppUnite}
                                    onChange={e => handleChange('coordonnees.adressePostaleActuelle.noAppUnite', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de rue</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.numeroRue}
                                    onChange={e => handleChange('coordonnees.adressePostaleActuelle.numeroRue', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de rue</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.nomRue}
                                    onChange={e => handleChange('coordonnees.adressePostaleActuelle.nomRue', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ville/Village</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.villeVillage}
                                    onChange={e => handleChange('coordonnees.adressePostaleActuelle.villeVillage', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.pays}
                                    onChange={e => handleChange('coordonnees.adressePostaleActuelle.pays', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Province/État</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.provinceEtat}
                                    onChange={e => handleChange('coordonnees.adressePostaleActuelle.provinceEtat', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.codePostal}
                                    onChange={e => handleChange('coordonnees.adressePostaleActuelle.codePostal', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.district}
                                    onChange={e => handleChange('coordonnees.adressePostaleActuelle.district', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Votre adresse domicile est-elle identique à votre adresse postale ?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.coordonnees.adresseDomicile.identiqueAdressePostale === false}
                                        onChange={() => handleChange('coordonnees.adresseDomicile.identiqueAdressePostale', false)}
                                        required
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.coordonnees.adresseDomicile.identiqueAdressePostale === true}
                                        onChange={() => handleChange('coordonnees.adresseDomicile.identiqueAdressePostale', true)}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        {!formData.formulaireVisa.coordonnees.adresseDomicile.identiqueAdressePostale && (
                            <>
                                <h4 className="text-md font-medium text-gray-800 mt-4 mb-2">Adresse domicile</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Appartement/Unité</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.coordonnees.adresseDomicile.noAppUnite}
                                            onChange={e => handleChange('coordonnees.adresseDomicile.noAppUnite', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de rue</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.coordonnees.adresseDomicile.numeroRue}
                                            onChange={e => handleChange('coordonnees.adresseDomicile.numeroRue', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de rue</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.coordonnees.adresseDomicile.nomRue}
                                            onChange={e => handleChange('coordonnees.adresseDomicile.nomRue', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville/Village</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.coordonnees.adresseDomicile.villeVillage}
                                            onChange={e => handleChange('coordonnees.adresseDomicile.villeVillage', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.coordonnees.adresseDomicile.pays}
                                            onChange={e => handleChange('coordonnees.adresseDomicile.pays', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Province/État</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.coordonnees.adresseDomicile.provinceEtat}
                                            onChange={e => handleChange('coordonnees.adresseDomicile.provinceEtat', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.coordonnees.adresseDomicile.codePostal}
                                            onChange={e => handleChange('coordonnees.adresseDomicile.codePostal', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.coordonnees.adresseDomicile.district}
                                            onChange={e => handleChange('coordonnees.adresseDomicile.district', e.target.value)}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <h4 className="text-md font-medium text-gray-800 mt-6 mb-2">Coordonnées téléphoniques</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type de téléphone</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.telephone.type}
                                    onChange={e => handleChange('coordonnees.telephone.type', e.target.value)}
                                    required
                                >
                                    <option value="">-- Sélectionnez --</option>
                                    <option value="domicile">Domicile</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="bureau">Bureau</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif du pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.telephone.indicatifPays}
                                    onChange={e => handleChange('coordonnees.telephone.indicatifPays', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.telephone.numero}
                                    onChange={e => handleChange('coordonnees.telephone.numero', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Poste (si applicable)</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.telephone.poste}
                                    onChange={e => handleChange('coordonnees.telephone.poste', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type d'autre téléphone</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.autreTelephone.type}
                                    onChange={e => handleChange('coordonnees.autreTelephone.type', e.target.value)}
                                >
                                    <option value="">-- Sélectionnez --</option>
                                    <option value="domicile">Domicile</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="bureau">Bureau</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif du pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.autreTelephone.indicatifPays}
                                    onChange={e => handleChange('coordonnees.autreTelephone.indicatifPays', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.autreTelephone.numero}
                                    onChange={e => handleChange('coordonnees.autreTelephone.numero', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Poste (si applicable)</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.autreTelephone.poste}
                                    onChange={e => handleChange('coordonnees.autreTelephone.poste', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type de télécopieur</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.telecopieur.type}
                                    onChange={e => handleChange('coordonnees.telecopieur.type', e.target.value)}
                                >
                                    <option value="">-- Sélectionnez --</option>
                                    <option value="domicile">Domicile</option>
                                    <option value="bureau">Bureau</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif du pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.telecopieur.indicatifPays}
                                    onChange={e => handleChange('coordonnees.telecopieur.indicatifPays', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de télécopieur</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.telecopieur.numero}
                                    onChange={e => handleChange('coordonnees.telecopieur.numero', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Poste (si applicable)</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.telecopieur.poste}
                                    onChange={e => handleChange('coordonnees.telecopieur.poste', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse électronique</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.coordonnees.adresseElectronique}
                                onChange={e => handleChange('coordonnees.adresseElectronique', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Section Visite au Canada */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Visite au Canada</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Objet de la visite</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.visiteCanada.objetVisite}
                                onChange={e => handleChange('visiteCanada.objetVisite', e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionnez --</option>
                                <option value="tourisme">Tourisme</option>
                                <option value="visite">Visite familiale/ami(e)s</option>
                                <option value="affaires">Affaires</option>
                                <option value="etudes">Études</option>
                                <option value="travail">Travail</option>
                                <option value="autre">Autre</option>
                            </select>
                        </div>

                        {formData.formulaireVisa.visiteCanada.objetVisite === "autre" && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Précisez</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.visiteCanada.autre}
                                    onChange={e => handleChange('visiteCanada.autre', e.target.value)}
                                    required
                                />
                            </div>
                        )}
                    </div>



                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Antécédents</h3>

                        {/* Santé */}
                        <div className="mb-6">
                            <h4 className="text-md font-medium text-gray-800 mb-3">Santé</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Avez-vous eu la tuberculose ou tout autre trouble physique ou mental sérieux au cours des dernières années ?
                                    </label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.sante.tuberculoseDernieresAnnees === false}
                                                onChange={() => handleChange('antecedents.sante.tuberculoseDernieresAnnees', false)}
                                                required
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.sante.tuberculoseDernieresAnnees === true}
                                                onChange={() => handleChange('antecedents.sante.tuberculoseDernieresAnnees', true)}
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Avez-vous un trouble physique ou mental qui nécessite des soins sociaux ou médicaux au Canada ?
                                    </label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.sante.troublePhysiqueMental === false}
                                                onChange={() => handleChange('antecedents.sante.troublePhysiqueMental', false)}
                                                required
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.sante.troublePhysiqueMental === true}
                                                onChange={() => handleChange('antecedents.sante.troublePhysiqueMental', true)}
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                    </div>
                                </div>
                                {(formData.formulaireVisa.antecedents.sante.tuberculoseDernieresAnnees ||
                                    formData.formulaireVisa.antecedents.sante.troublePhysiqueMental) && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                            <textarea
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={formData.formulaireVisa.antecedents.sante.details}
                                                onChange={e => handleChange('antecedents.sante.details', e.target.value)}
                                                required
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>

                        {/* Statut au Canada */}
                        <div className="mb-6">
                            <h4 className="text-md font-medium text-gray-800 mb-3">Statut au Canada</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Êtes-vous resté(e) au Canada après l'expiration de votre statut ?
                                    </label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.statutCanada.resteApresExpiration === false}
                                                onChange={() => handleChange('antecedents.statutCanada.resteApresExpiration', false)}
                                                required
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.statutCanada.resteApresExpiration === true}
                                                onChange={() => handleChange('antecedents.statutCanada.resteApresExpiration', true)}
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Avez-vous déjà été refusé(e) un visa ou permis canadien ?
                                    </label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.statutCanada.refusVisaPermis === false}
                                                onChange={() => handleChange('antecedents.statutCanada.refusVisaPermis', false)}
                                                required
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.statutCanada.refusVisaPermis === true}
                                                onChange={() => handleChange('antecedents.statutCanada.refusVisaPermis', true)}
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Avez-vous déjà fait une demande d'entrée au Canada ?
                                    </label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.statutCanada.demandeEntreeCanada === false}
                                                onChange={() => handleChange('antecedents.statutCanada.demandeEntreeCanada', false)}
                                                required
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.statutCanada.demandeEntreeCanada === true}
                                                onChange={() => handleChange('antecedents.statutCanada.demandeEntreeCanada', true)}
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                    </div>
                                </div>
                                {(formData.formulaireVisa.antecedents.statutCanada.resteApresExpiration ||
                                    formData.formulaireVisa.antecedents.statutCanada.refusVisaPermis ||
                                    formData.formulaireVisa.antecedents.statutCanada.demandeEntreeCanada) && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                            <textarea
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={formData.formulaireVisa.antecedents.statutCanada.details}
                                                onChange={e => handleChange('antecedents.statutCanada.details', e.target.value)}
                                                required
                                            />
                                        </div>
                                    )}
                            </div>
                        </div>

                        {/* Infractions pénales */}
                        <div className="mb-6">
                            <h4 className="text-md font-medium text-gray-800 mb-3">Infractions pénales</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Avez-vous déjà commis, été accusé(e) ou condamné(e) pour une infraction pénale ?
                                    </label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.infractionsPenales.commisOuAccuse === false}
                                                onChange={() => handleChange('antecedents.infractionsPenales.commisOuAccuse', false)}
                                                required
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.infractionsPenales.commisOuAccuse === true}
                                                onChange={() => handleChange('antecedents.infractionsPenales.commisOuAccuse', true)}
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                    </div>
                                </div>
                                {formData.formulaireVisa.antecedents.infractionsPenales.commisOuAccuse && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                        <textarea
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.antecedents.infractionsPenales.details}
                                            onChange={e => handleChange('antecedents.infractionsPenales.details', e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Service militaire/police */}
                        <div className="mb-6">
                            <h4 className="text-md font-medium text-gray-800 mb-3">Service militaire ou de police</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Avez-vous déjà fait partie d'un service militaire ou de police ?
                                    </label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.serviceMilitairePolice.aFaitPartie === false}
                                                onChange={() => handleChange('antecedents.serviceMilitairePolice.aFaitPartie', false)}
                                                required
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.serviceMilitairePolice.aFaitPartie === true}
                                                onChange={() => handleChange('antecedents.serviceMilitairePolice.aFaitPartie', true)}
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                    </div>
                                </div>
                                {formData.formulaireVisa.antecedents.serviceMilitairePolice.aFaitPartie && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                        <textarea
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.formulaireVisa.antecedents.serviceMilitairePolice.details}
                                            onChange={e => handleChange('antecedents.serviceMilitairePolice.details', e.target.value)}
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Appartenance à un groupe violent */}
                        <div className="mb-6">
                            <h4 className="text-md font-medium text-gray-800 mb-3">Appartenance à un groupe violent</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Avez-vous déjà été membre ou affilié à un groupe ou organisation qui a commis ou prôné des actes violents ?
                                    </label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.appartenanceGroupeViolent.aEteMembreOuAffilie === false}
                                                onChange={() => handleChange('antecedents.appartenanceGroupeViolent.aEteMembreOuAffilie', false)}
                                                required
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.appartenanceGroupeViolent.aEteMembreOuAffilie === true}
                                                onChange={() => handleChange('antecedents.appartenanceGroupeViolent.aEteMembreOuAffilie', true)}
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Témoignage de mauvais traitements */}
                        <div>
                            <h4 className="text-md font-medium text-gray-800 mb-3">Témoignage de mauvais traitements</h4>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Avez-vous déjà été témoin ou participé à des mauvais traitements ou à des crimes de guerre ?
                                    </label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.temoignageMauvaisTraitements.aEteTemoinOuParticipe === false}
                                                onChange={() => handleChange('antecedents.temoignageMauvaisTraitements.aEteTemoinOuParticipe', false)}
                                                required
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.antecedents.temoignageMauvaisTraitements.aEteTemoinOuParticipe === true}
                                                onChange={() => handleChange('antecedents.temoignageMauvaisTraitements.aEteTemoinOuParticipe', true)}
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Étape 2: Antécédents et historique
        {
            title: "Antécédents et historique",
            component: (
                <div className="space-y-6">
                    {/* Champ Demandeur */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Qui est le demandeur principal ? (cochez toutes les cases applicables)
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    checked={formData.resident.Demandeur.includes('principal')}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setFormData(prev => ({
                                            ...prev,
                                            resident: {
                                                ...prev.resident,
                                                Demandeur: isChecked
                                                    ? [...prev.resident.Demandeur, 'principal']
                                                    : prev.resident.Demandeur.filter(item => item !== 'principal')
                                            }
                                        }));
                                    }}
                                />
                                <span className="ml-2">Demandeur principal</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    checked={formData.resident.Demandeur.includes('conjoint')}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;
                                        setFormData(prev => ({
                                            ...prev,
                                            resident: {
                                                ...prev.resident,
                                                Demandeur: isChecked
                                                    ? [...prev.resident.Demandeur, 'conjoint']
                                                    : prev.resident.Demandeur.filter(item => item !== 'conjoint')
                                            }
                                        }));
                                    }}
                                />
                                <span className="ml-2">Époux/Conjoint ou Enfant (+18 ans) </span>
                            </label>

                        </div>
                    </div>

                    {/* Section Militaire */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Service militaire ou paramilitaire</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous fait partie d'une armée, d'une milice, d'une unité de défense civile, d'un service de renseignement ou d'un corps de police (y compris le service national non obligatoire et les unités de réserve ou volontaires) ?
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

                    {/* Section Témoin */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Témoin de crimes de guerre ou crimes contre l'humanité</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous été témoin de mauvais traitements infligés à des prisonniers ou des civils, ou d'actes de pillage ou de profanation d'édifices religieux, ou avez-vous participé à ces actes ?
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
                                                                    au: "",
                                                                    detail: ""
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
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Details</label>
                                                <textarea
                                                    value={temoin.detail || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.temoin.dev', index, 'detail', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    rows={4}
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
                                        au: "",
                                        detail: ""
                                    })}
                                    className="flex items-center text-primary hover:text-primary-dark"
                                >
                                    <FiPlus className="mr-1" /> Ajouter un témoignage
                                </button>
                            </div>
                        )}
                    </div>



                    {/* Section Affiliation */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Appartenance ou affiliation à des organisations</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Êtes-vous, ou avez-vous déjà été, membre ou affilié d’un parti politique ou d’un autre groupe ou d’une autre organisation qui ont utilisé ou prôné la violence dans le but d’atteindre un objectif politique ou religieux, ou qui ont déjà été impliqués dans des activités criminelles ? N’utilisez pas d’abréviations.
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
                                                                    Province: "",
                                                                    du: "",
                                                                    au: "",
                                                                    nomOrganisation: "",
                                                                    poste: ""
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
                                                <label className="block text-sm font-medium text-gray-700">Poste occupés au sein de l'organisation</label>
                                                <input
                                                    value={affiliation.poste || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.affiliation.dev', index, 'poste', e.target.value)}
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
                                        Province: "",
                                        du: "",
                                        au: "",
                                        nomOrganisation: "",
                                        poste: ""
                                    })}
                                    className="flex items-center text-primary hover:text-primary-dark"
                                >
                                    <FiPlus className="mr-1" /> Ajouter une affiliation
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Section Charges */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Charges publiques officielles</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                AAvez-vous déjà occupé une charge publique (telle que fonctionnaire, juge, policier, maire, député, administrateur d’hôpital) ? N’utilisez pas d’abréviations.
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
                                                                    sphere: "",
                                                                    direction: "",
                                                                    du: "",
                                                                    au: "",
                                                                    activite: ""
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
                                                <label className="block text-sm font-medium text-gray-700">Pays et sphere de compétence</label>
                                                <input
                                                    value={charge.sphere || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.charges.dev', index, 'sphere', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Direction</label>
                                                <input
                                                    value={charge.direction || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.charges.dev', index, 'direction', e.target.value)}
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
                                                <label className="block text-sm font-medium text-gray-700">Activitées et ou / Postes occupés</label>
                                                <input
                                                    value={charge.activite || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.charges.dev', index, 'activite', e.target.value)}
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
                                        sphere: "",
                                        direction: "",
                                        du: "",
                                        au: "",
                                        activite: ""
                                    })}
                                    className="flex items-center text-primary hover:text-primary-dark"
                                >
                                    <FiPlus className="mr-1" /> Ajouter une charge
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Section Voyages */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Voyage précédente</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Depuis l’âge de 18 ans ou au cours des cinq dernières années, selon la plus récente, avez-vous voyagé vers un pays ou territoire autre que le pays de votre nationalité ou votre pays ou territoire de résidence actuel ?
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
                                                                    but: "",
                                                                    du: "",
                                                                    au: "",

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
                                                <label className="block text-sm font-medium text-gray-700">But du voyage</label>
                                                <input
                                                    value={refus.but || ''}
                                                    onChange={(e) => handleArrayChange('resident', 'body.voyages.dev', index, 'but', e.target.value)}
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
                                        but: "",
                                        du: "",
                                        au: "",
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
                    {/* Section Type de demande */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Type de demande</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="visiteur"
                                    name="typeDemande"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.familyInfo.typeDemande === 'Visiteur'}
                                    onChange={() => setFormData(prev => ({
                                        ...prev,
                                        familyInfo: {
                                            ...prev.familyInfo,
                                            typeDemande: 'Visiteur'
                                        }
                                    }))}
                                />
                                <label htmlFor="visiteur" className="ml-3 block text-sm font-medium text-gray-700">
                                    Visiteur
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="travailleur"
                                    name="typeDemande"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.familyInfo.typeDemande === 'Travailleur'}
                                    onChange={() => setFormData(prev => ({
                                        ...prev,
                                        familyInfo: {
                                            ...prev.familyInfo,
                                            typeDemande: 'Travailleur'
                                        }
                                    }))}
                                />
                                <label htmlFor="travailleur" className="ml-3 block text-sm font-medium text-gray-700">
                                    Travailleur
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="etudiant"
                                    name="typeDemande"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.familyInfo.typeDemande === 'Etudiant'}
                                    onChange={() => setFormData(prev => ({
                                        ...prev,
                                        familyInfo: {
                                            ...prev.familyInfo,
                                            typeDemande: 'Etudiant'
                                        }
                                    }))}
                                />
                                <label htmlFor="etudiant" className="ml-3 block text-sm font-medium text-gray-700">
                                    Étudiant
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="autre"
                                    name="typeDemande"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.familyInfo.typeDemande === 'Autre'}
                                    onChange={() => setFormData(prev => ({
                                        ...prev,
                                        familyInfo: {
                                            ...prev.familyInfo,
                                            typeDemande: 'Autre'
                                        }
                                    }))}
                                />
                                <label htmlFor="autre" className="ml-3 block text-sm font-medium text-gray-700">
                                    Autre
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Section Demandeur principal */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Informations sur le demandeur principal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.name}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        familyInfo: {
                                            ...prev.familyInfo,
                                            applicant: {
                                                ...prev.familyInfo.applicant,
                                                name: e.target.value
                                            }
                                        }
                                    }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.dob}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        familyInfo: {
                                            ...prev.familyInfo,
                                            applicant: {
                                                ...prev.familyInfo.applicant,
                                                dob: e.target.value
                                            }
                                        }
                                    }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.country}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        familyInfo: {
                                            ...prev.familyInfo,
                                            applicant: {
                                                ...prev.familyInfo.applicant,
                                                country: e.target.value
                                            }
                                        }
                                    }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.occupation}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        familyInfo: {
                                            ...prev.familyInfo,
                                            applicant: {
                                                ...prev.familyInfo.applicant,
                                                occupation: e.target.value
                                            }
                                        }
                                    }))}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.maritalStatus}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        familyInfo: {
                                            ...prev.familyInfo,
                                            applicant: {
                                                ...prev.familyInfo.applicant,
                                                maritalStatus: e.target.value
                                            }
                                        }
                                    }))}
                                    required
                                >
                                    <option value="">-- Sélectionnez --</option>
                                    <option value="celibataire">Célibataire</option>
                                    <option value="conjoint">Conjoint (e) de fait</option>
                                    <option value="marie">Marié(e)</option>
                                    <option value="annule">Mariage annulé</option>
                                    <option value="divorce">Divorcé(e)</option>
                                    <option value="separe">Séparé (e) légalement</option>
                                    <option value="veuf">Veuf (ve)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.familyInfo.applicant.address}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        familyInfo: {
                                            ...prev.familyInfo,
                                            applicant: {
                                                ...prev.familyInfo.applicant,
                                                address: e.target.value
                                            }
                                        }
                                    }))}
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
                                            onChange={() => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    applicant: {
                                                        ...prev.familyInfo.applicant,
                                                        coming: true
                                                    }
                                                }
                                            }))}
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            checked={formData.familyInfo.applicant.coming === false}
                                            onChange={() => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    applicant: {
                                                        ...prev.familyInfo.applicant,
                                                        coming: false
                                                    }
                                                }
                                            }))}
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Époux/Conjoint */}
                    {(formData.familyInfo.applicant.maritalStatus === "marie" ||
                        formData.familyInfo.applicant.maritalStatus === "divorce" ||
                        formData.familyInfo.applicant.maritalStatus === "veuf") && (
                            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations sur l'époux/conjoint</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.epouse.name}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    epouse: {
                                                        ...prev.familyInfo.epouse,
                                                        name: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.epouse.dob}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    epouse: {
                                                        ...prev.familyInfo.epouse,
                                                        dob: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.epouse.country}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    epouse: {
                                                        ...prev.familyInfo.epouse,
                                                        country: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.epouse.occupation}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    epouse: {
                                                        ...prev.familyInfo.epouse,
                                                        occupation: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial</label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.epouse.maritalStatus}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    epouse: {
                                                        ...prev.familyInfo.epouse,
                                                        maritalStatus: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        >
                                            <option value="">-- Sélectionnez --</option>
                                            <option value="celibataire">Célibataire</option>
                                            <option value="conjoint">Conjoint (e) de fait</option>
                                            <option value="marie">Marié(e)</option>
                                            <option value="annule">Mariage annulé</option>
                                            <option value="divorce">Divorcé(e)</option>
                                            <option value="separe">Séparé (e) légalement</option>
                                            <option value="veuf">Veuf (ve)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.epouse.address}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    epouse: {
                                                        ...prev.familyInfo.epouse,
                                                        address: e.target.value
                                                    }
                                                }
                                            }))}
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
                                                    onChange={() => setFormData(prev => ({
                                                        ...prev,
                                                        familyInfo: {
                                                            ...prev.familyInfo,
                                                            epouse: {
                                                                ...prev.familyInfo.epouse,
                                                                coming: true
                                                            }
                                                        }
                                                    }))}
                                                />
                                                <span className="ml-2">Oui</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                    checked={formData.familyInfo.epouse.coming === false}
                                                    onChange={() => setFormData(prev => ({
                                                        ...prev,
                                                        familyInfo: {
                                                            ...prev.familyInfo,
                                                            epouse: {
                                                                ...prev.familyInfo.epouse,
                                                                coming: false
                                                            }
                                                        }
                                                    }))}
                                                />
                                                <span className="ml-2">Non</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    {/* Section Parents */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Parents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Père */}
                            <div>
                                <h4 className="text-md font-medium text-gray-800 mb-3">Père</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.father.name}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    father: {
                                                        ...prev.familyInfo.father,
                                                        name: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.father.dob}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    father: {
                                                        ...prev.familyInfo.father,
                                                        dob: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.father.country}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    father: {
                                                        ...prev.familyInfo.father,
                                                        country: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.father.occupation}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    father: {
                                                        ...prev.familyInfo.father,
                                                        occupation: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial</label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.father.maritalStatus}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    father: {
                                                        ...prev.familyInfo.father,
                                                        maritalStatus: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        >
                                            <option value="">-- Sélectionnez --</option>
                                            <option value="celibataire">Célibataire</option>
                                            <option value="conjoint">Conjoint (e) de fait</option>
                                            <option value="marie">Marié(e)</option>
                                            <option value="annule">Mariage annulé</option>
                                            <option value="divorce">Divorcé(e)</option>
                                            <option value="separe">Séparé (e) légalement</option>
                                            <option value="veuf">Veuf (ve)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.father.address}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    father: {
                                                        ...prev.familyInfo.father,
                                                        address: e.target.value
                                                    }
                                                }
                                            }))}
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
                                                    onChange={() => setFormData(prev => ({
                                                        ...prev,
                                                        familyInfo: {
                                                            ...prev.familyInfo,
                                                            father: {
                                                                ...prev.familyInfo.father,
                                                                coming: true
                                                            }
                                                        }
                                                    }))}
                                                />
                                                <span className="ml-2">Oui</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                    checked={formData.familyInfo.father.coming === false}
                                                    onChange={() => setFormData(prev => ({
                                                        ...prev,
                                                        familyInfo: {
                                                            ...prev.familyInfo,
                                                            father: {
                                                                ...prev.familyInfo.father,
                                                                coming: false
                                                            }
                                                        }
                                                    }))}
                                                />
                                                <span className="ml-2">Non</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mère */}
                            <div>
                                <h4 className="text-md font-medium text-gray-800 mb-3">Mère</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.mother.name}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    mother: {
                                                        ...prev.familyInfo.mother,
                                                        name: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.mother.dob}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    mother: {
                                                        ...prev.familyInfo.mother,
                                                        dob: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.mother.country}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    mother: {
                                                        ...prev.familyInfo.mother,
                                                        country: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.mother.occupation}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    mother: {
                                                        ...prev.familyInfo.mother,
                                                        occupation: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial</label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.mother.maritalStatus}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    mother: {
                                                        ...prev.familyInfo.mother,
                                                        maritalStatus: e.target.value
                                                    }
                                                }
                                            }))}
                                            required
                                        >
                                            <option value="">-- Sélectionnez --</option>
                                            <option value="celibataire">Célibataire</option>
                                            <option value="conjoint">Conjoint (e) de fait</option>
                                            <option value="marie">Marié(e)</option>
                                            <option value="annule">Mariage annulé</option>
                                            <option value="divorce">Divorcé(e)</option>
                                            <option value="separe">Séparé (e) légalement</option>
                                            <option value="veuf">Veuf (ve)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.familyInfo.mother.address}
                                            onChange={e => setFormData(prev => ({
                                                ...prev,
                                                familyInfo: {
                                                    ...prev.familyInfo,
                                                    mother: {
                                                        ...prev.familyInfo.mother,
                                                        address: e.target.value
                                                    }
                                                }
                                            }))}
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
                                                    onChange={() => setFormData(prev => ({
                                                        ...prev,
                                                        familyInfo: {
                                                            ...prev.familyInfo,
                                                            mother: {
                                                                ...prev.familyInfo.mother,
                                                                coming: true
                                                            }
                                                        }
                                                    }))}
                                                />
                                                <span className="ml-2">Oui</span>
                                            </label>
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                    checked={formData.familyInfo.mother.coming === false}
                                                    onChange={() => setFormData(prev => ({
                                                        ...prev,
                                                        familyInfo: {
                                                            ...prev.familyInfo,
                                                            mother: {
                                                                ...prev.familyInfo.mother,
                                                                coming: false
                                                            }
                                                        }
                                                    }))}
                                                />
                                                <span className="ml-2">Non</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Enfants */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Enfants</h3>
                            <button
                                type="button"
                                onClick={() => addArrayEntry('familyInfo', 'children', {
                                    name: '',
                                    dob: '',
                                    country: '',
                                    maritalStatus: '',
                                    coming: false,
                                    occupation: '',
                                    address: ""
                                })}
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
                                                <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial</label>
                                                <select
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={child.maritalStatus || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'children', index, 'maritalStatus', e.target.value)}
                                                    required
                                                >
                                                    <option value="">-- Sélectionnez --</option>
                                                    <option value="celibataire">Célibataire</option>
                                                    <option value="conjoint">Conjoint (e) de fait</option>
                                                    <option value="marie">Marié(e)</option>
                                                    <option value="annule">Mariage annulé</option>
                                                    <option value="divorce">Divorcé(e)</option>
                                                    <option value="separe">Séparé (e) légalement</option>
                                                    <option value="veuf">Veuf (ve)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={child.occupation || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'children', index, 'occupation', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={child.address || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'children', index, 'address', e.target.value)}
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

                    {/* Section Frères et sœurs */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Frères et sœurs</h3>
                            <button
                                type="button"
                                onClick={() => addArrayEntry('familyInfo', 'siblings', {
                                    name: '',
                                    dob: '',
                                    country: '',
                                    maritalStatus: '',
                                    coming: false,
                                    profession: '',
                                    address: ""
                                })}
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
                                                <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial</label>
                                                <select
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={sibling.maritalStatus || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'siblings', index, 'maritalStatus', e.target.value)}
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
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={sibling.occupation || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'siblings', index, 'occupation', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={sibling.address || ''}
                                                    onChange={(e) => handleArrayChange('familyInfo', 'siblings', index, 'address', e.target.value)}
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
                                                <FiTrash2 className="mr-1" /> Supprimer </button>
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
                                    // Ne pas afficher si le document a une condition et que la réponse est 'non'
                                    if (doc.condition && doc.condition.response === 'non') {
                                        return null;
                                    }

                                    // Afficher tous les autres documents (sans condition ou avec condition 'oui')
                                    return (
                                        <FileUpload
                                            key={docIndex}
                                            sectionIndex={sectionIndex}
                                            docIndex={docIndex}
                                            label={doc.titre}
                                            required={doc.required && (!doc.condition || doc.condition.response === 'oui')}
                                            specifications={doc.specifications}
                                            period={doc.period}
                                            condition={doc.condition}
                                            onConditionChange={handleConditionChange}
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