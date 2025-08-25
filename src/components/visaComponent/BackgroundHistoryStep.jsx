import React from 'react';
import { FiCheck, FiX, FiPlus, FiTrash2, FiUpload, FiChevronLeft, FiChevronRight, FiInfo } from 'react-icons/fi';

export const BackgroundHistoryStep = ({ formData, setFormData, handleArrayChange, addArrayEntry, removeArrayEntry }) => {
    return (
        <div className="space-y-6">
            {/* Champ Demandeur */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Qui est le demandeur principal ? (sélectionnez une seule option) <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="demandeurPrincipal"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            checked={formData.resident.Demandeur.includes('principal')}
                            onChange={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    resident: {
                                        ...prev.resident,
                                        Demandeur: ['principal'] // Remplace complètement le tableau
                                    }
                                }));
                            }}
                        />
                        <span className="ml-2">Demandeur principal</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="demandeurPrincipal"
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            checked={formData.resident.Demandeur.includes('conjoint')}
                            onChange={() => {
                                setFormData(prev => ({
                                    ...prev,
                                    resident: {
                                        ...prev.resident,
                                        Demandeur: ['conjoint'] // Remplace complètement le tableau
                                    }
                                }));
                            }}
                        />
                        <span className="ml-2">Époux/Conjoint ou Enfant (+18 ans)</span>
                    </label>
                </div>
            </div>

            {/* Section Militaire */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Service militaire ou paramilitaire</h3>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Avez-vous fait partie d'une armée, d'une milice, d'une unité de défense civile, d'un service de renseignement ou d'un corps de police (y compris le service national non obligatoire et les unités de réserve ou volontaires) ?  <span className="text-red-500">*</span>
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
                        Avez-vous été témoin de mauvais traitements infligés à des prisonniers ou des civils, ou d'actes de pillage ou de profanation d'édifices religieux, ou avez-vous participé à ces actes ? <span className="text-red-500">*</span>
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
                        Êtes-vous, ou avez-vous déjà été, membre ou affilié d’un parti politique ou d’un autre groupe ou d’une autre organisation qui ont utilisé ou prôné la violence dans le but d’atteindre un objectif politique ou religieux, ou qui ont déjà été impliqués dans des activités criminelles ? N’utilisez pas d’abréviations. <span className="text-red-500">*</span>
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
                        AAvez-vous déjà occupé une charge publique (telle que fonctionnaire, juge, policier, maire, député, administrateur d’hôpital) ? N’utilisez pas d’abréviations. <span className="text-red-500">*</span>
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
                        Depuis l’âge de 18 ans ou au cours des cinq dernières années, selon la plus récente, avez-vous voyagé vers un pays ou territoire autre que le pays de votre nationalité ou votre pays ou territoire de résidence actuel ? <span className="text-red-500">*</span>
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
}