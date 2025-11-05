export type PersonalDetail = {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    country: string
    postalCode: string
}

export const initialPersonalDetails: PersonalDetail = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
}

export type PersonalDetailsState = {
    personalDetails: PersonalDetail;
    setPersonalDetails: (newPersonalDetails: PersonalDetail) => void;
    clearPersonalDetails: () => void;
};
