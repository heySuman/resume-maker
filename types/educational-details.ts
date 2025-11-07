export type EducationalDetails = {
    institute: string
    startDate: string
    ongoing: boolean
    endDate: string
    degree: string
    description?: string
}

export const initialEducationalDetails: EducationalDetails = {
    institute: "",
    startDate: "",
    ongoing: true,
    endDate: "",
    degree: "",
    description: ""
}

export type EducationalDetailsState = {
    educationalDetails: EducationalDetails;
    setEducationalDetails: (newPersonalDetails: EducationalDetails) => void;
    clearEducationalDetails: () => void;
};
