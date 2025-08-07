import React, { useState } from 'react';
import { FiCheck, FiX, FiPlus, FiTrash2, FiUpload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { submitCombinedApplication } from '../../services/annexeSrvice';


const CombinedApplicationForm = () => {
    // État pour gérer l'étape actuelle
    const [activeStep, setActiveStep] = useState(0);

    // État principal du formulaire
    const [formData, setFormData] = useState({
        // Étape 1: Informations personnelles
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

        // Étape 2: Résidence et voyages
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

        // Étape 3: Langues et documents
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

        // Étape 4: Coordonnées
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

        // Étape 5: Antécédents
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

        // Étape 6: Famille
        famille: {
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

        // Étape 7: Documents
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

    // Gestion des changements de champ
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Gestion des changements pour les sections imbriquées
    const handleNestedChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    // Gestion des changements pour la famille
    const handleFamilyChange = (member, field, value) => {
        setFormData(prev => ({
            ...prev,
            famille: {
                ...prev.famille,
                [member]: {
                    ...prev.famille[member],
                    [field]: value
                }
            }
        }));
    };

    // Gestion des tableaux dynamiques
    const handleArrayChange = (arrayName, index, field, value) => {
        setFormData(prev => {
            const newArray = [...prev[arrayName]];
            if (!newArray[index]) newArray[index] = {};
            newArray[index][field] = value;
            return {
                ...prev,
                [arrayName]: newArray
            };
        });
    };

    // Ajouter une entrée à un tableau
    const addArrayEntry = (arrayName, defaultValue = {}) => {
        setFormData(prev => ({
            ...prev,
            [arrayName]: [...prev[arrayName], defaultValue]
        }));
    };

    // Supprimer une entrée d'un tableau
    const removeArrayEntry = (arrayName, index) => {
        setFormData(prev => {
            const newArray = [...prev[arrayName]];
            newArray.splice(index, 1);
            return {
                ...prev,
                [arrayName]: newArray
            };
        });
    };

    // Gestion des fichiers uploadés
    const handleFileUpload = (category, document, file) => {
        if (!file) return;

        // Vérifications du fichier
        if (file.size > 5 * 1024 * 1024) {
            alert('La taille maximale du fichier est de 5MB');
            return;
        }

        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            alert('Seuls les fichiers PDF, JPEG et PNG sont acceptés');
            return;
        }

        // Simulation de la progression
        setUploadProgress(prev => ({
            ...prev,
            [`${category}-${document}`]: 0
        }));

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                const newProgress = prev[`${category}-${document}`] + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setUploadProgress(prev => {
                            const newState = { ...prev };
                            delete newState[`${category}-${document}`];
                            return newState;
                        });
                    }, 500);
                }
                return {
                    ...prev,
                    [`${category}-${document}`]: newProgress
                };
            });
        }, 100);

        // Mise à jour de l'état
        setFormData(prev => ({
            ...prev,
            documents: {
                ...prev.documents,
                [category]: {
                    ...prev.documents[category],
                    [document]: {
                        provided: true,
                        file: {
                            name: file.name,
                            size: file.size,
                            type: file.type,
                            lastModified: file.lastModified
                        }
                    }
                }
            }
        }));
    };

    // Supprimer un fichier
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

    // Navigation entre les étapes
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

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus("loading");

        try {
            await submitCombinedApplication(formData);
            setSubmitStatus("success");
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("error");
        }
    };

    // Composant pour afficher un upload de fichier
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

    // Définition des étapes
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
                                value={formData.nomFamille}
                                onChange={e => handleChange('nomFamille', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s)</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.prenoms}
                                onChange={e => handleChange('prenoms', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.dateNaissance}
                                onChange={e => handleChange('dateNaissance', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro IUC</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.iuc}
                                onChange={e => handleChange('iuc', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.sexe === 'Homme'}
                                        onChange={() => handleChange('sexe', 'Homme')}
                                        required
                                    />
                                    <span className="ml-2">Homme</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.sexe === 'Femme'}
                                        onChange={() => handleChange('sexe', 'Femme')}
                                    />
                                    <span className="ml-2">Femme</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.email}
                                onChange={e => handleChange('email', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lieu de naissance (Ville)</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.villeNaissance}
                                onChange={e => handleChange('villeNaissance', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.paysNaissance}
                                onChange={e => handleChange('paysNaissance', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Citoyenneté</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.citoyennete}
                                onChange={e => handleChange('citoyennete', e.target.value)}
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
                                    checked={formData.aUtiliseAutreNom === 'non'}
                                    onChange={() => handleChange('aUtiliseAutreNom', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.aUtiliseAutreNom === 'oui'}
                                    onChange={() => handleChange('aUtiliseAutreNom', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.aUtiliseAutreNom === "oui" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ancien nom de famille</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.ancienNom}
                                    onChange={e => handleChange('ancienNom', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s) utilisé(s)</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.ancienPrenom}
                                    onChange={e => handleChange('ancienPrenom', e.target.value)}
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
                                value={formData.etatMatrimonial}
                                onChange={e => handleChange('etatMatrimonial', e.target.value)}
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

                    {(formData.etatMatrimonial === "marie" || formData.etatMatrimonial === "union") && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date du mariage ou début de l'union</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.dateMariageUnion}
                                    onChange={e => handleChange('dateMariageUnion', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de famille du conjoint</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.nomConjoint}
                                        onChange={e => handleChange('nomConjoint', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s) du conjoint</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.prenomConjoint}
                                        onChange={e => handleChange('prenomConjoint', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )
        },
        {
            title: "Résidence et voyages",
            component: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays de résidence actuel</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.paysResidenceActuelle}
                                onChange={e => handleChange('paysResidenceActuelle', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.statutResidenceActuelle}
                                onChange={e => handleChange('statutResidenceActuelle', e.target.value)}
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
                                    checked={formData.residenceAnterieure === 'non'}
                                    onChange={() => handleChange('residenceAnterieure', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.residenceAnterieure === 'oui'}
                                    onChange={() => handleChange('residenceAnterieure', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.residenceAnterieure === "oui" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.paysResidenceAnterieure}
                                    onChange={e => handleChange('paysResidenceAnterieure', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.statutResidenceAnterieure}
                                    onChange={e => handleChange('statutResidenceAnterieure', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.residenceDe}
                                    onChange={e => handleChange('residenceDe', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">À</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.residenceA}
                                    onChange={e => handleChange('residenceA', e.target.value)}
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
                                    checked={formData.demandeAutrePays === 'non'}
                                    onChange={() => handleChange('demandeAutrePays', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.demandeAutrePays === 'oui'}
                                    onChange={() => handleChange('demandeAutrePays', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.demandeAutrePays === "oui" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.paysDemande}
                                    onChange={e => handleChange('paysDemande', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.statutDemande}
                                    onChange={e => handleChange('statutDemande', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">De</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.demandeDe}
                                    onChange={e => handleChange('demandeDe', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">À</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.demandeA}
                                    onChange={e => handleChange('demandeA', e.target.value)}
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
                                    checked={formData.voyages === 'Non'}
                                    onChange={() => handleChange('voyages', 'Non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.voyages === 'Oui'}
                                    onChange={() => handleChange('voyages', 'Oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    {formData.voyages === 'Oui' && (
                        <div className="mt-4 space-y-4">
                            <div className="overflow-x-auto">
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
                                        {formData.detailsVoyages.map((voyage, index) => (
                                            <tr key={index}>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.pays || ''}
                                                        onChange={(e) => handleArrayChange('detailsVoyages', index, 'pays', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.dateDebut || ''}
                                                        onChange={(e) => handleArrayChange('detailsVoyages', index, 'dateDebut', e.target.value)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.dateFin || ''}
                                                        onChange={(e) => handleArrayChange('detailsVoyages', index, 'dateFin', e.target.value)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.endroit || ''}
                                                        onChange={(e) => handleArrayChange('detailsVoyages', index, 'endroit', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <input
                                                        value={voyage.but || ''}
                                                        onChange={(e) => handleArrayChange('detailsVoyages', index, 'but', e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </td>
                                                <td className="px-4 py-2 whitespace-nowrap">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeArrayEntry('detailsVoyages', index)}
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
                            <button
                                type="button"
                                onClick={() => addArrayEntry('detailsVoyages')}
                                className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                            >
                                <FiPlus className="mr-2" />
                                Ajouter un voyage
                            </button>
                        </div>
                    )}
                </div>
            )
        },
        {
            title: "Langues et documents",
            component: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Langue maternelle</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.langueMaternelle}
                                onChange={e => handleChange('langueMaternelle', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Dans quelle langue êtes-vous le plus à l'aise ?</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.langueAise}
                                onChange={e => handleChange('langueAise', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pouvez-vous communiquer en français et en anglais ?</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.communicationDeuxLangues}
                                onChange={e => handleChange('communicationDeuxLangues', e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionnez --</option>
                                <option value="oui">Oui</option>
                                <option value="non">Non</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous fait évaluer vos compétences linguistiques ?</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.evaluationLangue}
                                onChange={e => handleChange('evaluationLangue', e.target.value)}
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro du passeport</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.numeroPasseport}
                                onChange={e => handleChange('numeroPasseport', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays ou territoire de délivrance</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.paysDelivrancePasseport}
                                onChange={e => handleChange('paysDelivrancePasseport', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de délivrance</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.dateDelivrancePasseport}
                                onChange={e => handleChange('dateDelivrancePasseport', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.dateExpirationPasseport}
                                onChange={e => handleChange('dateExpirationPasseport', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Utilisez-vous un passeport délivré par Taiwan ?</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.passeportTaiwan}
                                onChange={e => handleChange('passeportTaiwan', e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionnez --</option>
                                <option value="oui">Oui</option>
                                <option value="non">Non</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Utilisez-vous un passeport national israélien ?</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.passeportIsrael}
                                onChange={e => handleChange('passeportIsrael', e.target.value)}
                                required
                            >
                                <option value="">-- Sélectionnez --</option>
                                <option value="oui">Oui</option>
                                <option value="non">Non</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous une pièce d'identité nationale ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.aPieceIdentite === 'oui'}
                                    onChange={() => handleChange('aPieceIdentite', 'oui')}
                                    required
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.aPieceIdentite === 'non'}
                                    onChange={() => handleChange('aPieceIdentite', 'non')}
                                />
                                <span className="ml-2">Non</span>
                            </label>
                        </div>
                    </div>

                    {formData.aPieceIdentite === 'oui' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de la pièce</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.numeroPiece}
                                    onChange={e => handleChange('numeroPiece', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays ou territoire de délivrance</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.paysDelivrancePiece}
                                    onChange={e => handleChange('paysDelivrancePiece', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de délivrance</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.dateDelivrancePiece}
                                    onChange={e => handleChange('dateDelivrancePiece', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.dateExpirationPiece}
                                    onChange={e => handleChange('dateExpirationPiece', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous une carte verte américaine ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.aCarteVerte === 'oui'}
                                    onChange={() => handleChange('aCarteVerte', 'oui')}
                                    required
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.aCarteVerte === 'non'}
                                    onChange={() => handleChange('aCarteVerte', 'non')}
                                />
                                <span className="ml-2">Non</span>
                            </label>
                        </div>
                    </div>

                    {formData.aCarteVerte === 'oui' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de la carte</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.numeroCarteVerte}
                                    onChange={e => handleChange('numeroCarteVerte', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.expirationCarteVerte}
                                    onChange={e => handleChange('expirationCarteVerte', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}
                </div>
            )
        },
        {
            title: "Coordonnées",
            component: (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse postale actuelle</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.adressePostale}
                                onChange={e => handleChange('adressePostale', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.villePostale}
                                onChange={e => handleChange('villePostale', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Province/État</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.provincePostale}
                                onChange={e => handleChange('provincePostale', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.codePostal}
                                onChange={e => handleChange('codePostal', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.paysPostal}
                                onChange={e => handleChange('paysPostal', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse du domicile</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.adresseIdentique === 'non'}
                                    onChange={() => handleChange('adresseIdentique', 'non')}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.adresseIdentique === 'oui'}
                                    onChange={() => handleChange('adresseIdentique', 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">No d'app/unité</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.appartementUnite}
                                onChange={e => handleChange('appartementUnite', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de rue</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.numeroRue}
                                onChange={e => handleChange('numeroRue', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom de rue</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.nomRue}
                                onChange={e => handleChange('nomRue', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ville/Village</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.villeVillage}
                                onChange={e => handleChange('villeVillage', e.target.value)}
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays ou territoire</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.paysTerritoire}
                                onChange={e => handleChange('paysTerritoire', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                        <div className="mt-2 mb-4">
                            <label className="mr-4 flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.typeTelephone === 'canada'}
                                    onChange={() => handleChange('typeTelephone', 'canada')}
                                    required
                                />
                                <span className="ml-2">Canada/États-Unis</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.typeTelephone === 'autre'}
                                    onChange={() => handleChange('typeTelephone', 'autre')}
                                />
                                <span className="ml-2">Autre</span>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.typeTelephoneDetail}
                                    onChange={e => handleChange('typeTelephoneDetail', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif de pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.indicatifPays}
                                    onChange={e => handleChange('indicatifPays', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No.</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.numeroTelephone}
                                    onChange={e => handleChange('numeroTelephone', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.posteTelephone}
                                    onChange={e => handleChange('posteTelephone', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Autre numéro de téléphone</label>
                        <div className="mt-2 mb-4">
                            <label className="mr-4 flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.typeAutreTelephone === 'canada'}
                                    onChange={() => handleChange('typeAutreTelephone', 'canada')}
                                />
                                <span className="ml-2">Canada/États-Unis</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.typeAutreTelephone === 'autre'}
                                    onChange={() => handleChange('typeAutreTelephone', 'autre')}
                                />
                                <span className="ml-2">Autre</span>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.typeAutreTelephoneDetail}
                                    onChange={e => handleChange('typeAutreTelephoneDetail', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.indicatifAutreTelephone}
                                    onChange={e => handleChange('indicatifAutreTelephone', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No.</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.numeroAutreTelephone}
                                    onChange={e => handleChange('numeroAutreTelephone', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.posteAutreTelephone}
                                    onChange={e => handleChange('posteAutreTelephone', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de télécopieur</label>
                        <div className="mt-2 mb-4">
                            <label className="mr-4 flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.typeTelecopieur === 'canada'}
                                    onChange={() => handleChange('typeTelecopieur', 'canada')}
                                />
                                <span className="ml-2">Canada/États-Unis</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.typeTelecopieur === 'autre'}
                                    onChange={() => handleChange('typeTelecopieur', 'autre')}
                                />
                                <span className="ml-2">Autre</span>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif de pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.indicatifTelecopieur}
                                    onChange={e => handleChange('indicatifTelecopieur', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">No.</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.numeroTelecopieur}
                                    onChange={e => handleChange('numeroTelecopieur', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.posteTelecopieur}
                                    onChange={e => handleChange('posteTelecopieur', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Antécédents",
            component: (
                <div className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Au cours des deux dernières années, avez-vous, ou un membre de votre famille, eu la tuberculose ou été en contact étroit avec une personne qui a la tuberculose?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.tuberculoseContact === 'oui'}
                                        onChange={() => handleChange('tuberculoseContact', 'oui')}
                                        required
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.tuberculoseContact === 'non'}
                                        onChange={() => handleChange('tuberculoseContact', 'non')}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous un trouble physique ou mental qui nécessiterait des services sociaux et/ou des soins de santé autres que des médicaments, durant votre séjour au Canada?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.troublePhysiqueMental === 'oui'}
                                        onChange={() => handleChange('troublePhysiqueMental', 'oui')}
                                        required
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.troublePhysiqueMental === 'non'}
                                        onChange={() => handleChange('troublePhysiqueMental', 'non')}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        {(formData.tuberculoseContact === 'oui' || formData.troublePhysiqueMental === 'oui') && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Veuillez fournir les détails et le nom du membre de la famille (s'il y a lieu)</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.detailsTuberculoseTrouble}
                                    onChange={e => handleChange('detailsTuberculoseTrouble', e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Êtes-vous resté au Canada après l'expiration de votre statut, avez fréquenté l'école sans permis d'études au Canada, avez travaillé sans permis de travail au Canada?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.statutExpire === 'oui'}
                                        onChange={() => handleChange('statutExpire', 'oui')}
                                        required
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.statutExpire === 'non'}
                                        onChange={() => handleChange('statutExpire', 'non')}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vous a-t-on déjà refusé un visa ou un permis, interdit l'entrée ou demandé de quitter le Canada ou tout autre pays ou territoire?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.refusEntree === 'oui'}
                                        onChange={() => handleChange('refusEntree', 'oui')}
                                        required
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.refusEntree === 'non'}
                                        onChange={() => handleChange('refusEntree', 'non')}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà fait une demande pour entrer ou demeurer au Canada?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.demandePrecedenteCanada === 'oui'}
                                        onChange={() => handleChange('demandePrecedenteCanada', 'oui')}
                                        required
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.demandePrecedenteCanada === 'non'}
                                        onChange={() => handleChange('demandePrecedenteCanada', 'non')}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        {(formData.statutExpire === 'oui' || formData.refusEntree === 'oui' || formData.demandePrecedenteCanada === 'oui') && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Veuillez fournir des détails</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.detailsStatutRefusDemande}
                                    onChange={e => handleChange('detailsStatutRefusDemande', e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà commis, été arrêté, accusé, ou reconnu coupable d'une infraction pénale quelconque dans un pays ou territoire?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.antecedentsJudiciaires === 'oui'}
                                        onChange={() => handleChange('antecedentsJudiciaires', 'oui')}
                                        required
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.antecedentsJudiciaires === 'non'}
                                        onChange={() => handleChange('antecedentsJudiciaires', 'non')}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        {formData.antecedentsJudiciaires === 'oui' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Veuillez fournir des détails</label>
                                <textarea
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.detailsAntecedentsJudiciaires}
                                    onChange={e => handleChange('detailsAntecedentsJudiciaires', e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous fait partie d'une armée, d'une milice, d'une unité de défense civile, d'un service de renseignement ou d'un corps de police?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.serviceMilitaire === 'Oui'}
                                        onChange={() => handleChange('serviceMilitaire', 'Oui')}
                                        required
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.serviceMilitaire === 'Non'}
                                        onChange={() => handleChange('serviceMilitaire', 'Non')}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        {formData.serviceMilitaire === 'Oui' && (
                            <div className="mt-4 space-y-4">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom de l'unité</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {formData.detailsService.map((service, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={service.pays || ''}
                                                            onChange={(e) => handleArrayChange('detailsService', index, 'pays', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={service.unite || ''}
                                                            onChange={(e) => handleArrayChange('detailsService', index, 'unite', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={service.grade || ''}
                                                            onChange={(e) => handleArrayChange('detailsService', index, 'grade', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={service.dateDebut || ''}
                                                            onChange={(e) => handleArrayChange('detailsService', index, 'dateDebut', e.target.value)}
                                                            placeholder="MM/AAAA"
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={service.dateFin || ''}
                                                            onChange={(e) => handleArrayChange('detailsService', index, 'dateFin', e.target.value)}
                                                            placeholder="MM/AAAA"
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeArrayEntry('detailsService', index)}
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
                                <button
                                    type="button"
                                    onClick={() => addArrayEntry('detailsService')}
                                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                                >
                                    <FiPlus className="mr-2" />
                                    Ajouter un service
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà été témoin ou impliqué dans la commission de crimes de guerre, de crimes contre l'humanité ou d'autres violations des droits de la personne?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.temoinViolations === 'Oui'}
                                        onChange={() => handleChange('temoinViolations', 'Oui')}
                                        required
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.temoinViolations === 'Non'}
                                        onChange={() => handleChange('temoinViolations', 'Non')}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        {formData.temoinViolations === 'Oui' && (
                            <div className="mt-4 space-y-4">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nature des violations</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Détails</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {formData.detailsViolations.map((violation, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={violation.nature || ''}
                                                            onChange={(e) => handleArrayChange('detailsViolations', index, 'nature', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={violation.pays || ''}
                                                            onChange={(e) => handleArrayChange('detailsViolations', index, 'pays', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={violation.date || ''}
                                                            onChange={(e) => handleArrayChange('detailsViolations', index, 'date', e.target.value)}
                                                            placeholder="MM/AAAA"
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={violation.details || ''}
                                                            onChange={(e) => handleArrayChange('detailsViolations', index, 'details', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeArrayEntry('detailsViolations', index)}
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
                                <button
                                    type="button"
                                    onClick={() => addArrayEntry('detailsViolations')}
                                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                                >
                                    <FiPlus className="mr-2" />
                                    Ajouter une violation
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà appartenu ou apparteniez-vous à une organisation ou association quelconque?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.affiliationOrganisation === 'Oui'}
                                        onChange={() => handleChange('affiliationOrganisation', 'Oui')}
                                        required
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.affiliationOrganisation === 'Non'}
                                        onChange={() => handleChange('affiliationOrganisation', 'Non')}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        {formData.affiliationOrganisation === 'Oui' && (
                            <div className="mt-4 space-y-4">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom de l'organisation</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nature</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {formData.detailsAffiliation.map((affiliation, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={affiliation.nom || ''}
                                                            onChange={(e) => handleArrayChange('detailsAffiliation', index, 'nom', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={affiliation.pays || ''}
                                                            onChange={(e) => handleArrayChange('detailsAffiliation', index, 'pays', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={affiliation.nature || ''}
                                                            onChange={(e) => handleArrayChange('detailsAffiliation', index, 'nature', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={affiliation.dateDebut || ''}
                                                            onChange={(e) => handleArrayChange('detailsAffiliation', index, 'dateDebut', e.target.value)}
                                                            placeholder="MM/AAAA"
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={affiliation.dateFin || ''}
                                                            onChange={(e) => handleArrayChange('detailsAffiliation', index, 'dateFin', e.target.value)}
                                                            placeholder="MM/AAAA"
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeArrayEntry('detailsAffiliation', index)}
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
                                <button
                                    type="button"
                                    onClick={() => addArrayEntry('detailsAffiliation')}
                                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                                >
                                    <FiPlus className="mr-2" />
                                    Ajouter une affiliation
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà occupé un poste au sein d'un gouvernement ou exercé des fonctions publiques?</label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.chargePublique === 'Oui'}
                                        onChange={() => handleChange('chargePublique', 'Oui')}
                                        required
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.chargePublique === 'Non'}
                                        onChange={() => handleChange('chargePublique', 'Non')}
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                            </div>
                        </div>

                        {formData.chargePublique === 'Oui' && (
                            <div className="mt-4 space-y-4">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poste occupé</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ministère/Organisme</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {formData.detailsCharges.map((charge, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={charge.poste || ''}
                                                            onChange={(e) => handleArrayChange('detailsCharges', index, 'poste', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={charge.pays || ''}
                                                            onChange={(e) => handleArrayChange('detailsCharges', index, 'pays', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={charge.organisme || ''}
                                                            onChange={(e) => handleArrayChange('detailsCharges', index, 'organisme', e.target.value)}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={charge.dateDebut || ''}
                                                            onChange={(e) => handleArrayChange('detailsCharges', index, 'dateDebut', e.target.value)}
                                                            placeholder="MM/AAAA"
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <input
                                                            value={charge.dateFin || ''}
                                                            onChange={(e) => handleArrayChange('detailsCharges', index, 'dateFin', e.target.value)}
                                                            placeholder="MM/AAAA"
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            required
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeArrayEntry('detailsCharges', index)}
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
                                <button
                                    type="button"
                                    onClick={() => addArrayEntry('detailsCharges')}
                                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                                >
                                    <FiPlus className="mr-2" />
                                    Ajouter un poste
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        {
            title: "Famille",
            component: (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Informations sur le demandeur principal</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.famille.applicant.name}
                                    onChange={e => handleFamilyChange('applicant', 'name', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.famille.applicant.dob}
                                    onChange={e => handleFamilyChange('applicant', 'dob', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.famille.applicant.country}
                                    onChange={e => handleFamilyChange('applicant', 'country', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.famille.applicant.occupation}
                                    onChange={e => handleFamilyChange('applicant', 'occupation', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.famille.applicant.maritalStatus}
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
                                    value={formData.famille.applicant.address}
                                    onChange={e => handleFamilyChange('applicant', 'address', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    checked={formData.famille.applicant.coming}
                                    onChange={e => handleFamilyChange('applicant', 'coming', e.target.checked)}
                                />
                                <label className="ml-2 block text-sm text-gray-700">Voyage au Canada avec vous</label>
                            </div>
                        </div>
                    </div>

                    {(formData.etatMatrimonial === "marie" || formData.etatMatrimonial === "union") && (
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations sur l'époux/conjoint</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.famille.epouse.name}
                                        onChange={e => handleFamilyChange('epouse', 'name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.famille.epouse.dob}
                                        onChange={e => handleFamilyChange('epouse', 'dob', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.famille.epouse.country}
                                        onChange={e => handleFamilyChange('epouse', 'country', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.famille.epouse.occupation}
                                        onChange={e => handleFamilyChange('epouse', 'occupation', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.famille.epouse.maritalStatus}
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
                                        value={formData.famille.epouse.address}
                                        onChange={e => handleFamilyChange('epouse', 'address', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                        checked={formData.famille.epouse.coming}
                                        onChange={e => handleFamilyChange('epouse', 'coming', e.target.checked)}
                                    />
                                    <label className="ml-2 block text-sm text-gray-700">Voyage au Canada avec vous</label>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Parents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-md font-medium text-gray-800 mb-3">Père</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.famille.father.name}
                                            onChange={e => handleFamilyChange('father', 'name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.famille.father.dob}
                                            onChange={e => handleFamilyChange('father', 'dob', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.famille.father.country}
                                            onChange={e => handleFamilyChange('father', 'country', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.famille.father.occupation}
                                            onChange={e => handleFamilyChange('father', 'occupation', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.famille.father.address}
                                            onChange={e => handleFamilyChange('father', 'address', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                            checked={formData.famille.father.coming}
                                            onChange={e => handleFamilyChange('father', 'coming', e.target.checked)}
                                        />
                                        <label className="ml-2 block text-sm text-gray-700">Voyage au Canada avec vous</label>
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
                                            value={formData.famille.mother.name}
                                            onChange={e => handleFamilyChange('mother', 'name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.famille.mother.dob}
                                            onChange={e => handleFamilyChange('mother', 'dob', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.famille.mother.country}
                                            onChange={e => handleFamilyChange('mother', 'country', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.famille.mother.occupation}
                                            onChange={e => handleFamilyChange('mother', 'occupation', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData.famille.mother.address}
                                            onChange={e => handleFamilyChange('mother', 'address', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                            checked={formData.famille.mother.coming}
                                            onChange={e => handleFamilyChange('mother', 'coming', e.target.checked)}
                                        />
                                        <label className="ml-2 block text-sm text-gray-700">Voyage au Canada avec vous</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Enfants</h3>
                            <button
                                type="button"
                                onClick={() => addArrayEntry('famille.children', {
                                    name: '',
                                    dob: '',
                                    country: '',
                                    occupation: '',
                                    address: '',
                                    coming: false
                                })}
                                className="flex items-center px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition text-sm"
                            >
                                <FiPlus className="mr-1" /> Ajouter un enfant
                            </button>
                        </div>

                        {formData.famille.children.length > 0 ? (
                            <div className="space-y-4">
                                {formData.famille.children.map((child, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="text-md font-medium text-gray-800">Enfant {index + 1}</h4>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newChildren = [...formData.famille.children];
                                                    newChildren.splice(index, 1);
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        famille: {
                                                            ...prev.famille,
                                                            children: newChildren
                                                        }
                                                    }));
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={child.name}
                                                    onChange={e => {
                                                        const newChildren = [...formData.famille.children];
                                                        newChildren[index].name = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                children: newChildren
                                                            }
                                                        }));
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                                <input
                                                    type="date"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={child.dob}
                                                    onChange={e => {
                                                        const newChildren = [...formData.famille.children];
                                                        newChildren[index].dob = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                children: newChildren
                                                            }
                                                        }));
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={child.country}
                                                    onChange={e => {
                                                        const newChildren = [...formData.famille.children];
                                                        newChildren[index].country = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                children: newChildren
                                                            }
                                                        }));
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={child.occupation}
                                                    onChange={e => {
                                                        const newChildren = [...formData.famille.children];
                                                        newChildren[index].occupation = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                children: newChildren
                                                            }
                                                        }));
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={child.address}
                                                    onChange={e => {
                                                        const newChildren = [...formData.famille.children];
                                                        newChildren[index].address = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                children: newChildren
                                                            }
                                                        }));
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                    checked={child.coming}
                                                    onChange={e => {
                                                        const newChildren = [...formData.famille.children];
                                                        newChildren[index].coming = e.target.checked;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                children: newChildren
                                                            }
                                                        }));
                                                    }}
                                                />
                                                <label className="ml-2 block text-sm text-gray-700">Voyage au Canada avec vous</label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">Aucun enfant ajouté</p>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Frères et sœurs</h3>
                            <button
                                type="button"
                                onClick={() => addArrayEntry('famille.siblings', {
                                    name: '',
                                    dob: '',
                                    country: '',
                                    occupation: '',
                                    address: '',
                                    coming: false
                                })}
                                className="flex items-center px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition text-sm"
                            >
                                <FiPlus className="mr-1" /> Ajouter un frère/sœur
                            </button>
                        </div>

                        {formData.famille.siblings.length > 0 ? (
                            <div className="space-y-4">
                                {formData.famille.siblings.map((sibling, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="text-md font-medium text-gray-800">Frère/Sœur {index + 1}</h4>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newSiblings = [...formData.famille.siblings];
                                                    newSiblings.splice(index, 1);
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        famille: {
                                                            ...prev.famille,
                                                            siblings: newSiblings
                                                        }
                                                    }));
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={sibling.name}
                                                    onChange={e => {
                                                        const newSiblings = [...formData.famille.siblings];
                                                        newSiblings[index].name = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                siblings: newSiblings
                                                            }
                                                        }));
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                                <input
                                                    type="date"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={sibling.dob}
                                                    onChange={e => {
                                                        const newSiblings = [...formData.famille.siblings];
                                                        newSiblings[index].dob = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                siblings: newSiblings
                                                            }
                                                        }));
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={sibling.country}
                                                    onChange={e => {
                                                        const newSiblings = [...formData.famille.siblings];
                                                        newSiblings[index].country = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                siblings: newSiblings
                                                            }
                                                        }));
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={sibling.occupation}
                                                    onChange={e => {
                                                        const newSiblings = [...formData.famille.siblings];
                                                        newSiblings[index].occupation = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                siblings: newSiblings
                                                            }
                                                        }));
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    value={sibling.address}
                                                    onChange={e => {
                                                        const newSiblings = [...formData.famille.siblings];
                                                        newSiblings[index].address = e.target.value;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                siblings: newSiblings
                                                            }
                                                        }));
                                                    }}
                                                    required
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                    checked={sibling.coming}
                                                    onChange={e => {
                                                        const newSiblings = [...formData.famille.siblings];
                                                        newSiblings[index].coming = e.target.checked;
                                                        setFormData(prev => ({
                                                            ...prev,
                                                            famille: {
                                                                ...prev.famille,
                                                                siblings: newSiblings
                                                            }
                                                        }));
                                                    }}
                                                />
                                                <label className="ml-2 block text-sm text-gray-700">Voyage au Canada avec vous</label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">Aucun frère/sœur ajouté</p>
                        )}
                    </div>
                </div>
            )
        },
        {
            title: "Documents",
            component: (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
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
                                label="Passeport valide (pages avec photo et informations)"
                                required
                            />
                            {(formData.etatMatrimonial === "marie" || formData.etatMatrimonial === "union") && (
                                <FileUpload
                                    category="identite"
                                    document="acteMariage"
                                    label="Acte de mariage"
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
                                label="Carte nationale d'identité (recto-verso)"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Preuves de fonds</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FileUpload
                                category="preuvesFonds"
                                document="documentsEntreprise"
                                label="Documents d'entreprise (si travailleur indépendant)"
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

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Autres documents</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FileUpload
                                category="autres"
                                document="visaAnterieur"
                                label="Copie de visa canadien antérieur (si applicable)"
                            />
                            <FileUpload
                                category="autres"
                                document="assuranceVoyage"
                                label="Preuve d'assurance voyage"
                            />
                            <FileUpload
                                category="autres"
                                document="reservationHotel"
                                label="Réservation d'hôtel"
                            />
                            <FileUpload
                                category="autres"
                                document="billetsAvion"
                                label="Billets d'avion (aller-retour)"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Avertissements</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(formData.refusEntree === 'oui') && (
                                <FileUpload
                                    category="avertissements"
                                    document="refusVisaCanada"
                                    label="Lettre de refus de visa canadien"
                                />
                            )}
                            <FileUpload
                                category="avertissements"
                                document="demandeVisaEnCours"
                                label="Preuve de demande de visa en cours (si applicable)"
                            />
                            <FileUpload
                                category="avertissements"
                                document="titreSejourEtranger"
                                label="Titre de séjour étranger (si applicable)"
                            />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="declaration"
                                    name="declaration"
                                    type="checkbox"
                                    className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                                    checked={formData.declarationAgreed}
                                    onChange={e => handleChange('declarationAgreed', e.target.checked)}
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="declaration" className="font-medium text-gray-700">
                                    Déclaration
                                </label>
                                <p className="text-gray-500">
                                    Je déclare que les renseignements fournis dans cette demande sont exacts et complets.
                                    Je comprends que de fausses déclarations pourraient entraîner le refus de ma demande,
                                    l'annulation de mon visa ou mon expulsion du Canada. J'autorise Immigration,
                                    Réfugiés et Citoyenneté Canada (IRCC) à vérifier les renseignements fournis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Formulaire combiné de demande</h2>
                    <p className="text-gray-600 mt-1">Veuillez remplir toutes les sections du formulaire avec soin.</p>
                </div>

                {/* Stepper */}
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {steps.map((step, index) => (
                                <React.Fragment key={index}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveStep(index)}
                                        className={`flex items-center justify-center w-8 h-8 rounded-full ${activeStep === index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}
                                    >
                                        {index + 1}
                                    </button>
                                    {index < steps.length - 1 && (
                                        <div className={`w-12 h-1 ${activeStep > index ? 'bg-primary' : 'bg-gray-200'}`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            Étape {activeStep + 1} sur {steps.length}
                        </div>
                    </div>
                </div>

                {/* Current step content */}
                <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">{steps[activeStep].title}</h3>
                    {steps[activeStep].component}
                </div>

                {/* Navigation buttons */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={activeStep === 0}
                        className={`flex items-center px-4 py-2 rounded-md ${activeStep === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        <FiChevronLeft className="mr-2" /> Précédent
                    </button>

                    {activeStep < steps.length - 1 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                        >
                            Suivant <FiChevronRight className="ml-2" />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!formData.declarationAgreed || submitStatus === "loading"}
                            className={`flex items-center px-4 py-2 rounded-md ${!formData.declarationAgreed || submitStatus === "loading" ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                        >
                            {submitStatus === "loading" ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Envoi en cours...
                                </>
                            ) : submitStatus === "success" ? (
                                <>
                                    <FiCheck className="mr-2" /> Soumis avec succès
                                </>
                            ) : submitStatus === "error" ? (
                                <>
                                    <FiX className="mr-2" /> Erreur lors de l'envoi
                                </>
                            ) : (
                                <>
                                    Soumettre la demande <FiCheck className="ml-2" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CombinedApplicationForm;