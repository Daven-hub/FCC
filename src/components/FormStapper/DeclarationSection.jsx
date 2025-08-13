import { BlobProvider } from '@react-pdf/renderer';
import React from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import MonPdfDocument from '../pdf/MonPdf';
import prog from "../../datas/immigration.json"

const DeclarationSection = ({
    declarationAgreed,
    onAgreementChange,
    showPreview,
    onTogglePreview,
    formData
}) => {
    const dataa=formData.documents[0].corps[3].imageData;
    // const previewPDF=()=>{
    //     const dataa=formData.documents[0].corps[3].imageData;
    //     // console.log("formplus",formData.documents[0].corps[3].imageData)
    //     return(
    //         <BlobProvider document={<MonPdfDocument datas={prog} dataa={dataa}/>}>
    //             {({ url, loading }) =>
    //                 loading ? (
    //                 <button disabled>Chargement...</button>
    //                 ) : (
    //                 window.open(url)
    //                 // <iframe src={url} width="100%" height="600" title="Aperçu PDF" />
    //                 )
    //             }
    //         </BlobProvider>
    //         )
    // }
    // console.log(prog)
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Déclaration et consentement</h3>

                <div className="prose prose-sm text-gray-700 mb-6">
                    <p>Je déclare par la présente que :</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Les renseignements fournis dans cette demande sont exacts et complets.</li>
                        <li>J'ai lu et compris les questions et les instructions.</li>
                        <li>Je comprends que le fait de faire une déclaration fausse ou trompeuse constitue une infraction en vertu de la Loi sur l'immigration et la protection des réfugiés.</li>
                        <li>Je comprends que tous les renseignements fournis dans le cadre de cette demande peuvent être vérifiés.</li>
                        <li>Je consens à ce que les renseignements fournis soient partagés avec les organismes gouvernementaux concernés à des fins de vérification.</li>
                        <li>Je comprends que le traitement de ma demande peut être retardé si je ne fournis pas tous les documents requis.</li>
                    </ul>
                    <p className="mt-4">Je comprends également que des frais de traitement non remboursables s'appliquent et que le paiement de ces frais ne garantit pas l'approbation de ma demande.</p>
                </div>

                <div className="mt-6">
                    <label className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                type="checkbox"
                                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                checked={declarationAgreed}
                                onChange={onAgreementChange}
                                required
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <span className="font-medium text-gray-700">Je certifie que j'ai lu et compris la déclaration ci-dessus et que toutes les informations fournies sont exactes et complètes.</span>
                            <span className="text-red-500">*</span>
                        </div>
                    </label>
                </div>
            </div>
            <button className='p-2 bg-primary'>preview pdf</button>
            {/* <BlobProvider document={<MonPdfDocument datas={prog}/>}>
                {({ url, loading }) =>
                    loading ? (
                    <button disabled>Chargement...</button>
                    ) : (
                    // window.open(url)
                    <iframe src={url} width="100%" height="600" title="Aperçu PDF" />
                    )
                }
            </BlobProvider> */}
        </div>
    );
};

export default DeclarationSection;