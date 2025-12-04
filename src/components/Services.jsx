import React, { useState, useEffect } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

const API_URL = "https://equilibria-backend-tmoo.onrender.com";

const Services = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${API_URL}/videos`);
        console.log('Resposta da API:', res.data);
        
        // Pega o array de vídeos da resposta
        const videosData = res.data.videos || [];
        
        // Filtra apenas vídeos válidos (que têm url)
        const validVideos = videosData.filter(video => video && video.url);
        
        console.log('Vídeos válidos:', validVideos);
        setVideos(validVideos);
      } catch (err) {
        console.error("Erro ao carregar vídeos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Fechar modal com ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const VideoModal = () => (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center p-4"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2147483647,
        isolation: 'isolate'
      }}
      onClick={() => setSelectedVideo(null)}
    >
      <div className="relative max-w-4xl max-h-full flex flex-col items-center">
        <video
          src={selectedVideo}
          controls
          autoPlay
          className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          onClick={() => setSelectedVideo(null)}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors duration-200 font-semibold"
        >
          Fechar Vídeo
        </button>
      </div>
    </div>
  );

  return (
    <>
      <section 
        id="services"
        className="relative w-full bg-gradient-to-br from-[var(--azul-serenity)] via-[var(--cinza-neutro)] to-[var(--azul-serenity)] text-[var(--azul-profundo)] py-12 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-[var(--azul-profundo)] drop-shadow-lg">
            Serviços em Destaque
          </h2>
          <p className="text-lg text-[var(--azul-profundo)] mb-10">
            Confira alguns dos nossos serviços através de vídeos demonstrativos.
          </p>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--azul-profundo)] mb-4"></div>
              <p className="text-[var(--azul-profundo)]">Carregando vídeos...</p>
            </div>
          ) : videos.length === 0 ? (
            <div className="py-12">
              <p className="text-[var(--azul-profundo)] text-lg">
                Nenhum vídeo disponível no momento.
              </p>
              <p className="text-[var(--cinza-escuro)] mt-2">
                Em breve teremos novos conteúdos para você!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <div
                  key={video.public_id || index}
                  className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:scale-105 transition-transform duration-300"
                  onClick={() => setSelectedVideo(video.url)}
                >
                  <video
                    src={video.url}
                    className="w-full h-60 object-cover"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => {
                      e.target.play().catch(err => console.log('Erro ao reproduzir:', err));
                    }}
                    onMouseLeave={(e) => {
                      e.target.pause();
                      e.target.currentTime = 0;
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 transform group-hover:scale-110 transition-transform">
                      <svg 
                        className="w-8 h-8 text-[var(--azul-profundo)]" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-semibold">Vídeo {index + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal usando createPortal para renderizar no root */}
      {selectedVideo && createPortal(<VideoModal />, document.body)}
    </>
  );
};

export default Services;
