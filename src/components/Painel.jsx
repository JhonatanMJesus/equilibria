import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserAlt, FaLock, FaUpload } from "react-icons/fa";
import Logo from "../img/logo-update.png";

const API_URL = "https://equilibria-backend.onrender.com";

const Painel = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [videos, setVideos] = useState([null, null, null]); // 3 slots de vídeo
  const [loading, setLoading] = useState(false);

  // Busca os vídeos atuais do backend
  const fetchVideos = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/videos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Supondo que o backend retorne uma lista de URLs [video1, video2, video3]
      setVideos((prev) => res.data.videos || [null, null, null]);
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      alert("Login bem-sucedido!");
      fetchVideos(); // já busca vídeos ao logar
    } catch (error) {
      alert("Erro no login. Verifique as credenciais.");
      console.error(error);
    }
  };

  const handleUpload = async (file, index) => {
    if (!token) return alert("Você precisa estar logado para enviar vídeos.");
    if (!file) return;

    const formData = new FormData();
    formData.append("video", file); // envio individual
    formData.append("index", index); // para o backend saber qual substituir

    try {
      setLoading(true);
      await axios.post(`${API_URL}/videos`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Vídeo enviado com sucesso!");
      fetchVideos(); // atualiza a lista
    } catch (error) {
      alert(`Erro no upload: ${error.message || "Verifique o backend."}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setVideos([null, null, null]);
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-500 font-sans">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm text-center transform transition duration-500 scale-95 hover:scale-100"
        >
          <div className="mb-6">
            <img src={Logo} alt="Logo" className="mx-auto w-20 h-20 rounded-full shadow-md" />
          </div>
          <h2 className="text-3xl font-bold text-gray-700 mb-8">Painel de Login</h2>

          <div className="relative mb-4">
            <span className="absolute left-3 top-3 text-gray-400"><FaUserAlt /></span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="relative mb-6">
            <span className="absolute left-3 top-3 text-gray-400"><FaLock /></span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    );
  }

  // PAINEL DE UPLOAD INDIVIDUAL
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-700">Painel Administrativo</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Sair
        </button>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video, idx) => {
          const [previews, setPreviews] = useState([]);

          const handleFileChange = (e) => {
            const files = Array.from(e.target.files);
            if (!files.length) return;

            const urls = files.map(file => URL.createObjectURL(file));
            setPreviews(urls);
          };

          return (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-lg text-center">
              {previews.length > 0 ? (
                previews.map((src, i) => (
                  <video key={i} src={src} controls className="w-full rounded-md mb-2" />
                ))
              ) : video ? (
                <video src={video.url} controls className="w-full rounded-md mb-3" />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-3">
                  <span className="text-gray-500">Sem vídeo</span>
                </div>
              )}

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-indigo-500 transition">
                <FaUpload className="text-indigo-600 text-3xl mb-2" />
                <span className="text-gray-600 mb-1">Substituir vídeo</span>
                <input
                  type="file"
                  accept="video/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={loading}
                />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Painel;
