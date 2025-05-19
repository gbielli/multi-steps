"use client";

import { FormProvider } from "@/app/context/FormContext";
import MultiStepForm from "@/components/MultiStepForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold">
            Découvrez le niveau d&apos;optimisation de votre configuration
            server-side
          </h1>
          <p className="text-gray-500 mt-2">
            Répondez aux questions et découvrez votre score final
          </p>
        </div>
        <FormProvider>
          <MultiStepForm />
        </FormProvider>
      </div>
    </main>
  );
}
