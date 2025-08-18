import React, { useState } from 'react';

// Você pode substituir essas imagens pelas suas próprias
// import palestraImg from '../img/palestra.jpg';
// import cursosImg from '../img/cursos.jpg';
// import leiturasImg from '../img/leituras.jpg';

const Explain = () => {
  const [activeTab, setActiveTab] = useState('palestras');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabData = {
    palestras: {
      title: 'Melhor desempenho e qualidade de vida!',
      description: 'Transformamos ambientes corporativos através de palestras inspiradoras que conectam bem-estar pessoal com alta performance profissional. Nossos especialistas abordam temas como liderança equilibrada, gestão do estresse, produtividade saudável e desenvolvimento de equipes de alto desempenho.',
      buttonText: 'Conheça nossas palestras',
      image: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Imagem de palestra
    },
    cursos: {
      title: 'Desenvolvimento profissional contínuo!',
      description: 'Oferecemos cursos estruturados que capacitam líderes e colaboradores para enfrentar os desafios do mundo corporativo moderno. Metodologias práticas combinadas com fundamentação teórica sólida para resultados mensuráveis e duradouros em sua organização.',
      buttonText: 'Explore nossos cursos',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Imagem de treinamento
    },
    leituras: {
      title: 'Comunicação através do corpo!',
      description: 'Decodifique a linguagem corporal e aprimore sua comunicação interpessoal. Nossa abordagem exclusiva em leituras corporais revela insights profundos sobre comportamento, motivação e dinâmicas de equipe, potencializando relacionamentos e resultados organizacionais.',
      buttonText: 'Descubra as leituras corporais',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Imagem de comunicação corporal
    }
  };

  const currentData = tabData[activeTab];

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return; // Não faz nada se é a mesma aba
    
    setIsTransitioning(true); // Inicia fade out
    
    setTimeout(() => {
      setActiveTab(newTab); // Muda o conteúdo
      setIsTransitioning(false); // Inicia fade in
    }, 200); // 200ms para fade out
  };

  return (
    <section className="bg-white py-16 px-4">
      <div className="container-default max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Esquerdo */}
          <div className="space-y-6">
            <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 leading-tight transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}>
              {currentData.title}
            </h2>

            {/* Abas */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTabChange('palestras')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'palestras'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Palestras
              </button>
              <button
                onClick={() => handleTabChange('cursos')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'cursos'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cursos
              </button>
              <button
                onClick={() => handleTabChange('leituras')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'leituras'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Leituras corporais
              </button>
            </div>

            {/* Descrição */}
            <p className={`text-gray-600 text-lg leading-relaxed transition-opacity duration-300 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}>
              {currentData.description}
            </p>

            {/* Botão CTA */}
            <button className={`inline-flex items-center gap-2 text-blue-600 font-semibold text-lg hover:text-blue-700 transition-all duration-300 group ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}>
              {currentData.buttonText}
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Imagem Direita */}
          <div className="relative">
            {/* Moldura do navegador */}
            <div className="bg-gray-200 rounded-lg shadow-xl overflow-hidden">
              {/* Barra superior do navegador */}
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-300">
                {/* Botões do macOS */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                {/* Barra de endereço */}
                <div className="flex-1 mx-4">
                  <div className="bg-white rounded-md px-3 py-1 text-xs text-gray-600 border border-gray-300">
                    https://equilibriasolucoes.com.br
                  </div>
                </div>
              </div>
              
              {/* Conteúdo da imagem */}
              <div className="bg-white relative overflow-hidden">
                <img 
                  src={currentData.image}
                  alt={currentData.title}
                  className={`w-full h-80 object-cover transition-all duration-300 ${
                    isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                  }`}
                />
                
                {/* Overlay com play button (apenas para palestras) */}
                {activeTab === 'palestras' && (
                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navegação de slides (decorativa) */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explain;
