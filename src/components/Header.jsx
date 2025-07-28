import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-light shadow-md py-4 px-[6.5%]">
      <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Logo + Nom */}
        <div className="flex items-center space-x-4">
          <img
            src="/fcc.png"
            alt="Logo Franchise Conseils Cameroun"
            className="h-12 w-auto object-contain"
          />
          <h1 className="text-primary font-title text-xl sm:text-2xl font-bold leading-tight">
            Franchise Conseils Cameroun
          </h1>
        </div>

        {/* Informations de contact */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-x-8 text-dark text-sm sm:text-base font-medium">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <span>Montréal, QC</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-primary" />
            <a

              href="tel:+237 698616852"
              className="hover:text-secondary transition-colors"
            >
              +237 698616852
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-primary" />
            <a
              href="mailto:contact@franchiseconseilplus.com"
              className="hover:text-secondary transition-colors break-all"
            >
              info@franchiseconseils.com
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
