import { ResumeStoreData } from "@/types/resume";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ResumeStoreState {
  formData: ResumeStoreData;

  setField: <K extends keyof ResumeStoreData>(
    field: K,
    value: ResumeStoreData[K]
  ) => void;

  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  resetForm: () => void;
  currentStep: number;
}

const initialData: ResumeStoreData = {
  personal: {
    jobTitle: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  },
};

export const useResumeStore = create<ResumeStoreState>()(
  persist(
    (set) => ({
      formData: initialData,
      currentStep: 0,

      setField: (field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            [field]: value,
          },
        })),
      setCurrentStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => ({
          currentStep: state.currentStep + 1,
        })),
      previousStep: () =>
        set((state) => ({
          currentStep: state.currentStep - 1,
        })),
      resetForm: () => set({ formData: initialData }),
    }),
    {
      name: "resume-data",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
