export default function FooterSection() {
  return (
    <footer className="w-full bg-white text-black py-20 px-6 md:px-16 lg:px-24">
      
      {/* 1. Top Navigation Links */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-20 md:mb-32">
        <a href="#" className="text-lg font-medium hover:text-gray-600 transition-colors">
          Style guide
        </a>
        <a href="#" className="text-lg font-medium hover:text-gray-600 transition-colors">
          License
        </a>
        <a href="#" className="text-lg font-medium hover:text-gray-600 transition-colors">
          Changelog
        </a>
        <a href="#" className="text-lg font-medium hover:text-gray-600 transition-colors">
          Instructions
        </a>
      </div>

      {/* 2. Main Large Logo */}
      <div className="flex justify-center w-full mb-20 md:mb-32">
        {/* Replace '/logo-full.png' with the actual path to your Cube+Text image */}
        <img 
          src="/footer-logo.webp" 
          alt="Cattleya Logo" 
          className="w-full max-w-4xl h-auto object-contain select-none"
        />
      </div>


    </footer>
  );
}