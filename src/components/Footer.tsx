const Footer = () => {
  return (
    <footer className="text-white bg-gray-900">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4 space-x-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-r from-primary-600 to-primary-400" />
              <span className="font-serif text-2xl font-bold">RestaurantPro</span>
            </div>
            <p className="max-w-md text-gray-400">
              The future of restaurant management. Streamline your operations, 
              increase efficiency, and boost profits with our comprehensive platform.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="transition-colors hover:text-white">Features</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Pricing</a></li>
              <li><a href="#" className="transition-colors hover:text-white">API</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Integrations</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-serif text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="transition-colors hover:text-white">About</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Blog</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Careers</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-gray-800 md:flex-row">
          <p className="text-sm text-gray-400">
            © 2024 RestaurantPro. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-6 md:mt-0">
            <a href="#" className="text-gray-400 transition-colors hover:text-white">
              Terms
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;