import api from "./api";


export const submitTemporaryResidentApplication = async (formData) => {
  try {
    const response = await api.post(`/`, formData);
    return response.data;
  } catch (error) {
    console.error('Error submitting temporary resident application:', error);
    throw error;
  }
};