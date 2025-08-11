import React, { useState, useEffect, useRef } from "react";
import Vid1 from "../video/Vid1.mp4";
import Vid2 from "../video/Vid2.mp4";
import Vid3 from "../video/Vid3.mp4";
import Thumb1 from "../thumb/Thumb1.jpg";
import Thumb2 from "../thumb/Thumb2.jpg";
import Thumb3 from "../thumb/Thumb3.png";

const videos = [
  { id: 1, src: Vid1, thumb: Thumb1, alt: "Video 1" },
  { id: 2, src: Vid2, thumb: Thumb2, alt: "Video 2" },
  { id: 3, src: Vid3, thumb: Thumb3, alt: "Video 3" },
];

const Services = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [videoSelected, setVideoSelected] = useState(null);
  const closeButtonRef = useRef(null);

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
          <p className="max-w-md pt-2 text-sm sm:text-base">
            Explicação breve sobre a psicologia que ela trabalha e os serviços...
          </p>
          <a
            href="#contact"
            className="inline-flex items-center bg-[var(--azul-profundo)] p-2 mt-4 rounded-3xl text-[var(--dourado-suave)] font-semibold hover:underline text-base md:text-lg"
          >
            Conheça nosso trabalho
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {videos.map((video) => (
              <button
                key={video.id}
                onClick={() => openModal(video)}
                className="w-36 h-52 md:w-40 md:h-60 rounded-3xl shadow-lg overflow-hidden transform transition duration-300 ease-in-out md:hover:scale-145 relative group hover:z-50"
              >
                <img src={video.thumb} alt={video.alt} className="w-full h-full object-cover" />

                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                  <div className="flex items-center justify-center w-14 h-14 bg-white bg-opacity-90 rounded-full shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[var(--azul-profundo)]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-black bg-opacity-70"
            onClick={closeModal}
          ></div>

          <div
            className="bg-white rounded-lg w-full max-w-lg sm:max-w-2xl mx-4 p-4 relative z-10 transform transition-all duration-300 scale-100"
          >
            <button
              onClick={closeModal}
              ref={closeButtonRef}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-2xl font-bold"
            >
              &times;
            </button>
            <video
              src={videoSelected?.src}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
