import api from "./api";

export const FamilyService = {
  async submitFamilyForm(formData) {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append('typeDemande', formData.typeDemande);
      formDataToSend.append('declaration', formData.declaration);

      this.appendArrayToFormData(formDataToSend, 'membresFamille', formData.membresFamille);
      this.appendArrayToFormData(formDataToSend, 'enfants', formData.enfants);
      this.appendArrayToFormData(formDataToSend, 'freresSoeurs', formData.freresSoeurs);

      const response = await api.post('/family-submission', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.status === 'success') {
        return {
          success: true,
          data: response.data.result
        };
      }
      throw new Error(response.data.message || 'Erreur lors de la soumission');
    } catch (err) {
      console.error('Erreur FamilyService:', err);
      throw new Error(err.response?.data?.message || 'Erreur de serveur');
    }
  },

  appendArrayToFormData(formData, arrayName, array) {
    array.forEach((item, index) => {
      Object.keys(item).forEach(key => {
        formData.append(`${arrayName}[${index}][${key}]`, item[key]);
      });
    });
  }
};