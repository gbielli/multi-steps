import { Progress } from "@/components/ui/progress";

interface ResultsPageProps {
  percentage: number;
}

export default function ResultsPage({ percentage }: ResultsPageProps) {
  const getMessage = () => {
    if (percentage < 33)
      return "Vous avez des opportunités d'amélioration significatives.";
    if (percentage < 66)
      return "Vous êtes sur la bonne voie, mais il y a encore place à l'amélioration.";
    return "Excellent travail, continuez comme ça!";
  };

  const getColorClass = () => {
    if (percentage < 33) return "bg-red-500";
    if (percentage < 66) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6 text-center">
      <div className="space-y-2">
        <div className="text-lg font-medium">Score:</div>
        <div className="text-4xl font-bold">{percentage}%</div>
      </div>

      <div className="space-y-3">
        <Progress value={percentage} className={`h-3 ${getColorClass()}`} />
        <p className="text-muted-foreground">{getMessage()}</p>
      </div>
    </div>
  );
}
