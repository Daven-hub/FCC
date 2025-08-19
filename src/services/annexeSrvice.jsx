
import axios from "axios";
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
    // if (!(formData instanceof FormData)) {
    //     throw new Error("Les données doivent être au format FormData");
    // }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response= await axios.post(
      'http://localhost:84/',
      formData,
      config
    );
    

    // if (!response.data) {
    //     throw new Error("Pas de réponse du serveur");
    // }

    // if (response.data.status === 'success') {
    //   showSuccessToast("Soumission réussie");
    //   return response.data;
    // } else {
    //   showErrorToast("Erreur inconnue du serveur");
    // }
    console.log(response);
  } catch (error) {
    showErrorToast(error.message || "Erreur lors de la soumission");
    throw error;
  }
};