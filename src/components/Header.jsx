import Logo from '/logo.svg'

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-lg shadow-grey-500/50 z-50">
      <div className="mx-12 px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between"> {/* Adjusted height for mobile */}
          {/* Logo e texto */}
          <a href="#" className="flex items-center space-x-2 md:space-x-3"> {/* Adjusted spacing for mobile */}
            <img src={Logo} alt="Logo" className="h-8 w-auto md:h-10" /> {/* Adjusted logo size for mobile */}
            <div className="flex flex-col">
              <span className="text-black text-base md:text-lg font-semibold leading-none">Equilibria</span> {/* Adjusted font size for mobile */}
              <span className="text-black text-xs md:text-sm leading-none">Consultoria</span> {/* Adjusted font size for mobile */}
            </div>
          </a>

          {/* Links de navegação - Hidden on small screens, visible on medium and up */}
          <nav className="hidden md:flex space-x-4 md:space-x-6"> {/* Adjusted spacing for mobile */}
            <a href="#home" className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200 text-sm md:text-base">Início</a> {/* Adjusted font size for mobile */}
            <a href="#contact" className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200 text-sm md:text-base">Contato</a> {/* Adjusted font size for mobile */}
          </nav>

          {/* Botão */}
          <div>
            <a href="#contact" className="bg-blue-700 hover:bg-blue-500 rounded-md py-2 px-4 md:py-3 md:px-5 text-white text-xs md:text-sm inline-block transition-colors duration-200"> {/* Adjusted padding and font size for mobile */}
              Agende uma reunião
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
