import { BlobProvider, pdf } from "@react-pdf/renderer";
import React from "react";
import { RecipientData } from "../visaComponent/RecipientData";
import { FiPlus, FiX } from "react-icons/fi";
import MonPdfDocument from "../pdf/MonPdf";
// import prog from "../../datas/immigration.json";

export const DeclarationSection = ({ declarationAgreed, onAgreementChange, formData, selectedRecipient, onRecipientChange }) => {
  const dataa = formData.documents[0].corps[3].imageData;

  const previewPDF = () => {
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Prévisualisation PDF</title>
        </head>
        <body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
          <h2>📄 Chargement du PDF...</h2>
        </body>
      </html>
    `);
    
    pdf(
      <MonPdfDocument
        datac={formData}
        dataa={dataa}
        documents={formData.documents}
      />
    )
      .toBlob()
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        newWindow.location.href = url;
      })
      .catch((err) => {
        console.error("Erreur génération PDF:", err);
        newWindow.document.body.innerHTML = "<p>Erreur lors de la génération du PDF.</p>";
      });
  };

//   const sendPdfByEmail = async () => {
//     await Promise.resolve();
//     const blob = await pdf(<MonPdfDocument datas={formData} />).toBlob();
//     // const file = new File([blob], `${prog.nom.toLowerCase().replace(" ", "_")}.pdf`, { type: "application/pdf" });

//     const formData = new FormData();
//     formData.append(
//       "pdf",
//       blob,
//       `${"lionel"}.pdf`
//     );
//     formData.append("to", "lionelfotso413@gmail.com");
//     formData.append("name", "lionel");

//     // console.log([...formData.entries()]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
        {/* Section Destinataire en premier avec design amélioré */}
        <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="text-lg font-semibold text-primary mb-3">Destination du dossier</h3>
          <div className="space-y-3">
            <p className="text-sm text-primary">Sélectionnez le destinataire principal pour l'envoi du dossier :</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.values(RecipientData).map((recipient, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedRecipient === recipient.email ? "border-primary bg-blue-100" : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => onRecipientChange(recipient.email)}>
                  <div className="flex items-center">
                    <div
                      className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${
                        selectedRecipient === recipient.email ? "border-primary bg-primary" : "border-gray-300"
                      }`}>
                      {selectedRecipient === recipient.email && (
                        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{recipient.nom}</p>
                      {/* <p className="text-xs text-gray-500">{recipient.email}</p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button type='button' className='p-2 bg-primary' onClick={previewPDF}>preview pdf</button>
        </div>
      </div>
      <button className="p-2 bg-primary" onClick={previewPDF}>
        preview pdf
      </button>
    </div>
  );
};
