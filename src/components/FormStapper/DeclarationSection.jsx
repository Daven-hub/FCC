import React from 'react';
import { FiPlus, FiX } from 'react-icons/fi';

export const DeclarationSection = ({
    declarationAgreed,
    onAgreementChange,
    showPreview,
    onTogglePreview,
    formData
}) => {
    return (
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
                                checked={declarationAgreed}
                                onChange={onAgreementChange}
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

            {/* <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Aperçu de votre demande</h3>
                    <button
                        type="button"
                        onClick={onTogglePreview}
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
                    </div>
                )}
            </div> */}
        </div>
    );
};
