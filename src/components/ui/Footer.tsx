const Footer = () => {
  return (
    <footer className="text-white bg-gray-900">
      <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8 sm:py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-12">
          {/* Brand Section - Full width on mobile, spans 2 columns on tablet, 3 on desktop */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3">
            <div className="flex items-center mb-4 space-x-2 sm:mb-6">
              <div className="w-8 h-8 rounded-lg bg-linear-to-r from-amber-500 to-amber-600" />
              <span className="font-serif text-2xl font-bold text-white sm:text-3xl">DineFlow</span>
            </div>
            <p className="max-w-md text-base leading-relaxed text-gray-400 sm:text-lg">
              The future of restaurant management. Streamline your operations, 
              increase efficiency, and boost profits with our comprehensive platform.
            </p>
            
            {/* Social Links - Hidden on mobile, visible on tablet+ */}
            <div className="hidden mt-6 space-x-4 sm:flex">
              <a href="#" className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-800">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
              <a href="#" className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-800">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#" className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-800">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.7-3.061-1.745-.612-1.044-.612-2.322 0-3.366.613-1.045 1.764-1.745 3.061-1.745s2.448.7 3.061 1.745c.612 1.044.612 2.322 0 3.366-.613 1.045-1.764 1.745-3.061 1.745z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#" className="p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-gray-800">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
            <h3 className="mb-4 font-serif text-lg font-semibold sm:mb-6">Product</h3>
            <ul className="space-y-3 text-gray-400 sm:space-y-4">
              <li><a href="/features" className="text-base transition-colors hover:text-white">Features</a></li>
              <li><a href="/pricing" className="text-base transition-colors hover:text-white">Pricing</a></li>
              <li><a href="/api" className="text-base transition-colors hover:text-white">API</a></li>
              <li><a href="/integrations" className="text-base transition-colors hover:text-white">Integrations</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1 sm:col-span-1 lg:col-span-1">
            <h3 className="mb-4 font-serif text-lg font-semibold sm:mb-6">Company</h3>
            <ul className="space-y-3 text-gray-400 sm:space-y-4">
              <li><a href="/about" className="text-base transition-colors hover:text-white">About</a></li>
              <li><a href="/blog" className="text-base transition-colors hover:text-white">Blog</a></li>
              <li><a href="/careers" className="text-base transition-colors hover:text-white">Careers</a></li>
              <li><a href="/contact" className="text-base transition-colors hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Support Links - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:col-span-1 lg:block">
            <h3 className="mb-6 font-serif text-lg font-semibold">Support</h3>
            <ul className="space-y-4 text-gray-400">
              <li><a href="/help" className="transition-colors hover:text-white">Help Center</a></li>
              <li><a href="/docs" className="transition-colors hover:text-white">Documentation</a></li>
              <li><a href="/community" className="transition-colors hover:text-white">Community</a></li>
              <li><a href="/status" className="transition-colors hover:text-white">Status</a></li>
            </ul>
          </div>
        </div>

        {/* Mobile Social Links - Only show on mobile */}
        <div className="flex justify-center mt-8 space-x-6 sm:hidden">
          <a href="#" className="text-gray-400 transition-colors hover:text-white">
            <span className="sr-only">Twitter</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 transition-colors hover:text-white">
            <span className="sr-only">Facebook</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
            </svg>
          </a>
          <a href="#" className="text-gray-400 transition-colors hover:text-white">
            <span className="sr-only">Instagram</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.7-3.061-1.745-.612-1.044-.612-2.322 0-3.366.613-1.045 1.764-1.745 3.061-1.745s2.448.7 3.061 1.745c.612 1.044.612 2.322 0 3.366-.613 1.045-1.764 1.745-3.061 1.745z" clipRule="evenodd"/>
            </svg>
          </a>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-gray-800 sm:flex-row sm:pt-12 sm:mt-12">
          <p className="text-sm text-center text-gray-400 sm:text-left sm:text-base">
            © 2024 DineFlow. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-6 sm:mt-0">
            <a href="/terms" className="text-sm text-gray-400 transition-colors hover:text-white sm:text-base">
              Terms
            </a>
            <a href="/privacy" className="text-sm text-gray-400 transition-colors hover:text-white sm:text-base">
              Privacy
            </a>
            <a href="/cookies" className="text-sm text-gray-400 transition-colors hover:text-white sm:text-base">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;