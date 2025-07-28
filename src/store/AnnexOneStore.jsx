import { create } from 'zustand';
import { FamilyService } from '../services/familyService';

const useFamilleStore = create((set, get) => ({
  // État initial
  formData: {
    typeDemande: '',
    membresFamille: [],
    enfants: [],
    freresSoeurs: [],
    declaration: false
  },
  isLoading: false,
  isSubmitted: false,
  error: null,

  // Actions
  submitFamilleForm: async (formData) => {
    set({ isLoading: true, error: null });
    
    try {
      const result = await FamilyService.submitFamilyForm(formData);
      
      if (result.success) {
        set({ 
          formData,
          isLoading: false, 
          isSubmitted: true,
          error: null
        });
      }
      
      return result;
    } catch (error) {
      set({ 
        isLoading: false,
        error: error.message || 'Erreur lors de la soumission'
      });
      return { success: false, error };
    }
  },

  resetForm: () => {
    set({
      formData: {
        typeDemande: '',
        membresFamille: [],
        enfants: [],
        freresSoeurs: [],
        declaration: false
      },
      isLoading: false,
      isSubmitted: false,
      error: null
    });
  },

  // Actions pour les membres dynamiques
  addMembreFamille: (membre) => set((state) => ({
    formData: {
      ...state.formData,
      membresFamille: [...state.formData.membresFamille, membre]
    }
  })),

  removeMembreFamille: (index) => set((state) => ({
    formData: {
      ...state.formData,
      membresFamille: state.formData.membresFamille.filter((_, i) => i !== index)
    }
  })),

  addEnfant: (enfant) => set((state) => ({
    formData: {
      ...state.formData,
      enfants: [...state.formData.enfants, enfant]
    }
  })),

  removeEnfant: (index) => set((state) => ({
    formData: {
      ...state.formData,
      enfants: state.formData.enfants.filter((_, i) => i !== index)
    }
  })),

  addFrereSoeur: (frereSoeur) => set((state) => ({
    formData: {
      ...state.formData,
      freresSoeurs: [...state.formData.freresSoeurs, frereSoeur]
    }
  })),

  removeFrereSoeur: (index) => set((state) => ({
    formData: {
      ...state.formData,
      freresSoeurs: state.formData.freresSoeurs.filter((_, i) => i !== index)
    }
  })),

  updateField: (field, value) => set((state) => ({
    formData: {
      ...state.formData,
      [field]: value
    }
  }))
}));

export default useFamilleStore;