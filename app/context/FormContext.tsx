"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type FormContextType = {
  currentStep: number;
  formData: Record<string, string>;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (newData: Record<string, string>) => void;
  calculateScore: (correctAnswers: Record<string, string>) => number;
  isCompleted: boolean;
  score: number;
  resetForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Chargement des données depuis localStorage au démarrage
  useEffect(() => {
    const savedData = localStorage.getItem("multistepForm");
    const savedStep = localStorage.getItem("currentStep");

    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, []);

  // Sauvegarde des données dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("multistepForm", JSON.stringify(formData));
    localStorage.setItem("currentStep", currentStep.toString());
  }, [formData, currentStep]);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const updateFormData = (newData: Record<string, string>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const calculateScore = (correctAnswers: Record<string, string>) => {
    // On calcule combien de réponses sont correctes
    let correctCount = 0;

    for (const [question, answer] of Object.entries(formData)) {
      if (correctAnswers[question] === answer) {
        correctCount++;
      }
    }

    // Calcul du pourcentage
    const percentage =
      (correctCount / Object.keys(correctAnswers).length) * 100;
    setScore(percentage);
    setIsCompleted(true);
    return percentage;
  };

  const resetForm = () => {
    setFormData({});
    setCurrentStep(0);
    setIsCompleted(false);
    setScore(0);
    localStorage.removeItem("multistepForm");
    localStorage.removeItem("currentStep");
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        formData,
        nextStep,
        prevStep,
        updateFormData,
        calculateScore,
        isCompleted,
        score,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
};
