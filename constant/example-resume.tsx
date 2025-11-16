export type Resume = {

    // personal
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    country: string

    // education
    educations: [
        {
            institute: string
            startDate: string
            ongoing: boolean
            endDate?: string
            degree: string
            description?: string
        }
    ]

    // experiences

    experiences: [
        {
            company: string
            title: string
            city?: string
            startDate: string
            endDate?: string
            ongoing: boolean
            description?: string
        }
    ]
}

export const exampleResume: Resume = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St",
    city: "New York",
    country: "USA",

    educations: [
        {
            institute: "State University",
            startDate: "2015-09",
            ongoing: false,
            endDate: "2019-06",
            degree: "B.Sc. in Computer Science",
            description: "Graduated with honors; focused on software engineering, algorithms, and systems."
        }
    ],

    experiences: [
        {
            company: "Acme Corp",
            title: "Software Engineer",
            city: "New York",
            startDate: "2019-07",
            endDate: "2023-11",
            ongoing: false,
            description: "Built and maintained web applications using React and Node.js. Led TypeScript migration and improved test coverage."
        }
    ]
}