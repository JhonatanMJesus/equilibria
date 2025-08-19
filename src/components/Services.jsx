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

  return (
    <>
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
      </section>

      {/* Modal renderizado fora da section */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center p-4"
          style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999
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
      )}
    </>
  );
};

export default Services;
