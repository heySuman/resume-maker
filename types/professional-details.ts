export type Experience = {
    company: string
    title: string
    city?: string
    startDate: string
    endDate?: string
    ongoing: boolean
    description?: string
}

export const initialExperience: Experience = {
    company: "",
    title: "",
    city: "",
    startDate: "",
    endDate: "",
    ongoing: true,
    description: "",
}

export type ProfessionalState = {
    experiences: Experience[]
    setExperiences: (next: Experience[]) => void
    clearExperiences: () => void
}