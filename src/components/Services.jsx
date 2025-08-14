import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// Alterado para a porta correta da API
const API_URL = "https://equilibria-backend.onrender.com";

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [videoSelected, setVideoSelected] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    // Usando axios para buscar os vídeos
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
    <section id="services" className="bg-[var(--azul-serenity)]">
      <div className="container-default flex flex-col items-center justify-center gap-8 py-24 sm:py-32">
        <div className="flex flex-col text-center justify-center items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--azul-profundo)]">Título para mostrar os vídeos</h1>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {loading ? (
              <p>Carregando vídeos...</p>
            ) : videos.length > 0 ? (
              videos.map((video, idx) => (
                <button
                  key={idx}
                  onClick={() => openModal(video)}
                  className="w-36 h-52 md:w-40 md:h-60 rounded-3xl shadow-lg overflow-hidden relative group"
                >
                  <video src={video.url} className="w-full h-full object-cover" muted />
                  <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <div className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-90 rounded-full shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[var(--azul-profundo)]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <p>Nenhum vídeo disponível no momento.</p>
            )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute inset-0 bg-black bg-opacity-70" onClick={closeModal}></div>
          <div className="bg-white rounded-lg w-full max-w-lg sm:max-w-2xl mx-4 p-4 relative z-10">
            <button onClick={closeModal} ref={closeButtonRef} className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl font-bold">
              &times;
            </button>
            <video src={videoSelected?.url} controls autoPlay className="w-full rounded-lg" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
