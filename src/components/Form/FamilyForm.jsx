import React, { useState } from "react";
import { FiUpload, FiCheck, FiX, FiPlus, FiTrash2 } from "react-icons/fi";

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

    const [uploadProgress, setUploadProgress] = useState({});
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

    const handleFileUpload = (category, document, file) => {
        if (!file) return;

        // Simulate upload progress
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitStatus("loading");

        // Simulate form submission
        setTimeout(() => {
            console.log("Form data submitted:", formData);
            setSubmitStatus("success");
        }, 2000);
    };

    const renderFileUpload = (category, document, label) => {
        const docState = formData.documents?.[category]?.[document];
        const progress = uploadProgress[`${category}-${document}`];

        if (!docState) return null;

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
                    <h1 className="text-3xl font-bold text-primary mb-2">Information sur la famille</h1>
                    <p className="text-gray-600 mb-6">Veuillez remplir toutes les informations requises et uploader les documents nécessaires</p>

                    <div>
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
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData[section].dob}
                                            onChange={e => handleChange(section, 'dob', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData[section].country}
                                            onChange={e => handleChange(section, 'country', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={formData[section].occupation}
                                            onChange={e => handleChange(section, 'occupation', e.target.value)}
                                        />
                                    </div>
                                    {(section !== 'father' && section !== 'mother') && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">État civil</label>
                                            <input
                                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                value={formData[section].maritalStatus}
                                                onChange={e => handleChange(section, 'maritalStatus', e.target.value)}
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                        <input
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                            value={formData[section].address}
                                            onChange={e => handleChange(section, 'address', e.target.value)}
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
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                                                    <input
                                                        type="date"
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        value={entry.dob}
                                                        onChange={e => handleEntryChange(group, idx, 'dob', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance</label>
                                                    <input
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        value={entry.country}
                                                        onChange={e => handleEntryChange(group, idx, 'country', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Profession</label>
                                                    <input
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        value={entry.occupation}
                                                        onChange={e => handleEntryChange(group, idx, 'occupation', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">État civil</label>
                                                    <input
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        value={entry.maritalStatus}
                                                        onChange={e => handleEntryChange(group, idx, 'maritalStatus', e.target.value)}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle</label>
                                                    <input
                                                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                                                        value={entry.address}
                                                        onChange={e => handleEntryChange(group, idx, 'address', e.target.value)}
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

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handleSubmit}
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
                                ) : (
                                    "Soumettre la demande"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}