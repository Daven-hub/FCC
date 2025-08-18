import { BlobProvider,pdf } from '@react-pdf/renderer';
import React from 'react';
import { RecipientData } from '../visaComponent/RecipientData';
import { FiPlus, FiX } from 'react-icons/fi';
import MonPdfDocument from '../pdf/MonPdf';
import prog from "../../datas/immigration.json"

export const DeclarationSection = ({
    declarationAgreed,
    onAgreementChange,
    showPreview,
    onTogglePreview,
    formData,
    selectedRecipient,
    onRecipientChange
}) => {
    const dataa=formData.documents[0].corps[3].imageData;
    const previewPDF =  () => {
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

    // 3. Générer le PDF
    pdf(<MonPdfDocument datas={prog} datac={formData} forme3={formData?.personalInfo} dataa={dataa} documents={formData.documents} />)
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
                                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedRecipient === recipient.email ? 'border-primary bg-blue-100' : 'border-gray-200 hover:border-blue-300'}`}
                                    onClick={() => onRecipientChange(recipient.email)}
                                >
                                    <div className="flex items-center">
                                        <div className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mr-3 ${selectedRecipient === recipient.email ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                                            {selectedRecipient === recipient.email && (
                                                <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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

                    </div>
                </div>

                {/* Section Déclaration */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Déclaration et consentement</h3>
                    
                    <div className="prose prose-sm text-gray-700 mb-6 bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-900">Je déclare par la présente que :</p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li className="text-gray-700">Les renseignements fournis dans cette demande sont exacts et complets.</li>
                            <li className="text-gray-700">J'ai lu et compris les questions et les instructions.</li>
                            <li className="text-gray-700">Je comprends que le fait de faire une déclaration fausse ou trompeuse constitue une infraction.</li>
                            <li className="text-gray-700">Je comprends que tous les renseignements fournis peuvent être vérifiés.</li>
                            <li className="text-gray-700">Je consens au partage des informations avec les organismes concernés.</li>
                            <li className="text-gray-700">Je comprends que le traitement peut être retardé sans tous les documents requis.</li>
                        </ul>
                        <p className="mt-4 text-gray-700">
                            <span className="font-medium">Note importante :</span> Des frais de traitement non remboursables s'appliquent et leur paiement ne garantit pas l'approbation de la demande.
                        </p>
                    </div>

                    {/* Checkbox de confirmation */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <label className="flex items-start space-x-3">
                            <div className="flex items-center h-5 mt-0.5">
                                <input
                                    type="checkbox"
                                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    checked={declarationAgreed}
                                    onChange={onAgreementChange}
                                    required
                                />
                            </div>
                            <div className="text-sm">
                                <span className="font-medium text-gray-900">
                                    Je certifie avoir lu et compris la déclaration ci-dessus.
                                </span>
                                <span className="text-red-500 ml-1">*</span>
                                <p className="text-xs text-gray-500 mt-1">
                                    En cochant cette case, vous confirmez l'exactitude des informations fournies et acceptez les conditions générales.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <button className='p-2 bg-primary' onClick={previewPDF}>preview pdf</button>
      

        </div>
    );
};