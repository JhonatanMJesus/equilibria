import React from 'react'
import Img1 from '../img/projeto.jpg'

const Home = () => {
  return (
    <section id='home' className="bg-[var(--azul-profundo)] md:bg-gradient-to-r from-[var(--azul-profundo)] to-[var(--azul-serenity)] pt-28 sm:pt-32 pb-24 text-white">
      <div className='container-default flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-8'>
        <div className='max-w-md flex flex-col text-center md:text-left'>
          <div>
            <span className='inline-block border border-[var(--dourado-suave)] text-[var(--dourado-suave)] rounded-2xl p-1 mb-4 text-sm md:text-base'>
              Quando o líder cresce, toda a empresa prospera
            </span>
            <h1 className='text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 leading-tight'>
              Equilíbria: saúde, <br className="hidden sm:block" /> liderança e performance em sintonia
            </h1>
          </div>
          <div className='flex-grow flex items-center justify-center md:justify-start'>
            <p className='text-[var(--cinza-neutro)] text-base md:text-lg'>
              Capacitamos líderes para inspirarem, motivarem e potencializarem o talento de seus colaboradores, fortalecendo a produtividade e a cultura organizacional das empresas
            </p>
          </div>
          <div>
            <a href='#contact' className='inline-block p-3 bg-[var(--azul-profundo)] text-[var(--cinza-neutro)] rounded-xl mt-4 text-base md:text-lg hover:bg-[var(--dourado-suave)] hover:text-white transition-colors duration-300'>
              Quero conhecer
            </a>
          </div>
        </div>
        <div className='flex justify-center w-full'>
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-xl bg-gray-200 rounded-lg shadow-xl overflow-hidden">
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-300">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-600 border border-gray-300">
                  https://equilibriasolucoes.com.br/
                </div>
              </div>
            </div>
            <div className="bg-white">
              <img 
                src={Img1} 
                alt="Projeto" 
                className="w-full h-auto block" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
