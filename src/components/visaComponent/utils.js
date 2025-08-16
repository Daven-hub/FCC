export const initialFormData = {
    formulaireVisa: {
        informationsGenerales: {
            IUC: "",
            servi: "", // "Je veux être servi(e) en"
            visa: ""  // type de demande de visa 
        },
        donneesPersonnelles: {
            nomComplet: {
                nom: "",
                prenoms: ""
            },
            autreNomUtilise: {
                utilise: false,
                nom: "",
                prenoms: ""
            },
            sexe: "",
            dateNaissance: "",
            lieuNaissance: {
                villeVillage: "",
                pays: ""
            },
            citoyennete: ""
        },
        residence: {
            actuelle: {
                pays: "",
                statut: "",
                statutAutre: "",
                du: "",
                au: ""

            },
            anterieure: {
                aVecuAutrePays: false,
                sejours: []
            },
            paysDemande: {
                pays: "",
                memeQueResidence: false,
                statutAutre: "",
                autre: "",
                du: "",
                au: ""
            }
        },
        etatMatrimonial: {
            etat: "",
            dateMariageOuUnion: "",
            dejaMarieOuUnionFait: false,
            conjoint: {
                nom: "",
                prenoms: "",
                dateNaissance: "",
            }
        },
        mariage: {
            etat: "", // Initialisé à "non" au lieu de ""
            dateMariageOuUnion: "",
            dejaMarieOuUnionFait: false,
            conjoint: {
                nom: "",
                prenoms: "",
                dateNaissance: "",
                lienParenter: "",
                genreLienParente: "",
                du: "",
                au: ""
            }
        },
        langues: {
            langueMaternelle: "",
            communiqueFrancaisAnglaisDeuxLangues: "",
            languePlusAise: "",
            evaluationOrganismeApprouve: false
        },
        passeport: {
            numero: "",
            paysDelivrance: "",
            dateDelivrance: "",
            dateExpiration: "",
            passeportTaiwanAvecID: false,
            passeportNationalIsraelien: false
        },
        pieceIdentiteNationale: {
            possede: false,
            numero: "",
            paysDelivrance: "",
            dateDelivrance: "",
            dateExpiration: ""
        },
        carteResidentPermanentUSA: {
            possede: false,
            numero: "",
            dateExpiration: ""
        },
        coordonnees: {
            adressePostaleActuelle: {
                casePostale: "",
                noAppUnite: "",
                numeroRue: "",
                nomRue: "",
                villeVillage: "",
                pays: "",
                provinceEtat: "",
                codePostal: "",
                district: ""
            },
            adresseDomicile: {
                identiqueAdressePostale: false,
                noAppUnite: "",
                numeroRue: "",
                nomRue: "",
                villeVillage: "",
                pays: "",
                provinceEtat: "",
                codePostal: "",
                district: ""
            },
            telephone: {
                type: "",
                indicatifPays: "",
                numero: "",
                poste: ""
            },
            autreTelephone: {
                type: "",
                indicatifPays: "",
                numero: "",
                poste: ""
            },
            telecopieur: {
                type: "",
                indicatifPays: "",
                numero: "",
                poste: ""
            },
            adresseElectronique: ""
        },
        visiteCanada: {
            objetVisite: "",
            autre: ""
        },
        antecedents: {
            sante: {
                tuberculoseDernieresAnnees: false,
                troublePhysiqueMental: false,
                details: ""
            },
            statutCanada: {
                resteApresExpiration: false,
                refusVisaPermis: false,
                demandeEntreeCanada: false,
                details: ""
            },
            infractionsPenales: {
                commisOuAccuse: false,
                details: ""
            },
            serviceMilitairePolice: {
                aFaitPartie: false,
                details: ""
            },
            appartenanceGroupeViolent: {
                aEteMembreOuAffilie: false
            },
            temoignageMauvaisTraitements: {
                aEteTemoinOuParticipe: false
            }
        }
    },

    // Étape 2: Antécédents et historique
    resident: {
        titre: "Demande de statut de résident temporaire",
        nom: "",
        prenom: "",
        dateNais: "",
        iuc: "",
        Demandeur: [],  // Le demandeur principal ou l'epoux, le conjoin , enfant age plus 18 ans 
        body: {
            military: {
                isOk: "non",
                dev: []
            },
            temoin: {
                isOk: "non",
                dev: []
            },
            affiliation: {
                isOk: "non",
                dev: []
            },
            charges: {
                isOk: "non",
                dev: []
            },
            voyages: {
                isOk: "non",
                dev: []
            }
        }
    },

    // Étape 3: Informations familiales
    familyInfo: {
        applicant: {
            name: '',
            dob: '',
            country: '',
            occupation: '',
            maritalStatus: '',
            address: '',
            coming: false
        },
        epouse: {
            name: '',
            dob: '',
            country: '',
            occupation: '',
            maritalStatus: '',
            address: '',
            coming: false
        },
        father: {
            name: '',
            dob: '',
            country: '',
            occupation: '',
            address: '',
            coming: false,
            maritalStatus: '',
        },
        mother: {
            name: '',
            dob: '',
            country: '',
            occupation: '',
            address: '',
            coming: false,
            maritalStatus: '',
        },
        children: [],
        siblings: [],
        typeDemande: '', // Visiteur, Travailleur, Étudiant, Autre

    },

    // Étape 4: Documents
    documents: [

        {
            titre: "Documents d'Identité Personnelle",
            nom: "",
            prenom: "",
            dateNais: "",
            iuc: "",
            corps: [
                {
                    titre: "Acte de Naissance",
                    provided: false,
                    file: null,
                    required: true,
                    type: 'PDF'
                },
                {
                    titre: "Passeport Valide (1 an minimum)",
                    provided: false,
                    file: null,
                    required: true,
                    type: 'PDF',
                    condition: {
                        question: "Avez-vous un passeport valide avec plus d'un an avant expiration?",
                        response: 'non' // Valeur par défaut
                    }
                },
                {
                    titre: "Acte de Mariage",
                    provided: false,
                    file: null,
                    required: false,
                    type: 'PDF',
                    condition: {
                        question: "Êtes-vous marié(e) ou en union de fait?",
                        response: 'non' // Valeur par défaut
                    }
                },
                {
                    titre: "Photo d'Identité",
                    provided: false,
                    file: null,
                    required: true,
                    specifications: "35x45mm, fond clair",
                    type: 'IMAGE'
                },
                {
                    titre: "Carte Nationale d'Identité",
                    provided: false,
                    file: null,
                    required: true,
                    type: 'PDF'
                }
            ]
        },
        {
            titre: "Preuves de Fonds Financiers",
            corps: [
                {
                    titre: "Documents de l'Entreprise",
                    provided: false,
                    file: null,
                    required: false,
                    type: 'PDF',
                    condition: {
                        question: "Êtes-vous travailleur indépendant ou avez-vous une entreprise?",
                        response: 'non' // Valeur par défaut
                    }
                },
                {
                    titre: "Relevés Bancaires Professionnels (6 mois)",
                    provided: false,
                    file: null,
                    required: false,
                    type: 'PDF',
                    condition: {
                        question: "Avez-vous des comptes bancaires professionnels?",
                        response: 'non' // Valeur par défaut
                    }
                },
                {
                    titre: "Relevés Bancaires Personnels (6 mois)",
                    provided: false,
                    file: null,
                    required: true,
                    type: 'PDF'
                }
            ]
        },
        {
            titre: "Documents Complémentaires",
            corps: [
                {
                    titre: "Visa Antérieur",
                    provided: false,
                    file: null,
                    required: false,
                    type: 'PDF'
                },
                {
                    titre: "Assurance Voyage",
                    provided: false,
                    file: null,
                    required: false,
                    type: 'PDF',
                    condition: {
                        question: "Avez-vous plus de 60 ans et besoin d'une assurance voyage?",
                        response: 'non' // Valeur par défaut
                    }
                },
                {
                    titre: "Réservation d'Hôtel",
                    provided: false,
                    file: null,
                    required: false,
                    type: 'PDF'
                },
                {
                    titre: "Billets d'Avion (Aller-Retour)",
                    provided: false,
                    file: null,
                    required: false,
                    type: 'PDF'
                }
            ]
        },
        {
            titre: "Documents Spécifiques",
            corps: [
                {
                    titre: "Refus de Visa Canada",
                    provided: false,
                    file: null,
                    required: false,
                    type: 'PDF'
                },
                {
                    titre: "Demande de Visa en Cours",
                    provided: false,
                    file: null,
                    required: false,
                    type: 'PDF'
                },
                {
                    titre: "Titre de Séjour Étranger",
                    provided: false,
                    file: null,
                    required: false,
                    type: 'PDF',
                    condition: {
                        question: "Résidez-vous actuellement dans un pays différent de votre pays de naissance?",
                        response: 'non'
                    }
                }
            ]
        }
    ],
    declarationAgreed: false
}