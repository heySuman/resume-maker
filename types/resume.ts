export interface ResumeStoreData {
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
