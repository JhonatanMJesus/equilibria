import Logo from '/logo.svg'

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg shadow-grey-500/50 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo e texto */}
          <a href="#" className="flex items-center space-x-3">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
            <div className="flex flex-col">
              <span className="text-black text-lg font-semibold leading-none">Equilibria</span>
              <span className="text-black text-sm leading-none">Consultoria</span>
            </div>
          </a>

          {/* Links de navegação */}
          <nav className="hidden md:flex space-x-6">
            <a href="#home" className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200">Início</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200">Contato</a>
          </nav>

          {/* Botão */}
          <div>
            <a href="#contact" className="bg-blue-700 hover:bg-blue-500 rounded-md py-3 px-5 text-white text-sm inline-block transition-colors duration-200">
              Agende uma reunião
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
