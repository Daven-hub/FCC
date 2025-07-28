import { FaWpforms } from "react-icons/fa";
import { Link } from "react-router-dom";
import flag from "/flag.png"; 

export default function HomePage() {
  return (
    <main className="relative min-h-screen  px-6 md:px-[6.5%] py-16 text-dark overflow-hidden">
      {/* Image de fond avec overlay sombre */}
      <div className="absolute inset-0 -z-10">
        <img
          src={flag}
          alt="Image de fond"
          className="w-full h-full object-cover opacity-20 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-white/10 to-white/60" />
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-title font-bold text-primary mb-6 drop-shadow-md">
          Bienvenue chez <span className="">Franchise Conseils Cameroun</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-800 mb-12 leading-relaxed">
          Merci de votre visite. Pour mieux vous accompagner dans votre démarche administrative,
          veuillez choisir l’option adaptée à votre situation.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Bloc 1 */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200">
            <div className="flex items-center mb-4 text-secondary">
              <FaWpforms size={28} className="mr-3" />
              <h2 className="text-2xl font-semibold">Formulaire de demande </h2>
            </div>
            <p className="text-gray-700 mb-6 text-sm">
              Ce formulaire est destiné à recueillir des informations sur votre famille dans le cadre d’une demande de visa.
            </p>
            <Link
              to="/family"
              className="inline-block bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-secondary transition font-medium shadow-md"
            >
              Remplir le formulaire
            </Link>
          </div>

          {/* Bloc 2 */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200">
            <div className="flex items-center mb-4 text-secondary">
              <FaWpforms size={28} className="mr-3" />
              <h2 className="text-2xl font-semibold">Formulaire IMM 5257 – Annexe 1</h2>
            </div>
            <p className="text-gray-700 mb-6 text-sm">
              Ce formulaire permet de fournir vos antécédents personnels, militaires et toute autre information pertinente.
            </p>
            <Link
              to="/annexOne"
              className="inline-block bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-secondary transition font-medium shadow-md"
            >
              Remplir le formulaire
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200">
            <div className="flex items-center mb-4 text-secondary">
              <FaWpforms size={28} className="mr-3" />
              <h2 className="text-2xl font-semibold">Formulaire IMM 5257 – Annexe 1</h2>
            </div>
            <p className="text-gray-700 mb-6 text-sm">
              Ce formulaire permet de fournir vos antécédents personnels, militaires et toute autre information pertinente.
            </p>
            <Link
              to="/annexOne"
              className="inline-block bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-secondary transition font-medium shadow-md"
            >
              Remplir le formulaire
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
