import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheck } from 'react-icons/fi';

export default function Temporaire() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
    } = useForm();

    const autreNom = watch('aUtiliseAutreNom');
    const residenceAnterieure = watch('residenceAnterieure');
    const demandeAutrePays = watch('demandeAutrePays');
    const etatMatrimonial = watch('etatMatrimonial');

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Données soumises:', data);
            setSubmitSuccess(true);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="px-[6.5%] py-12 mx-auto my-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-primary mb-2">Demande de statut de résident temporaire</h1>
                    <p className="text-gray-600 mb-6">Veuillez remplir toutes les informations requises</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Identité Personnelle */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Identité Personnelle</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label>Nom de famille</label>
                                    <input {...register('nomFamille')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Prénom(s)</label>
                                    <input {...register('prenoms')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Date de naissance</label>
                                    <input type="date" {...register('dateNaissance')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Numéro IUC</label>
                                    <input {...register('iuc')} className="input" />
                                </div>
                                <div>
                                    <label>Sexe</label>
                                    <div className="flex gap-4 mt-1">
                                        <label><input type="radio" value="Homme" {...register('sexe')} /> Homme</label>
                                        <label><input type="radio" value="Femme" {...register('sexe')} /> Femme</label>
                                    </div>
                                </div>
                                <div>
                                    <label>Lieu de naissance (Ville)</label>
                                    <input {...register('villeNaissance')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Pays de naissance</label>
                                    <input {...register('paysNaissance')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Citoyenneté</label>
                                    <input {...register('citoyennete')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>

                            <div>
                                <label>Avez-vous utilisé un autre nom ?</label>
                                <div className="flex gap-4 mt-1">
                                    <label><input type="radio" value="non" {...register('aUtiliseAutreNom')} /> Non</label>
                                    <label><input type="radio" value="oui" {...register('aUtiliseAutreNom')} /> Oui</label>
                                </div>
                            </div>

                            {autreNom === "oui" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label>Ancien nom de famille</label>
                                        <input {...register('ancienNom')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Prénom(s) utilisé(s)</label>
                                        <input {...register('ancienPrenom')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Résidence */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Résidence</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label>Pays de résidence actuel</label>
                                    <input {...register('paysResidenceActuelle')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Statut</label>
                                    <input {...register('statutResidenceActuelle')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>

                            <div>
                                <label>Résidence dans un autre pays les 5 dernières années ?</label>
                                <div className="flex gap-4 mt-1">
                                    <label><input type="radio" value="non" {...register('residenceAnterieure')} /> Non</label>
                                    <label><input type="radio" value="oui" {...register('residenceAnterieure')} /> Oui</label>
                                </div>
                            </div>

                            {residenceAnterieure === "oui" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label>Pays</label>
                                        <input {...register('paysResidenceAnterieure')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Statut</label>
                                        <input {...register('statutResidenceAnterieure')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>De</label>
                                        <input type="date" {...register('residenceDe')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>À</label>
                                        <input type="date" {...register('residenceA')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label>Faites-vous la demande depuis un autre pays ?</label>
                                <div className="flex gap-4 mt-1">
                                    <label><input type="radio" value="non" {...register('demandeAutrePays')} /> Non</label>
                                    <label><input type="radio" value="oui" {...register('demandeAutrePays')} /> Oui</label>
                                </div>
                            </div>

                            {demandeAutrePays === "oui" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label>Pays</label>
                                        <input {...register('paysDemande')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Statut</label>
                                        <input {...register('statutDemande')} className="input" />
                                    </div>
                                    <div>
                                        <label>De</label>
                                        <input type="date" {...register('demandeDe')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>À</label>
                                        <input type="date" {...register('demandeA')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* État matrimonial */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">État matrimonial</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label>État matrimonial actuel</label>
                                    <select {...register('etatMatrimonial')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">-- Sélectionnez --</option>
                                        <option value="celibataire">Célibataire</option>
                                        <option value="marie">Marié(e)</option>
                                        <option value="union">Union de fait</option>
                                        <option value="divorce">Divorcé(e)</option>
                                        <option value="veuf">Veuf/Veuve</option>
                                    </select>
                                </div>
                            </div>

                            {(etatMatrimonial === "marie" || etatMatrimonial === "union") && (
                                <>
                                    <div>
                                        <label>Date du mariage ou début de l’union</label>
                                        <input type="date" {...register('dateMariageUnion')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label>Nom de famille du conjoint</label>
                                            <input {...register('nomConjoint')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div>
                                            <label>Prénom(s) du conjoint</label>
                                            <input {...register('prenomConjoint')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                                    <label>Langue maternelle</label>
                                    <input {...register('langueMaternelle')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>

                                <div>
                                    <label>Dans quelle langue êtes-vous le plus à l’aise ?</label>
                                    <input {...register('langueAise')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>

                                <div>
                                    <label>Pouvez-vous communiquer en français et en anglais ?</label>
                                    <select {...register('communicationDeuxLangues')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">-- Sélectionnez --</option>
                                        <option value="oui">Oui</option>
                                        <option value="non">Non</option>
                                    </select>
                                </div>

                                <div>
                                    <label>Avez-vous fait évaluer vos compétences linguistiques ?</label>
                                    <select {...register('evaluationLangue')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                                    <label>Numéro du passeport</label>
                                    <input {...register('numeroPasseport')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Pays ou territoire de délivrance</label>
                                    <input {...register('paysDelivrancePasseport')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Date de délivrance</label>
                                    <input type="date" {...register('dateDelivrancePasseport')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Date d’expiration</label>
                                    <input type="date" {...register('dateExpirationPasseport')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Utilisez-vous un passeport délivré par Taiwan ?</label>
                                    <select {...register('passeportTaiwan')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option value="">-- Sélectionnez --</option>
                                        <option value="oui">Oui</option>
                                        <option value="non">Non</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Utilisez-vous un passeport national israélien ?</label>
                                    <select {...register('passeportIsrael')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                                <label>Avez-vous une pièce d'identité nationale ?</label>
                                <div className="flex gap-4 mt-1">
                                    <label><input type="radio" value="oui" {...register('aPieceIdentite')} /> Oui</label>
                                    <label><input type="radio" value="non" {...register('aPieceIdentite')} /> Non</label>
                                </div>
                            </div>

                            {watch('aPieceIdentite') === 'oui' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label>Numéro de la pièce</label>
                                        <input {...register('numeroPiece')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Pays ou territoire de délivrance</label>
                                        <input {...register('paysDelivrancePiece')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Date de délivrance</label>
                                        <input type="date" {...register('dateDelivrancePiece')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Date d’expiration</label>
                                        <input type="date" {...register('dateExpirationPiece')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Carte verte (USA) */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Carte de résident permanent des États-Unis</h2>

                            <div>
                                <label>Avez-vous une carte verte américaine ?</label>
                                <div className="flex gap-4 mt-1">
                                    <label><input type="radio" value="oui" {...register('aCarteVerte')} /> Oui</label>
                                    <label><input type="radio" value="non" {...register('aCarteVerte')} /> Non</label>
                                </div>
                            </div>

                            {watch('aCarteVerte') === 'oui' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label>Numéro de la pièce</label>
                                        <input {...register('numeroCarteVerte')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Date d’expiration</label>
                                        <input type="date" {...register('expirationCarteVerte')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Coordonnées */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Coordonnées</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label>Adresse postale actuelle</label>
                                    <input {...register('adressePostale')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Ville</label>
                                    <input {...register('villePostale')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Province/État</label>
                                    <input {...register('provincePostale')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Code postal</label>
                                    <input {...register('codePostal')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Pays</label>
                                    <input {...register('paysPostal')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                        </section>

                        {/* Coordonnées */}
                        <section className="bg-gray-50 p-5 rounded-lg space-y-6">
                            <h2 className="text-xl font-semibold">Coordonnées</h2>

                            {/* Adresse du domicile */}
                            <div>
                                <label>Adresse du domicile</label>
                                <div className="mt-2 mb-4">
                                    <label className="mr-4">
                                        <input type="radio" value="non" {...register('adresseIdentique')} className="mr-2" />
                                        Non
                                    </label>
                                    <label>
                                        <input type="radio" value="oui" {...register('adresseIdentique')} className="mr-2" />
                                        Oui
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label>No d'app/unité</label>
                                    <input {...register('appartementUnite')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Numéro de rue</label>
                                    <input {...register('numeroRue')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Nom de rue</label>
                                    <input {...register('nomRue')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label>Ville/Village</label>
                                    <input {...register('villeVillage')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="md:col-span-2">
                                    <label>Pays ou territoire</label>
                                    <input {...register('paysTerritoire')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>

                            {/* Numéro de téléphone */}
                            <div className="pt-4">
                                <label>Numéro de téléphone</label>
                                <div className="mt-2 mb-4">
                                    <label className="mr-4">
                                        <input type="radio" value="canada" {...register('typeTelephone')} className="mr-2" />
                                        Canada/États-Unis
                                    </label>
                                    <label>
                                        <input type="radio" value="autre" {...register('typeTelephone')} className="mr-2" />
                                        Autre
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label>Type</label>
                                        <input {...register('typeTelephoneDetail')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Indicatif de pays</label>
                                        <input {...register('indicatifPays')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>No.</label>
                                        <input {...register('numeroTelephone')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Poste</label>
                                        <input {...register('posteTelephone')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Autre numéro de téléphone */}
                            <div className="pt-4">
                                <label>Autre numéro de téléphone</label>
                                <div className="mt-2 mb-4">
                                    <label className="mr-4">
                                        <input type="radio" value="canada" {...register('typeAutreTelephone')} className="mr-2" />
                                        Canada/États-Unis
                                    </label>
                                    <label>
                                        <input type="radio" value="autre" {...register('typeAutreTelephone')} className="mr-2" />
                                        Autre
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div>
                                        <label>Type</label>
                                        <input {...register('typeAutreTelephoneDetail')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Indicatif</label>
                                        <input {...register('indicatifAutreTelephone')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>No.</label>
                                        <input {...register('numeroAutreTelephone')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Poste</label>
                                        <input {...register('posteAutreTelephone')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </div>

                            {/* Numéro de télécopieur */}
                            <div className="pt-4">
                                <label>Numéro de télécopieur</label>
                                <div className="mt-2 mb-4">
                                    <label className="mr-4">
                                        <input type="radio" value="canada" {...register('typeTelecopieur')} className="mr-2" />
                                        Canada/États-Unis
                                    </label>
                                    <label>
                                        <input type="radio" value="autre" {...register('typeTelecopieur')} className="mr-2" />
                                        Autre
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label>Indicatif de pays</label>
                                        <input {...register('indicatifTelecopieur')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>No.</label>
                                        <input {...register('numeroTelecopieur')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label>Poste</label>
                                        <input {...register('posteTelecopieur')} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                                    <label className="block mb-2">1. a) Au cours des deux dernières années, avez-vous, ou un membre de votre famille, eu la tuberculose ou été en contact étroit avec une personne qui a la tuberculose?</label>
                                    <div className="flex gap-4 mt-1">
                                        <label><input type="radio" value="oui" {...register('tuberculoseContact')} className="mr-2" /> Oui</label>
                                        <label><input type="radio" value="non" {...register('tuberculoseContact')} className="mr-2" /> Non</label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2">b) Avez-vous un trouble physique ou mental qui nécessiterait des services sociaux et/ou des soins de santé autres que des médicaments, durant votre séjour au Canada?</label>
                                    <div className="flex gap-4 mt-1">
                                        <label><input type="radio" value="oui" {...register('troublePhysiqueMental')} className="mr-2" /> Oui</label>
                                        <label><input type="radio" value="non" {...register('troublePhysiqueMental')} className="mr-2" /> Non</label>
                                    </div>
                                </div>

                                {(watch('tuberculoseContact') === 'oui' || watch('troublePhysiqueMental') === 'oui') && (
                                    <div>
                                        <label className="block mb-2">c) Veuillez fournir les détails et le nom du membre de la famille (s'il y a lieu)</label>
                                        <textarea {...register('detailsTuberculoseTrouble')} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                    </div>
                                )}
                            </div>

                            {/* Question 2 */}
                            <div className="space-y-4 pt-4">
                                <div>
                                    <label className="block mb-2">2. a) Êtes-vous resté au Canada après l'expiration de votre statut, avez fréquenté l'école sans permis d'études au Canada, avez travaillé sans permis de travail au Canada?</label>
                                    <div className="flex gap-4 mt-1">
                                        <label><input type="radio" value="oui" {...register('statutExpire')} className="mr-2" /> Oui</label>
                                        <label><input type="radio" value="non" {...register('statutExpire')} className="mr-2" /> Non</label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2">b) Vous a-t-on déjà refusé un visa ou un permis, interdit l'entrée ou demandé de quitter le Canada ou tout autre pays ou territoire?</label>
                                    <div className="flex gap-4 mt-1">
                                        <label><input type="radio" value="oui" {...register('refusEntree')} className="mr-2" /> Oui</label>
                                        <label><input type="radio" value="non" {...register('refusEntree')} className="mr-2" /> Non</label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-2">c) Avez-vous déjà fait une demande pour entrer ou demeurer au Canada?</label>
                                    <div className="flex gap-4 mt-1">
                                        <label><input type="radio" value="oui" {...register('demandePrecedenteCanada')} className="mr-2" /> Oui</label>
                                        <label><input type="radio" value="non" {...register('demandePrecedenteCanada')} className="mr-2" /> Non</label>
                                    </div>
                                </div>

                                {(watch('statutExpire') === 'oui' || watch('refusEntree') === 'oui' || watch('demandePrecedenteCanada') === 'oui') && (
                                    <div>
                                        <label className="block mb-2">d) Veuillez fournir des détails</label>
                                        <textarea {...register('detailsStatutRefusDemande')} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                    </div>
                                )}
                            </div>

                            {/* Question 3 */}
                            <div className="space-y-4 pt-4">
                                <div>
                                    <label className="block mb-2">Avez-vous déjà commis, été arrêté, accusé, ou reconnu coupable d'une infraction pénale quelconque dans un pays ou territoire?</label>
                                    <div className="flex gap-4 mt-1">
                                        <label><input type="radio" value="oui" {...register('antecedentsJudiciaires')} className="mr-2" /> Oui</label>
                                        <label><input type="radio" value="non" {...register('antecedentsJudiciaires')} className="mr-2" /> Non</label>
                                    </div>
                                </div>

                                {watch('antecedentsJudiciaires') === 'oui' && (
                                    <div>
                                        <label className="block mb-2">Veuillez fournir des détails</label>
                                        <textarea {...register('detailsAntecedentsJudiciaires')} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                                    </div>
                                )}
                            </div>
                        </section>


                        {/* Bouton */}
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
