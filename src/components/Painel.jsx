import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserAlt, FaLock, FaUpload } from "react-icons/fa";
import Logo from "../img/logo-update.png";

const API_URL = "https://equilibria-backend.onrender.com";

const Painel = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Limpa os previews quando os arquivos são removidos ou alterados
  useEffect(() => {
    if (files.length > 0) {
      const objectUrls = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviews(objectUrls);
      return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
    } else {
      setPreviews([]);
    }
  }, [files]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      alert("Login bem-sucedido!");
    } catch (error) {
      alert("Erro no login. Verifique as credenciais.");
      console.error(error);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!token) return alert("Você precisa estar logado para enviar vídeos.");
    if (!files || files.length !== 3) return alert("Selecione exatamente 3 vídeos.");

    const formData = new FormData();
    Array.from(files).forEach(file => formData.append("videos", file));

    try {
      setLoading(true);
      await axios.post(`${API_URL}/videos`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Vídeos enviados com sucesso!");
      setFiles([]);
    } catch (error) {
      alert(`Erro no upload: ${error.message || "Verifique se o backend está rodando e se você está logado."}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setFiles([]);
    setPreviews([]);
  };

  // LOGIN
  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-500 font-sans">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-sm text-center transform transition duration-500 scale-95 hover:scale-100"
        >
          <div className="mb-6">
            <img
              src={Logo}
              alt="Logo"
              className="mx-auto w-20 h-20 rounded-full shadow-md"
            />
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

  // PAINEL DE UPLOAD
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

      <form onSubmit={handleUpload} className="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto mb-6">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-indigo-500 transition">
          <FaUpload className="text-indigo-600 text-4xl mb-3" />
          <span className="text-gray-600 mb-2">Selecione 3 vídeos</span>
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={(e) => setFiles(e.target.files)}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`mt-4 w-full py-3 rounded-lg text-white font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Enviando..." : "Enviar Vídeos"}
        </button>
      </form>

      {previews.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Pré-visualização dos vídeos selecionados:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((src, idx) => (
              <video
                key={idx}
                src={src}
                controls
                className="w-full rounded-lg shadow-md border border-gray-200"
              />
            ))}
          </div>
          <p className="mt-2 text-gray-600">{files.length} arquivo(s) selecionado(s)</p>
        </div>
      )}
    </div>
  );
};

export default Painel;
