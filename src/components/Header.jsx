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
            FRANCHISE CONSEILS CAMEROUN SARL
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










// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobeAmericas } from "react-icons/fa";
// import { IoMdTime } from "react-icons/io";

// export default function Header() {
//   return (
//     <header className="bg-white shadow-sm border-b border-gray-100">
//       {/* Bandeau supérieur */}
//       <div className="bg-primary text-white py-2 px-4">
//         <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs md:text-sm">
//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-1">
//               <IoMdTime className="text-yellow-200" />
//               <span>Lun-Ven: 8h-17h</span>
//             </div>
//             <div className="hidden md:flex items-center space-x-1">
//               <FaGlobeAmericas className="text-yellow-200" />
//               <span>Service international</span>
//             </div>
//           </div>
//           <div className="mt-2 md:mt-0 flex items-center space-x-4">
//             <a href="#" className="hover:text-yellow-200 transition-colors">À propos</a>
//             <a href="#" className="hover:text-yellow-200 transition-colors">FAQ</a>
//             <a href="#" className="hover:text-yellow-200 transition-colors">Contact</a>
//           </div>
//         </div>
//       </div>

//       {/* Contenu principal du header */}
//       <div className="py-4 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
//           {/* Logo + Nom */}
//           <div className="flex items-center space-x-4 min-w-0">
//             <img
//               src="/fcc.png"
//               alt="Logo Franchise Conseils Cameroun"
//               className="h-12 w-auto object-contain"
//             />
//             <div className="min-w-0">
//               <h1 className="text-primary font-bold text-xl sm:text-2xl leading-tight truncate">
//                 FRANCHISE CONSEILS CAMEROUN SARL
//               </h1>
//               <p className="text-gray-600 text-sm sm:text-base mt-1 truncate">
//                 Education Internationale - Mobilité Internationale - Développement d'affaires
//               </p>
//             </div>
//           </div>

//           {/* Informations de contact */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 text-sm sm:text-base">
//             <div className="flex items-start space-x-3">
//               <div className="mt-1 text-primary">
//                 <FaMapMarkerAlt />
//               </div>
//               <div>
//                 <p className="font-semibold">Nos bureaux</p>
//                 <p>Montréal, QC / Yaoundé, Cameroun</p>
//               </div>
//             </div>

//             <div className="flex items-start space-x-3">
//               <div className="mt-1 text-primary">
//                 <FaPhoneAlt />
//               </div>
//               <div>
//                 <p className="font-semibold">Contactez-nous</p>
//                 <a
//                   href="tel:+237698616852"
//                   className="hover:text-secondary transition-colors block"
//                 >
//                   +237 698 616 852
//                 </a>
//               </div>
//             </div>

//             <div className="flex items-start space-x-3">
//               <div className="mt-1 text-primary">
//                 <FaEnvelope />
//               </div>
//               <div>
//                 <p className="font-semibold">Email</p>
//                 <a
//                   href="mailto:info@franchiseconseils.com"
//                   className="hover:text-secondary transition-colors break-all"
//                 >
//                   info@franchiseconseils.com
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation principale */}
//       <nav className="bg-gray-50 border-t border-gray-100 py-3 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-screen-2xl mx-auto">
//           <ul className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
//             <li><a href="#" className="text-primary hover:text-secondary transition-colors px-2 py-1">Accueil</a></li>
//             <li><a href="#" className="text-gray-700 hover:text-primary transition-colors px-2 py-1">Services</a></li>
//             <li><a href="#" className="text-gray-700 hover:text-primary transition-colors px-2 py-1">Pays</a></li>
//             <li><a href="#" className="text-gray-700 hover:text-primary transition-colors px-2 py-1">Universités</a></li>
//             <li><a href="#" className="text-gray-700 hover:text-primary transition-colors px-2 py-1">Visa</a></li>
//             <li><a href="#" className="text-gray-700 hover:text-primary transition-colors px-2 py-1">Blog</a></li>
//             <li><a href="#" className="text-gray-700 hover:text-primary transition-colors px-2 py-1">Contact</a></li>
//           </ul>
//         </div>
//       </nav>
//     </header>
//   );
// }