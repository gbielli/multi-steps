import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Question {
  id: string;
  question: string;
  options: Array<{ value: number }>;
  weight?: number;
}

export function calculatePercentage(
  answers: Record<number, number>,
  questions: Question[]
): number {
  if (!answers || Object.keys(answers).length === 0) {
    return 0;
  }

  let totalScore = 0;
  let maxPossibleScore = 0;

  // Parcourir toutes les questions pour lesquelles nous avons des réponses
  Object.keys(answers).forEach((questionId) => {
    const id = parseInt(questionId);
    const questionConfig = questions[id];
    const answerValue = answers[id];

    // Si un poids est défini pour cette question
    const weight = questionConfig.weight || 1;

    totalScore += answerValue * weight;

    // Calculer le score maximum possible pour cette question
    const maxOptionValue = Math.max(
      ...questionConfig.options.map((option) => option.value)
    );
    maxPossibleScore += maxOptionValue * weight;
  });

  // Éviter la division par zéro
  if (maxPossibleScore === 0) {
    return 0;
  }

  // Calculer et arrondir le pourcentage
  return Math.round((totalScore / maxPossibleScore) * 100);
}
