import { FaWpforms } from "react-icons/fa";
import { Link } from "react-router-dom";
import flag from "/flag.png";

const steps = [
    {
        id: 1,
        title: "Demande de statut de résident temporaire",
        description: "Ce formulaire permet de fournir vos informations personnelles pour votre demande de résidence temporaire.",
        link: "/temporaire",
    },
    {
        id: 2,
        title: "Formulaire d'informations familial",
        description: "Recueillez les informations relatives à votre famille dans le cadre de votre demande.",
        link: "/family",
    },
    {
        id: 3,
        title: "Résident temporaire - ANNEXE 1",
        description: "Formulaire sur vos antécédents personnels, militaires et autres informations requises.",
        link: "/annexOne",
    },
    {
        id: 4,
        title: "Liste des documents",
        description: "Veuillez fournir tous les documents demandés en format PDF bien lisible, pour commencer le traitement de votre dossier.",
        link: "/documents",
    },
];

export default function HomePage() {
    return (
        <main className="relative min-h-screen px-6 md:px-[6.5%] py-20 text-dark overflow-hidden bg-gray-50">

            {/* Image décorative en haut à gauche */}
            <div className="absolute top-0 left-0 z-0 w-[200px] h-[200px] md:w-[280px] md:h-[280px] opacity-15 pointer-events-none select-none">
                <img
                    src={flag}
                    alt="Drapeau décoratif"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* En-tête */}
            <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold text-primary font-title drop-shadow-md mb-4">
                    Bienvenue chez <span className="">Franchise Conseils Cameroun</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Suivez les étapes ci-dessous pour compléter votre démarche administrative.
                    Chaque étape est essentielle à la bonne constitution de votre dossier.
                </p>
            </div>

            {/* Étapes */}
            <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2 relative z-10">
                {steps.map(({ id, title, description, link }) => (
                    <div
                        key={id}
                        className="relative bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 group"
                    >
                        {/* Numéro dans un cercle */}
                        <div className="absolute -top-5 left-5 bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full font-bold shadow-lg text-lg group-hover:scale-110 transition">
                            {id}
                        </div>

                        {/* Contenu de l'étape */}
                        <div className="pl-1 pt-6">
                            <div className="flex items-center text-secondary mb-3">
                                <FaWpforms className="mr-3 text-xl" />
                                <h2 className="text-xl font-semibold">{title}</h2>
                            </div>
                            <p className="text-gray-600 text-sm mb-6">{description}</p>

                            <Link
                                to={link}
                                className="inline-block bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-secondary transition font-medium shadow-md"
                            >
                                Remplir le formulaire
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
