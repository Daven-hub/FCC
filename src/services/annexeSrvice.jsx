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
    // Créez un objet FormData pour gérer les fichiers
    const data = new FormData();
    
    // Ajoutez les données du formulaire
    for (const key in formData) {
      if (key === 'documents') {
        // Traitement spécial pour les documents
        for (const category in formData.documents) {
          for (const docType in formData.documents[category]) {
            const doc = formData.documents[category][docType];
            if (doc.provided && doc.file) {
              // Ici vous devriez avoir le vrai fichier, pas juste les métadonnées
              // Vous devrez modifier votre handleFileUpload pour stocker le vrai fichier
              data.append(`documents[${category}][${docType}]`, doc.file);
            }
          }
        }
      } else if (Array.isArray(formData[key])) {
        // Gestion des tableaux
        data.append(key, JSON.stringify(formData[key]));
      } else if (typeof formData[key] === 'object') {
        // Gestion des objets imbriqués
        data.append(key, JSON.stringify(formData[key]));
      } else {
        // Valeurs simples
        data.append(key, formData[key]);
      }
    }

    const response = await api.post(`/s`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // Optionnel : suivi de la progression pour les gros fichiers
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(percentCompleted);
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};