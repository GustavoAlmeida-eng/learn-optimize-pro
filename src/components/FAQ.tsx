import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Como funciona a assinatura da EstudaMax?",
      answer: "Ao assinar um de nossos planos (1 mês, 6 meses ou 1 ano), você terá acesso ilimitado a todas as questões da plataforma, podendo estudar quando e onde quiser. Além disso, terá acesso a estatísticas detalhadas do seu desempenho."
    },
    {
      question: "Qual a diferença entre assinatura e pacotes de simulados?",
      answer: "A assinatura dá acesso ilimitado a todas as questões e recursos da plataforma. Já os pacotes de simulados são conjuntos específicos de provas com 25 questões cada, ideais para prática intensiva e medição do conhecimento geral antes de provas importantes."
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer: "Sim! Você pode cancelar sua assinatura a qualquer momento. Ao cancelar, você continuará tendo acesso até o final do período já pago."
    },
    {
      question: "As questões são atualizadas regularmente?",
      answer: "Sim, nosso banco de questões é constantemente atualizado com novos conteúdos, garantindo que você tenha acesso ao material mais relevante e alinhado com os exames mais recentes."
    },
    {
      question: "A plataforma funciona em dispositivos móveis?",
      answer: "Sim! Nossa plataforma é totalmente responsiva e funciona perfeitamente em smartphones, tablets e computadores. Você pode estudar de onde estiver, no dispositivo que preferir."
    },
    {
      question: "Como funcionam os relatórios de desempenho?",
      answer: "Nossos relatórios detalhados mostram sua evolução ao longo do tempo, identificam seus pontos fortes e fracos, e sugerem áreas específicas para foco nos estudos. Tudo isso de forma visual e fácil de entender."
    },
    {
      question: "Posso escolher questões de disciplinas específicas?",
      answer: "Sim! Você pode filtrar questões por disciplina, assunto, nível de dificuldade e até mesmo por tipo de exame (ENEM, vestibulares específicos, etc.). A plataforma se adapta totalmente às suas necessidades."
    },
    {
      question: "Há garantia de satisfação?",
      answer: "Sim! Oferecemos garantia de 7 dias. Se você não estiver satisfeito com a plataforma, devolvemos 100% do seu investimento, sem perguntas."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tire suas dúvidas sobre a plataforma EstudaMax
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-2 border-border rounded-lg px-6 bg-card hover:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="text-left font-heading font-semibold text-lg hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
