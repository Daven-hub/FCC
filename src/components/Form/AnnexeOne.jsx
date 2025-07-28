import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';

const schema = yup.object().shape({
  nomFamille: yup.string().required('Nom de famille requis'),
  prenoms: yup.string().required('Prénom(s) requis'),
  dateNaissance: yup.date().required('Date de naissance requise'),
  iuc: yup.string().required('IUC requis'),
  serviceMilitaire: yup.string().required('Ce champ est obligatoire'),
  detailsService: yup.array().when('serviceMilitaire', {
    is: 'Oui',
    then: yup.array().of(
      yup.object().shape({
        grade: yup.string().required('Grade requis'),
        dateDebut: yup.string().required('Date de début requise'),
        dateFin: yup.string(),
        lieuPoste: yup.string().required('Lieu de poste requis'),
        province: yup.string(),
        pays: yup.string().required('Pays requis')
      })
    )
  }),
  temoinViolations: yup.string().required('Ce champ est obligatoire'),
  detailsViolations: yup.array().when('temoinViolations', {
    is: 'Oui',
    then: yup.array().of(
      yup.object().shape({
        description: yup.string().required('Description requise'),
        dateDebut: yup.string().required('Date de début requise'),
        dateFin: yup.string(),
        lieu: yup.string().required('Lieu requis'),
        province: yup.string(),
        pays: yup.string().required('Pays requis')
      })
    )
  }),
  affiliationOrganisation: yup.string().required('Ce champ est obligatoire'),
  detailsAffiliation: yup.array().when('affiliationOrganisation', {
    is: 'Oui',
    then: yup.array().of(
      yup.object().shape({
        nomOrganisation: yup.string().required('Nom requis'),
        dateDebut: yup.string().required('Date de début requise'),
        dateFin: yup.string(),
        activites: yup.string().required('Activités requises'),
        province: yup.string(),
        pays: yup.string().required('Pays requis')
      })
    )
  }),
  chargePublique: yup.string().required('Ce champ est obligatoire'),
  detailsCharges: yup.array().when('chargePublique', {
    is: 'Oui',
    then: yup.array().of(
      yup.object().shape({
        pays: yup.string().required('Pays requis'),
        dateDebut: yup.string().required('Date de début requise'),
        dateFin: yup.string(),
        sphereCompetence: yup.string().required('Sphère requise'),
        ministere: yup.string(),
        poste: yup.string().required('Poste requis')
      })
    )
  }),
  voyages: yup.string().required('Ce champ est obligatoire'),
  detailsVoyages: yup.array().when('voyages', {
    is: 'Oui',
    then: yup.array().of(
      yup.object().shape({
        pays: yup.string().required('Pays requis'),
        dateDebut: yup.string().required('Date de début requise'),
        dateFin: yup.string(),
        endroit: yup.string().required('Endroit requis'),
        but: yup.string().required('But requis')
      })
    )
  })
});

export default function FormulaireDemandeCanadienne() {
  const [serviceRows, setServiceRows] = useState(1);
  const [violationRows, setViolationRows] = useState(1);
  const [affiliationRows, setAffiliationRows] = useState(1);
  const [chargeRows, setChargeRows] = useState(1);
  const [voyageRows, setVoyageRows] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
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

  const addServiceRow = () => setServiceRows(prev => prev + 1);
  const addViolationRow = () => setViolationRows(prev => prev + 1);
  const addAffiliationRow = () => setAffiliationRows(prev => prev + 1);
  const addChargeRow = () => setChargeRows(prev => prev + 1);
  const addVoyageRow = () => setVoyageRows(prev => prev + 1);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-primary p-6">
            <h1 className="text-2xl font-bold text-white font-title">
              Formulaire de demande canadienne
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            {/* Section 1 - Nom complet */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">1 | Nom complet</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de famille (tel qu'indiqué sur votre passeport) *
                  </label>
                  <input
                    {...register('nomFamille')}
                    className={`w-full px-4 py-2 border rounded-md ${errors.nomFamille ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.nomFamille && (
                    <p className="mt-1 text-sm text-red-600">{errors.nomFamille.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom(s) (tel qu'indiqué sur votre passeport) *
                  </label>
                  <input
                    {...register('prenoms')}
                    className={`w-full px-4 py-2 border rounded-md ${errors.prenoms ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.prenoms && (
                    <p className="mt-1 text-sm text-red-600">{errors.prenoms.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2 - Date de naissance */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">2 | Date de naissance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jour (JJ) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    {...register('dateNaissance.day')}
                    className={`w-full px-4 py-2 border rounded-md ${errors.dateNaissance?.day ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="JJ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mois (MM) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    {...register('dateNaissance.month')}
                    className={`w-full px-4 py-2 border rounded-md ${errors.dateNaissance?.month ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="MM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Année (AAAA) *
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    {...register('dateNaissance.year')}
                    className={`w-full px-4 py-2 border rounded-md ${errors.dateNaissance?.year ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="AAAA"
                  />
                </div>
              </div>
              {errors.dateNaissance && (
                <p className="mt-1 text-sm text-red-600">Date de naissance requise</p>
              )}
            </div>

            {/* Section 3 - IUC */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">3 | IUC</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IUC *
                </label>
                <input
                  {...register('iuc')}
                  className={`w-full px-4 py-2 border rounded-md ${errors.iuc ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.iuc && (
                  <p className="mt-1 text-sm text-red-600">{errors.iuc.message}</p>
                )}
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600 italic">
                  Le Canada accorde une grande valeur à la traduction en justice des auteurs de génocide, 
                  de crimes de guerre ou de crimes contre l'humanité. Le Canada a été le premier pays 
                  à intégrer les obligations du Statut de Rome dans ses lois.
                </p>
              </div>
            </div>

            {/* Section 4 - Service militaire */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                4 | Service militaire
              </h2>
              
              <p className="text-sm text-gray-700 mb-4">
                Avez-vous fait partie d'une armée, d'une milice, d'une unité de défense civile, 
                d'un service de renseignement ou d'un corps de police (y compris le service national 
                non obligatoire et les unités de réserve ou volontaires)?
              </p>

              <div className="flex space-x-6 mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('serviceMilitaire')}
                    className="form-radio text-primary"
                    value="Non"
                  />
                  <span className="ml-2">Non</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('serviceMilitaire')}
                    className="form-radio text-primary"
                    value="Oui"
                  />
                  <span className="ml-2">Oui</span>
                </label>
              </div>

              {serviceMilitaire === 'Oui' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu où vous étiez en poste</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Province</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays ou territoire</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...Array(serviceRows)].map((_, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsService.${index}.grade`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsService.${index}.dateDebut`)}
                              placeholder="MM/AAAA"
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsService.${index}.dateFin`)}
                              placeholder="MM/AAAA"
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsService.${index}.lieuPoste`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsService.${index}.province`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsService.${index}.pays`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    onClick={addServiceRow}
                    className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                  >
                    + Ajouter une ligne
                  </button>
                </div>
              )}
            </div>

            {/* Section 5 - Témoin de violations */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                5 | Témoin de violations
              </h2>
              
              <p className="text-sm text-gray-700 mb-4">
                Avez-vous été témoin de mauvais traitements infligés à des prisonniers ou des civils, 
                ou d'actes de pillage ou de profanation d'édifices religieux ou avez-vous participé à ces actes?
              </p>

              <div className="flex space-x-6 mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('temoinViolations')}
                    className="form-radio text-primary"
                    value="Non"
                  />
                  <span className="ml-2">Non</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('temoinViolations')}
                    className="form-radio text-primary"
                    value="Oui"
                  />
                  <span className="ml-2">Oui</span>
                </label>
              </div>

              {temoinViolations === 'Oui' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Donnez des détails sur les circonstances:
                    </label>
                    <textarea
                      {...register('detailsViolations.0.description')}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lieu</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Province</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays ou territoire</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[...Array(violationRows)].map((_, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                {...register(`detailsViolations.${index}.dateDebut`)}
                                placeholder="MM/AAAA"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                {...register(`detailsViolations.${index}.dateFin`)}
                                placeholder="MM/AAAA"
                                className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                {...register(`detailsViolations.${index}.lieu`)}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                {...register(`detailsViolations.${index}.province`)}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <input
                                {...register(`detailsViolations.${index}.pays`)}
                                className="w-full px-2 py-1 border border-gray-300 rounded-md"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      type="button"
                      onClick={addViolationRow}
                      className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                    >
                      + Ajouter une ligne
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Section 6 - Appartenance à des organisations */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                6 | Appartenance ou affiliation à des organisations
              </h2>
              
              <p className="text-sm text-gray-700 mb-4">
                Êtes-vous, ou avez-vous déjà été, membre ou affilié d'un parti politique ou d'un autre groupe ou d'une autre organisation qui ont utilisé ou prôné la violence dans le but d'atteindre un objectif politique ou religieux, ou qui ont déjà été impliqués dans des activités criminelles? N'utilisez pas d'abréviations.
              </p>

              <div className="flex space-x-6 mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('affiliationOrganisation')}
                    className="form-radio text-primary"
                    value="Non"
                  />
                  <span className="ml-2">Non</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('affiliationOrganisation')}
                    className="form-radio text-primary"
                    value="Oui"
                  />
                  <span className="ml-2">Oui</span>
                </label>
              </div>

              {affiliationOrganisation === 'Oui' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom de l'organisation</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activités/postes occupés</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Province</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays ou territoire</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...Array(affiliationRows)].map((_, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsAffiliation.${index}.grade`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsAffiliation.${index}.dateDebut`)}
                              placeholder="MM/AAAA"
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsAffiliation.${index}.dateFin`)}
                              placeholder="MM/AAAA"
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsAffiliation.${index}.nomOrganisation`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsAffiliation.${index}.activites`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsAffiliation.${index}.province`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsAffiliation.${index}.pays`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    onClick={addAffiliationRow}
                    className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                  >
                    + Ajouter une ligne
                  </button>
                </div>
              )}
            </div>

            {/* Section 7 - Charges publiques */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                7 | Charges publiques officielles
              </h2>
              
              <p className="text-sm text-gray-700 mb-4">
                Avez-vous déjà occupé une charge publique (telle que fonctionnaire, juge, policier, maire, député, administrateur d'hôpital)? N'utilisez pas d'abréviations.
              </p>

              <div className="flex space-x-6 mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('chargePublique')}
                    className="form-radio text-primary"
                    value="Non"
                  />
                  <span className="ml-2">Non</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('chargePublique')}
                    className="form-radio text-primary"
                    value="Oui"
                  />
                  <span className="ml-2">Oui</span>
                </label>
              </div>

              {chargePublique === 'Oui' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays ou territoire</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sphère de compétence</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ministère/Direction</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activités/postes occupés</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...Array(chargeRows)].map((_, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsCharges.${index}.grade`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsCharges.${index}.dateDebut`)}
                              placeholder="MM/AAAA"
                              className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsCharges.${index}.dateFin`)}
                              placeholder="MM/AAAA"
                              className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsCharges.${index}.pays`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsCharges.${index}.sphereCompetence`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsCharges.${index}.ministere`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsCharges.${index}.poste`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    onClick={addChargeRow}
                    className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                  >
                    + Ajouter une ligne
                  </button>
                </div>
              )}
            </div>

            {/* Section 8 - Voyages précédents */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">
                8 | Voyage précédent
              </h2>
              
              <p className="text-sm text-gray-700 mb-4">
                Depuis l'âge de 18 ans ou au cours des cinq dernières années, selon la plus récente, avez-vous voyagé vers un pays ou territoire autre que le pays de votre nationalité ou votre pays ou territoire de résidence actuel?
              </p>

              <div className="flex space-x-6 mb-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('voyages')}
                    className="form-radio text-primary"
                    value="Non"
                  />
                  <span className="ml-2">Non</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    {...register('voyages')}
                    className="form-radio text-primary"
                    value="Oui"
                  />
                  <span className="ml-2">Oui</span>
                </label>
              </div>

              {voyages === 'Oui' && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Du (MM/AAAA)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Au (MM/AAAA)</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays ou territoire</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endroit</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">But du voyage</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...Array(voyageRows)].map((_, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsVoyages.${index}.grade`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsVoyages.${index}.dateDebut`)}
                              placeholder="MM/AAAA"
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsVoyages.${index}.dateFin`)}
                              placeholder="MM/AAAA"
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsVoyages.${index}.pays`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsVoyages.${index}.endroit`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <input
                              {...register(`detailsVoyages.${index}.but`)}
                              className="w-full px-2 py-1 border border-gray-300 rounded-md"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    onClick={addVoyageRow}
                    className="mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200"
                  >
                    + Ajouter une ligne
                  </button>
                </div>
              )}
            </div>

            {/* Bouton de soumission */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </span>
                ) : 'Soumettre le formulaire'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}