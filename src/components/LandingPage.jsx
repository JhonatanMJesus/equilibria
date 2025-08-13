import React from 'react'
// Componentes da landing page
import FadeInSection from './FadeInSection';
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Services from "./Services";
import Statements from "./Statements"
import Contact from "./Contact";

import Equipe from "../img/equipe.jpg";
import Img3 from "../img/img2.jpg";
import Img2 from "../img/img1.jpg";

const LandingPage = () => {
  return (
    <>
        <Header />
        <FadeInSection>
            <Home />
        </FadeInSection>
      
        <FadeInSection>
            <section className="bg-[var(--cinza-neutro)] py-24 md:py-32 px-4">
                <div className="container-default max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="flex flex-wrap justify-center gap-4">
                    <img
                    src={Img2}
                    alt="Profissional 1"
                    className="w-36 h-52 md:w-40 md:h-60 object-cover rounded-3xl shadow-lg"
                    />
                    <img
                    src={Equipe}
                    alt="Equipe reunida"
                    className="w-36 h-52 md:relative md:-top-12 md:w-40 md:h-60 object-cover rounded-3xl shadow-lg"
                    />
                    <img
                    src={Img3}
                    alt="Profissional 2"
                    className="w-36 h-52 md:relative md:-top-6 md:w-40 md:h-60 object-cover rounded-3xl shadow-lg"
                    />
                </div>

                <div className="max-w-xl text-center lg:text-left mt-8 lg:mt-0">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--azul-profundo)] leading-tight mb-4">
                    Melhore o ambiente <br className="hidden md:block" /> e aumente a produtividade
                    </h2>
                    <p className="text-gray-700 mb-6 text-base md:text-lg">
                    Etiam condimentum duis molestie malesuada volutpat pellentesque sed.
                    Ornare suspendisse ut ac neque lobortis sed tincidunt. Mi tempus quis massa
                    tellus imperdiet aenean nulla id.
                    </p>
                    <a
                    href="#contact"
                    className="inline-flex items-center text-[var(--azul-profundo)] font-semibold hover:underline text-base md:text-lg"
                    >
                    Solicite um orçamento
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    </a>
                </div>
                </div>
            </section>
        </FadeInSection>

        <FadeInSection>
            <Services />
        </FadeInSection>

        <FadeInSection>
            <Statements />
        </FadeInSection>

        <FadeInSection>
            <Contact />
        </FadeInSection>
        
        <Footer />
        </>
    );
}

export default LandingPage
