import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://equilibria-backend-tmoo.onrender.com";

const Services = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/videos`)
      .then((res) => {
        const data = res.data;
        const lista = Array.isArray(data) ? data : data.videos || [];
        setVideos(lista);
      })
      .catch((err) => {
        console.error("Erro ao carregar vídeos:", err);
        setVideos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Fechar modal com ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  return (
    <section className="relative w-full bg-gradient-to-br from-[var(--azul-serenity)] via-[var(--cinza-neutro)] to-[var(--azul-serenity)] text-[var(--azul-profundo)] py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-[var(--azul-profundo)] drop-shadow-lg">
          Serviços em Destaque
        </h2>
        <p className="text-lg text-[var(--azul-profundo)] mb-10">
          Confira alguns dos nossos serviços através de vídeos demonstrativos.
        </p>

        {loading ? (
          <p className="text-[var(--azul-profundo)]">Carregando vídeos...</p>
        ) : videos.length === 0 ? (
          <p className="text-[var(--azul-profundo)]">
            Nenhum vídeo disponível no momento.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div
                key={index}
                className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:scale-105 transition-transform duration-300"
                onClick={() => setSelectedVideo(video.url)}
              >
                <video
                  src={video.url}
                  className="w-full h-60 object-cover"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => e.target.pause()}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4"
          style={{ zIndex: 9999 }}
          onClick={() => setSelectedVideo(null)}
        >
          {/* Contêiner que envolve apenas o vídeo */}
          <div
            className="relative max-w-5xl max-h-full w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              style={{ maxHeight: '90vh', maxWidth: '90vw' }}
            />
          </div>

          {/* Botão de fechar fora do contêiner do vídeo */}
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg z-50 transition-colors duration-200"
            style={{ zIndex: 10000 }}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
};

export default Services;
