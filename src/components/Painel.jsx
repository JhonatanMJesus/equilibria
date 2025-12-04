import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserAlt, FaLock, FaUpload } from "react-icons/fa";
import Logo from "../img/logo-update.png";

const API_URL = "https://equilibria-backend-tmoo.onrender.com";

const Painel = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [videos, setVideos] = useState([null, null, null]);
  const [previews, setPreviews] = useState([null, null, null]);
  const [selectedFiles, setSelectedFiles] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  // Busca vídeos atuais do backend
  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${API_URL}/videos`);
      setVideos(res.data.videos || [null, null, null]);
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
      setVideos([null, null, null]);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (token) {
      fetchVideos();
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      alert("Login bem-sucedido!");
      await fetchVideos();
    } catch (error) {
      alert("Erro no login. Verifique as credenciais.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setVideos([null, null, null]);
    setPreviews([null, null, null]);
    setSelectedFiles([null, null, null]);
  };

  // Upload direto para Cloudinary
  const uploadToCloudinary = async (file, index) => {
    try {
      // 1. Solicitar assinatura do backend
      const signatureResponse = await axios.post(
        `${API_URL}/upload-signature`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { signature, timestamp, cloudName, apiKey, folder } = signatureResponse.data;

      // 2. Preparar FormData para upload direto
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', apiKey);
      formData.append('folder', folder);

      // 3. Upload direto para Cloudinary
      console.log(`Iniciando upload do vídeo ${index + 1}...`);
      
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(prev => ({
              ...prev,
              [index]: percentCompleted
            }));
          }
        }
      );

      console.log(`Upload concluído para vídeo ${index + 1}`);

      // 4. Salvar informações no backend
      const saveResponse = await axios.post(
        `${API_URL}/videos/save`,
        {
          index: index,
          url: uploadResponse.data.secure_url,
          public_id: uploadResponse.data.public_id
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return saveResponse.data.videos;

    } catch (error) {
      console.error(`Erro no upload do vídeo ${index + 1}:`, error);
      throw error;
    }
  };

  const handleUpload = async () => {
    const filesToSend = selectedFiles
      .map((f, i) => f ? { file: f, index: i } : null)
      .filter(Boolean);
    
    if (filesToSend.length === 0) {
      alert("Selecione ao menos um vídeo");
      return;
    }

    setLoading(true);
    setUploadProgress({});

    try {
      // Fazer upload de cada vídeo sequencialmente
      for (const { file, index } of filesToSend) {
        const updatedVideos = await uploadToCloudinary(file, index);
        setVideos(updatedVideos);
      }

      alert("Vídeo(s) enviado(s) com sucesso!");
      
      // Limpa previews e arquivos selecionados
      setPreviews([null, null, null]);
      setSelectedFiles([null, null, null]);
      
    } catch (err) {
      console.error("Erro no upload:", err);
      if (err.response?.status === 401) {
        alert("Sessão expirada. Faça login novamente.");
        handleLogout();
      } else {
        alert(`Erro ao enviar vídeo(s): ${err.message || 'Tente novamente.'}`);
      }
    } finally {
      setLoading(false);
      setUploadProgress({});
    }
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
              required
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
              required
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
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Vídeo {idx + 1}</h3>
            
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
              <span className="text-gray-600 mb-1">
                {selectedFiles[idx] ? "Vídeo selecionado" : "Selecionar vídeo"}
              </span>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  // Validar tamanho (máximo 100MB)
                  if (file.size > 100 * 1024 * 1024) {
                    alert('Arquivo muito grande! Máximo: 100MB');
                    return;
                  }

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

            {selectedFiles[idx] && (
              <p className="text-sm text-gray-500 mt-2 truncate">
                {selectedFiles[idx].name}
              </p>
            )}

            {/* Barra de progresso */}
            {uploadProgress[idx] !== undefined && (
              <div className="mt-3">
                <div className="bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress[idx]}%` }}
                  />
                </div>
                <p className="text-center text-sm mt-1 text-gray-600">
                  {uploadProgress[idx]}%
                </p>
              </div>
            )}
          </div>
        ))}

        {/* Botão único para enviar vídeos modificados */}
        <div className="col-span-full mt-4 text-center">
          <button
            onClick={handleUpload}
            className={`px-6 py-3 rounded-md font-semibold transition ${
              loading 
                ? "bg-gray-400 cursor-not-allowed text-gray-700" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar Vídeos Selecionados"}
          </button>
        </div>
      </div>

      {/* Modal de carregamento */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-700">Enviando vídeo...</p>
            <p className="text-sm text-gray-600">Por favor, aguarde. Não feche esta página.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Painel;
