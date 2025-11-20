import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ResumeStoreData {
  personal: {
    jobTitle: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
  };
  employment?: {
    jobTitle: string;
    employer: string;
    startDate: string;
    endDate?: string;
    city: string;
    description: string;
  }[];
  education?: {
    school: string;
    degree: string;
    startDate: string;
    endDate?: string;
    city: string;
    description: string;
  }[];
  skill?: {
    skill: string;
    level: "novice" | "beginner" | "skillful" | "experienced" | "expert";
  }[];
  project?: {
    projectName: string;
    startDate: string;
    endDate?: string;
    description?: string;
    link?: string;
  }[];
  language?: {
    language: string;
    level: "native speaker" | "highly proficient" | "very good command";
  }[];
}

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

const useResumeStore = create<ResumeStoreState>()(
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
