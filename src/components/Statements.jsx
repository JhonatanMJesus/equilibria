import React from 'react';
import Statement1 from '../img/Alessandra.jpeg'

const testimonials = [
  {
    id: 1,
    name: "Alessandra Rampinelli",
    role: "CEO",
    company: "Papemax",
    photo: "../img/Alessandra.jpeg",
    text: "A consultoria da Equilibria transformou a cultura da nossa empresa. Resultados consistentes e equipe motivada!"
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
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 w-full max-w-sm"
            >
              <img
                src={Statement1}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-[var(--azul-profundo)]">{t.name}</h3>
              <p className="text-[var(--dourado-suave)] text-sm mb-2">
                {t.role} - {t.company}
              </p>
              <p className="text-[var(--cinza-escuro)] text-base">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statements;
