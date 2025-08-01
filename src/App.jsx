import './App.css'
import Header from './Header'


import Equipe from './img/equipe.jpg'
import Img3 from './img/img2.jpg'
import Home from './components/Home'
import Img2 from './img/img1.jpg'
import Contact from './components/Contact'

function App() {
  return (
    <>
      <Header />
      <Home />

      <section className="bg-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex flex-wrap justify-center gap-4">
            <img src={Img2} alt="Profissional 1" className="w-42 h-58 md:w-40 md:h-60 object-cover rounded-3xl shadow-md" />
            <img src={Equipe} alt="Equipe reunida" className="w-42 relative -top-12 h-58 md:w-40 md:h-60 object-cover rounded-3xl shadow-md" />
            <img src={Img3} alt="Profissional 2" className="w-42 h-58 relative top-12 md:w-40 md:h-60 object-cover rounded-3xl shadow-md" />
          </div>
          <div className="max-w-xl text-center lg:text-left mt-8 lg:mt-0">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Melhore o ambiente<br className="hidden md:block" />e aumente a produtividade
            </h2>
            <p className="text-gray-600 mb-6 text-base md:text-lg">
              Etiam condimentum duis molestie malesuada volutpat pellentesque sed.
              Ornare suspendisse ut ac neque lobortis sed tincidunt. Mi tempus quis massa tellus imperdiet aenean nulla id.
            </p>
            <a href="#contact" className="inline-flex items-center text-blue-700 font-semibold hover:underline text-base md:text-lg">
              Solicite um orçamento
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <Contact />
      <a href="https://wa.me/5514996596500?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento." target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex items-center bg-green-500 hover:bg-green-600 text-white pl-3 pr-4 py-2 md:pl-4 md:pr-5 md:py-3 rounded-full shadow-lg transition-all duration-300 group z-50 text-sm md:text-base">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.4 0 0 5.4 0 12a11.9 11.9 0 0 0 1.64 6.05L0 24l6.28-1.64A11.93 11.93 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.19-1.26-6.2-3.48-8.52zM12 21.8c-1.98 0-3.87-.57-5.52-1.64l-.4-.24-3.7.96.99-3.61-.26-.42A9.8 9.8 0 0 1 2.2 12c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8zm5.7-7.4c-.3-.15-1.74-.86-2-1s-.47-.15-.67.15-.77 1-1 1.2-.37.23-.67.08a7.9 7.9 0 0 1-2.37-1.45 9.08 9.08 0 0 1-1.6-2.07c-.16-.3 0-.46.13-.61.13-.14.3-.37.45-.56.15-.2.2-.33.3-.53.1-.2.05-.38 0-.53-.08-.15-.67-1.62-.92-2.2-.24-.6-.5-.5-.67-.5l-.56-.01a1.07 1.07 0 0 0-.78.37c-.26.3-1.02 1-1.02 2.5s1.04 2.93 1.18 3.13c.15.2 2.06 3.13 5 4.4.7.3 1.24.5 1.67.64.7.23 1.34.2 1.85.12.57-.09 1.74-.71 2-1.4.25-.7.25-1.3.18-1.4-.07-.1-.26-.17-.55-.32z" />
        </svg>
        <div className="overflow-hidden max-w-0 group-hover:max-w-xs md:group-hover:max-w-sm transition-all duration-600">
          <span className="whitespace-nowrap ml-2">Solicite um orçamento!</span>
        </div>
      </a>
    </>
  )
}

export default App
