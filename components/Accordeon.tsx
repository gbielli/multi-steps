import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionCard({
  faq,
  faqAnswer,
}: {
  faq?: string;
  faqAnswer?: string;
}) {
  if (!faq || !faqAnswer) return null;
  return (
    <div className="w-full max-w-lg bg-gray-200 rounded-lg px-4 py-2">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{faq}</AccordionTrigger>
          <AccordionContent>{faqAnswer}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
