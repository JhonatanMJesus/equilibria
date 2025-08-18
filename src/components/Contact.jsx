import React, { useState, useEffect } from 'react'

const Contact = () => {
  const [activeForm, setActiveForm] = useState('interesse');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
    cargo: '',
    funcionarios: '',
    empresa: '',
    mensagem: '',
    // Campos específicos para "Já sou cliente"
    tipoServico: '',
    dataPreferencia: '',
    horarioPreferencia: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [focusedField, setFocusedField] = useState(null);

  // Detectar parâmetro na URL para ativar o formulário "Já sou cliente"
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('form') === 'cliente') {
      setActiveForm('cliente');
    }

    // Listeners para eventos customizados do header
    const handleClientForm = () => handleFormSwitch('cliente');
    const handleInterestForm = () => handleFormSwitch('interesse');

    window.addEventListener('activateClientForm', handleClientForm);
    window.addEventListener('activateInterestForm', handleInterestForm);

    return () => {
      window.removeEventListener('activateClientForm', handleClientForm);
      window.removeEventListener('activateInterestForm', handleInterestForm);
    };
  }, []);

  const handleFormSwitch = (formType) => {
    if (formType === activeForm) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveForm(formType);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("https://back-form-fpvg.onrender.com/contato", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        formType: activeForm, // envia se é interesse ou cliente
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.mensagem);
      setFormData({
        nome: "",
        email: "",
        whatsapp: "",
        cargo: "",
        funcionarios: "",
        empresa: "",
        mensagem: "",
        tipoServico: "",
        dataPreferencia: "",
        horarioPreferencia: "",
      });
    } else {
      alert(data.mensagem || "Erro ao enviar formulário.");
    }
  } catch (error) {
    console.error("Erro ao enviar:", error);
    alert("Erro de conexão. Tente novamente.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <section id="contact" className="py-24 md:py-32 px-4 bg-gradient-to-br from-[var(--azul-serenity)] via-[var(--cinza-neutro)] to-[var(--azul-serenity)]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--azul-profundo)]">
            Vamos Conversar?
          </h2>
          <div className="relative overflow-hidden min-h-[60px]">
            <p className={`text-lg text-[var(--cinza-escuro)] max-w-2xl mx-auto mb-8 transition-all duration-500 transform ${
              isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}>
              {activeForm === 'interesse' 
                ? "Conte-nos sobre sua empresa e descubra como podemos transformar o bem-estar da sua equipe"
                : "Vamos agendar sua próxima sessão ou esclarecer suas dúvidas"
              }
            </p>
          </div>

          {/* Toggle de formulários */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg border border-white/30">
              <button
                onClick={() => handleFormSwitch('interesse')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-500 transform ${
                  activeForm === 'interesse'
                    ? 'bg-[var(--azul-profundo)] text-white shadow-lg scale-105'
                    : 'text-[var(--azul-profundo)] hover:bg-[var(--cinza-neutro)]/50 hover:scale-102'
                }`}
              >
                Tenho Interesse
              </button>
              <button
                onClick={() => handleFormSwitch('cliente')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-500 ml-2 transform ${
                  activeForm === 'cliente'
                    ? 'bg-[var(--azul-profundo)] text-white shadow-lg scale-105'
                    : 'text-[var(--azul-profundo)] hover:bg-[var(--cinza-neutro)]/50 hover:scale-102'
                }`}
              >
                Já sou Cliente
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Overlay de transição */}
          <div className={`absolute inset-0 bg-white/50 backdrop-blur-sm z-10 transition-all duration-300 ${
            isTransitioning ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--azul-profundo)]"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={`space-y-8 transition-all duration-500 transform ${
            isTransitioning ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
          }`}>
            {activeForm === 'interesse' ? (
              // Formulário "Tenho Interesse"
              <div className="space-y-8">
                {/* Primeira linha - Nome e Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="nome" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'nome' || formData.nome 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      Nome Completo*
                    </label>
                    <input 
                      type="text" 
                      id="nome" 
                      name="nome" 
                      required 
                      value={formData.nome}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('nome')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)]" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                  </div>

                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="email" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'email' || formData.email 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      E-mail Corporativo*
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)]" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                  </div>
                </div>

                {/* Segunda linha - WhatsApp e Cargo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="whatsapp" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'whatsapp' || formData.whatsapp 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      WhatsApp*
                    </label>
                    <input 
                      type="tel" 
                      id="whatsapp" 
                      name="whatsapp" 
                      required 
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('whatsapp')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)]" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                  </div>

                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="cargo" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'cargo' || formData.cargo 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      Cargo*
                    </label>
                    <input 
                      type="text" 
                      id="cargo" 
                      name="cargo" 
                      required 
                      value={formData.cargo}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('cargo')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)]" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                  </div>
                </div>

                {/* Terceira linha - Empresa e Funcionários */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="empresa" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'empresa' || formData.empresa 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      Empresa*
                    </label>
                    <input 
                      type="text" 
                      id="empresa" 
                      name="empresa" 
                      required 
                      value={formData.empresa}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('empresa')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)]" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                  </div>

                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="funcionarios" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'funcionarios' || formData.funcionarios 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      Quantidade de funcionários*
                    </label>
                    <select 
                      id="funcionarios" 
                      name="funcionarios" 
                      required 
                      value={formData.funcionarios}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('funcionarios')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)] appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden></option>
                      <option value="autonomo">Autônomo</option>
                      <option value="2-10">2-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-100">51-100</option>
                      <option value="101-300">101-300</option>
                      <option value="301-500">301-500</option>
                      <option value="501-1000">501-1000</option>
                      <option value="Mais de 1000">Mais de 1000</option>
                    </select>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-[var(--cinza-escuro)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Formulário "Já sou Cliente"
              <div className="space-y-8">
                {/* Primeira linha - Nome e Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="nome" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'nome' || formData.nome 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      Nome Completo*
                    </label>
                    <input 
                      type="text" 
                      id="nome" 
                      name="nome" 
                      required 
                      value={formData.nome}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('nome')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)]" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                  </div>

                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="email" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'email' || formData.email 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      E-mail*
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)]" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                  </div>
                </div>

                {/* Segunda linha - WhatsApp e Tipo de Serviço */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="whatsapp" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'whatsapp' || formData.whatsapp 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      WhatsApp*
                    </label>
                    <input 
                      type="tel" 
                      id="whatsapp" 
                      name="whatsapp" 
                      required 
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('whatsapp')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)]" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                  </div>

                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="tipoServico" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'tipoServico' || formData.tipoServico 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      Tipo de Serviço*
                    </label>
                    <select 
                      id="tipoServico" 
                      name="tipoServico" 
                      required 
                      value={formData.tipoServico}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('tipoServico')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)] appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden></option>
                      <option value="consultoria-individual">Consultoria Individual</option>
                      <option value="treinamento-equipe">Treinamento de Equipe</option>
                      <option value="workshop-bem-estar">Workshop de Bem-estar</option>
                      <option value="avaliacao-clima">Avaliação de Clima</option>
                      <option value="mentoria-lideranca">Mentoria de Liderança</option>
                      <option value="outros">Outros</option>
                    </select>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-[var(--cinza-escuro)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Terceira linha - Data e Horário Preferidos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="dataPreferencia" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'dataPreferencia' || formData.dataPreferencia 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      Data Preferida
                    </label>
                    <input 
                      type="date" 
                      id="dataPreferencia" 
                      name="dataPreferencia" 
                      value={formData.dataPreferencia}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('dataPreferencia')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)]" 
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                  </div>

                  <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
                    <label 
                      htmlFor="horarioPreferencia" 
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'horarioPreferencia' || formData.horarioPreferencia 
                          ? 'top-2 text-xs text-[var(--azul-profundo)] font-medium' 
                          : 'top-4 text-base text-[var(--cinza-escuro)]'
                      }`}
                    >
                      Horário Preferido
                    </label>
                    <select 
                      id="horarioPreferencia" 
                      name="horarioPreferencia" 
                      value={formData.horarioPreferencia}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('horarioPreferencia')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-6 pb-2 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)] appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden></option>
                      <option value="manha">Manhã (8h - 12h)</option>
                      <option value="tarde">Tarde (13h - 17h)</option>
                      <option value="noite">Noite (18h - 21h)</option>
                      <option value="flexivel">Horário flexível</option>
                    </select>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-[var(--cinza-escuro)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mensagem */}
            <div className="relative group transform transition-all duration-300 hover:translate-y-[-2px]">
              <label 
                htmlFor="mensagem" 
                className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                  focusedField === 'mensagem' || formData.mensagem 
                    ? 'top-3 text-xs text-[var(--azul-profundo)] font-medium' 
                    : 'top-6 text-base text-[var(--cinza-escuro)]'
                }`}
              >
                {activeForm === 'interesse' 
                  ? 'Gostaria de nos deixar uma mensagem?' 
                  : 'Descreva o que você precisa ou suas dúvidas'
                }
              </label>
              <textarea 
                id="mensagem" 
                name="mensagem" 
                rows="4"
                value={formData.mensagem}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('mensagem')}
                onBlur={() => setFocusedField(null)}
                className="w-full pt-8 pb-4 px-4 bg-[var(--cinza-neutro)]/50 rounded-2xl border-2 border-transparent focus:border-[var(--azul-profundo)] focus:bg-white transition-all duration-300 outline-none text-[var(--azul-profundo)] resize-none"
              ></textarea>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] opacity-0 group-hover:opacity-20 transition-all duration-500 pointer-events-none"></div>
            </div>

            {/* Botão de envio */}
            <div className="text-center pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`group relative px-12 py-4 font-bold rounded-2xl shadow-lg text-lg overflow-hidden transition-all duration-300 ${
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-[var(--azul-profundo)] text-white hover:shadow-2xl transform hover:-translate-y-1"
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </div>
                ) : (
                  <span className="relative z-10 group-hover:text-[var(--azul-profundo)] transition-colors duration-300">
                    {activeForm === "interesse" ? "Solicitar Proposta" : "Agendar Sessão"}
                  </span>
                )}
                {!isSubmitting && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--verde-menta)] to-[var(--dourado-suave)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                )}
              </button>

            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
