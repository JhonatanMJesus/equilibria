import React, { useState, useEffect } from "react";
import axios from "axios";

// Alterado para a porta correta da API
const API_URL = "https://equilibria-backend.onrender.com";

const Painel = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
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

  if (!token) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Painel Administrativo</h1>
      <button onClick={handleLogout} style={{ position: "absolute", top: "1rem", right: "1rem" }}>Sair</button>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={(e) => setFiles(e.target.files)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar Vídeos"}
        </button>
      </form>

      {previews.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Pré-visualização dos vídeos selecionados:</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {previews.map((src, idx) => (
              <video
                key={idx}
                src={src}
                controls
                width="200"
                style={{ border: "1px solid #ccc", borderRadius: "4px" }}
              />
            ))}
          </div>
          <p>{files.length} arquivo(s) selecionado(s)</p>
        </div>
      )}
    </div>
  );
};

export default Painel;
