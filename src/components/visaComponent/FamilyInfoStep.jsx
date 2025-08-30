import React from 'react';

import { FiCheck, FiX, FiPlus, FiTrash2, FiUpload, FiChevronLeft, FiChevronRight, FiInfo } from 'react-icons/fi';


export const FamilyInfoStep = ({ formData, setFormData, handleArrayChange, addArrayEntry, removeArrayEntry }) => {
    return (
        <div className="space-y-6">
            {/* Section Type de demande */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Type de demande <span className="text-red-500">*</span></h3>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet <span className="text-red-500">*</span></label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance <span className="text-red-500">*</span></label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance <span className="text-red-500">*</span></label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profession <span className="text-red-500">*</span></label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial <span className="text-red-500">*</span></label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle <span className="text-red-500">*</span></label>
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
                    {/* <div>
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
                    </div> */}
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profession <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Accompagne le demandeur au Canada ? <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays de naissance <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profession <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse actuelle <span className="text-red-500">*</span></label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Accompagne le demandeur au Canada ? <span className="text-red-500">*</span></label>
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
}