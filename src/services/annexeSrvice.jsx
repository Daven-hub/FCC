
import { showErrorToast, showSuccessToast } from "../components/Toast/Toast";
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





export const submitCombinedApplication = async (formData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await api.post(
      '/formulaire.foc-cof.ca',
      formData,
      config
    );

    if (response.data.status === 'sucess') {
      return showSuccessToast(response.data.message)
    }

  } catch (error) {
    showErrorToast("Erreur lors de la soumission")
    throw error;
  }
};