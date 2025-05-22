"use client";

import { useForm } from "@/app/context/FormContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AccordionCard } from "./Accordeon";

const questions = [
  {
    id: "question1",
    question:
      "Le conteneur GTM et les requêtes /g/collect sont-ils proxifiés ?",
    description:
      "Un conteneur proxifié permet de masquer le script qui charge GTM.",
    options: ["Oui", "Non"],
    correctAnswer: "Oui",
    faq: "Comment vérifier si le conteneur GTM est proxifié ?",
    faqAnswer:
      "Pour vérifier si votre conteneur Google Tag Manager est proxifié, inspectez le code source de votre page et recherchez les URLs de chargement GTM, puis vérifiez l'onglet Réseau des outils développeur de votre navigateur pour identifier les requêtes vers googletagmanager.com ou gtag/js.",
    weight: 1,
  },
  {
    id: "question2",
    question: "Avez-vous mis en place le reverse proxy ou un master cookie ?",
    description:
      "L'objectif du reverse proxy ou de master cookie est d'améliorer la durée de vie des cookies dans le cadre de l'ITP",
    options: ["Oui", "Non"],
    correctAnswer: "Oui",
    weight: 1,
  },
  {
    id: "question3",
    question: "Avez-vous proxifié votre CMP (Content Management Platform) ?",
    options: ["Oui", "Non"],
    correctAnswer: "Oui",
    weight: 1,
  },
  {
    id: "question4",
    question: "Vos tags médias sont-ils envoyés depuis votre GTM serveur ?",
    options: ["Oui", "Non"],
    correctAnswer: "Oui",
    weight: 1,
  },
  {
    id: "question5",
    question:
      "Avez-vous mis en place des conversions offlines pour vos régies publicitaires ?  ",
    options: ["Oui", "Non"],
    correctAnswer: "Oui",
    weight: 1,
  },
];

// Transformation des réponses correctes en un objet pour faciliter le calcul du score
const correctAnswers = questions.reduce<Record<string, string>>((acc, q) => {
  acc[q.id] = q.correctAnswer;
  return acc;
}, {});

// Composant pour la première étape
const Step1 = () => {
  const { formData, updateFormData, nextStep } = useForm();
  const question = questions[0];

  const handleOptionSelect = (option: string) => {
    updateFormData({ [question.id]: option });
  };

  return (
    <>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.options.map((option) => (
            <Button
              key={option}
              variant={formData[question.id] === option ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </Button>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={nextStep} disabled={!formData[question.id]}>
            Suivant
          </Button>
        </CardFooter>
      </Card>
      <AccordionCard faq={question.faq} faqAnswer={question.faqAnswer} />
    </>
  );
};

// Composant pour la deuxième étape
const Step2 = () => {
  const { formData, updateFormData, nextStep, prevStep } = useForm();
  const question = questions[1];

  const handleOptionSelect = (option: string) => {
    updateFormData({ [question.id]: option });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.options.map((option) => (
          <Button
            key={option}
            variant={formData[question.id] === option ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </Button>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Précédent
        </Button>
        <Button onClick={nextStep} disabled={!formData[question.id]}>
          Suivant
        </Button>
      </CardFooter>
    </Card>
  );
};

// Composant pour la troisième étape
const Step3 = () => {
  const { formData, updateFormData, nextStep, prevStep } = useForm();
  const question = questions[2];

  const handleOptionSelect = (option: string) => {
    updateFormData({ [question.id]: option });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.options.map((option) => (
          <Button
            key={option}
            variant={formData[question.id] === option ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </Button>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Précédent
        </Button>
        <Button onClick={nextStep} disabled={!formData[question.id]}>
          Suivant
        </Button>
      </CardFooter>
    </Card>
  );
};

// Composant pour la quatrième étape
const Step4 = () => {
  const { formData, updateFormData, nextStep, prevStep } = useForm();
  const question = questions[3];

  const handleOptionSelect = (option: string) => {
    updateFormData({ [question.id]: option });
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.options.map((option) => (
          <Button
            key={option}
            variant={formData[question.id] === option ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </Button>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Précédent
        </Button>
        <Button onClick={nextStep} disabled={!formData[question.id]}>
          Suivant
        </Button>
      </CardFooter>
    </Card>
  );
};

// Composant pour la cinquième étape
const Step5 = () => {
  const { formData, updateFormData, prevStep, calculateScore } = useForm();
  const question = questions[4];

  const handleOptionSelect = (option: string) => {
    updateFormData({ [question.id]: option });
  };

  const handleSubmit = () => {
    calculateScore(correctAnswers);
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {question.options.map((option) => (
          <Button
            key={option}
            variant={formData[question.id] === option ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </Button>
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Précédent
        </Button>
        <Button onClick={handleSubmit} disabled={!formData[question.id]}>
          Terminer
        </Button>
      </CardFooter>
    </Card>
  );
};

// Composant pour afficher le résultat
const ResultStep = () => {
  const { score, resetForm } = useForm();

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-center">
          Résultat de votre Quiz Server-side
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-4xl font-bold">{score.toFixed(0)}%</div>
          <Progress value={score} className="w-full" />
          <div className="text-center">
            {score === 100 ? (
              <p>
                Félicitations! Vous avez répondu correctement à toutes les
                questions!
              </p>
            ) : score >= 70 ? (
              <p>Bien joué! Vous avez obtenu un bon score.</p>
            ) : (
              <p>Vous pouvez faire mieux! Essayez à nouveau.</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={resetForm}>Recommencer le quiz</Button>
      </CardFooter>
    </Card>
  );
};

// Composant principal qui gère l'affichage des étapes
export default function MultiStepForm() {
  const { currentStep, isCompleted } = useForm();

  // Pourcentage de progression pour la barre de progression
  const progress = (currentStep / questions.length) * 100;
  const progressText = progress.toFixed(0);

  // Si le quiz est terminé, afficher le résultat
  if (isCompleted) {
    return <ResultStep />;
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="w-full max-w-lg">
        <div className="mb-2 flex justify-between text-sm">
          <span>
            Étape {currentStep + 1} sur {questions.length}
          </span>
          <span>{progressText}%</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {currentStep === 0 && <Step1 />}
      {currentStep === 1 && <Step2 />}
      {currentStep === 2 && <Step3 />}
      {currentStep === 3 && <Step4 />}
      {currentStep === 4 && <Step5 />}
    </div>
  );
}
