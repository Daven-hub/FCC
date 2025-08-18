import React from 'react';
import { FiChevronLeft, FiChevronRight, FiCheck } from 'react-icons/fi';

const FormNavigation = ({
    activeStep,
    steps,
    prevStep,
    nextStep,
    validateCurrentStep,
    submitStatus,
    formData,
    onOpenRecipientModal
}) => {
    return (
        <div className="px-6 py-5 bg-gray-50 sm:px-8">
            <div className="flex items-center justify-between">
                {activeStep > 0 ? (
                    <button
                        type="button"
                        onClick={prevStep}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
                    >
                        <FiChevronLeft className="mr-2" />
                        Précédent
                    </button>
                ) : (
                    <div></div>
                )}

                {activeStep < steps.length - 1 ? (
                    <button
                        type="button"
                        onClick={nextStep}
                        disabled={!validateCurrentStep(activeStep)}
                        className={`ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all ${validateCurrentStep(activeStep)
                            ? "bg-primary hover:bg-primary-600"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Suivant
                        <FiChevronRight className="ml-2" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onOpenRecipientModal}
                        disabled={submitStatus === "loading" || !formData.declarationAgreed}
                        className={`ml-auto inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${submitStatus === "loading" || !formData.declarationAgreed
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                            }`}
                    >
                        {submitStatus === "loading" ? (
                            <>
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Envoi en cours...
                            </>
                        ) : (
                            <>
                                <FiCheck className="mr-2" />
                                Soumettre la demande
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default FormNavigation;