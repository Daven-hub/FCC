import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-10 pb-6 px-[6.5%] mt-16">
      <div className="grid md:grid-cols-3 gap-10">
        {/* Logo + Nom */}
        <div>
          <div className="flex items-center space-x-3">
            <img
              src="/fcc.png"
              alt="Franchise Conseil Plus"
              className="h-10 w-auto"
            />
            <span className="font-title text-xl font-bold">Franchise Conseils Cameroun</span>
          </div>
          <p className="mt-4 text-sm text-gray-200 max-w-xs">
            Accompagnement stratégique pour développer votre réseau de franchises avec succès.
          </p>
        </div>

        {/* Liens */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#services" className="hover:text-primary transition">Services</a></li>
            <li><a href="#franchises" className="hover:text-primary transition">Franchises</a></li>
            <li><a href="#equipe" className="hover:text-primary transition">Équipe</a></li>
            <li><a href="#contact" className="hover:text-primary transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact avec icônes */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-200">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" /> Montréal, QC
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary" />
              <a href="tel:+237 698616852" className="hover:text-primary transition">+237 698616852</a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-primary" />
              <a href="mailto:info@franchiseconseils.com" className="hover:text-primary transition">
                info@franchiseconseils.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-600 pt-4 text-center text-xs text-gray-300">
        © {new Date().getFullYear()} Franchise Conseils Cameroun. Tous droits réservés.
      </div>
    </footer>
  );
}
