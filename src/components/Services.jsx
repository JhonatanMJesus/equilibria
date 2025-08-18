import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://equilibria-backend-tmoo.onrender.com"; // ajuste para a URL do seu backend

const Services = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/videos`)
      .then((res) => {
        const data = res.data;
        // Se o backend retornar { videos: [...] }
        // ou retornar um array puro [...]
        const lista = Array.isArray(data) ? data : data.videos || [];
        setVideos(lista);
      })
      .catch((err) => {
        console.error("Erro ao carregar vídeos:", err);
        setVideos([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-br from-[var(--azul-serenity)] via-[var(--cinza-neutro)] to-[var(--azul-serenity)] text-[var(--azul-profundo)] py-12 px-4">
      {/* Container */}
      <div className="max-w-6xl mx-auto text-center">
        {/* Título */}
        <h2 className="text-4xl font-bold mb-6 text-[var(--azul-profundo)] drop-shadow-lg">
          Serviços em Destaque
        </h2>
        <p className="text-lg text-[var(--azul-profundo)] mb-10">
          Confira alguns dos nossos serviços através de vídeos demonstrativos.
        </p>

        {/* Área dos Vídeos */}
        {loading ? (
          <p className="text-[var(--azul-profundo)]">Carregando vídeos...</p>
        ) : videos.length === 0 ? (
          <p className="text-[var(--azul-profundo)]">Nenhum vídeo disponível no momento.</p>
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
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Visualização */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-4xl mx-4">
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full max-h-[80vh] rounded-xl shadow-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
