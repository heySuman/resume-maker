"use client"

import { ResumeData } from "../preview";

export default function ModernTemplate({ data }: { data: ResumeData }) {
    const personal = {
        name: data.fullName || data.personal?.fullName || "Your Name",
        email: data.email || data.personal?.email || "you@example.com",
        phone: data.phone || data.personal?.phone || "(000) 000-0000",
        city: data.city || data.personal?.city || "City",
    }

    const educations = data.educations || [];
    const experiences = data.experiences || [];

    return (
        <div style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: 22 }}>{personal.name}</h1>
                    <div style={{ color: '#666', fontSize: 13 }}>{personal.city} • {personal.email}</div>
                </div>
                <div style={{ textAlign: 'right', color: '#666', fontSize: 13 }}>{personal.phone}</div>
            </div>

            <div style={{ display: 'flex', gap: 20 }}>
                <div style={{ flex: 2 }}>
                    <h3 style={{ marginBottom: 6 }}>Experience</h3>
                    {Array.isArray(experiences) && experiences.map((ex: any, idx: number) => (
                        <div key={idx} style={{ marginBottom: 10 }}>
                            <div style={{ fontWeight: 600 }}>{ex.title} — {ex.company}</div>
                            <div style={{ color: '#666', fontSize: 13 }}>{ex.startDate} {ex.endDate ? `- ${ex.endDate}` : ''}</div>
                            {ex.description && <div style={{ marginTop: 6 }}>{ex.description}</div>}
                        </div>
                    ))}
                </div>

                <aside style={{ flex: 1, borderLeft: '1px solid #eee', paddingLeft: 12 }}>
                    <h4 style={{ marginBottom: 6 }}>Education</h4>
                    {Array.isArray(educations) && educations.map((e: any, i: number) => (
                        <div key={i} style={{ marginBottom: 8 }}>
                            <div style={{ fontWeight: 600 }}>{e.degree}</div>
                            <div style={{ color: '#666', fontSize: 13 }}>{e.institute}</div>
                        </div>
                    ))}
                </aside>
            </div>
        </div>
    )
}
