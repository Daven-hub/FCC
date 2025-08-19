import React from 'react';
import { FiCheck, FiX, FiPlus, FiTrash2, FiUpload, FiChevronLeft, FiChevronRight, FiInfo } from 'react-icons/fi';

export const DocumentsStep = ({ formData, uploadProgress, handleFileUpload, handleRemoveFile, handleConditionChange }) => {
    const FileUpload = ({ sectionIndex, docIndex, label, required, specifications, period, condition, onConditionChange }) => {
        const docState = formData.documents[sectionIndex].corps[docIndex];
        const uploadState = uploadProgress[`${sectionIndex}-${docIndex}`];

        const getAcceptedFormats = () => {
            switch (docState.type) {
                case 'PDF': return ".pdf";
                case 'IMAGE': return "image/*";
                default: return ".pdf, .jpg, .jpeg, .png";
            }
        };

        const formatDescription = docState.type === 'PDF'
            ? "Format PDF uniquement"
            : docState.type === 'IMAGE'
                ? "Formats image (JPG, JPEG, PNG)"
                : "Formats PDF, JPG, JPEG ou PNG";

        return (
            <div className="mb-4 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                {condition && (
                    <div className="mb-4 p-3 bg-blue-50 rounded border border-blue-100">
                        <p className="text-sm font-medium text-gray-700 mb-2">{condition.question}</p>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={condition.response === 'non'}
                                    onChange={() => onConditionChange(sectionIndex, docIndex, 'non')}
                                />
                                <span className="ml-2">Non</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                    checked={condition.response === 'oui'}
                                    onChange={() => onConditionChange(sectionIndex, docIndex, 'oui')}
                                />
                                <span className="ml-2">Oui</span>
                            </label>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                    <div className="flex-1">
                        <label className="font-medium text-gray-700">
                            {label} {required && <span className="text-red-500">*</span>}
                        </label>
                        {specifications && <p className="text-xs text-gray-500 mt-1">{specifications}</p>}
                        {period && <p className="text-xs text-gray-500 mt-1">Période: {period}</p>}
                        <p className="text-xs text-primary mt-1">{formatDescription}</p>
                    </div>
                    {docState.provided ? (
                        <span className="flex items-center text-green-600 whitespace-nowrap">
                            <FiCheck className="mr-1" /> Fourni
                        </span>
                    ) : (
                        <span className="text-gray-500 whitespace-nowrap">Manquant</span>
                    )}
                </div>

                {docState.provided ? (
                    <div className="space-y-2">
                        {docState.type === 'IMAGE' && docState.imageData ? (
                            <div className="flex flex-col sm:flex-row items-center bg-white p-3 rounded border border-green-100">
                                <div className="relative mb-2 sm:mb-0 sm:mr-4 flex-shrink-0">
                                    <img
                                        src={docState.imageData}
                                        alt="Document visuel"
                                        className="h-32 w-auto object-contain rounded-md border border-gray-200"
                                    />
                                    {docState.specifications && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                                            {docState.specifications}
                                        </div>
                                    )}
                                </div>
                                <div className="w-full text-center sm:text-left">
                                    <p className="text-sm font-medium truncate">{docState.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {(docState.size / 1024).toFixed(1)} KB - {docState.type.split('/')[1]?.toUpperCase() || 'IMAGE'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(sectionIndex, docIndex)}
                                    className="mt-2 sm:mt-0 text-red-500 hover:text-red-700 p-1 self-end sm:self-center"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-3 rounded border border-green-100">
                                <div className="mb-2 sm:mb-0">
                                    <p className="font-medium">{docState.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {(docState.size / 1024).toFixed(1)} KB - {docState.type.split('/')[1]?.toUpperCase() || 'PDF'}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        Téléversé le: {new Date(docState.uploadDate).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFile(sectionIndex, docIndex)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        )}

                        {uploadState?.progress > 0 && uploadState.progress < 100 && (
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-primary h-2.5 rounded-full"
                                    style={{ width: `${uploadState.progress}%` }}
                                ></div>
                                <p className="text-xs text-gray-500 mt-1 truncate">
                                    Téléversement: {uploadState.progress}% - {uploadState.fileName}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full py-6 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 text-center">
                            <span className="font-medium text-primary">Cliquer pour uploader</span> ou glisser-déposer
                        </p>
                        <p className="text-xs text-gray-400 mt-1 text-center">
                            Formats acceptés: {getAcceptedFormats()} (max 3.8MB)
                        </p>
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(sectionIndex, docIndex, e.target.files[0])}
                            accept={docState.type === 'PDF' ? '.pdf' : docState.type === 'IMAGE' ? 'image/*' : ''}
                            required={required && !docState.provided}
                        />
                    </label>
                )}
            </div>
        );
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                        <FiInfo className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-primary">Instructions importantes</h3>
                        <div className="mt-2 text-sm text-primary">
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Formats de fichiers acceptés :
                                    <ul className="list-disc pl-5 mt-1">
                                        <li>Documents d'identité : PDF uniquement</li>
                                        <li>Photos : JPG, JPEG ou PNG (35x45mm, fond clair)</li>
                                        <li>Relevés bancaires : PDF uniquement</li>
                                        <li>Autres documents : PDF ou images (JPG, JPEG, PNG)</li>
                                    </ul>
                                </li>
                                <li>Taille maximale par fichier : 3.8MB</li>
                                <li>Le passeport doit avoir une validité d'au moins 1 an</li>
                                <li>Les relevés bancaires doivent couvrir les 6 derniers mois</li>
                                <li>Les documents dans d'autres langues doivent être traduits et certifiés</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {formData.documents.map((section, sectionIndex) => (
                <div key={sectionIndex} className="bg-white p-3 sm:p-4 rounded-lg shadow border border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{section.titre}</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {section.corps.map((doc, docIndex) => {
                            if (doc.condition && doc.condition.response === 'non') {
                                return null;
                            }

                            return (
                                <FileUpload
                                    key={docIndex}
                                    sectionIndex={sectionIndex}
                                    docIndex={docIndex}
                                    label={doc.titre}
                                    required={doc.required && (!doc.condition || doc.condition.response === 'oui')}
                                    specifications={doc.specifications}
                                    period={doc.period}
                                    condition={doc.condition}
                                    onConditionChange={handleConditionChange}
                                />
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};