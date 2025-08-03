import api from "./api";

export const submitFamilyDocuments = async (formData) => {
  try {
    const response = await api.post(`/`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting family documents:', error);
    throw error;
  }
};