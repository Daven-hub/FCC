import api from "./api";

export const submitCanadianForm = async (formData) => {
    try {
        const response = await api.post(`/`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
        throw error; 
    }
};


export const submitCombinedApplication =async (formData) => {
    try {
        const response = await api.post(`/`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
        throw error; 
    }
};