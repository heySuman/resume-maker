"use client"

import { ResumeData } from "../preview";

export default function BasicTemplate({ data }: { data: ResumeData }) {
    const personal = {
        name: data.fullName || data.personal?.fullName || "Your Name",
        email: data.email || data.personal?.email || "you@example.com",
        phone: data.phone || data.personal?.phone || "(000) 000-0000",
        city: data.city || data.personal?.city || "City",
        country: data.country || data.personal?.country || "Country",
        address: data.address || data.personal?.address || "Address",
    }

    const educations = data.educations || data.educational || [];
    const experiences = data.experiences || [];

    return (
        <div style={{ color: '#111' }}>
            <header className="mb-4">
                <h1 style={{ fontSize: 22, margin: 0 }}>{personal.name}</h1>
                <div className="muted" style={{ fontSize: 13 }}>{personal.email} • {personal.phone} • {personal.city}, {personal.country}</div>
            </header>

            <section className="section">
                <h2 style={{ fontSize: 14, marginBottom: 6 }}>Education</h2>
                {Array.isArray(educations) && educations.map((e: any, i: number) => (
                    <div key={i} style={{ marginBottom: 8 }}>
                        <div style={{ fontWeight: 600 }}>{e.degree || e.title || 'Degree'}</div>
                        <div className="muted">{e.institute || e.school} • {e.startDate ? new Date(e.startDate).toLocaleDateString() : ''} {e.endDate ? `- ${new Date(e.endDate).toLocaleDateString()}` : ''}</div>
                        {e.description && <div style={{ marginTop: 4 }}>{e.description}</div>}
                    </div>
                ))}
            </section>

            <section className="section">
                <h2 style={{ fontSize: 14, marginBottom: 6 }}>Experience</h2>
                {Array.isArray(experiences) && experiences.map((ex: any, idx: number) => (
                    <div key={idx} style={{ marginBottom: 8 }}>
                        <div style={{ fontWeight: 600 }}>{ex.title || ex.position} — {ex.company}</div>
                        <div className="muted">{ex.startDate} {ex.endDate ? `- ${ex.endDate}` : ''} {ex.city ? `• ${ex.city}` : ''}</div>
                        {ex.description && <div style={{ marginTop: 4 }}>{ex.description}</div>}
                    </div>
                ))}
            </section>
        </div>
    )
}
