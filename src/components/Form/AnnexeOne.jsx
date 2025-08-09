import React, { useState } from 'react';
import { FiCheck, FiPlus } from 'react-icons/fi';
import { submitCanadianForm } from '../../services/annexeSrvice';

export default function FormulaireDemandeCanadienne() {
    // États pour gérer les lignes dynamiques
    const [serviceRows, setServiceRows] = useState(1);
    const [violationRows, setViolationRows] = useState(1);
    const [affiliationRows, setAffiliationRows] = useState(1);
    const [chargeRows, setChargeRows] = useState(1);
    const [voyageRows, setVoyageRows] = useState(1);

    // États pour gérer la soumission
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // État principal du formulaire
    const [formData, setFormData] = useState({
        nomFamille: '',
        prenoms: '',
        dateNaissance: '',
        iuc: '',
        email: '',
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
    });

    // Gestion des changements pour les champs simples
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Gestion des changements pour les tableaux (sections dynamiques)
    const handleArrayInputChange = (e, arrayName, index, field) => {
        const { value } = e.target;
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

    // Soumission du formulaire
    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await submitCanadianForm(formData);
            setSubmitSuccess(true);
        } catch (error) {
            console.error('Erreur lors de la soumission:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Fonctions pour ajouter des lignes dynamiques
    const addServiceRow = () => setServiceRows(prev => prev + 1);
    const addViolationRow = () => setViolationRows(prev => prev + 1);
    const addAffiliationRow = () => setAffiliationRows(prev => prev + 1);
    const addChargeRow = () => setChargeRows(prev => prev + 1);
    const addVoyageRow = () => setVoyageRows(prev => prev + 1);

    return (
        <div className="px-[6.5%] py-12 mx-auto my-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-primary mb-2">Demande de statut de résident temporaire</h1>
                    <p className="text-gray-600 mb-6">Veuillez remplir toutes les informations requises</p>

                    <form onSubmit={onSubmit} className="space-y-8">
                        {/* Section: Identité Personnelle */}
                        <section className="mb-8 bg-gray-50 p-5 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Identité Personnelle</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom de famille</label>
                                    <input
                                        name="nomFamille"
                                        value={formData.nomFamille}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s)</label>
                                    <input
                                        name="prenoms"
                                        value={formData.prenoms}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                    <input
                                        type="date"
                                        name="dateNaissance"
                                        value={formData.dateNaissance}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Numéro IUC</label>
                                    <input
                                        name="iuc"
                                        value={formData.iuc}
                                        onChange={handleInputChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                    />
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
                                            name="serviceMilitaire"
                                            checked={formData.serviceMilitaire === 'Non'}
                                            onChange={() => setFormData(prev => ({ ...prev, serviceMilitaire: 'Non' }))}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="serviceMilitaire"
                                            checked={formData.serviceMilitaire === 'Oui'}
                                            onChange={() => setFormData(prev => ({ ...prev, serviceMilitaire: 'Oui' }))}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>

                            {formData.serviceMilitaire === 'Oui' && (
                                <div className="mt-4 space-y-4">
                                    {/* Version desktop */}
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
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsService[index]?.grade || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsService', index, 'grade')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsService[index]?.dateDebut || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsService', index, 'dateDebut')}
                                                                placeholder="MM/AAAA"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsService[index]?.dateFin || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsService', index, 'dateFin')}
                                                                placeholder="MM/AAAA"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsService[index]?.lieuPoste || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsService', index, 'lieuPoste')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsService[index]?.pays || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsService', index, 'pays')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Version mobile */}
                                    <div className="md:hidden space-y-4">
                                        {[...Array(serviceRows)].map((_, index) => (
                                            <div key={index} className="space-y-2 p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Grade</label>
                                                    <input
                                                        value={formData.detailsService[index]?.grade || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsService', index, 'grade')}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        value={formData.detailsService[index]?.dateDebut || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsService', index, 'dateDebut')}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        value={formData.detailsService[index]?.dateFin || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsService', index, 'dateFin')}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Lieu de poste</label>
                                                    <input
                                                        value={formData.detailsService[index]?.lieuPoste || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsService', index, 'lieuPoste')}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                    <input
                                                        value={formData.detailsService[index]?.pays || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsService', index, 'pays')}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>

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

                        {/* Sections similaires pour les autres parties du formulaire */}
                        {/* Témoin de Violations */}
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
                                            name="temoinViolations"
                                            checked={formData.temoinViolations === 'Non'}
                                            onChange={() => setFormData(prev => ({ ...prev, temoinViolations: 'Non' }))}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="temoinViolations"
                                            checked={formData.temoinViolations === 'Oui'}
                                            onChange={() => setFormData(prev => ({ ...prev, temoinViolations: 'Oui' }))}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>

                            {formData.temoinViolations === 'Oui' && (
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Décrivez les circonstances:
                                        </label>
                                        <textarea
                                            value={formData.detailsViolations[0]?.description || ''}
                                            onChange={(e) => handleArrayInputChange(e, 'detailsViolations', 0, 'description')}
                                            rows={4}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                        />
                                    </div>

                                    {/* Version desktop */}
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
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsViolations[index]?.dateDebut || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsViolations', index, 'dateDebut')}
                                                                placeholder="MM/AAAA"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsViolations[index]?.dateFin || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsViolations', index, 'dateFin')}
                                                                placeholder="MM/AAAA"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsViolations[index]?.lieu || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsViolations', index, 'lieu')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsViolations[index]?.pays || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsViolations', index, 'pays')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Version mobile */}
                                    <div className="md:hidden space-y-4">
                                        {[...Array(violationRows)].map((_, index) => (
                                            <div key={index} className="space-y-2 p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        value={formData.detailsViolations[index]?.dateDebut || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsViolations', index, 'dateDebut')}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        value={formData.detailsViolations[index]?.dateFin || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsViolations', index, 'dateFin')}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Lieu</label>
                                                    <input
                                                        value={formData.detailsViolations[index]?.lieu || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsViolations', index, 'lieu')}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                    <input
                                                        value={formData.detailsViolations[index]?.pays || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsViolations', index, 'pays')}
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
                                            name="affiliationOrganisation"
                                            checked={formData.affiliationOrganisation === 'Non'}
                                            onChange={() => setFormData(prev => ({ ...prev, affiliationOrganisation: 'Non' }))}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="affiliationOrganisation"
                                            checked={formData.affiliationOrganisation === 'Oui'}
                                            onChange={() => setFormData(prev => ({ ...prev, affiliationOrganisation: 'Oui' }))}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>

                            {formData.affiliationOrganisation === 'Oui' && (
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
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsAffiliation[index]?.nomOrganisation || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsAffiliation', index, 'nomOrganisation')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsAffiliation[index]?.dateDebut || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsAffiliation', index, 'dateDebut')}
                                                                placeholder="MM/AAAA"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsAffiliation[index]?.dateFin || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsAffiliation', index, 'dateFin')}
                                                                placeholder="MM/AAAA"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsAffiliation[index]?.activites || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsAffiliation', index, 'activites')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsAffiliation[index]?.pays || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsAffiliation', index, 'pays')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
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
                                                        value={formData.detailsAffiliation[index]?.nomOrganisation || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsAffiliation', index, 'nomOrganisation')}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        value={formData.detailsAffiliation[index]?.dateDebut || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsAffiliation', index, 'dateDebut')}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        value={formData.detailsAffiliation[index]?.dateFin || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsAffiliation', index, 'dateFin')}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Activités/postes</label>
                                                    <input
                                                        value={formData.detailsAffiliation[index]?.activites || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsAffiliation', index, 'activites')}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                    <input
                                                        value={formData.detailsAffiliation[index]?.pays || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsAffiliation', index, 'pays')}
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
                                            name="chargePublique"
                                            checked={formData.chargePublique === 'Non'}
                                            onChange={() => setFormData(prev => ({ ...prev, chargePublique: 'Non' }))}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="chargePublique"
                                            checked={formData.chargePublique === 'Oui'}
                                            onChange={() => setFormData(prev => ({ ...prev, chargePublique: 'Oui' }))}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>

                            {formData.chargePublique === 'Oui' && (
                                <div className="mt-4 space-y-4">
                                    {/* Version desktop */}
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
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsCharges[index]?.pays || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsCharges', index, 'pays')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsCharges[index]?.dateDebut || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsCharges', index, 'dateDebut')}
                                                                placeholder="MM/AAAA"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsCharges[index]?.dateFin || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsCharges', index, 'dateFin')}
                                                                placeholder="MM/AAAA"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsCharges[index]?.sphereCompetence || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsCharges', index, 'sphereCompetence')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsCharges[index]?.poste || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsCharges', index, 'poste')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Version mobile */}
                                    <div className="md:hidden space-y-4">
                                        {[...Array(chargeRows)].map((_, index) => (
                                            <div key={index} className="space-y-2 p-4 border border-gray-200 rounded-lg">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Pays</label>
                                                    <input
                                                        value={formData.detailsCharges[index]?.pays || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsCharges', index, 'pays')}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        value={formData.detailsCharges[index]?.dateDebut || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsCharges', index, 'dateDebut')}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        value={formData.detailsCharges[index]?.dateFin || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsCharges', index, 'dateFin')}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Sphère de compétence</label>
                                                    <input
                                                        value={formData.detailsCharges[index]?.sphereCompetence || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsCharges', index, 'sphereCompetence')}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Poste occupé</label>
                                                    <input
                                                        value={formData.detailsCharges[index]?.poste || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsCharges', index, 'poste')}
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

                        {/* Section: Voyages Précédents */}
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
                                            name="voyages"
                                            checked={formData.voyages === 'Non'}
                                            onChange={() => setFormData(prev => ({ ...prev, voyages: 'Non' }))}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="ml-2">Non</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="voyages"
                                            checked={formData.voyages === 'Oui'}
                                            onChange={() => setFormData(prev => ({ ...prev, voyages: 'Oui' }))}
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        />
                                        <span className="ml-2">Oui</span>
                                    </label>
                                </div>
                            </div>

                            {formData.voyages === 'Oui' && (
                                <div className="mt-4 space-y-4">
                                    {/* Version desktop */}
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
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsVoyages[index]?.pays || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsVoyages', index, 'pays')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsVoyages[index]?.dateDebut || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsVoyages', index, 'dateDebut')}
                                                                placeholder="MM/AAAA"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsVoyages[index]?.dateFin || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsVoyages', index, 'dateFin')}
                                                                placeholder="MM/AAAA"
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsVoyages[index]?.endroit || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsVoyages', index, 'endroit')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 whitespace-nowrap">
                                                            <input
                                                                value={formData.detailsVoyages[index]?.but || ''}
                                                                onChange={(e) => handleArrayInputChange(e, 'detailsVoyages', index, 'but')}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                            />
                                                        </td>
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
                                                        value={formData.detailsVoyages[index]?.pays || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsVoyages', index, 'pays')}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Du (MM/AAAA)</label>
                                                    <input
                                                        value={formData.detailsVoyages[index]?.dateDebut || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsVoyages', index, 'dateDebut')}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Au (MM/AAAA)</label>
                                                    <input
                                                        value={formData.detailsVoyages[index]?.dateFin || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsVoyages', index, 'dateFin')}
                                                        placeholder="MM/AAAA"
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Endroit</label>
                                                    <input
                                                        value={formData.detailsVoyages[index]?.endroit || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsVoyages', index, 'endroit')}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">But du voyage</label>
                                                    <input
                                                        value={formData.detailsVoyages[index]?.but || ''}
                                                        onChange={(e) => handleArrayInputChange(e, 'detailsVoyages', index, 'but')}
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