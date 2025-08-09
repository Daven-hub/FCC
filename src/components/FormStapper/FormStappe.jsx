import React, { useState } from 'react';
import { FiCheck, FiX, FiPlus, FiTrash2, FiUpload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { submitCombinedApplication } from '../../services/annexeSrvice';

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
            voyages: 'non',
            detailsVoyages: [{}],
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
        background: {
            tuberculoseContact: 'non',
            troublePhysiqueMental: 'non',
            detailsTuberculoseTrouble: '',
            statutExpire: 'non',
            refusEntree: 'non',
            demandePrecedenteCanada: 'non',
            detailsStatutRefusDemande: '',
            antecedentsJudiciaires: 'non',
            detailsAntecedentsJudiciaires: '',
            serviceMilitaire: 'Non',
            temoinViolations: 'Non',
            affiliationOrganisation: 'Non',
            chargePublique: 'Non',
            detailsService: [{}],
            detailsViolations: [{}],
            detailsAffiliation: [{}],
            detailsCharges: [{}],
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
        documents: {
            identite: {
                acteNaissance: { provided: false, file: null },
                passeport: { provided: false, file: null },
                acteMariage: { provided: false, file: null },
                photo: { provided: false, file: null },
                cni: { provided: false, file: null }
            },
            preuvesFonds: {
                documentsEntreprise: { provided: false, file: null },
                relevesBancairesEntreprise: { provided: false, file: null },
                relevesBancairesPersonnels: { provided: false, file: null }
            },
            autres: {
                visaAnterieur: { provided: false, file: null },
                assuranceVoyage: { provided: false, file: null },
                reservationHotel: { provided: false, file: null },
                billetsAvion: { provided: false, file: null }
            },
            avertissements: {
                refusVisaCanada: { provided: false, file: null },
                demandeVisaEnCours: { provided: false, file: null },
                titreSejourEtranger: { provided: false, file: null }
            }
        },

        declarationAgreed: false
    });

    const [submitStatus, setSubmitStatus] = useState(null);
    const [uploadProgress, setUploadProgress] = useState({});

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

    const handleArrayChange = (section, arrayName, index, field, value) => {
        setFormData(prev => {
            const newArray = [...prev[section][arrayName]];
            if (!newArray[index]) newArray[index] = {};
            newArray[index][field] = value;
            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [arrayName]: newArray
                }
            };
        });
    };

    const addArrayEntry = (section, arrayName, defaultValue = {}) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [arrayName]: [...prev[section][arrayName], defaultValue]
            }
        }));
    };

    const removeArrayEntry = (section, arrayName, index) => {
        setFormData(prev => {
            const newArray = [...prev[section][arrayName]];
            newArray.splice(index, 1);
            return {
                ...prev,
                [section]: {
                    ...prev[section],
                    [arrayName]: newArray
                }
            };
        });
    };

    const handleFileUpload = (category, document, file) => {
        if (!file) return;

        if (file.size > 4 * 1024 * 1024) {
            alert('La taille maximale du fichier est de 4MB');
            return;
        }

        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            alert('Seuls les fichiers PDF, JPEG et PNG sont acceptés');
            return;
        }

        // Simuler la progression de l'upload
        setUploadProgress(prev => ({
            ...prev,
            [`${category}-${document}`]: 0
        }));

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                const newProgress = prev[`${category}-${document}`] + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    return {
                        ...prev,
                        [`${category}-${document}`]: undefined
                    };
                }
                return {
                    ...prev,
                    [`${category}-${document}`]: newProgress
                };
            });
        }, 200);

        setFormData(prev => ({
            ...prev,
            documents: {
                ...prev.documents,
                [category]: {
                    ...prev.documents[category],
                    [document]: {
                        provided: true,
                        file: file,
                        name: file.name,
                        size: file.size,
                        type: file.type
                    }
                }
            }
        }));
    };

    const handleRemoveFile = (category, document) => {
        setFormData(prev => ({
            ...prev,
            documents: {
                ...prev.documents,
                [category]: {
                    ...prev.documents[category],
                    [document]: { provided: false, file: null }
                }
            }
        }));
    };

    const nextStep = () => {
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
            // Simuler un délai d'envoi
            await new Promise(resolve => setTimeout(resolve, 2000));
            await submitCombinedApplication(formData);
            setSubmitStatus("success");
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("error");
        }
    };

    const FileUpload = ({ category, document, label, required = false }) => {
        const docState = formData.documents[category][document];
        const progress = uploadProgress[`${category}-${document}`];

        return (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-gray-700">
                        {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    {docState.provided ? (
                        <span className="flex items-center text-green-600">
                            <FiCheck className="mr-1" /> Fourni
                        </span>
                    ) : (
                        <span className="text-gray-500">Manquant</span>
                    )}
                </div>

                {docState.provided ? (
                    <div className="flex justify-between items-center bg-white p-3 rounded border border-green-100">
                        <div>
                            <p className="font-medium">{docState.file.name}</p>
                            <p className="text-sm text-gray-500">
                                {(docState.file.size / 1024).toFixed(1)} KB - {docState.file.type}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveFile(category, document)}
                            className="text-red-500 hover:text-red-700 p-1"
                        >
                            <FiTrash2 />
                        </button>
                    </div>
                ) : (
                    <div className="relative">
                        {progress !== undefined ? (
                            <div className="bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500">
                                    <span className="font-medium text-blue-600">Cliquer pour uploader</span> ou glisser-déposer
                                </p>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={(e) => handleFileUpload(category, document, e.target.files[0])}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    required={required}
                                />
                            </label>
                        )}
                    </div>
                )}
            </div>
        );
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
                                    checked={formData.personalInfo.voyages === 'Non'}
                                    onChange={() => handleChange('personalInfo', 'voyages', 'Non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.personalInfo.voyages === 'Oui'}
                                    onChange={() => handleChange('personalInfo', 'voyages', 'Oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.personalInfo.voyages === 'Oui' && (
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
                                        {formData.personalInfo.detailsVoyages.map((voyage, index) => (
                                            <tr key={`desktop-${index}`}>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.pays || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'detailsVoyages', index, 'pays', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.dateDebut || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'detailsVoyages', index, 'dateDebut', e.target.value)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.dateFin || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'detailsVoyages', index, 'dateFin', e.target.value)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.endroit || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'detailsVoyages', index, 'endroit', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.but || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'detailsVoyages', index, 'but', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeArrayEntry('personalInfo', 'detailsVoyages', index)}
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
                                {formData.personalInfo.detailsVoyages.map((voyage, index) => (
                                    <div key={`mobile-${index}`} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                <input
                                                    value={voyage.pays || ''}
                                                    onChange={(e) => handleArrayChange('personalInfo', 'detailsVoyages', index, 'pays', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        value={voyage.dateDebut || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'detailsVoyages', index, 'dateDebut', e.target.value)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        value={voyage.dateFin || ''}
                                                        onChange={(e) => handleArrayChange('personalInfo', 'detailsVoyages', index, 'dateFin', e.target.value)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Endroit</label>
                                                <input
                                                    value={voyage.endroit || ''}
                                                    onChange={(e) => handleArrayChange('personalInfo', 'detailsVoyages', index, 'endroit', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">But du voyage</label>
                                                <input
                                                    value={voyage.but || ''}
                                                    onChange={(e) => handleArrayChange('personalInfo', 'detailsVoyages', index, 'but', e.target.value)}
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => removeArrayEntry('personalInfo', 'detailsVoyages', index)}
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
                                onClick={() => addArrayEntry('personalInfo', 'detailsVoyages')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FiPlus className="mr-2" /> Ajouter un voyage
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous été en contact étroit avec une personne atteinte de tuberculose ou avez-vous un trouble physique ou mental qui pourrait constituer un danger pour la santé ou la sécurité publiques ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.tuberculoseContact === 'non'}
                                    onChange={() => handleChange('background', 'tuberculoseContact', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.tuberculoseContact === 'oui'}
                                    onChange={() => handleChange('background', 'tuberculoseContact', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                        {formData.background.tuberculoseContact === "oui" && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    value={formData.background.detailsTuberculoseTrouble}
                                    onChange={e => handleChange('background', 'detailsTuberculoseTrouble', e.target.value)}
                                    required
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà eu un statut d'immigration ou de résidence temporaire au Canada qui a expiré et vous avez continué à rester au Canada ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.statutExpire === 'non'}
                                    onChange={() => handleChange('background', 'statutExpire', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.statutExpire === 'oui'}
                                    onChange={() => handleChange('background', 'statutExpire', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà été refusé l'entrée au Canada ou fait l'objet d'une ordonnance de renvoi ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.refusEntree === 'non'}
                                    onChange={() => handleChange('background', 'refusEntree', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.refusEntree === 'oui'}
                                    onChange={() => handleChange('background', 'refusEntree', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà fait une demande de visa, permis ou statut de résidence permanent pour le Canada ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.demandePrecedenteCanada === 'non'}
                                    onChange={() => handleChange('background', 'demandePrecedenteCanada', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.demandePrecedenteCanada === 'oui'}
                                    onChange={() => handleChange('background', 'demandePrecedenteCanada', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {(formData.background.statutExpire === "oui" || formData.background.refusEntree === "oui" || formData.background.demandePrecedenteCanada === "oui") && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                value={formData.background.detailsStatutRefusDemande}
                                onChange={e => handleChange('background', 'detailsStatutRefusDemande', e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous des antécédents judiciaires dans n'importe quel pays, y compris des condamnations, des accusations en cours ou des enquêtes criminelles ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.antecedentsJudiciaires === 'non'}
                                    onChange={() => handleChange('background', 'antecedentsJudiciaires', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.antecedentsJudiciaires === 'oui'}
                                    onChange={() => handleChange('background', 'antecedentsJudiciaires', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                        {formData.background.antecedentsJudiciaires === "oui" && (
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                    value={formData.background.detailsAntecedentsJudiciaires}
                                    onChange={e => handleChange('background', 'detailsAntecedentsJudiciaires', e.target.value)}
                                    required
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà servi dans l'armée, une unité de milice, une organisation de police ou de sécurité dans n'importe quel pays ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.serviceMilitaire === 'Non'}
                                    onChange={() => handleChange('background', 'serviceMilitaire', 'Non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.serviceMilitaire === 'Oui'}
                                    onChange={() => handleChange('background', 'serviceMilitaire', 'Oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.background.serviceMilitaire === "Oui" && (
                        <div className="mt-4 space-y-4">
                            {formData.background.detailsService.map((service, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Pays</label>
                                            <input
                                                value={service.pays || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsService', index, 'pays', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Organisation</label>
                                            <input
                                                value={service.organisation || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsService', index, 'organisation', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">De (MM/AAAA)</label>
                                            <input
                                                value={service.de || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsService', index, 'de', e.target.value)}
                                                placeholder="MM/AAAA"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">À (MM/AAAA)</label>
                                            <input
                                                value={service.a || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsService', index, 'a', e.target.value)}
                                                placeholder="MM/AAAA"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            onClick={() => removeArrayEntry('background', 'detailsService', index)}
                                            className="text-red-500 hover:text-red-700 flex items-center"
                                        >
                                            <FiTrash2 className="mr-1" /> Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayEntry('background', 'detailsService')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FiPlus className="mr-2" /> Ajouter un service
                            </button>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà été témoin ou impliqué dans des violations des droits de la personne ou des crimes de guerre ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.temoinViolations === 'Non'}
                                    onChange={() => handleChange('background', 'temoinViolations', 'Non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.temoinViolations === 'Oui'}
                                    onChange={() => handleChange('background', 'temoinViolations', 'Oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.background.temoinViolations === "Oui" && (
                        <div className="mt-4 space-y-4">
                            {formData.background.detailsViolations.map((violation, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Détails</label>
                                        <textarea
                                            value={violation.details || ''}
                                            onChange={(e) => handleArrayChange('background', 'detailsViolations', index, 'details', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            onClick={() => removeArrayEntry('background', 'detailsViolations', index)}
                                            className="text-red-500 hover:text-red-700 flex items-center"
                                        >
                                            <FiTrash2 className="mr-1" /> Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayEntry('background', 'detailsViolations')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FiPlus className="mr-2" /> Ajouter des détails
                            </button>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà été membre ou affilié à une organisation ou association qui a utilisé la violence pour atteindre ses objectifs ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.affiliationOrganisation === 'Non'}
                                    onChange={() => handleChange('background', 'affiliationOrganisation', 'Non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.affiliationOrganisation === 'Oui'}
                                    onChange={() => handleChange('background', 'affiliationOrganisation', 'Oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.background.affiliationOrganisation === "Oui" && (
                        <div className="mt-4 space-y-4">
                            {formData.background.detailsAffiliation.map((affiliation, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Nom de l'organisation</label>
                                            <input
                                                value={affiliation.nom || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsAffiliation', index, 'nom', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Pays</label>
                                            <input
                                                value={affiliation.pays || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsAffiliation', index, 'pays', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">De (MM/AAAA)</label>
                                            <input
                                                value={affiliation.de || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsAffiliation', index, 'de', e.target.value)}
                                                placeholder="MM/AAAA"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">À (MM/AAAA)</label>
                                            <input
                                                value={affiliation.a || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsAffiliation', index, 'a', e.target.value)}
                                                placeholder="MM/AAAA"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-gray-700">Nature de l'affiliation</label>
                                        <textarea
                                            value={affiliation.nature || ''}
                                            onChange={(e) => handleArrayChange('background', 'detailsAffiliation', index, 'nature', e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                            rows={2}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            onClick={() => removeArrayEntry('background', 'detailsAffiliation', index)}
                                            className="text-red-500 hover:text-red-700 flex items-center"
                                        >
                                            <FiTrash2 className="mr-1" /> Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayEntry('background', 'detailsAffiliation')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FiPlus className="mr-2" /> Ajouter une affiliation
                            </button>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà occupé un poste gouvernemental ou une charge publique ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.chargePublique === 'Non'}
                                    onChange={() => handleChange('background', 'chargePublique', 'Non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.background.chargePublique === 'Oui'}
                                    onChange={() => handleChange('background', 'chargePublique', 'Oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.background.chargePublique === "Oui" && (
                        <div className="mt-4 space-y-4">
                            {formData.background.detailsCharges.map((charge, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Poste occupé</label>
                                            <input
                                                value={charge.poste || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsCharges', index, 'poste', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Pays</label>
                                            <input
                                                value={charge.pays || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsCharges', index, 'pays', e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">De (MM/AAAA)</label>
                                            <input
                                                value={charge.de || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsCharges', index, 'de', e.target.value)}
                                                placeholder="MM/AAAA"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">À (MM/AAAA)</label>
                                            <input
                                                value={charge.a || ''}
                                                onChange={(e) => handleArrayChange('background', 'detailsCharges', index, 'a', e.target.value)}
                                                placeholder="MM/AAAA"
                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-2">
                                        <button
                                            type="button"
                                            onClick={() => removeArrayEntry('background', 'detailsCharges', index)}
                                            className="text-red-500 hover:text-red-700 flex items-center"
                                        >
                                            <FiTrash2 className="mr-1" /> Supprimer
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addArrayEntry('background', 'detailsCharges')}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FiPlus className="mr-2" /> Ajouter un poste
                            </button>
                        </div>
                    )}
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
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Documents d'identité</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FileUpload
                                category="identite"
                                document="acteNaissance"
                                label="Acte de naissance"
                                required
                            />
                            <FileUpload
                                category="identite"
                                document="passeport"
                                label="Passeport (pages avec photo et informations)"
                                required
                            />
                            {(formData.personalInfo.etatMatrimonial === "marie" || formData.personalInfo.etatMatrimonial === "union") && (
                                <FileUpload
                                    category="identite"
                                    document="acteMariage"
                                    label="Acte de mariage ou preuve d'union"
                                    required
                                />
                            )}
                            <FileUpload
                                category="identite"
                                document="photo"
                                label="Photo d'identité récente"
                                required
                            />
                            <FileUpload
                                category="identite"
                                document="cni"
                                label="Carte nationale d'identité (si disponible)"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Preuves de fonds</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FileUpload
                                category="preuvesFonds"
                                document="documentsEntreprise"
                                label="Documents d'entreprise (si indépendant)"
                            />
                            <FileUpload
                                category="preuvesFonds"
                                document="relevesBancairesEntreprise"
                                label="Relevés bancaires d'entreprise (3 derniers mois)"
                            />
                            <FileUpload
                                category="preuvesFonds"
                                document="relevesBancairesPersonnels"
                                label="Relevés bancaires personnels (3 derniers mois)"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Autres documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FileUpload
                                category="autres"
                                document="visaAnterieur"
                                label="Visa canadien antérieur (si applicable)"
                            />
                            <FileUpload
                                category="autres"
                                document="assuranceVoyage"
                                label="Preuve d'assurance voyage"
                            />
                            <FileUpload
                                category="autres"
                                document="reservationHotel"
                                label="Réservation d'hôtel ou hébergement"
                            />
                            <FileUpload
                                category="autres"
                                document="billetsAvion"
                                label="Billets d'avion (si déjà réservés)"
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Avertissements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.background.refusEntree === "oui" && (
                                <FileUpload
                                    category="avertissements"
                                    document="refusVisaCanada"
                                    label="Document de refus de visa canadien (si applicable)"
                                />
                            )}
                            <FileUpload
                                category="avertissements"
                                document="demandeVisaEnCours"
                                label="Preuve de demande de visa en cours dans un autre pays (si applicable)"
                            />
                            <FileUpload
                                category="avertissements"
                                document="titreSejourEtranger"
                                label="Titre de séjour étranger (si applicable)"
                            />
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">Instructions pour les documents</h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Tous les documents doivent être en format PDF, JPG, JPEG ou PNG</li>
                                        <li>Taille maximale par fichier : 3.8MB</li>
                                        <li>Les documents dans d'autres langues que le français ou l'anglais doivent être accompagnés d'une traduction certifiée</li>
                                        <li>Les scans doivent être clairs et lisibles</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Déclaration",
            component: (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Déclaration et consentement</h3>

                        <div className="prose prose-sm text-gray-700 mb-6">
                            <p>Je déclare par la présente que :</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Les renseignements fournis dans cette demande sont exacts et complets.</li>
                                <li>J'ai lu et compris les questions et les instructions.</li>
                                <li>Je comprends que le fait de faire une déclaration fausse ou trompeuse constitue une infraction en vertu de la Loi sur l'immigration et la protection des réfugiés.</li>
                                <li>Je comprends que tous les renseignements fournis dans le cadre de cette demande peuvent être vérifiés.</li>
                                <li>Je consens à ce que les renseignements fournis soient partagés avec les organismes gouvernementaux concernés à des fins de vérification.</li>
                                <li>Je comprends que le traitement de ma demande peut être retardé si je ne fournis pas tous les documents requis.</li>
                            </ul>
                            <p className="mt-4">Je comprends également que des frais de traitement non remboursables s'appliquent et que le paiement de ces frais ne garantit pas l'approbation de ma demande.</p>
                        </div>

                        <div className="mt-6">
                            <label className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        type="checkbox"
                                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                        checked={formData.declarationAgreed}
                                        onChange={e => setFormData(prev => ({ ...prev, declarationAgreed: e.target.checked }))}
                                        required
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <span className="font-medium text-gray-700">Je certifie que j'ai lu et compris la déclaration ci-dessus et que toutes les informations fournies sont exactes et complètes.</span>
                                    <span className="text-red-500">*</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Section Aperçu */}
                    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Aperçu de votre demande</h3>
                            <button
                                type="button"
                                onClick={() => setShowPreview(!showPreview)}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                {showPreview ? (
                                    <>
                                        <FiX className="mr-1" /> Masquer
                                    </>
                                ) : (
                                    <>
                                        <FiPlus className="mr-1" /> Afficher
                                    </>
                                )}
                            </button>
                        </div>

                        {showPreview && (
                            <div className="mt-4 space-y-6">
                                {/* Informations personnelles */}
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="text-md font-medium text-gray-800 mb-3">1. Informations personnelles</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Nom complet</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {formData.personalInfo.nomFamille} {formData.personalInfo.prenoms}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Date de naissance</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {formData.personalInfo.dateNaissance}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {formData.personalInfo.email}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Téléphone</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {formData.personalInfo.numeroTelephone}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Adresse</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {formData.personalInfo.adressePostale}, {formData.personalInfo.villePostale}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Antécédents */}
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="text-md font-medium text-gray-800 mb-3">2. Antécédents et historique</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Demande précédente au Canada</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {formData.background.demandePrecedenteCanada === 'oui' ? 'Oui' : 'Non'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Antécédents judiciaires</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {formData.background.antecedentsJudiciaires === 'oui' ? 'Oui' : 'Non'}
                                            </p>
                                        </div>
                                        {formData.background.serviceMilitaire === 'Oui' && (
                                            <div className="col-span-2">
                                                <p className="text-sm text-gray-500">Service militaire</p>
                                                <div className="mt-1 space-y-2">
                                                    {formData.background.detailsService.map((service, index) => (
                                                        <div key={index} className="text-sm font-medium text-gray-900">
                                                            {service.organisation} ({service.pays}) - {service.de} à {service.a}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Informations familiales */}
                                <div className="border-b border-gray-200 pb-4">
                                    <h4 className="text-md font-medium text-gray-800 mb-3">3. Informations familiales</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">État matrimonial</p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {formData.familyInfo.applicant.maritalStatus}
                                            </p>
                                        </div>
                                        {formData.familyInfo.children.length > 0 && (
                                            <div>
                                                <p className="text-sm text-gray-500">Nombre d'enfants</p>
                                                <p className="text-sm font-medium text-gray-900">
                                                    {formData.familyInfo.children.length}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Documents */}
                                <div>
                                    <h4 className="text-md font-medium text-gray-800 mb-3">4. Documents fournis</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Passeport</p>
                                            <p className="text-sm font-medium text-gray-900 flex items-center">
                                                {formData.documents.identite.passeport.provided ? (
                                                    <>
                                                        <FiCheck className="text-green-500 mr-1" />
                                                        {formData.documents.identite.passeport.file?.name || 'Fichier fourni'}
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiX className="text-red-500 mr-1" />
                                                        Manquant
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Acte de naissance</p>
                                            <p className="text-sm font-medium text-gray-900 flex items-center">
                                                {formData.documents.identite.acteNaissance.provided ? (
                                                    <>
                                                        <FiCheck className="text-green-500 mr-1" />
                                                        {formData.documents.identite.acteNaissance.file?.name || 'Fichier fourni'}
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiX className="text-red-500 mr-1" />
                                                        Manquant
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                        {formData.documents.identite.acteMariage.provided && (
                                            <div>
                                                <p className="text-sm text-gray-500">Acte de mariage</p>
                                                <p className="text-sm font-medium text-gray-900 flex items-center">
                                                    <FiCheck className="text-green-500 mr-1" />
                                                    {formData.documents.identite.acteMariage.file?.name || 'Fichier fourni'}
                                                </p>
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm text-gray-500">Photo d'identité</p>
                                            <p className="text-sm font-medium text-gray-900 flex items-center">
                                                {formData.documents.identite.photo.provided ? (
                                                    <>
                                                        <FiCheck className="text-green-500 mr-1" />
                                                        {formData.documents.identite.photo.file?.name || 'Fichier fourni'}
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiX className="text-red-500 mr-1" />
                                                        Manquant
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Boutons de navigation */}
                    
                </div>
            )
        }
    ];

    return (
        <div className="px-4 sm:px-[6.5%] mx-auto py-6 md:py-8">
            {/* En-tête */}
            <div className="mb-6 md:mb-10 text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Formulaire de demande combinée</h1>
                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                    Remplissez soigneusement toutes les sections du formulaire. Les champs marqués d'un astérisque (*) sont obligatoires.
                </p>
            </div>

            {/* Stepper responsive */}
            <div className="mb-8 md:mb-12 overflow-x-auto">
                <nav className="flex items-center justify-start sm:justify-center min-w-max">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                            {/* Étape */}
                            <button
                                type="button"
                                onClick={() => setActiveStep(index)}
                                className={`relative flex flex-col items-center transition-all duration-300 ${index <= activeStep ? 'text-primary' : 'text-gray-400'}`}
                            >
                                {/* Cercle de l'étape */}
                                <span className={`
                                    flex items-center justify-center 
                                    w-8 h-8 sm:w-10 sm:h-10 rounded-full 
                                    ${index === activeStep
                                        ? 'bg-primary text-white border-2 border-primary shadow-md'
                                        : index < activeStep
                                            ? 'bg-primary-100 text-primary border-2 border-primary'
                                            : 'bg-gray-50 border-2 border-gray-300'
                                    }
                                    transition-all duration-300
                                `}>
                                    {index < activeStep ? (
                                        <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                                    ) : (
                                        <span className="font-medium text-sm sm:text-base">{index + 1}</span>
                                    )}
                                </span>

                                {/* Titre de l'étape - masqué sur mobile si trop long */}
                                <span className={`
                                    mt-2 sm:mt-3 text-xs sm:text-sm font-medium 
                                    ${index === activeStep ? 'text-primary font-semibold' : 'text-gray-500'}
                                    transition-all duration-300
                                    ${steps.length > 4 ? 'hidden xs:block' : ''}
                                `}>
                                    {step.title.split(' ')[0]} {steps.length <= 4 && step.title.split(' ').slice(1).join(' ')}
                                </span>
                            </button>

                            {/* Ligne de séparation entre les étapes - masquée sur mobile si trop d'étapes */}
                            {index < steps.length - 1 && (
                                <div className={`
                                    w-8 sm:w-16 h-1 mx-1 sm:mx-2
                                    ${index < activeStep ? 'bg-primary' : 'bg-gray-200'}
                                    transition-all duration-500
                                    ${steps.length > 4 ? 'hidden sm:block' : ''}
                                `}></div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Contenu du formulaire */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md sm:shadow-xl rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8">
                {steps[activeStep].component}

                {/* Boutons de navigation responsive */}
                {!showPreview && (
                    <div className="mt-6 sm:mt-10 flex justify-between border-t pt-4 sm:pt-6">
                        {activeStep > 0 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 shadow-sm text-sm sm:text-base font-medium rounded-md sm:rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                            >
                                <FiChevronLeft className="mr-1 sm:mr-2" />
                                <span className="hidden xs:inline">Précédent</span>
                            </button>
                        ) : (
                            <div></div>
                        )}

                        {activeStep < steps.length - 1 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="ml-auto inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md sm:rounded-lg shadow-sm text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
                            >
                                <span className="hidden xs:inline">Suivant</span>
                                <FiChevronRight className="ml-1 sm:ml-2" />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={submitStatus === "loading" || !formData.declarationAgreed}
                                className="ml-auto inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md sm:rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                            >
                                {submitStatus === "loading" ? (
                                    <>
                                        <div className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span className="hidden sm:inline">Envoi en cours...</span>
                                            <span className="sm:hidden">Envoi...</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className="hidden sm:inline">Soumettre la demande</span>
                                        <span className="sm:hidden">Soumettre</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CombinedApplicationForm;