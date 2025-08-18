import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

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
    axios
      .get(`${API_URL}/videos`)
      .then((res) => {
        const videosArray = res.data?.videos || [];
        const validVideos = videosArray
          .map((video, index) =>
            video && video.url
              ? { ...video, index, id: `video-${index}` }
              : null
          )
          .filter(Boolean);
        setVideos(validVideos);
      })
      .catch(() => {
        setError("Erro ao carregar vídeos. Tente novamente mais tarde.");
      })
      .finally(() => setLoading(false));
  }, []);

  function openModal(video) {
    if (video?.url) {
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

  return (
    <section id="services" className="relative bg-[var(--azul-serenity)]">
      <div className="container-default flex flex-col items-center justify-center gap-8 py-24 sm:py-32">
        {/* Título com gradiente */}
        <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[var(--azul-profundo)] to-[var(--azul-serenity)] bg-clip-text text-transparent text-center">
          Equilíbria: desenvolvendo pessoas e multiplicando resultados
        </h1>

        {/* Lista de vídeos */}
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {loading ? (
            <div className="flex items-center gap-2 text-[var(--azul-profundo)]">
              <div className="w-6 h-6 border-2 border-[var(--azul-profundo)] border-t-transparent rounded-full animate-spin"></div>
              <p>Carregando vídeos...</p>
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
            videos.map((video) => (
              <button
                key={video.id}
                onClick={() => openModal(video)}
                className="relative w-40 h-60 md:w-48 md:h-72 rounded-3xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {/* Pré-visualização do vídeo */}
                <video
                  src={video.url}
                  className="w-full h-full object-cover"
                  muted
                  preload="metadata"
                />

                {/* Overlay e botão de play */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center">
                  <div className="w-14 h-14 flex items-center justify-center bg-white/90 rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110">
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
              </button>
            ))
          ) : (
            <div className="text-center text-[var(--azul-profundo)]">
              <p className="mb-1">Nenhum vídeo disponível no momento.</p>
              <p className="text-sm text-gray-600">Novos conteúdos em breve!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && videoSelected && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Fundo escuro */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Player */}
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-2xl mx-4 p-4 relative z-10 transform transition-all duration-300 scale-95 opacity-0 animate-[fadeZoomIn_0.3s_forwards]">
            <button
              onClick={closeModal}
              ref={closeButtonRef}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
            >
              &times;
            </button>
            <video
              src={videoSelected.url}
              controls
              autoPlay
              className="w-full rounded-xl shadow-md"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
