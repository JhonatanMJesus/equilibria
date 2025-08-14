import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserAlt, FaLock, FaUpload } from "react-icons/fa";
import Logo from "../img/logo-update.png";

const API_URL = "https://equilibria-backend.onrender.com";

const Painel = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [videos, setVideos] = useState([null, null, null]);
  const [previews, setPreviews] = useState([null, null, null]);
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);

  // Busca vídeos atuais do backend
  const fetchVideos = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/videos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVideos(res.data.videos || [null, null, null]);
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
      fetchVideos();
    } catch (error) {
      alert("Erro no login. Verifique as credenciais.");
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setVideos([null, null, null]);
    setPreviews([null, null, null]);
    setSelectedFiles([null, null, null]);
  };

  // =======================
  // Login
  // =======================
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

  // =======================
  // Painel de Upload
  // =======================
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
        {videos.map((video, idx) => (
          <div key={idx} className="bg-white p-4 rounded-lg shadow-lg text-center">
            {previews[idx] ? (
              <video src={previews[idx]} controls className="w-full rounded-md mb-2" />
            ) : video ? (
              <video src={video.url} controls className="w-full rounded-md mb-3" />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-3">
                <span className="text-gray-500">Sem vídeo</span>
              </div>
            )}

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-indigo-500 transition">
              <FaUpload className="text-indigo-600 text-3xl mb-2" />
              <span className="text-gray-600 mb-1">Selecionar vídeo</span>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const newSelected = [...selectedFiles];
                  newSelected[idx] = file;
                  setSelectedFiles(newSelected);

                  const newPreviews = [...previews];
                  newPreviews[idx] = URL.createObjectURL(file);
                  setPreviews(newPreviews);
                }}
                className="hidden"
                disabled={loading}
              />
            </label>
          </div>
        ))}

        {/* Botão único para enviar vídeos modificados */}
        <div className="col-span-full mt-4 text-center">
          <button
            onClick={async () => {
              const filesToSend = selectedFiles
                .map((f, i) => f ? { file: f, index: i } : null)
                .filter(Boolean);
              if (filesToSend.length === 0) return alert("Selecione ao menos um vídeo");

              const formData = new FormData();
              const indices = [];
              filesToSend.forEach(({ file, index }) => {
                formData.append("videos", file);
                indices.push(index);
              });
              formData.append("indices", JSON.stringify(indices));

              try {
                setLoading(true);
                const res = await axios.post(`${API_URL}/videos`, formData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                  },
                });
                alert("Vídeo(s) enviado(s) com sucesso!");
                setVideos(res.data.videos);
                setPreviews([null, null, null]);
                setSelectedFiles([null, null, null]);
              } catch (err) {
                console.error(err);
                alert("Erro ao enviar vídeo(s)");
              } finally {
                setLoading(false);
              }
            }}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Vídeos Selecionados"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Painel;
