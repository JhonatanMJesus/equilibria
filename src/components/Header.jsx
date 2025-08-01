import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '/logo.svg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
      <div className="mx-4 sm:mx-6 lg:mx-12 px-2 sm:px-4 lg:px-8">
        <div className="grid grid-cols-3 h-16 md:h-20 items-center">
          {/* Coluna 1: Logo à esquerda */}
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <img src={Logo} alt="Logo" className="h-8 w-auto md:h-10" />
              <div className="flex flex-col leading-none">
                <span className="text-black text-sm md:text-lg font-semibold">Equilibria</span>
                <span className="text-black text-xs md:text-sm">Consultoria</span>
              </div>
            </a>
          </div>

          {/* Coluna 2: Navegação centralizada */}
          <nav className="hidden md:flex justify-center space-x-6">
            <a href="#home" className="text-gray-700 hover:text-blue-700 text-sm font-medium transition">Início</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-700 text-sm font-medium transition">Contato</a>
          </nav>

          {/* Coluna 3: Botão à direita */}
          <div className="hidden md:flex justify-end">
            <a
              href="#contact"
              className="bg-blue-700 hover:bg-blue-500 text-white rounded-md py-2 px-4 text-sm transition"
            >
              Agende uma reunião
            </a>
          </div>

          {/* Botão menu mobile */}
          <div className="flex justify-end md:hidden col-span-2">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-inner px-4 py-4 space-y-4">
          <div className="flex justify-center space-x-6">
            <a href="#home" className="text-gray-700 hover:text-blue-700 text-sm font-medium">Início</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-700 text-sm font-medium">Contato</a>
          </div>
          <div className="flex justify-center">
            <a
              href="#contact"
              className="bg-blue-700 hover:bg-blue-500 text-white rounded-md py-2 px-6 text-sm transition"
            >
              Agende uma reunião
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
