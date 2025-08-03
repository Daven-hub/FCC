import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiCheck, FiTrash2 } from 'react-icons/fi';
import { submitFamilyDocuments } from '../../services/documentService';

const FamilyDocumentsPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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

    const [uploadProgress, setUploadProgress] = useState({});
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        // Charger les données sauvegardées si elles existent
        const savedData = localStorage.getItem('familyInfoData');
        if (savedData) {
            setFormData(prev => ({
                ...prev,
                ...JSON.parse(savedData)
            }));
        }
    }, []);

    const handleFileUpload = (category, document, file) => {
        if (!file) return;

        // Vérifier la taille du fichier (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('La taille maximale du fichier est de 5MB');
            return;
        }

        // Vérifier le type de fichier (PDF ou image)
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            alert('Seuls les fichiers PDF, JPEG et PNG sont acceptés');
            return;
        }

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

    const renderFileUpload = (category, document, label) => {
        const docState = formData.documents[category][document];
        const progress = uploadProgress[`${category}-${document}`];

        return (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-gray-700">{label}</label>
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
                                />
                            </label>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus("loading");

        try {
            // Combiner les données du formulaire avec celles sauvegardées
            const completeData = {
                ...JSON.parse(localStorage.getItem('familyInfoData') || {}),
                ...formData
            };

            await submitFamilyDocuments(completeData);
            setSubmitStatus("success");
            
            // Redirection après un délai
            setTimeout(() => {
                navigate('/confirmation');
            }, 1500);
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("error");
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden px-[6.5%] py-12">
            <h1 className="text-3xl font-bold text-primary mb-6">LISTE DES DOCUMENTS VISAS VISITEURS AFFAIRES</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-8">
                    <div className="bg-blue-50 border-l-4 border-primary p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-primary">
                                    Tous les documents doivent être en format PDF et clairement lisibles. La taille maximale par fichier est de 5MB.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sections de documents */}
                    <div className="space-y-6">
                        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">A. Documents Identité Personnelle (Demandeur)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderFileUpload("identite", "acteNaissance", "Acte de Naissance")}
                                {renderFileUpload("identite", "passeport", "Passeport en cours de validité (Au moins un (1) an)")}
                                {renderFileUpload("identite", "acteMariage", "Photocopie Acte de Mariage (Si vous êtes marié)")}
                                {renderFileUpload("identite", "photo", "01 photos couleurs format passeport (35*45)")}
                                {renderFileUpload("identite", "cni", "Carte Nationale d'Identité (CNI)")}
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">B. Documents Preuves de Fonds et Documents Entreprise (Demandeur)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderFileUpload("preuvesFonds", "documentsEntreprise", "Tout document Entreprise (Immatriculation, Registre de Commerce, etc...)")}
                                {renderFileUpload("preuvesFonds", "relevesBancairesEntreprise", "Relevés bancaires Entreprise des 6 derniers mois")}
                                {renderFileUpload("preuvesFonds", "relevesBancairesPersonnels", "Relevés bancaire personnelle 6 derniers mois (Banque et/ou Microfinance)")}
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">E. Autre</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderFileUpload("autres", "visaAnterieur", "Copie scannée visa antérieur (En pdf)")}
                                {renderFileUpload("autres", "assuranceVoyage", "Assurance voyage (Si vous avez 60 ans et plus)")}
                                {renderFileUpload("autres", "reservationHotel", "Preuve de réservation d'hôtel")}
                                {renderFileUpload("autres", "billetsAvion", "Réservation de billets d'avion Aller / Retour")}
                            </div>
                        </div>

                        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">F. Avertissements</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {renderFileUpload("avertissements", "refusVisaCanada", "Refus de visa pour Canada (si applicable)")}
                                {renderFileUpload("avertissements", "demandeVisaEnCours", "Demande de visa en cours pour d'autres pays")}
                                {renderFileUpload("avertissements", "titreSejourEtranger", "Titre de séjour ou Résidence permanente d'un autre pays")}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Déclaration</h3>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="declaration"
                                name="declaration"
                                type="checkbox"
                                className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                                checked={formData.declarationAgreed}
                                onChange={e => setFormData(prev => ({ ...prev, declarationAgreed: e.target.checked }))}
                                required
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="declaration" className="font-medium text-gray-700">
                                Je déclare sous peine de sanction que les renseignements fournis dans ce formulaire sont complets, exacts et sincères.
                                J'accepte que ces informations soient utilisées pour le traitement de ma demande de visa.
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        disabled={!formData.declarationAgreed || submitStatus === "loading"}
                        className={`px-6 py-3 rounded-lg transition ${!formData.declarationAgreed || submitStatus === "loading" ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                    >
                        {submitStatus === "loading" ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Envoi en cours...
                            </span>
                        ) : submitStatus === "success" ? (
                            <span className="flex items-center justify-center">
                                <FiCheck className="mr-2" /> Demande envoyée avec succès
                            </span>
                        ) : submitStatus === "error" ? (
                            <span className="flex items-center justify-center">
                                <span className="text-red-500">Erreur lors de l'envoi. Veuillez réessayer.</span>
                            </span>
                        ) : (
                            "Soumettre la demande"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FamilyDocumentsPage;