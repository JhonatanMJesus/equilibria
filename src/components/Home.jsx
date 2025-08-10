import React from 'react'
import Img1 from '../img/projeto.jpg'

const Home = () => {
  return (
    <section id='home' className="bg-gradient-to-r from-[var(--azul-profundo)] to-[var(--azul-serenity)] pt-32 pb-24 md:pt-32 text-white">
      <div className='container-default flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-8'>
        <div className='max-w-md flex flex-col text-center md:text-left'>
          <div>
            <span className='inline-block border border-[var(--dourado-suave)] text-[var(--dourado-suave)] rounded-2xl p-1 mb-4 text-sm md:text-base'>
              Quando o líder cresce, toda a empresa prospera
            </span>
            <h1 className='text-3xl md:text-5xl font-extrabold mb-6'>
              Equilibria: onde pessoas e resultados caminham juntas
            </h1>
          </div>
          <div className='flex-grow flex items-center justify-center md:justify-start'>
            <p className='text-[var(--cinza-neutro)] text-base md:text-lg'>
              Ajudamos líderes a construírem empresas mentalmente saudáveis, emocionalmente inteligentes e obter resultados sustentáveis.
            </p>
          </div>
          <div>
            <a href='#contact' className='inline-block p-3 bg-[var(--verde-menta)] text-[var(--azul-profundo)] rounded-xl mt-4 text-base md:text-lg hover:bg-[var(--dourado-suave)] hover:text-white transition-colors duration-300'>
              Quero conhecer
            </a>
          </div>
        </div>
        <div className='flex justify-center'>
          <img src={Img1} alt="" className="w-full max-w-sm md:max-w-md lg:max-w-xl h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    </section>
  )
}

export default Home
