import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Alterado para a porta correta da API
const API_URL = "https://equilibria-backend-tmoo.onrender.com";

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [videoSelected, setVideoSelected] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_URL}/videos`)
      .then(res => {
        console.log("Resposta da API:", res.data); // Para debug
        
        // A resposta vem em res.data.videos e é um array de 3 posições
        const videosArray = res.data?.videos || [];
        
        // Filtrar apenas vídeos válidos (não null) e com URL
        const validVideos = videosArray
          .map((video, index) => {
            // Se o vídeo existe e tem URL, adiciona o índice para identificação
            if (video && video.url && typeof video.url === 'string') {
              return {
                ...video,
                index, // Adiciona o índice original (0, 1, 2)
                id: `video-${index}` // ID único para o key do React
              };
            }
            return null;
          })
          .filter(video => video !== null); // Remove vídeos null/undefined
        
        console.log("Vídeos válidos processados:", validVideos);
        setVideos(validVideos);
        setError(null);
      })
      .catch(err => {
        console.error("Erro ao carregar vídeos:", err);
        setError("Erro ao carregar vídeos. Tente novamente mais tarde.");
        setVideos([]); // Garantir que videos seja sempre um array
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function openModal(video) {
    // Verificação adicional antes de abrir o modal
    if (video && video.url) {
      setVideoSelected(video);
      setModalOpen(true);
      setTimeout(() => setFadeIn(true), 10);
    }
  }

  function closeModal() {
    setFadeIn(false);
    setTimeout(() => {
      setModalOpen(false);
      setVideoSelected(null);
    }, 300);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && modalOpen) closeModal();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  return (
    <section id="services" className="bg-[var(--azul-serenity)]">
      <div className="container-default flex flex-col items-center justify-center gap-8 py-24 sm:py-32">
        <div className="flex flex-col text-center justify-center items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--azul-profundo)]">
            Equilíbria: desenvolvendo pessoas e multiplicando resultados
          </h1>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-[var(--azul-profundo)] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[var(--azul-profundo)]">Carregando vídeos...</p>
              </div>
            ) : error ? (
              <div className="text-center">
                <p className="text-red-600 mb-2">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-[var(--azul-profundo)] underline hover:no-underline"
                >
                  Tentar novamente
                </button>
              </div>
            ) : videos.length > 0 ? (
              videos.map((video) => {
                // Verificação adicional no map
                if (!video || !video.url) {
                  console.warn(`Vídeo inválido:`, video);
                  return null;
                }
                
                return (
                  <button
                    key={video.id} // Usando o ID único gerado
                    onClick={() => openModal(video)}
                    className="w-36 h-52 md:w-40 md:h-60 rounded-3xl shadow-lg overflow-hidden relative group transition-transform duration-200 hover:scale-105"
                    title={`Reproduzir vídeo ${video.index + 1}`}
                  >
                    <video 
                      src={video.url} 
                      className="w-full h-full object-cover" 
                      muted 
                      preload="metadata" // Melhora o carregamento
                      onError={(e) => {
                        console.error("Erro ao carregar vídeo:", video.url, e);
                      }}
                    />
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                      <div className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-90 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-200">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-7 w-7 text-[var(--azul-profundo)] ml-1" 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Overlay com hover effect */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
                  </button>
                );
              }).filter(Boolean) // Remove itens null do array
            ) : (
              <div className="text-center">
                <p className="text-[var(--azul-profundo)] mb-2">
                  Nenhum vídeo disponível no momento.
                </p>
                <p className="text-sm text-gray-600">
                  Novos conteúdos em breve!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {modalOpen && videoSelected && (
        <div 
          className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div 
            className="absolute inset-0 bg-black bg-opacity-70" 
            onClick={closeModal}
            aria-label="Fechar modal"
          ></div>
          <div className="bg-white rounded-lg w-full max-w-lg sm:max-w-2xl mx-4 p-4 relative z-10">
            <button 
              onClick={closeModal} 
              ref={closeButtonRef} 
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl font-bold z-20 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Fechar vídeo"
            >
              &times;
            </button>
            {videoSelected.url && (
              <video 
                src={videoSelected.url} 
                controls 
                autoPlay 
                className="w-full rounded-lg"
                onError={(e) => {
                  console.error("Erro ao reproduzir vídeo:", videoSelected.url, e);
                }}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
