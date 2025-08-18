// components/FormStapper/DeclarationSection.js
import React from 'react';
import { BlobProvider, pdf } from '@react-pdf/renderer';
import { FiPlus, FiX } from 'react-icons/fi';
import MonPdfDocument from '../pdf/MonPdf';
import prog from "../../datas/immigration.json"

export const DeclarationSection = ({
    declarationAgreed,
    onAgreementChange,
    showPreview,
    onTogglePreview,
    formData
}) => {
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