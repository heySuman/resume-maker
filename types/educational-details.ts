export type EducationalDetails = {
    institute: string
    startDate: string
    ongoing: boolean
    endDate: string
    degree: string
    city: string
    description: string
}

export const initialEducationalDetails: EducationalDetails = {
    institute: "",
    startDate: "",
    ongoing: true,
    endDate: "",
    degree: "",
    city: "",
    description: ""
}

export type EducationalDetailsState = {
    educationalDetails: EducationalDetails;
    setEducationalDetails: (newPersonalDetails: EducationalDetails) => void;
    clearEducationalDetails: () => void;
};
