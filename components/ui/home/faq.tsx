import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <section className=" py-20 px-6 lg:p-32">
      <div className="container">
        <h2 className=" text-5xl text-center mb-20">FAQ</h2>
        <div className="flex items-center w-full lg:w-[500px] m-auto">
          <Accordion type="single" collapsible className="flex-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl">
                How much does it cost?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Nothing! This app is completely free.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-2xl">
                Can I track Vitamin K?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                Not at this time, but that feature will come soon.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-2xl">
                Can my doctor add my INR?
              </AccordionTrigger>
              <AccordionContent className="text-lg">
                No. This is a personal app that doesn't connect to your
                healthcare providers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
