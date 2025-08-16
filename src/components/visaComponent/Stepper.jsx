import React from 'react';

const Stepper = ({ steps, activeStep, setActiveStep, validateCurrentStep }) => {
    const getStepDescription = (step) => {
        const descriptions = [
            "Remplissez vos informations personnelles. Tous les champs sont obligatoires.",
            "Fournissez vos antécédents complets. Soyez précis et honnête.",
            "Ajoutez les informations sur votre famille immédiate.",
            "Téléchargez tous les documents requis. Formats acceptés : PDF, JPG, PNG.",
            "Lisez attentivement et acceptez la déclaration avant de soumettre."
        ];
        return descriptions[step];
    };

    return (
        <div className="mb-10 md:mb-14">
            <nav className="flex items-center justify-center">
                <ol className="flex items-center space-x-4 md:space-x-8">
                    {steps.map((step, index) => (
                        <li key={index} className="flex items-center">
                            <button
                                type="button"
                                onClick={() => validateCurrentStep(activeStep) && setActiveStep(index)}
                                className={`group relative flex flex-col items-center transition-all ${index <= activeStep ? "cursor-pointer" : "cursor-not-allowed"}`}
                                disabled={!validateCurrentStep(activeStep)}
                            >
                                <span
                                    className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300 ${index === activeStep
                                        ? "bg-primary border-primary text-white shadow-lg scale-110"
                                        : index < activeStep
                                            ? "bg-green-100 border-green-500 text-green-700"
                                            : "bg-white border-gray-300 text-gray-400 group-hover:border-gray-400"
                                        }`}
                                >
                                    {index < activeStep ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <span className="font-medium">{index + 1}</span>
                                    )}
                                </span>
                                <span
                                    className={`absolute top-full mt-2 w-32 text-center text-sm font-medium ${index === activeStep
                                        ? "text-primary font-semibold"
                                        : index < activeStep
                                            ? "text-gray-600"
                                            : "text-gray-400"
                                        }`}
                                >
                                    {step.title}
                                </span>
                            </button>

                            {index < steps.length - 1 && (
                                <div
                                    className={`hidden md:block h-0.5 w-16 mx-2 transition-all duration-500 ${index < activeStep ? "bg-green-500" : "bg-gray-200"
                                        }`}
                                />
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default Stepper;