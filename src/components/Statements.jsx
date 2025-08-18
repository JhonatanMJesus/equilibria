import React from 'react';
import Statement1 from '../img/Alessandra.jpeg'

const testimonials = [
  {
    id: 1,
    name: "Alessandra Rampinelli",
    role: "CEO",
    company: "Papemax",
    photo: "../img/Alessandra.jpeg",
    text: "O treinamento de saúde mental na Papemax foi uma experiência transformadora para nossa equipe. Muitas vezes, o dia a dia de trabalho nos faz esquecer de olhar para nós mesmos, e o treinamento trouxe ferramentas práticas para lidar com o estresse, melhorar a comunicação e fortalecer o bem-estar. Percebi que, depois das atividades, os colaboradores ficaram mais engajados, motivados e abertos a conversar sobre suas dificuldades. Investir em saúde mental não é apenas cuidar do indivíduo, mas também fortalecer a empresa como um todo. Esse treinamento mostrou que, quando apoiamos uns aos outros, conseguimos crescer juntos."
  }
];

const Statements = () => {
  return (
    <section className="bg-[var(--cinza-neutro)] py-12">
      <div className="container-default flex flex-col items-center gap-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--azul-profundo)]">
          Depoimentos
        </h2>
        <p className="text-center text-[var(--cinza-escuro)] max-w-2xl">
          Veja o que líderes e profissionais dizem sobre a nossa consultoria e os resultados alcançados.
        </p>

        <div className="flex flex-wrap justify-center gap-8 w-full mt-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-lg p-6 flex items-start gap-6 hover:scale-105 transition-transform duration-300 w-full max-w-4xl"
            >
              <img
                src={Statement1}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex flex-col text-left">
                <h3 className="text-xl font-semibold text-[var(--azul-profundo)] mb-1">{t.name}</h3>
                <p className="text-[var(--dourado-suave)] text-sm mb-4">
                  {t.role} - {t.company}
                </p>
                <p className="text-[var(--cinza-escuro)] text-base leading-relaxed">{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statements;
