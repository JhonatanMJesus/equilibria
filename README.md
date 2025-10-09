# Equilíbria Soluções

![Equilíbria Soluções](https://img.shields.io/badge/Version-1.0.0-blue) ![React](https://img.shields.io/badge/React-19.1.0-61dafb) ![License](https://img.shields.io/badge/License-MIT-green)

> **Cuidar de pessoas é cuidar dos resultados**

Plataforma web institucional da Equilíbria Soluções - consultoria especializada em saúde mental corporativa, desenvolvimento de liderança e bem-estar organizacional.

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Painel Administrativo](#-painel-administrativo)
- [API Backend](#-api-backend)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## 🎯 Sobre o Projeto

A Equilíbria Soluções é uma plataforma web desenvolvida para promover serviços de consultoria empresarial focados em:

- **Saúde Mental Corporativa**: Palestras e treinamentos sobre bem-estar emocional
- **Desenvolvimento de Liderança**: Capacitação de líderes para alta performance
- **Leituras Corporais**: Análise de linguagem corporal e comunicação não-verbal
- **Gestão de Equipes**: Otimização de clima organizacional e produtividade

## ✨ Funcionalidades

### Landing Page
- 🏠 **Home** com apresentação institucional
- 🎥 **Serviços em Destaque** com vídeos demonstrativos dinâmicos
- 💬 **Depoimentos** de clientes
- 📝 **Formulários de Contato** dual:
  - Formulário para interessados (empresas)
  - Formulário para clientes existentes (agendamento)
- 📱 **Botão WhatsApp** flutuante para contato rápido
- 🎨 **Design Responsivo** otimizado para todos os dispositivos

### Painel Administrativo
- 🔐 **Sistema de Login** com JWT
- 📹 **Gerenciamento de Vídeos**:
  - Upload de até 3 vídeos simultâneos
  - Preview antes do envio
  - Substituição de vídeos existentes
- 🖼️ **Interface Intuitiva** com drag-and-drop visual

## 🚀 Tecnologias

### Frontend
- **React** 19.1.0 - Biblioteca JavaScript
- **React Router DOM** 7.8.0 - Navegação SPA
- **Tailwind CSS** 4.1.11 - Framework CSS utilitário
- **Vite** 7.0.4 - Build tool e dev server
- **Axios** 1.11.0 - Cliente HTTP
- **Lucide React** 0.536.0 - Ícones
- **React Icons** 5.5.0 - Biblioteca de ícones

### Backend
- **Node.js** com Express
- **JWT** para autenticação
- **Multer** para upload de arquivos
- **API REST** hospedada no Render

### Hospedagem
- Frontend: Vercel/Netlify (recomendado)
- Backend: Render.com
- Assets: Cloudinary/AWS S3

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn
- Git

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/equilibria-solucoes.git
cd equilibria-solucoes
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto (se necessário):
```env
VITE_API_URL=https://equilibria-backend-tmoo.onrender.com
```

4. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

5. **Acesse a aplicação**
```
http://localhost:5173
```

## 💻 Uso

### Desenvolvimento
```bash
npm run dev        # Inicia servidor de desenvolvimento
npm run build      # Cria build de produção
npm run preview    # Preview do build de produção
npm run lint       # Executa linter
```

### Acessar Painel Administrativo
```
https://seudominio.com/painel
```

Credenciais devem ser fornecidas pelo administrador do sistema.

## 📁 Estrutura do Projeto

```
equilibria-solucoes/
├── public/
│   ├── logo.svg
│   └── logo-update.png
├── src/
│   ├── components/
│   │   ├── Contact.jsx          # Formulários de contato
│   │   ├── Explain.jsx          # Seção explicativa com tabs
│   │   ├── FadeInSection.jsx    # Animação de entrada
│   │   ├── Footer.jsx           # Rodapé
│   │   ├── Header.jsx           # Cabeçalho/Menu
│   │   ├── Home.jsx             # Hero section
│   │   ├── LandingPage.jsx      # Página principal
│   │   ├── Painel.jsx           # Painel administrativo
│   │   ├── Services.jsx         # Vídeos de serviços
│   │   └── Statements.jsx       # Depoimentos
│   ├── css/
│   │   ├── fade.css            # Animações
│   │   ├── global.css          # Estilos globais
│   │   └── index.css           # Tailwind imports
│   ├── img/                    # Imagens do projeto
│   ├── App.jsx                 # Componente raiz
│   └── main.jsx                # Entry point
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## 🔐 Painel Administrativo

### Funcionalidades
- Login seguro com JWT
- Upload de vídeos (formatos aceitos: mp4, mov, avi)
- Limite de 3 vídeos em destaque
- Preview antes do envio
- Substituição individual de vídeos

### Fluxo de Uso
1. Acesse `/painel`
2. Faça login com credenciais
3. Selecione vídeos para cada slot (1, 2 ou 3)
4. Visualize preview
5. Clique em "Enviar Vídeos Selecionados"
6. Aguarde confirmação de upload

## 🌐 API Backend

### Endpoints Principais

#### Públicos
```
GET  /videos              # Lista vídeos em destaque
POST /contato             # Envio de formulário de contato
```

#### Autenticados
```
POST /login               # Autenticação de admin
POST /videos              # Upload de vídeos (requer token)
```

### Exemplo de Requisição
```javascript
// Login
POST https://equilibria-backend-tmoo.onrender.com/login
Content-Type: application/json

{
  "username": "admin",
  "password": "senha123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

## 🎨 Paleta de Cores

A aplicação utiliza variáveis CSS customizadas:

```css
--azul-profundo: #1a3a52      /* Títulos e elementos principais */
--azul-serenity: #a8c5da      /* Backgrounds suaves */
--verde-menta: #a8d5ba        /* Acentos e CTAs */
--dourado-suave: #d4af6a      /* Destaques especiais */
--cinza-neutro: #f0f0f0       /* Backgrounds neutros */
--cinza-escuro: #4a4a4a       /* Textos secundários */
```

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Padrões de Código
- Use ESLint configurado no projeto
- Siga convenções de nomenclatura React
- Mantenha componentes pequenos e reutilizáveis
- Comente código complexo

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

**Equilíbria Soluções**
- Website: [equilibriasolucoes.com.br](https://equilibriasolucoes.com.br)
- Instagram: [@equilibriasolucoes](https://instagram.com/equilibriasolucoes)
- WhatsApp: (14) 98829-1968

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/seu-usuario/equilibria-solucoes/issues) descrevendo:
- Comportamento esperado
- Comportamento atual
- Passos para reproduzir
- Screenshots (se aplicável)

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:
- 📧 Email: contato@equilibriasolucoes.com.br
- 💬 WhatsApp: (14) 98829-1968

---

**Desenvolvido com ❤️ para transformar ambientes corporativos através do bem-estar**