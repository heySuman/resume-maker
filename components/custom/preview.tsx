"use client"

import { useFormContext } from "react-hook-form";
import BasicTemplate from "./templates/basic";
import ModernTemplate from "./templates/modern";

export default function Preview({ template = "basic" }: { template?: string }) {
    const { watch } = useFormContext();
    const values = watch();

    return (
        <div id="resume-preview" className="border rounded p-4 bg-white">
            {template === "modern" && <ModernTemplate data={values} />}
            {template === "basic" && <BasicTemplate data={values} />}
        </div>
    )
}

export type ResumeData = any;
