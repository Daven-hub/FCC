import React from 'react';

export const PersonalInfoStep = ({ formData, handleChange, handleArrayChange, addArrayEntry, removeArrayEntry }) => {
    return (

        <div className="space-y-6">
            {/* Section Informations Générales */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations Générales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">IUC (si applicable)</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.informationsGenerales.IUC}
                            onChange={e => handleChange('informationsGenerales.IUC', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Je veux être servi(e) en</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.informationsGenerales.servi}
                            onChange={e => handleChange('informationsGenerales.servi', e.target.value)}
                            required
                        >
                            <option value="">-- Sélectionnez --</option>
                            <option value="français">Français</option>
                            <option value="anglais">Anglais</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type de demande de visa</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.informationsGenerales.visa}
                            onChange={e => handleChange('informationsGenerales.visa', e.target.value)}
                            required
                        >
                            <option value="">-- Sélectionnez --</option>
                            <option value="visiteur">Visiteur</option>
                            <option value="travailleur">Transit</option>

                        </select>
                    </div>
                </div>
            </div>

            {/* Section Données Personnelles */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Données Personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de famille</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.donneesPersonnelles.nomComplet.nom}
                            onChange={e => handleChange('donneesPersonnelles.nomComplet.nom', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s)</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.donneesPersonnelles.nomComplet.prenoms}
                            onChange={e => handleChange('donneesPersonnelles.nomComplet.prenoms', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous utilisé un autre nom ?</label>
                    <div className="flex gap-4 mt-1">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.donneesPersonnelles.autreNomUtilise.utilise === false}
                                onChange={() => handleChange('donneesPersonnelles.autreNomUtilise.utilise', false)}
                                required
                            />
                            <span className="ml-2">Non</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.donneesPersonnelles.autreNomUtilise.utilise === true}
                                onChange={() => handleChange('donneesPersonnelles.autreNomUtilise.utilise', true)}
                            />
                            <span className="ml-2">Oui</span>
                        </label>
                    </div>
                </div>

                {formData.formulaireVisa.donneesPersonnelles.autreNomUtilise.utilise && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ancien nom de famille</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.donneesPersonnelles.autreNomUtilise.nom}
                                onChange={e => handleChange('donneesPersonnelles.autreNomUtilise.nom', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ancien(s) prénom(s)</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.donneesPersonnelles.autreNomUtilise.prenoms}
                                onChange={e => handleChange('donneesPersonnelles.autreNomUtilise.prenoms', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                )}

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sexe</label>
                    <div className="flex gap-4 mt-1">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.donneesPersonnelles.sexe === "Homme"}
                                onChange={() => handleChange('donneesPersonnelles.sexe', "Homme")}
                                required
                            />
                            <span className="ml-2">Homme</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.donneesPersonnelles.sexe === "Femme"}
                                onChange={() => handleChange('donneesPersonnelles.sexe', "Femme")}
                            />
                            <span className="ml-2">Femme</span>
                        </label>
                    </div>
                </div>

                <div className='mt-4'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
                    <input
                        type="date"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.formulaireVisa.donneesPersonnelles.dateNaissance}
                        onChange={e => handleChange('donneesPersonnelles.dateNaissance', e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Citoyenneté</label>
                    <input
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.formulaireVisa.donneesPersonnelles.citoyennete}
                        onChange={e => handleChange('donneesPersonnelles.citoyennete', e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Section Résidence */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Résidence</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de résidence actuelle</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.residence.actuelle.pays}
                            onChange={e => handleChange('residence.actuelle.pays', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Statut de résidence</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.residence.actuelle.statut}
                            onChange={e => handleChange('residence.actuelle.statut', e.target.value)}
                            required
                        >
                            <option value="">Sélectionnez un statut</option>
                            <option value="Citoyen">Citoyen</option>
                            <option value="Résident permanent">Résident permanent</option>
                            <option value="Personne Protégée">Personne Protégée</option>
                            <option value="Résident temporaire">Demandeur d'asile</option>
                            <option value="Étudiant">Étudiant</option>
                            <option value="Travailleur">Travailleur</option>
                            <option value="Touriste">Touriste</option>
                            <option value="Autre">Autre</option>
                        </select>

                        {formData.formulaireVisa.residence.actuelle.statut === "Autre" && (
                            <div className="mt-2">
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Précisez votre statut"
                                    value={formData.formulaireVisa.residence.actuelle.statutAutre || ''}
                                    onChange={e => handleChange('residence.actuelle.statutAutre', e.target.value)}
                                    required
                                />
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Du</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.residence.actuelle.du || ''}
                                onChange={e => handleChange('residence.actuelle.du', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Au</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.residence.actuelle.au || ''}
                                onChange={e => handleChange('residence.actuelle.au', e.target.value)}
                            />
                        </div>
                    </div>

                </div>



                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Avez-vous vécu dans un autre pays que votre pays de citoyenneté ou de résidence actuelle ?
                    </label>
                    <div className="flex gap-4 mt-1">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={!formData.formulaireVisa.residence.anterieure.aVecuAutrePays}
                                onChange={() => handleChange('residence.anterieure.aVecuAutrePays', false)}
                            />
                            <span className="ml-2">Non</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.residence.anterieure.aVecuAutrePays}
                                onChange={() => handleChange('residence.anterieure.aVecuAutrePays', true)}
                            />
                            <span className="ml-2">Oui</span>
                        </label>
                    </div>
                </div>

                {formData.formulaireVisa.residence.anterieure.aVecuAutrePays && (
                    <div className="mt-4 space-y-6">
                        {(formData.formulaireVisa.residence.anterieure.sejours || []).map((sejour, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 relative">
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                                    onClick={() => removeArrayEntry('formulaireVisa', 'residence.anterieure.sejours', index)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                        <input
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            value={sejour.pays || ''}
                                            onChange={e => handleArrayChange('formulaireVisa', 'residence.anterieure.sejours', index, 'pays', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                                        <select
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            value={sejour.statut || ''}
                                            onChange={e => handleArrayChange('formulaireVisa', 'residence.anterieure.sejours', index, 'statut', e.target.value)}
                                            required
                                        >
                                            <option value="">Sélectionnez un statut</option>
                                            <option value="Citoyen">Citoyen</option>
                                            <option value="Résident permanent">Résident permanent</option>
                                            <option value="Personne Protégée">Personne Protégée</option>
                                            <option value="Résident temporaire">Demandeur d'asile</option>
                                            <option value="Étudiant">Étudiant</option>
                                            <option value="Travailleur">Travailleur</option>
                                            <option value="Touriste">Touriste</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                        {sejour.statut === "Autre" && (
                                            <div className="mt-2">
                                                <input
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                                    placeholder="Précisez votre statut"
                                                    value={sejour.statutAutre || ''}
                                                    onChange={e => handleArrayChange('formulaireVisa', 'residence.anterieure.sejours', index, 'statutAutre', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de début (MM/AAAA)</label>
                                        <input
                                            type="text"
                                            placeholder="MM/AAAA"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            value={sejour.du || ''}
                                            onChange={e => handleArrayChange('formulaireVisa', 'residence.anterieure.sejours', index, 'du', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin (MM/AAAA)</label>
                                        <input
                                            type="text"
                                            placeholder="MM/AAAA"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                            value={sejour.au || ''}
                                            onChange={e => handleArrayChange('formulaireVisa', 'residence.anterieure.sejours', index, 'au', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            onClick={() => addArrayEntry('formulaireVisa', 'residence.anterieure.sejours', {
                                pays: '',
                                statut: '',
                                statutAutre: '',
                                du: '',
                                au: ''
                            })}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Ajouter un autre séjour
                        </button>
                    </div>
                )}


                {/* Section pays de demande */}
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Faites-vous la demande depuis un autre pays que votre pays de résidence actuelle ?</label>
                    <div className="flex gap-4 mt-1">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.residence.paysDemande.memeQueResidence === true}
                                onChange={() => handleChange('residence.paysDemande.memeQueResidence', true)}
                                required
                            />
                            <span className="ml-2">Non</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.residence.paysDemande.memeQueResidence === false}
                                onChange={() => handleChange('residence.paysDemande.memeQueResidence', false)}
                            />
                            <span className="ml-2">Oui</span>
                        </label>
                    </div>
                </div>

                {!formData.formulaireVisa.residence.paysDemande.memeQueResidence && (
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays où vous faites la demande</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.residence.paysDemande.pays || ''}
                                onChange={e => handleChange('residence.paysDemande.pays', e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Statut dans ce pays</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.residence.paysDemande.statut || ''}
                                onChange={e => handleChange('residence.paysDemande.statut', e.target.value)}
                                required
                            >
                                <option value="">Sélectionnez un statut</option>
                                <option value="Citoyen">Citoyen</option>
                                <option value="Résident permanent">Résident permanent</option>
                                <option value="Personne Protégée">Personne Protégée</option>
                                <option value="Résident temporaire">Demandeur d'asile</option>
                                <option value="Étudiant">Étudiant</option>
                                <option value="Travailleur">Travailleur</option>
                                <option value="Touriste">Touriste</option>
                                <option value="Autre">Autre</option>
                            </select>
                            {formData.formulaireVisa.residence.paysDemande.statut === "Autre" && (
                                <div className="mt-2">
                                    <input
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Précisez votre statut"
                                        value={formData.formulaireVisa.residence.paysDemande.statutAutre || ''}
                                        onChange={e => handleChange('residence.paysDemande.statutAutre', e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de début (MM/AAAA)</label>
                                <input
                                    type="text"
                                    placeholder="MM/AAAA"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.residence.paysDemande.du || ''}
                                    onChange={e => handleChange('residence.paysDemande.du', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de fin (MM/AAAA)</label>
                                <input
                                    type="text"
                                    placeholder="MM/AAAA"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.residence.paysDemande.au || ''}
                                    onChange={e => handleChange('residence.paysDemande.au', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Section État Matrimonial */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">État Matrimonial</h3>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">État matrimonial actuel</label>
                    <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.formulaireVisa.etatMatrimonial.etat}
                        onChange={e => handleChange('etatMatrimonial.etat', e.target.value)}
                        required
                    >
                        <option value="">-- Sélectionnez --</option>
                        <option value="celibataire">Célibataire</option>
                        <option value="union">Conjoint (e) de fait</option>
                        <option value="marie">Marié(e)</option>
                        <option value="inconnu">Inconnu</option>
                        <option value="annule">Mariage annulé</option>
                        <option value="divorce">Divorcé(e)</option>
                        <option value="separe">Séparé (e) légalement</option>
                        <option value="veuf">Veuf (ve)</option>
                    </select>
                </div>

                {(formData.formulaireVisa.etatMatrimonial.etat === "marie" || formData.formulaireVisa.etatMatrimonial.etat === "union") && (
                    <>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date du mariage ou début de l'union</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.etatMatrimonial.dateMariageOuUnion}
                                onChange={e => handleChange('etatMatrimonial.dateMariageOuUnion', e.target.value)}
                                required
                            />
                        </div>

                        {/* <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous déjà été marié(e) ou en union de fait ?</label>
                                    <div className="flex gap-4 mt-1">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.etatMatrimonial.dejaMarieOuUnionFait === false}
                                                onChange={() => handleChange('etatMatrimonial.dejaMarieOuUnionFait', false)}
                                                required
                                            />
                                            <span className="ml-2">Non</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                                checked={formData.formulaireVisa.etatMatrimonial.dejaMarieOuUnionFait === true}
                                                onChange={() => handleChange('etatMatrimonial.dejaMarieOuUnionFait', true)}
                                            />
                                            <span className="ml-2">Oui</span>
                                        </label>
                                    </div>
                                </div> */}

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du conjoint</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.etatMatrimonial.conjoint.nom}
                                    onChange={e => handleChange('etatMatrimonial.conjoint.nom', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Prénom(s) du conjoint</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.etatMatrimonial.conjoint.prenoms}
                                    onChange={e => handleChange('etatMatrimonial.conjoint.prenoms', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance du conjoint</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.etatMatrimonial.conjoint.dateNaissance}
                                    onChange={e => handleChange('etatMatrimonial.conjoint.dateNaissance', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>


            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                {/* Question principale */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Êtes-vous ou avez-vous déjà été marié(e) ou en union de fait ? *
                    </label>
                    <div className="flex gap-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="mariageEtat"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                checked={formData.formulaireVisa.mariage.etat === "oui"}
                                onChange={() => {
                                    handleChange('mariage.etat', "oui");
                                    // Réinitialisation des champs si on passe de non à oui
                                    if (formData.formulaireVisa.mariage.etat !== "oui") {
                                        handleChange('mariage.dateMariageOuUnion', "");
                                        handleChange('mariage.conjoint', {
                                            nom: "",
                                            prenoms: "",
                                            dateNaissance: "",
                                            lienParenter: "",
                                            genreLienParente: "",
                                            du: "",
                                            au: ""
                                        });
                                    }
                                }}
                            />
                            <span className="ml-2">Oui</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="mariageEtat"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                checked={formData.formulaireVisa.mariage.etat === "non"}
                                onChange={() => {
                                    handleChange('mariage.etat', "non");
                                    // Réinitialisation des champs si on passe de oui à non
                                    if (formData.formulaireVisa.mariage.etat !== "non") {
                                        handleChange('mariage.dateMariageOuUnion', "");
                                        handleChange('mariage.conjoint', {
                                            nom: "",
                                            prenoms: "",
                                            dateNaissance: "",
                                            lienParenter: "",
                                            genreLienParente: "",
                                            du: "",
                                            au: ""
                                        });
                                    }
                                }}
                            />
                            <span className="ml-2">Non</span>
                        </label>
                    </div>
                </div>

                {/* Champs conditionnels */}
                {formData.formulaireVisa.mariage.etat === "oui" && (
                    <div className="space-y-4">
                        {/* Nature et date de l'union */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date du mariage/début d'union
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.mariage.dateMariageOuUnion}
                                    onChange={e => handleChange('mariage.dateMariageOuUnion', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Informations sur le conjoint */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom du conjoint
                                </label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.mariage.conjoint.nom}
                                    onChange={e => handleChange('mariage.conjoint.nom', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Prénom(s) du conjoint
                                </label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.mariage.conjoint.prenoms}
                                    onChange={e => handleChange('mariage.conjoint.prenoms', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Lien et dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Lien de parenté
                                </label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.mariage.conjoint.genreLienParente}
                                    onChange={e => handleChange('mariage.conjoint.genreLienParente', e.target.value)}
                                >
                                    <option value="">-- Sélectionnez --</option>
                                    <option value="conjoint">Marié (e)</option>
                                    <option value="conjoint de fait">Conjoint de fait</option>

                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date de naissance du conjoint
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.mariage.conjoint.dateNaissance}
                                    onChange={e => handleChange('mariage.conjoint.dateNaissance', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Période de l'union */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date de début
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.mariage.conjoint.du}
                                    onChange={e => handleChange('mariage.conjoint.du', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date de fin (le cas échéant)
                                </label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.mariage.conjoint.au}
                                    onChange={e => handleChange('mariage.conjoint.au', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>


            {/* Section Langues */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Langues</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Langue maternelle</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.langues.langueMaternelle}
                            onChange={e => handleChange('langues.langueMaternelle', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Communiquez-vous en français ou en anglais ?</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.langues.communiqueFrancaisAnglaisDeuxLangues}
                            onChange={e => handleChange('langues.communiqueFrancaisAnglaisDeuxLangues', e.target.value)}
                            required
                        >
                            <option value="">-- Sélectionnez --</option>
                            <option value="francais">Français</option>
                            <option value="anglais">Anglais</option>
                            <option value="les Deux">Les deux</option>
                            <option value="aucun">Aucun</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Langue dans laquelle vous êtes le plus à l'aise</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.langues.languePlusAise}
                            onChange={e => handleChange('langues.languePlusAise', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Avez-vous passé une évaluation linguistique par un organisme approuvé ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.formulaireVisa.langues.evaluationOrganismeApprouve === false}
                                    onChange={() => handleChange('langues.evaluationOrganismeApprouve', false)}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.formulaireVisa.langues.evaluationOrganismeApprouve === true}
                                    onChange={() => handleChange('langues.evaluationOrganismeApprouve', true)}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Passeport */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Passeport</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de passeport</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.passeport.numero}
                            onChange={e => handleChange('passeport.numero', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays de délivrance</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.passeport.paysDelivrance}
                            onChange={e => handleChange('passeport.paysDelivrance', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de délivrance</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.passeport.dateDelivrance}
                            onChange={e => handleChange('passeport.dateDelivrance', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.passeport.dateExpiration}
                            onChange={e => handleChange('passeport.dateExpiration', e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Passeport délivré par Taïwan avec numéro d'identification ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.formulaireVisa.passeport.passeportTaiwanAvecID === false}
                                    onChange={() => handleChange('passeport.passeportTaiwanAvecID', false)}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.formulaireVisa.passeport.passeportTaiwanAvecID === true}
                                    onChange={() => handleChange('passeport.passeportTaiwanAvecID', true)}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Passeport national israélien ?</label>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.formulaireVisa.passeport.passeportNationalIsraelien === false}
                                    onChange={() => handleChange('passeport.passeportNationalIsraelien', false)}
                                    required
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={formData.formulaireVisa.passeport.passeportNationalIsraelien === true}
                                    onChange={() => handleChange('passeport.passeportNationalIsraelien', true)}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Pièce d'identité nationale */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pièce d'identité nationale</h3>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Possédez-vous une pièce d'identité nationale ?</label>
                    <div className="flex gap-4 mt-1">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.pieceIdentiteNationale.possede === false}
                                onChange={() => handleChange('pieceIdentiteNationale.possede', false)}
                                required
                            />
                            <span className="ml-2">Non</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.pieceIdentiteNationale.possede === true}
                                onChange={() => handleChange('pieceIdentiteNationale.possede', true)}
                            />
                            <span className="ml-2">Oui</span>
                        </label>
                    </div>
                </div>

                {formData.formulaireVisa.pieceIdentiteNationale.possede && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de la pièce d'identité</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.pieceIdentiteNationale.numero}
                                onChange={e => handleChange('pieceIdentiteNationale.numero', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Pays de délivrance</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.pieceIdentiteNationale.paysDelivrance}
                                onChange={e => handleChange('pieceIdentiteNationale.paysDelivrance', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date de délivrance</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.pieceIdentiteNationale.dateDelivrance}
                                onChange={e => handleChange('pieceIdentiteNationale.dateDelivrance', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.pieceIdentiteNationale.dateExpiration}
                                onChange={e => handleChange('pieceIdentiteNationale.dateExpiration', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Section Carte de résident permanent des USA */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Carte de résident permanent des États-Unis</h3>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Possédez-vous une carte de résident permanent des États-Unis ?</label>
                    <div className="flex gap-4 mt-1">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.carteResidentPermanentUSA.possede === false}
                                onChange={() => handleChange('carteResidentPermanentUSA.possede', false)}
                                required
                            />
                            <span className="ml-2">Non</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.carteResidentPermanentUSA.possede === true}
                                onChange={() => handleChange('carteResidentPermanentUSA.possede', true)}
                            />
                            <span className="ml-2">Oui</span>
                        </label>
                    </div>
                </div>

                {formData.formulaireVisa.carteResidentPermanentUSA.possede && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de la carte</label>
                            <input
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.carteResidentPermanentUSA.numero}
                                onChange={e => handleChange('carteResidentPermanentUSA.numero', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.formulaireVisa.carteResidentPermanentUSA.dateExpiration}
                                onChange={e => handleChange('carteResidentPermanentUSA.dateExpiration', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Section Coordonnées */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Coordonnées</h3>

                <h4 className="text-md font-medium text-gray-800 mb-2">Adresse postale actuelle</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Case postale</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.casePostale}
                            onChange={e => handleChange('coordonnees.adressePostaleActuelle.casePostale', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Appartement/Unité</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.noAppUnite}
                            onChange={e => handleChange('coordonnees.adressePostaleActuelle.noAppUnite', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de rue</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.numeroRue}
                            onChange={e => handleChange('coordonnees.adressePostaleActuelle.numeroRue', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de rue</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.nomRue}
                            onChange={e => handleChange('coordonnees.adressePostaleActuelle.nomRue', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ville/Village</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.villeVillage}
                            onChange={e => handleChange('coordonnees.adressePostaleActuelle.villeVillage', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.pays}
                            onChange={e => handleChange('coordonnees.adressePostaleActuelle.pays', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Province/État</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.provinceEtat}
                            onChange={e => handleChange('coordonnees.adressePostaleActuelle.provinceEtat', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.codePostal}
                            onChange={e => handleChange('coordonnees.adressePostaleActuelle.codePostal', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.adressePostaleActuelle.district}
                            onChange={e => handleChange('coordonnees.adressePostaleActuelle.district', e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Votre adresse domicile est-elle identique à votre adresse postale ?</label>
                    <div className="flex gap-4 mt-1">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.coordonnees.adresseDomicile.identiqueAdressePostale === true}
                                onChange={() => handleChange('coordonnees.adresseDomicile.identiqueAdressePostale', true)}
                                required
                            />
                            <span className="ml-2">Oui</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                checked={formData.formulaireVisa.coordonnees.adresseDomicile.identiqueAdressePostale === false}
                                onChange={() => handleChange('coordonnees.adresseDomicile.identiqueAdressePostale', false)}
                            />
                            <span className="ml-2">Non</span>
                        </label>
                    </div>
                </div>

                {!formData.formulaireVisa.coordonnees.adresseDomicile.identiqueAdressePostale && (
                    <>
                        <h4 className="text-md font-medium text-gray-800 mt-4 mb-2">Adresse domicile</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Appartement/Unité</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adresseDomicile.noAppUnite}
                                    onChange={e => handleChange('coordonnees.adresseDomicile.noAppUnite', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de rue</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adresseDomicile.numeroRue}
                                    onChange={e => handleChange('coordonnees.adresseDomicile.numeroRue', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nom de rue</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adresseDomicile.nomRue}
                                    onChange={e => handleChange('coordonnees.adresseDomicile.nomRue', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ville/Village</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adresseDomicile.villeVillage}
                                    onChange={e => handleChange('coordonnees.adresseDomicile.villeVillage', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pays</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adresseDomicile.pays}
                                    onChange={e => handleChange('coordonnees.adresseDomicile.pays', e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Province/État</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adresseDomicile.provinceEtat}
                                    onChange={e => handleChange('coordonnees.adresseDomicile.provinceEtat', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adresseDomicile.codePostal}
                                    onChange={e => handleChange('coordonnees.adresseDomicile.codePostal', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                <input
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.coordonnees.adresseDomicile.district}
                                    onChange={e => handleChange('coordonnees.adresseDomicile.district', e.target.value)}
                                />
                            </div>
                        </div>
                    </>
                )}

                <h4 className="text-md font-medium text-gray-800 mt-6 mb-2">Coordonnées téléphoniques</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type de téléphone</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.telephone.type}
                            onChange={e => handleChange('coordonnees.telephone.type', e.target.value)}
                            required
                        >
                            <option value="">-- Sélectionnez --</option>
                            <option value="domicile">Domicile</option>
                            <option value="mobile">Mobile</option>
                            <option value="bureau">Bureau</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif du pays</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.telephone.indicatifPays}
                            onChange={e => handleChange('coordonnees.telephone.indicatifPays', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.telephone.numero}
                            onChange={e => handleChange('coordonnees.telephone.numero', e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Poste (si applicable)</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.telephone.poste}
                            onChange={e => handleChange('coordonnees.telephone.poste', e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type d'autre téléphone</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.autreTelephone.type}
                            onChange={e => handleChange('coordonnees.autreTelephone.type', e.target.value)}
                        >
                            <option value="">-- Sélectionnez --</option>
                            <option value="domicile">Domicile</option>
                            <option value="mobile">Mobile</option>
                            <option value="bureau">Bureau</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif du pays</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.autreTelephone.indicatifPays}
                            onChange={e => handleChange('coordonnees.autreTelephone.indicatifPays', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.autreTelephone.numero}
                            onChange={e => handleChange('coordonnees.autreTelephone.numero', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Poste (si applicable)</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.autreTelephone.poste}
                            onChange={e => handleChange('coordonnees.autreTelephone.poste', e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type de télécopieur</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.telecopieur.type}
                            onChange={e => handleChange('coordonnees.telecopieur.type', e.target.value)}
                        >
                            <option value="">-- Sélectionnez --</option>
                            <option value="domicile">Domicile</option>
                            <option value="bureau">Bureau</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Indicatif du pays</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.telecopieur.indicatifPays}
                            onChange={e => handleChange('coordonnees.telecopieur.indicatifPays', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de télécopieur</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.telecopieur.numero}
                            onChange={e => handleChange('coordonnees.telecopieur.numero', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Poste (si applicable)</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.coordonnees.telecopieur.poste}
                            onChange={e => handleChange('coordonnees.telecopieur.poste', e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adresse électronique</label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.formulaireVisa.coordonnees.adresseElectronique}
                        onChange={e => handleChange('coordonnees.adresseElectronique', e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Section Visite au Canada */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Visite au Canada</h3>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Objet de la visite</label>
                    <select
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.formulaireVisa.visiteCanada.objetVisite}
                        onChange={e => handleChange('visiteCanada.objetVisite', e.target.value)}
                        required
                    >
                        <option value="">-- Sélectionnez --</option>
                        <option value="tourisme">Tourisme</option>
                        <option value="visite">Visite familiale/ami(e)s</option>
                        <option value="affaires">Affaires</option>
                        <option value="etudes">Études</option>
                        <option value="travail">Travail</option>
                        <option value="autre">Autre</option>
                    </select>
                </div>

                {formData.formulaireVisa.visiteCanada.objetVisite === "autre" && (
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Précisez</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.formulaireVisa.visiteCanada.autre}
                            onChange={e => handleChange('visiteCanada.autre', e.target.value)}
                            required
                        />
                    </div>
                )}
            </div>



            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Antécédents</h3>

                {/* Santé */}
                <div className="mb-6">
                    <h4 className="text-md font-medium text-gray-800 mb-3">Santé</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous eu la tuberculose ou tout autre trouble physique ou mental sérieux au cours des dernières années ?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.sante.tuberculoseDernieresAnnees === false}
                                        onChange={() => handleChange('antecedents.sante.tuberculoseDernieresAnnees', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.sante.tuberculoseDernieresAnnees === true}
                                        onChange={() => handleChange('antecedents.sante.tuberculoseDernieresAnnees', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous un trouble physique ou mental qui nécessite des soins sociaux ou médicaux au Canada ?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.sante.troublePhysiqueMental === false}
                                        onChange={() => handleChange('antecedents.sante.troublePhysiqueMental', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.sante.troublePhysiqueMental === true}
                                        onChange={() => handleChange('antecedents.sante.troublePhysiqueMental', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>
                        {(formData.formulaireVisa.antecedents.sante.tuberculoseDernieresAnnees ||
                            formData.formulaireVisa.antecedents.sante.troublePhysiqueMental) && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.antecedents.sante.details}
                                        onChange={e => handleChange('antecedents.sante.details', e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                    </div>
                </div>

                {/* Statut au Canada */}
                <div className="mb-6">
                    <h4 className="text-md font-medium text-gray-800 mb-3">Statut au Canada</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Êtes-vous resté(e) au Canada après l'expiration de votre statut ?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.statutCanada.resteApresExpiration === false}
                                        onChange={() => handleChange('antecedents.statutCanada.resteApresExpiration', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.statutCanada.resteApresExpiration === true}
                                        onChange={() => handleChange('antecedents.statutCanada.resteApresExpiration', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous déjà été refusé(e) un visa ou permis canadien ?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.statutCanada.refusVisaPermis === false}
                                        onChange={() => handleChange('antecedents.statutCanada.refusVisaPermis', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.statutCanada.refusVisaPermis === true}
                                        onChange={() => handleChange('antecedents.statutCanada.refusVisaPermis', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous déjà fait une demande d'entrée au Canada ?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.statutCanada.demandeEntreeCanada === false}
                                        onChange={() => handleChange('antecedents.statutCanada.demandeEntreeCanada', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.statutCanada.demandeEntreeCanada === true}
                                        onChange={() => handleChange('antecedents.statutCanada.demandeEntreeCanada', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>
                        {(formData.formulaireVisa.antecedents.statutCanada.resteApresExpiration ||
                            formData.formulaireVisa.antecedents.statutCanada.refusVisaPermis ||
                            formData.formulaireVisa.antecedents.statutCanada.demandeEntreeCanada) && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                    <textarea
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={formData.formulaireVisa.antecedents.statutCanada.details}
                                        onChange={e => handleChange('antecedents.statutCanada.details', e.target.value)}
                                        required
                                    />
                                </div>
                            )}
                    </div>
                </div>

                {/* Infractions pénales */}
                <div className="mb-6">
                    <h4 className="text-md font-medium text-gray-800 mb-3">Infractions pénales</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous déjà commis, été accusé(e) ou condamné(e) pour une infraction pénale ?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.infractionsPenales.commisOuAccuse === false}
                                        onChange={() => handleChange('antecedents.infractionsPenales.commisOuAccuse', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.infractionsPenales.commisOuAccuse === true}
                                        onChange={() => handleChange('antecedents.infractionsPenales.commisOuAccuse', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>
                        {formData.formulaireVisa.antecedents.infractionsPenales.commisOuAccuse && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.antecedents.infractionsPenales.details}
                                    onChange={e => handleChange('antecedents.infractionsPenales.details', e.target.value)}
                                    required
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Service militaire/police */}
                <div className="mb-6">
                    <h4 className="text-md font-medium text-gray-800 mb-3">Service militaire ou de police</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous déjà fait partie d'un service militaire ou de police ?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.serviceMilitairePolice.aFaitPartie === false}
                                        onChange={() => handleChange('antecedents.serviceMilitairePolice.aFaitPartie', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.serviceMilitairePolice.aFaitPartie === true}
                                        onChange={() => handleChange('antecedents.serviceMilitairePolice.aFaitPartie', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>
                        {formData.formulaireVisa.antecedents.serviceMilitairePolice.aFaitPartie && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Détails</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={formData.formulaireVisa.antecedents.serviceMilitairePolice.details}
                                    onChange={e => handleChange('antecedents.serviceMilitairePolice.details', e.target.value)}
                                    required
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Appartenance à un groupe violent */}
                <div className="mb-6">
                    <h4 className="text-md font-medium text-gray-800 mb-3">Appartenance à un groupe violent</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous déjà été membre ou affilié à un groupe ou organisation qui a commis ou prôné des actes violents ?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.appartenanceGroupeViolent.aEteMembreOuAffilie === false}
                                        onChange={() => handleChange('antecedents.appartenanceGroupeViolent.aEteMembreOuAffilie', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.appartenanceGroupeViolent.aEteMembreOuAffilie === true}
                                        onChange={() => handleChange('antecedents.appartenanceGroupeViolent.aEteMembreOuAffilie', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Témoignage de mauvais traitements */}
                <div>
                    <h4 className="text-md font-medium text-gray-800 mb-3">Témoignage de mauvais traitements</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Avez-vous déjà été témoin ou participé à des mauvais traitements ou à des crimes de guerre ?
                            </label>
                            <div className="flex gap-4 mt-1">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.temoignageMauvaisTraitements.aEteTemoinOuParticipe === false}
                                        onChange={() => handleChange('antecedents.temoignageMauvaisTraitements.aEteTemoinOuParticipe', false)}
                                        required
                                    />
                                    <span className="ml-2">Non</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                        checked={formData.formulaireVisa.antecedents.temoignageMauvaisTraitements.aEteTemoinOuParticipe === true}
                                        onChange={() => handleChange('antecedents.temoignageMauvaisTraitements.aEteTemoinOuParticipe', true)}
                                    />
                                    <span className="ml-2">Oui</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}