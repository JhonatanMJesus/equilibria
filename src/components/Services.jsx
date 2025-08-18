import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = "https://equilibria-backend.onrender.com";

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [videoSelected, setVideoSelected] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_URL}/videos`)
      .then(res => {
        setVideos(res.data);
      })
      .catch(err => {
        console.error("Erro ao carregar vídeos:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function openModal(video) {
    setVideoSelected(video);
    setModalOpen(true);
    setTimeout(() => setFadeIn(true), 10);
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
    <section id="services" className="relative bg-gradient-to-b from-[var(--azul-serenity)] to-[var(--azul-profundo)] text-white">
      <div className="container-default flex flex-col items-center justify-center gap-8 py-24 sm:py-32 px-6">
        
        {/* Título */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-center drop-shadow-lg">
          Nossa Galeria de Vídeos
        </h1>

        {/* Grid de vídeos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
          {loading ? (
            <p className="text-lg font-medium">Carregando vídeos...</p>
          ) : videos.length > 0 ? (
            videos.map((video, idx) => (
              <button
                key={idx}
                onClick={() => openModal(video)}
                className="relative rounded-2xl overflow-hidden shadow-xl border border-white/20 group"
              >
                <video
                  src={video.url}
                  className="w-full h-60 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
                  muted
                />
                <div className="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                  <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[var(--azul-profundo)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                    </svg>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <p className="text-lg font-medium">Nenhum vídeo disponível no momento.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute inset-0 bg-black/80" onClick={closeModal}></div>
          <div className="bg-white rounded-2xl w-full max-w-3xl mx-4 p-4 relative z-10 shadow-2xl">
            <button
              onClick={closeModal}
              ref={closeButtonRef}
              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-3xl font-bold"
            >
              &times;
            </button>
            <video src={videoSelected?.url} controls autoPlay className="w-full rounded-xl" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
