import React from 'react'

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-32 px-4 bg-[var(--azul-serenity)]">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 text-[var(--azul-profundo)]">
          Entre em contato
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col">
            <label htmlFor="nome" className="mb-1 font-medium text-[var(--azul-profundo)] text-sm md:text-base">
              Nome Completo*
            </label>
            <input type="text" id="nome" name="nome" required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--azul-profundo)] bg-white text-sm md:text-base" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-medium text-[var(--azul-profundo)] text-sm md:text-base">
              E-mail Corporativo*
            </label>
            <input type="email" id="email" name="email" required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--azul-profundo)] bg-white text-sm md:text-base" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="whatsapp" className="mb-1 font-medium text-[var(--azul-profundo)] text-sm md:text-base">
              WhatsApp*
            </label>
            <input type="tel" id="whatsapp" name="whatsapp" required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--azul-profundo)] bg-white text-sm md:text-base" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cargo" className="mb-1 font-medium text-[var(--azul-profundo)] text-sm md:text-base">
              Cargo*
            </label>
            <input type="text" id="cargo" name="cargo" required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--azul-profundo)] bg-white text-sm md:text-base" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="funcionarios" className="mb-1 font-medium text-[var(--azul-profundo)] text-sm md:text-base">
              Quantidade de funcionários:*
            </label>
            <select id="funcionarios" name="funcionarios" required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--azul-profundo)] bg-white text-sm md:text-base">
              <option disabled selected hidden value="">Selecione uma opção</option>
              <option value="autonomo">Autônomo</option>
              <option value="2-10">2-10</option>
              <option value="11-50">11-50</option>
              <option value="51-100">51-100</option>
              <option value="101-300">101-300</option>
              <option value="301-500">301-500</option>
              <option value="501-1000">501-1000</option>
              <option value="Mais de 1000">Mais de 1000</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="empresa" className="mb-1 font-medium text-[var(--azul-profundo)] text-sm md:text-base">
              Empresa*
            </label>
            <input type="text" id="empresa" name="empresa" required className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--azul-profundo)] bg-white text-sm md:text-base" />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="mensagem" className="mb-1 font-medium text-[var(--azul-profundo)] text-sm md:text-base">
              Gostaria de nos deixar uma mensagem?
            </label>
            <textarea id="mensagem" name="mensagem" className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--azul-profundo)] bg-white text-sm md:text-base"></textarea>
          </div>
          <div className="md:col-span-2 text-center">
            <button type="submit" className="mt-4 md:mt-6 px-8 py-3 w-full sm:w-auto bg-[var(--verde-menta)] text-[var(--azul-profundo)] font-semibold rounded-xl hover:bg-[var(--dourado-suave)] hover:text-white transition-all duration-300 text-base md:text-lg">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Contact
