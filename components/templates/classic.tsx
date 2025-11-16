"use client"

import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer'
import { exampleResume, Resume } from "@/constant/example-resume"

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 11,
        lineHeight: 1.4
    },
    section: {
        marginBottom: 12
    },
    heading: {
        fontSize: 24,
        fontWeight:700,
        marginBottom: 6
    }
})

export function Classic({ data = exampleResume }: { data?: Resume }) {
    return (
            <PDFViewer>
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text style={styles.heading}>{data.fullName}</Text>
                        <Text>{data.email} | {data.phone}</Text>
                        <Text>{data.address}, {data.city}, {data.country}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.heading}>Education</Text>
                        {data.educations.map((edu, i) => (
                            <View key={i}>
                                <Text>{edu.institute} ({edu.startDate} - {edu.ongoing ? "Present" : edu.endDate})</Text>
                                <Text>{edu.degree}</Text>
                                {edu.description && <Text>{edu.description}</Text>}
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.heading}>Experience</Text>
                        {data.experiences.map((exp, i) => (
                            <View key={i}>
                                <Text>{exp.title} @ {exp.company}</Text>
                                <Text>{exp.city}</Text>
                                <Text>{exp.startDate} - {exp.ongoing ? "Present" : exp.endDate}</Text>
                                {exp.description && <Text>{exp.description}</Text>}
                            </View>
                        ))}
                    </View>

                </Page>
            </PDFViewer>
    )
}
