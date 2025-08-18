import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '/logo-update.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClientClick = (e) => {
    e.preventDefault();
    // Navegar para a seção de contato com o parâmetro para ativar o formulário "Já sou cliente"
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Adicionar parâmetro à URL para ativar o formulário correto
      window.history.pushState({}, '', '#contact?form=cliente');
      // Disparar evento customizado para notificar o componente Contact
      window.dispatchEvent(new CustomEvent('activateClientForm'));
    }
  };

  const handleMeetingClick = (e) => {
    e.preventDefault();
    // Navegar para a seção de contato com o formulário padrão
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      // Garantir que o formulário padrão esteja ativo
      window.history.pushState({}, '', '#contact');
      // Disparar evento customizado para notificar o componente Contact
      window.dispatchEvent(new CustomEvent('activateInterestForm'));
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[var(--cinza-neutro)] text-[var(--azul-profundo)] shadow-lg z-50">
      <div className="container-default">
        <div className="grid grid-cols-3 h-16 md:h-20 items-center">
          <div className="flex items-center">
            <a href="#" className="flex items-center space-x-2">
              <img src={Logo} alt="Logo" className="h-8 w-auto md:h-10" />
              <div className="flex flex-col leading-none">
                <span className="text-[var(--azul-profundo)] text-sm md:text-lg font-semibold">Equilíbria</span>
                <span className="text-[var(--azul-profundo)] text-xs md:text-sm">Soluções</span>
              </div>
            </a>
          </div>

          <nav className="hidden md:flex justify-center space-x-6">
            <a href="/" className="hover:text-[var(--dourado-suave)] text-sm font-medium transition">Início</a>
            <a href="#contact" className="hover:text-[var(--dourado-suave)] text-sm font-medium transition">Contato</a>
            <a href="#services" className="hover:text-[var(--dourado-suave)] text-sm font-medium transition">Serviços</a>
          </nav>

          <div className="hidden md:flex justify-end space-x-3">
            <button 
              onClick={handleMeetingClick}
              className="bg-[var(--azul-profundo)] text-white rounded-md py-2 px-4 text-sm hover:bg-[var(--dourado-suave)] hover:text-white transition cursor-pointer"
            >
              Agende uma reunião
            </button>
            <button 
              onClick={handleClientClick}
              className="bg-[var(--azul-profundo)] text-white rounded-md py-2 px-4 text-sm hover:bg-[var(--dourado-suave)] hover:text-white transition cursor-pointer"
            >
              Já sou Cliente
            </button>
          </div>

          <div className="flex justify-end md:hidden col-span-2">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-[var(--azul-profundo)]">
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
            <button 
              onClick={handleMeetingClick}
              className="bg-[var(--verde-menta)] text-[var(--azul-profundo)] rounded-md py-2 px-6 text-base hover:bg-[var(--dourado-suave)] hover:text-white transition cursor-pointer"
            >
              Agende uma reunião
            </button>
            <button 
              onClick={handleClientClick}
              className="bg-[var(--verde-menta)] text-[var(--azul-profundo)] rounded-md py-2 px-6 text-base hover:bg-[var(--dourado-suave)] hover:text-white transition cursor-pointer"
            >
              Já sou Cliente
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
