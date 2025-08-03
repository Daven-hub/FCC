import React, { useState } from "react";
import { FiCheck, FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import { submitFamilyApplication } from "../../services/familyService";

export default function FamilyForm() {
    const [formData, setFormData] = useState({
        applicant: {
            name: "",
            dob: "",
            country: "",
            occupation: "",
            maritalStatus: "",
            address: "",
            coming: false
        },
        epouse: {
            name: "",
            dob: "",
            country: "",
            occupation: "",
            maritalStatus: "",
            address: "",
            coming: false
        },
        father: {
            name: "",
            dob: "",
            country: "",
            occupation: "",
            address: "",
            coming: false
        },
        mother: {
            name: "",
            dob: "",
            country: "",
            occupation: "",
            address: "",
            coming: false
        },
        children: [],
        siblings: [],
        declarationAgreed: false,
    });

    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleAddEntry = (section) => {
        setFormData(prev => ({
            ...prev,
            [section]: [...prev[section], {
                name: "",
                dob: "",
                country: "",
                occupation: "",
                maritalStatus: "",
                address: "",
                coming: false
            }],
        }));
    };

    const handleRemoveEntry = (section, index) => {
        const updated = [...formData[section]];
        updated.splice(index, 1);
        setFormData(prev => ({ ...prev, [section]: updated }));
    };

    const handleEntryChange = (section, index, field, value) => {
        const updated = [...formData[section]];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, [section]: updated }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus("loading");

        try {
            await submitFamilyApplication(formData);
            setSubmitStatus("success");
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("error");
        }
    };

    return (
        <div className="px-[6.5%] py-12 mx-auto my-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-primary mb-2">Information sur la famille</h1>
                    <p className="text-gray-600 mb-6">Veuillez remplir toutes les informations requises</p>

                    <form onSubmit={handleSubmit}>
                        {['applicant', 'epouse', 'father', 'mother'].map(section => (
                            <section key={section} className="mb-8 bg-gray-50 p-5 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
                                    {section === 'applicant' ? 'Demandeur' :
                                        section === 'epouse' ? 'Époux/Épouse' :
                                            section === 'father' ? 'Père' : 'Mère'}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData[section].name}
                                            onChange={e => handleChange(section, 'name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData[section].dob}
                                            onChange={e => handleChange(section, 'dob', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData[section].country}
                                            onChange={e => handleChange(section, 'country', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData[section].occupation}
                                            onChange={e => handleChange(section, 'occupation', e.target.value)}
                                            required
                                        />
                                    </div>
                                    {(section !== 'father' && section !== 'mother') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">État civil</label>
                                            <input
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={formData[section].maritalStatus}
                                                onChange={e => handleChange(section, 'maritalStatus', e.target.value)}
                                                required
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                        <input
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                            value={formData[section].address}
                                            onChange={e => handleChange(section, 'address', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                            checked={formData[section].coming}
                                            onChange={e => handleChange(section, 'coming', e.target.checked)}
                                        />
                                        <span className="ml-2 text-gray-700">Accompagnera au Canada</span>
                                    </label>
                                </div>
                            </section>
                        ))}

                        {['children', 'siblings'].map(group => (
                            <section key={group} className="mb-8 bg-gray-50 p-5 rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold text-gray-800 capitalize">
                                        {group === 'children' ? 'Enfants' : 'Frères et sœurs'}
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={() => handleAddEntry(group)}
                                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary transition"
                                    >
                                        <FiPlus className="mr-2" />
                                        Ajouter {group === 'children' ? 'un enfant' : 'un frère/sœur'}
                                    </button>
                                </div>

                                {formData[group].length === 0 ? (
                                    <p className="text-gray-500 italic">Aucun {group === 'children' ? 'enfant' : 'frère/sœur'} ajouté</p>
                                ) : (
                                    formData[group].map((entry, idx) => (
                                        <div key={idx} className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                                            <div className="flex justify-between items-center mb-3">
                                                <h3 className="font-medium text-gray-800">
                                                    {group === 'children' ? 'Enfant' : 'Frère/Sœur'} #{idx + 1}
                                                </h3>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveEntry(group, idx)}
                                                    className="text-red-500 hover:text-red-700 p-1"
                                                >
                                                    <FiTrash2 />
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                                    <input
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        value={entry.name}
                                                        onChange={e => handleEntryChange(group, idx, 'name', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                                    <input
                                                        type="date"
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        value={entry.dob}
                                                        onChange={e => handleEntryChange(group, idx, 'dob', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                                    <input
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        value={entry.country}
                                                        onChange={e => handleEntryChange(group, idx, 'country', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                                    <input
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        value={entry.occupation}
                                                        onChange={e => handleEntryChange(group, idx, 'occupation', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">État civil</label>
                                                    <input
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        value={entry.maritalStatus}
                                                        onChange={e => handleEntryChange(group, idx, 'maritalStatus', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                                    <input
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        value={entry.address}
                                                        onChange={e => handleEntryChange(group, idx, 'address', e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <label className="inline-flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                                        checked={entry.coming}
                                                        onChange={e => handleEntryChange(group, idx, 'coming', e.target.checked)}
                                                    />
                                                    <span className="ml-2 text-gray-700">Accompagnera au Canada</span>
                                                </label>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </section>
                        ))}

                        <div className="mb-6">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    checked={formData.declarationAgreed}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        declarationAgreed: e.target.checked
                                    }))}
                                    required
                                />
                                <span className="ml-2 text-gray-700">
                                    Je déclare que les informations fournies sont exactes et complètes.
                                </span>
                            </label>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                type="submit"
                                disabled={submitStatus === "loading"}
                                className={`px-6 py-3 rounded-lg transition ${submitStatus === "loading" ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
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
                                        <FiX className="mr-2" /> Erreur lors de l'envoi
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