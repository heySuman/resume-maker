"use client";

import { useEffect } from "react";
import { useResumeStore } from "@/store/resume-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { resumeSchema } from "@/schemas/resume";
import * as z from "zod";
import { ResumeStoreData } from "@/types/resume";

export default function ResumeForm() {
  const { formData, setField } = useResumeStore();

  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: formData,
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = form.watch((value: any) => {
      useResumeStore.setState({ formData: value as ResumeStoreData });
    });

    return () => subscription.unsubscribe();
  });

  return (
    <FormProvider {...form}>
      <form>{/* <Stepper/> */}</form>
    </FormProvider>
  );
}
