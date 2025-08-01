import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload, FiCheck, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function FormulaireDemandeCanadienne() {
    const [serviceRows, setServiceRows] = useState(1);
    const [violationRows, setViolationRows] = useState(1);
    const [affiliationRows, setAffiliationRows] = useState(1);
    const [chargeRows, setChargeRows] = useState(1);
    const [voyageRows, setVoyageRows] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [fileErrors, setFileErrors] = useState({});
    const [uploadProgress, setUploadProgress] = useState({});

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            serviceMilitaire: 'Non',
            temoinViolations: 'Non',
            affiliationOrganisation: 'Non',
            chargePublique: 'Non',
            voyages: 'Non',
            detailsService: [{}],
            detailsViolations: [{}],
            detailsAffiliation: [{}],
            detailsCharges: [{}],
            detailsVoyages: [{}]
        }
    });

    const serviceMilitaire = watch('serviceMilitaire');
    const temoinViolations = watch('temoinViolations');
    const affiliationOrganisation = watch('affiliationOrganisation');
    const chargePublique = watch('chargePublique');
    const voyages = watch('voyages');

    const handleFileUpload = (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        // Vérification du type de fichier
        if (file.type !== 'application/pdf') {
            setFileErrors(prev => ({
                ...prev,
                [fieldName]: 'Le fichier doit être au format PDF'
            }));
            return;
        }

        // Vérification de la taille du fichier
        if (file.size > 5 * 1024 * 1024) { // 5MB
            setFileErrors(prev => ({
                ...prev,
                [fieldName]: 'La taille maximale du fichier est de 5MB'
            }));
            return;
        }

        // Simulation de la progression de l'upload
        setUploadProgress(prev => ({
            ...prev,
            [fieldName]: 0
        }));

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                const newProgress = prev[fieldName] + 10;
                if (newProgress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setUploadProgress(prev => {
                            const newState = { ...prev };
                            delete newState[fieldName];
                            return newState;
                        });
                    }, 500);
                }
                return {
                    ...prev,
                    [fieldName]: newProgress
                };
            });
        }, 100);

        // Lecture du fichier
        const reader = new FileReader();
        reader.onload = (event) => {
            setUploadedFiles(prev => ({
                ...prev,
                [fieldName]: {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    lastModified: file.lastModified,
                    content: event.target.result.split(',')[1]
                }
            }));
            setFileErrors(prev => ({
                ...prev,
                [fieldName]: null
            }));
        };
        reader.readAsDataURL(file);
    };

    const removeFile = (fieldName) => {
        setUploadedFiles(prev => {
            const newFiles = { ...prev };
            delete newFiles[fieldName];
            return newFiles;
        });
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = {
                ...data,
                documents: uploadedFiles
            };

            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Données soumises:', formData);
            setSubmitSuccess(true);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const addServiceRow = () => setServiceRows(prev => prev + 1);
    const addViolationRow = () => setViolationRows(prev => prev + 1);
    const addAffiliationRow = () => setAffiliationRows(prev => prev + 1);
    const addChargeRow = () => setChargeRows(prev => prev + 1);
    const addVoyageRow = () => setVoyageRows(prev => prev + 1);

    const renderFileUpload = (fieldName, label) => {
        const file = uploadedFiles[fieldName];
        const progress = uploadProgress[fieldName];
        const error = fileErrors[fieldName];

        return (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                    <label className="font-medium text-gray-700">{label}</label>
                    {file ? (
                        <span className="flex items-center text-green-600">
                            <FiCheck className="mr-1" /> Fourni
                        </span>
                    ) : (
                        <span className="text-gray-500">Manquant</span>
                    )}
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-2">{error}</p>
                )}

                {file ? (
                    <div className="flex justify-between items-center bg-white p-3 rounded border border-green-100">
                        <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB - {file.type}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeFile(fieldName)}
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
                                    onChange={(e) => handleFileUpload(e, fieldName)}
                                    accept="application/pdf"
                                />
                            </label>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="px-[6.5%] py-12 mx-auto my-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-primary mb-2">Demande de statut de résident temporaire</h1>
                    <p className="text-gray-600 mb-6">Veuillez remplir toutes les informations requises et uploader les documents nécessaires</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Section: Identité Personnelle */}
                        <section className="mb-8 bg-gray-50 p-5 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Identité Personnelle</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de famille</label>
                                    <input
                                        {...register('nomFamille')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s)</label>
                                    <input
                                        {...register('prenoms')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                    <input
                                        type="date"
                                        {...register('dateNaissance')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro IUC</label>
                                    <input
                                        {...register('iuc')}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section: Service Militaire */}
                        <section className="mb-8 bg-gray-50 p-5 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Militaire</h2>

                            <div className="mb-4">
                                <p className="text-gray-700 mb-2">
                                    Avez-vous fait partie d'une armée, d'une milice, d'une unité de défense civile,
                                    d'un service de renseignement ou d'un corps de police?
                                </p>
                                <div className="flex space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register('serviceMilitaire')}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            value="Non"
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register('serviceMilitaire')}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            value="Oui"
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>

                            {serviceMilitaire === 'Oui' && (
                                <div className="mt-4 space-y-4">

                                    {/* Table Desktop */}
                                    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu de poste</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {[...Array(serviceRows)].map((_, index) => (
                                                    <tr key={index}>
                                                        {['grade', 'dateDebut', 'dateFin', 'lieuPoste', 'pays'].map((field) => (
                                                            <td key={field} className="px-4 py-2 whitespace-nowrap">
                                                                <input
                                                                    {...register(`detailsService.${index}.${field}`)}
                                                                    placeholder={field.includes('date') ? 'MM/AAAA' : ''}
                                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                                />
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile Layout */}
                                    <div className="md:hidden space-y-4">
                                        {[...Array(serviceRows)].map((_, index) => (
                                            <div key={index} className="space-y-2 p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Grade</label>
                                                    <input
                                                        {...register(`detailsService.${index}.grade`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        {...register(`detailsService.${index}.dateDebut`)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        {...register(`detailsService.${index}.dateFin`)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Lieu de poste</label>
                                                    <input
                                                        {...register(`detailsService.${index}.lieuPoste`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                    <input
                                                        {...register(`detailsService.${index}.pays`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bouton ajout */}
                                    <button
                                        type="button"
                                        onClick={addServiceRow}
                                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                                    >
                                        <FiPlus className="mr-2" />
                                        Ajouter une période
                                    </button>
                                </div>
                            )}

                        </section>

                        {/* Section: Témoin de Violations */}
                        <section className="mb-8 bg-gray-50 p-5 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Témoin de Violations</h2>

                            <div className="mb-4">
                                <p className="text-gray-700 mb-2">
                                    Avez-vous été témoin de mauvais traitements infligés à des prisonniers ou des civils,
                                    ou d'actes de pillage ou de profanation d'édifices religieux ou avez-vous participé à ces actes?
                                </p>
                                <div className="flex space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register('temoinViolations')}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            value="Non"
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register('temoinViolations')}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            value="Oui"
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>

                            {temoinViolations === 'Oui' && (
                                <div className="mt-4 space-y-4">

                                    {/* Description - même structure sur tous les écrans */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Décrivez les circonstances:
                                        </label>
                                        <textarea
                                            {...register('detailsViolations.0.description')}
                                            rows={4}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        />
                                    </div>

                                    {/* Table desktop */}
                                    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {[...Array(violationRows)].map((_, index) => (
                                                    <tr key={index}>
                                                        {['dateDebut', 'dateFin', 'lieu', 'pays'].map((field) => (
                                                            <td key={field} className="px-4 py-2 whitespace-nowrap">
                                                                <input
                                                                    {...register(`detailsViolations.${index}.${field}`)}
                                                                    placeholder={field.includes('date') ? 'MM/AAAA' : ''}
                                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                                />
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Mobile layout */}
                                    <div className="md:hidden space-y-4">
                                        {[...Array(violationRows)].map((_, index) => (
                                            <div key={index} className="space-y-2 p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        {...register(`detailsViolations.${index}.dateDebut`)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        {...register(`detailsViolations.${index}.dateFin`)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Lieu</label>
                                                    <input
                                                        {...register(`detailsViolations.${index}.lieu`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                    <input
                                                        {...register(`detailsViolations.${index}.pays`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={addViolationRow}
                                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                                    >
                                        <FiPlus className="mr-2" />
                                        Ajouter une période
                                    </button>
                                </div>
                            )}

                        </section>

                        {/* Section: Appartenance à des Organisations */}
                        <section className="mb-8 bg-gray-50 p-5 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Appartenance à des Organisations</h2>

                            <div className="mb-4">
                                <p className="text-gray-700 mb-2">
                                    Êtes-vous, ou avez-vous déjà été, membre ou affilié d'un parti politique ou d'un autre groupe ou d'une autre organisation qui ont utilisé ou prôné la violence dans le but d'atteindre un objectif politique ou religieux?
                                </p>
                                <div className="flex space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register('affiliationOrganisation')}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            value="Non"
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register('affiliationOrganisation')}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            value="Oui"
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>

                            {affiliationOrganisation === 'Oui' && (
                                <div className="mt-4 space-y-4">

                                    {/* Version desktop/tablette */}
                                    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom de l'organisation</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activités/postes</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {[...Array(affiliationRows)].map((_, index) => (
                                                    <tr key={index}>
                                                        {['nomOrganisation', 'dateDebut', 'dateFin', 'activites', 'pays'].map((field) => (
                                                            <td key={field} className="px-4 py-2 whitespace-nowrap">
                                                                <input
                                                                    {...register(`detailsAffiliation.${index}.${field}`)}
                                                                    placeholder={field.includes('date') ? 'MM/AAAA' : ''}
                                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                                />
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Version mobile */}
                                    <div className="md:hidden space-y-4">
                                        {[...Array(affiliationRows)].map((_, index) => (
                                            <div key={index} className="space-y-2 p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Nom de l'organisation</label>
                                                    <input
                                                        {...register(`detailsAffiliation.${index}.nomOrganisation`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        {...register(`detailsAffiliation.${index}.dateDebut`)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        {...register(`detailsAffiliation.${index}.dateFin`)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Activités/postes</label>
                                                    <input
                                                        {...register(`detailsAffiliation.${index}.activites`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                    <input
                                                        {...register(`detailsAffiliation.${index}.pays`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={addAffiliationRow}
                                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                                    >
                                        <FiPlus className="mr-2" />
                                        Ajouter une organisation
                                    </button>
                                </div>
                            )}

                        </section>

                        {/* Section: Charges Publiques */}
                        <section className="mb-8 bg-gray-50 p-5 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Charges Publiques</h2>

                            <div className="mb-4">
                                <p className="text-gray-700 mb-2">
                                    Avez-vous déjà occupé une charge publique (telle que fonctionnaire, juge, policier, maire, député, administrateur d'hôpital)?
                                </p>
                                <div className="flex space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register('chargePublique')}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            value="Non"
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register('chargePublique')}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            value="Oui"
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>

                            {chargePublique === 'Oui' && (
                                <div className="mt-4 space-y-4">

                                    {/* Table visible sur md et + */}
                                    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sphère de compétence</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poste occupé</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {[...Array(chargeRows)].map((_, index) => (
                                                    <tr key={index}>
                                                        {['pays', 'dateDebut', 'dateFin', 'sphereCompetence', 'poste'].map((field) => (
                                                            <td key={field} className="px-4 py-2 whitespace-nowrap">
                                                                <input
                                                                    {...register(`detailsCharges.${index}.${field}`)}
                                                                    placeholder={field.includes('date') ? 'MM/AAAA' : ''}
                                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                                />
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Version mobile (stacked) */}
                                    <div className="md:hidden space-y-4">
                                        {[...Array(chargeRows)].map((_, index) => (
                                            <div key={index} className="space-y-2 p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                    <input
                                                        {...register(`detailsCharges.${index}.pays`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        {...register(`detailsCharges.${index}.dateDebut`)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        {...register(`detailsCharges.${index}.dateFin`)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Sphère de compétence</label>
                                                    <input
                                                        {...register(`detailsCharges.${index}.sphereCompetence`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Poste occupé</label>
                                                    <input
                                                        {...register(`detailsCharges.${index}.poste`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={addChargeRow}
                                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                                    >
                                        <FiPlus className="mr-2" />
                                        Ajouter une charge
                                    </button>
                                </div>
                            )}

                        </section>

                        {/* Section: Voyages */}
                        <section className="mb-8 bg-gray-50 p-5 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Voyages Précédents</h2>

                            <div className="mb-4">
                                <p className="text-gray-700 mb-2">
                                    Depuis l'âge de 18 ans ou au cours des cinq dernières années, selon la plus récente, avez-vous voyagé vers un pays ou territoire autre que le pays de votre nationalité ou votre pays ou territoire de résidence actuel?
                                </p>
                                <div className="flex space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register('voyages')}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            value="Non"
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            {...register('voyages')}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                            value="Oui"
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>

                            {voyages === 'Oui' && (
                                <div className="mt-4 space-y-4">

                                    {/* Version table (md et plus) */}
                                    <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endroit</th>
                                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">But du voyage</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {[...Array(voyageRows)].map((_, index) => (
                                                    <tr key={index}>
                                                        {['pays', 'dateDebut', 'dateFin', 'endroit', 'but'].map((field) => (
                                                            <td key={field} className="px-4 py-2 whitespace-nowrap">
                                                                <input
                                                                    {...register(`detailsVoyages.${index}.${field}`)}
                                                                    placeholder={field.includes('date') ? 'MM/AAAA' : ''}
                                                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                                />
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Version mobile */}
                                    <div className="md:hidden space-y-4">
                                        {[...Array(voyageRows)].map((_, index) => (
                                            <div key={index} className="space-y-2 p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                    <input
                                                        {...register(`detailsVoyages.${index}.pays`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        {...register(`detailsVoyages.${index}.dateDebut`)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        {...register(`detailsVoyages.${index}.dateFin`)}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Endroit</label>
                                                    <input
                                                        {...register(`detailsVoyages.${index}.endroit`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">But du voyage</label>
                                                    <input
                                                        {...register(`detailsVoyages.${index}.but`)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={addVoyageRow}
                                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
                                    >
                                        <FiPlus className="mr-2" />
                                        Ajouter un voyage
                                    </button>
                                </div>
                            )}

                        </section>

                        {/* Bouton de soumission */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-6 py-3 rounded-lg transition ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Envoi en cours...
                                    </span>
                                ) : submitSuccess ? (
                                    <span className="flex items-center justify-center">
                                        <FiCheck className="mr-2" /> Demande envoyée avec succès
                                    </span>
                                ) : (
                                    "Soumettre la demande"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}