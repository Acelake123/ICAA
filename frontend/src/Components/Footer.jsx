
export default function Footer(){
  return (
    <footer className="bg-gray-900 bg-opacity-50 text-gray-300 py-5">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3">
            <h2 className="text-xl font-bold text-white">1nOnly</h2>
            <p className="mt-2 text-sm">
              Developing innovative solutions to combat the misuse of cryptocurrencies in illegal drug trafficking. 
            </p>
          </div>

          <div className="w-full md:w-1/3 mt-6 md:mt-0 text-center">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="mt-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-gray-200 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-gray-200 transition"
                >
                  Features
                </a>
              </li>
              {/* <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-gray-200 transition"
                >
                  Contact
                </a>
              </li> */}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-4"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 text-center">
            &copy; {new Date().getFullYear()} 1nOnly. All Rights Reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200 mx-2 transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-gray-200 mx-2 transition"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

