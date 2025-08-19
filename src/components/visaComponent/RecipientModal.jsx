import React from 'react';
import { RecipientData } from './RecipientData';

const RecipientModal = ({
  isOpen,
  onClose,
  selectedRecipient,
  onRecipientChange,
  onSubmit,
  formData
}) => {
  if (!isOpen) return null;

  const handleSubmitAndClose = async () => {
    try {
      await onSubmit();
      onClose(); // Fermer la modal seulement après une soumission réussie
    } catch (error) {
      console.error("Erreur lors de la soumission", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Sélection du destinataire</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Veuillez sélectionner le destinataire principal pour l'envoi du dossier :
            </p>

            <div className="grid grid-cols-1 gap-3">
              {Object.values(RecipientData).map((recipient, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedRecipient === recipient.email ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
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
                      <p className="text-xs text-gray-500">{recipient.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSubmitAndClose}
              disabled={!formData.declarationAgreed}
              className={`px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white ${formData.declarationAgreed ? 'bg-primary hover:bg-primary-600' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              Confirmer et soumettre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientModal;