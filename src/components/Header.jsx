import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '/logo-update.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-[var(--azul-profundo)] text-white shadow-lg z-50">
      <div className="container-default">
        <div className="grid grid-cols-3 h-16 md:h-20 items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <img src={Logo} alt="Logo" className="h-8 w-auto md:h-10" />
              <div className="flex flex-col leading-none">
                <span className="text-white text-sm md:text-lg font-semibold">Equilibria</span>
                <span className="text-white text-xs md:text-sm">Consultoria</span>
              </div>
            </a>
          </div>

          <nav className="hidden md:flex justify-center space-x-6">
            <a href="#home" className="hover:text-[var(--dourado-suave)] text-sm font-medium transition">Início</a>
            <a href="#contact" className="hover:text-[var(--dourado-suave)] text-sm font-medium transition">Contato</a>
            <a href="#services" className="hover:text-[var(--dourado-suave)] text-sm font-medium transition">Serviços</a>
          </nav>

          <div className="hidden md:flex justify-end space-x-3">
            <a href="#contact" className="bg-[var(--verde-menta)] text-[var(--azul-profundo)] rounded-md py-2 px-4 text-sm hover:bg-[var(--dourado-suave)] hover:text-white transition">
              Agende uma reunião
            </a>
            <a href="#contact" className="bg-[var(--verde-menta)] text-[var(--azul-profundo)] rounded-md py-2 px-4 text-sm hover:bg-[var(--dourado-suave)] hover:text-white transition">
              Já sou Cliente
            </a>
          </div>

          <div className="flex justify-end md:hidden col-span-2">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[var(--azul-profundo)] text-white border-t shadow-inner px-4 py-4 space-y-4">
          <div className="flex flex-col space-y-4 text-center">
            <a href="#home" className="hover:text-[var(--dourado-suave)] text-base font-medium">Início</a>
            <a href="#contact" className="hover:text-[var(--dourado-suave)] text-base font-medium">Contato</a>
            <a href="#services" className="hover:text-[var(--dourado-suave)] text-base font-medium">Serviços</a>
            <a href="#contact" className="bg-[var(--verde-menta)] text-[var(--azul-profundo)] rounded-md py-2 px-6 text-base hover:bg-[var(--dourado-suave)] hover:text-white transition">
              Agende uma reunião
            </a>
            <a href="#contact" className="bg-[var(--verde-menta)] text-[var(--azul-profundo)] rounded-md py-2 px-6 text-base hover:bg-[var(--dourado-suave)] hover:text-white transition">
              Já sou Cliente
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
