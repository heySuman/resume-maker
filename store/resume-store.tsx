import { EducationalDetails, EducationalDetailsState, initialEducationalDetails } from '@/types/educational-details'
import { initialPersonalDetails, PersonalDetail, PersonalDetailsState } from '@/types/personal-details'
import { create } from 'zustand'

export const usePersonalDetails = create<PersonalDetailsState>((set) => ({
    personalDetails: initialPersonalDetails,
    setPersonalDetails: (newPersonalDetail: PersonalDetail) => set({ personalDetails: newPersonalDetail }),
    clearPersonalDetails: () => set({ personalDetails: initialPersonalDetails }),
}))

export const useEducationalDetails = create<EducationalDetailsState>((set) => ({
    educationalDetails: initialEducationalDetails,
    setEducationalDetails: (educationalDetails: EducationalDetails) => set({ educationalDetails: educationalDetails }),
    clearEducationalDetails: () => set({educationalDetails: initialEducationalDetails})
}))