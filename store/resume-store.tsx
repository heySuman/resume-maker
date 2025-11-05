import { initialPersonalDetails, PersonalDetail, PersonalDetailsState } from '@/types/personal-details'
import { create } from 'zustand'

export const usePersonalDetails = create<PersonalDetailsState>((set) => ({
    personalDetails: initialPersonalDetails,
    setPersonalDetails: (newPersonalDetail: PersonalDetail) => set({ personalDetails: newPersonalDetail }),
    clearPersonalDetails: () => set({ personalDetails: initialPersonalDetails }),
}))