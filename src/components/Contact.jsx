import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="py-12 md:py-16 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-200 to-blue-300 p-6 md:p-10 rounded-2xl shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-gray-800">Entre em contato</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="flex flex-col">
              <label htmlFor="nome" className="mb-1 font-medium text-gray-700 text-sm md:text-base">Nome Completo*</label>
              <input type="text" id="nome" name="nome" required className="p-2 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm md:text-base" />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-medium text-gray-700 text-sm md:text-base">E-mail Corporativo*</label>
              <input type="email" id="email" name="email" required className="p-2 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm md:text-base" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="whatsapp" className="mb-1 font-medium text-gray-700 text-sm md:text-base">WhatsApp*</label>
              <input type="tel" id="whatsapp" name="whatsapp" required className="p-2 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm md:text-base" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="cargo" className="mb-1 font-medium text-gray-700 text-sm md:text-base">Cargo*</label>
              <input type="text" id="cargo" name="cargo" className="p-2 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm md:text-base" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="departamento" className="mb-1 font-medium text-gray-700 text-sm md:text-base">Departamento</label>
              <input type="text" id="departamento" name="departamento" className="p-2 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm md:text-base" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="empresa" className="mb-1 font-medium text-gray-700 text-sm md:text-base">Empresa*</label>
              <input type="text" id="empresa" name="empresa" className="p-2 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm md:text-base" />
            </div>
            <div className="flex flex-col md:col-span-2">
              <label htmlFor="preferencia" className="mb-1 font-medium text-gray-700 text-sm md:text-base">
                Como você prefere que a gente entre em contato?*
              </label>
              <select id="preferencia" name="preferencia" className="p-2 md:p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm md:text-base">
                <option disabled value="">Selecione uma opção</option>
                <option value="email">E-mail</option>
                <option value="ligacao">Ligação</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
            <div className="md:col-span-2 text-center">
              <button type="submit" className="mt-4 md:mt-6 px-6 py-2 md:px-8 md:py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300 text-base md:text-lg">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </section>
  )
}

export default Contact