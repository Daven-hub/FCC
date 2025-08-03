import React, { useState } from 'react';
import { FiCheck, FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { submitTemporaryResidentApplication } from '../../services/temporaireService';

export default function Temporaire() {
    const [formData, setFormData] = useState({
        // Identité Personnelle
        nomFamille: '',
        prenoms: '',
        dateNaissance: '',
        iuc: '',
        sexe: '',
        villeNaissance: '',
        paysNaissance: '',
        citoyennete: '',
        aUtiliseAutreNom: 'non',
        ancienNom: '',
        ancienPrenom: '',

        // Résidence
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

        // État matrimonial
        etatMatrimonial: '',
        dateMariageUnion: '',
        nomConjoint: '',
        prenomConjoint: '',

        // Langues
        langueMaternelle: '',
        langueAise: '',
        communicationDeuxLangues: '',
        evaluationLangue: '',

        // Passeport
        numeroPasseport: '',
        paysDelivrancePasseport: '',
        dateDelivrancePasseport: '',
        dateExpirationPasseport: '',
        passeportTaiwan: '',
        passeportIsrael: '',

        // Pièce d'identité nationale
        aPieceIdentite: 'non',
        numeroPiece: '',
        paysDelivrancePiece: '',
        dateDelivrancePiece: '',
        dateExpirationPiece: '',

        // Carte verte
        aCarteVerte: 'non',
        numeroCarteVerte: '',
        expirationCarteVerte: '',

        // Coordonnées
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

        // Antécédents
        tuberculoseContact: 'non',
        troublePhysiqueMental: 'non',
        detailsTuberculoseTrouble: '',
        statutExpire: 'non',
        refusEntree: 'non',
        demandePrecedenteCanada: 'non',
        detailsStatutRefusDemande: '',
        antecedentsJudiciaires: 'non',
        detailsAntecedentsJudiciaires: '',

        // Déclaration
        declarationAgreed: false
    });

    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus("loading");

        try {
            await submitTemporaryResidentApplication(formData);
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
                    <h1 className="text-3xl font-bold text-primary mb-2">Demande de statut de résident temporaire</h1>
                    <p className="text-gray-600 mb-6">Veuillez remplir toutes les informations requises</p>

                    <form onSubmit={handleSubmit}>
                        {/* Identité Personnelle */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Identité Personnelle</h2>

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
                        </section>

                        {/* Résidence */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Résidence</h2>

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
                        </section>

                        {/* État matrimonial */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">État matrimonial</h2>

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
                        </section>

                        {/* Langue(s) */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Langue(s)</h2>

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
                        </section>

                        {/* Passeport */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Passeport</h2>

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
                        </section>

                        {/* Pièce d'identité nationale */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Pièce d'identité nationale</h2>

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
                        </section>

                        {/* Carte verte (USA) */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Carte de résident permanent des États-Unis</h2>

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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de la pièce</label>
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
                        </section>

                        {/* Coordonnées */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Coordonnées</h2>

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
                        </section>

                        {/* Coordonnées */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Coordonnées</h2>

                            {/* Adresse du domicile */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adresse du domicile</label>
                                <div className="mt-2 mb-4">
                                    <label className="mr-4 flex items-center">
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

                            {/* Numéro de téléphone */}
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

                            {/* Autre numéro de téléphone */}
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

                            {/* Numéro de télécopieur */}
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
                        </section>

                        {/* Antécédents */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Antécédents</h2>
                            <p className="text-sm text-gray-600">Si vous avez 18 ans et plus vous devez remplir cette section.</p>

                            {/* Question 1 */}
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

                            {/* Question 2 */}
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

                            {/* Question 3 */}
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
                        </section>

                        {/* Déclaration */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Déclaration</h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <input
                                        type="checkbox"
                                        className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                        checked={formData.declarationAgreed}
                                        onChange={e => handleChange('declarationAgreed', e.target.checked)}
                                        required
                                    />
                                    <label className="ml-2 block text-sm text-gray-700">
                                        Je déclare que les renseignements fournis dans le présent formulaire sont exacts et complets. Je comprends qu'on pourrait refuser ma demande si j'ai fourni des renseignements faux ou trompeurs ou si j'ai omis des renseignements.
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Bouton de soumission */}
                        <div className="flex justify-end">
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