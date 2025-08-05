import React from 'react'
import Img1 from '../img/projeto.jpg'

const Home = () => {
  return (
    <section id='home' className="bg-gradient-to-b from-gray-100 to-white pt-32 pb-24 md:pt-32">
        <div className='container-default flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-8'>
            <div className='max-w-md flex flex-col justify-between text-center md:text-left'>
            <div>
                <span className='inline-block border rounded-2xl p-1 mb-4 text-sm md:text-base'>
                Sua saúde mental é nossa prioridade
                </span>
                <h1 className='text-3xl md:text-5xl font-extrabold mb-6'>
                Equilibrar pessoas é potencializar negócios
                </h1>
            </div>
            <div className='flex-grow flex items-center justify-center md:justify-start'>
                <p className='text-gray-700 text-base md:text-lg'>
                Ajudamos líderes a construírem empresas mentalmente saudáveis, emocionalmente inteligentes e obter resultados sustentáveis.
                </p>
            </div>
            <div>
                <a href='#contact' className='inline-block p-3 bg-blue-700 text-white rounded-xl mt-4 text-base md:text-lg hover:bg-blue-800 transition-colors duration-300'>
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