import './App.css'
import Header from './Header'
import Img1 from './img/projeto.jpg'

function App() {
  return (
    <>
      <Header />
      <section id='home' className="bg-gradient-to-b from-gray-100 to-white">
        <div className='principal flex flex-wrap items-center justify-center gap-16 px-4 py-8'>
          <div className='max-w-md flex flex-col justify-between' style={{ height: '100%' }}>
            <div>
              <span className='inline-block border rounded-2xl p-1 mb-4'>
                Sua saúde mental é nossa prioridade
              </span>
              <h1 className='text-2xl font-bold mb-4'>
                Frase de impacto
              </h1>
            </div>
            <div className='flex-grow flex items-center'>
              <p className='text-gray-700'>
                Resumo das expectativas ao contratar o serviço.
              </p>
            </div>
            <div>
              <a className='inline-block p-2 bg-blue-700 text-white rounded-xl mt-4'>
                Quero conhecer
              </a>
            </div>
          </div>
          <div className='flex'>
            <img src={Img1} alt="" style={{ maxWidth: '480px', height: 'auto' }} />
          </div>
        </div>
      </section>
      <section className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex gap-4">
            <img src="/pictures/img1.jpg" alt="Profissional 1" className="w-40 h-60 object-cover rounded-3xl shadow-md" />
            <img src="/pictures/equipe.jpg" alt="Equipe reunida" className="w-40 h-60 object-cover rounded-3xl shadow-md" />
            <img src="/pictures/img2.jpg" alt="Profissional 2" className="w-40 h-60 object-cover rounded-3xl shadow-md" />
          </div>
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Melhore o ambiente<br />e aumente a produtividade
            </h2>
            <p className="text-gray-600 mb-6">
              Etiam condimentum duis molestie malesuada volutpat pellentesque sed.
              Ornare suspendisse ut ac neque lobortis sed tincidunt. Mi tempus quis massa tellus imperdiet aenean nulla id.
            </p>
            <a href="#contact" className="inline-flex items-center text-blue-700 font-semibold hover:underline">
              Solicite um orçamento
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>

        </div>
      </section>
      <section id="contact" className="py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-200 to-blue-300 p-10 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Entre em contato</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="nome" className="mb-1 font-medium text-gray-700">Nome Completo*</label>
              <input type="text" id="nome" name="nome" required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium text-gray-700">E-mail Corporativo*</label>
              <input type="email" id="email" name="email" required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="whatsapp" className="mb-1 font-medium text-gray-700">WhatsApp*</label>
              <input type="tel" id="whatsapp" name="whatsapp" required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="cargo" className="mb-1 font-medium text-gray-700">Cargo*</label>
              <input type="text" id="cargo" name="cargo" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="departamento" className="mb-1 font-medium text-gray-700">Departamento</label>
              <input type="text" id="departamento" name="departamento" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="empresa" className="mb-1 font-medium text-gray-700">Empresa*</label>
              <input type="text" id="empresa" name="empresa" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="preferencia" className="mb-1 font-medium text-gray-700">
                Como você prefere que a gente entre em contato?*
              </label>
              <select id="preferencia" name="preferencia" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="">Selecione uma opção</option>
                <option value="email">E-mail</option>
                <option value="ligacao">Ligação</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
            <div className="md:col-span-2 text-center">
              <button type="submit" className="mt-6 px-8 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>


      <a href="https://wa.me/5514996596500?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento." target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 group z-50">
        <svg xmlns="http://www.w3.org/2000/svg" classNam fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.4 0 0 5.4 0 12a11.9 11.9 0 0 0 1.64 6.05L0 24l6.28-1.64A11.93 11.93 0 0 0 12 24c6.6 0 12-5.4 12-12 0-3.19-1.26-6.2-3.48-8.52zM12 21.8c-1.98 0-3.87-.57-5.52-1.64l-.4-.24-3.7.96.99-3.61-.26-.42A9.8 9.8 0 0 1 2.2 12c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8zm5.7-7.4c-.3-.15-1.74-.86-2-1s-.47-.15-.67.15-.77 1-1 1.2-.37.23-.67.08a7.9 7.9 0 0 1-2.37-1.45 9.08 9.08 0 0 1-1.6-2.07c-.16-.3 0-.46.13-.61.13-.14.3-.37.45-.56.15-.2.2-.33.3-.53.1-.2.05-.38 0-.53-.08-.15-.67-1.62-.92-2.2-.24-.6-.5-.5-.67-.5l-.56-.01a1.07 1.07 0 0 0-.78.37c-.26.3-1.02 1-1.02 2.5s1.04 2.93 1.18 3.13c.15.2 2.06 3.13 5 4.4.7.3 1.24.5 1.67.64.7.23 1.34.2 1.85.12.57-.09 1.74-.71 2-1.4.25-.7.25-1.3.18-1.4-.07-.1-.26-.17-.55-.32z" />
        </svg>
        <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap text-sm font-medium">Faça um orçamento!</span>
      </a>
    </>
  )
}

export default App
