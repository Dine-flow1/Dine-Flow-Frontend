import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-white bg-slate-900">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 mb-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-gold-500 to-wine-600">
                <span className="text-lg font-bold text-white">🍽️</span>
              </div>
              <span className="text-xl font-bold">RestroHub</span>
            </div>
            <p className="text-gray-400">Empowering restaurants with modern management solutions.</p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="transition-colors hover:text-gold-400">Features</a></li>
              <li><a href="#" className="transition-colors hover:text-gold-400">Pricing</a></li>
              <li><a href="#" className="transition-colors hover:text-gold-400">Security</a></li>
              <li><a href="#" className="transition-colors hover:text-gold-400">Updates</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="transition-colors hover:text-gold-400">About</a></li>
              <li><a href="#" className="transition-colors hover:text-gold-400">Blog</a></li>
              <li><a href="#" className="transition-colors hover:text-gold-400">Careers</a></li>
              <li><a href="#" className="transition-colors hover:text-gold-400">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="transition-colors hover:text-gold-400">Privacy</a></li>
              <li><a href="#" className="transition-colors hover:text-gold-400">Terms</a></li>
              <li><a href="#" className="transition-colors hover:text-gold-400">Cookies</a></li>
              <li><a href="#" className="transition-colors hover:text-gold-400">Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-gray-400">© 2024 RestroHub. All rights reserved.</p>
            
            {/* Social Links */}
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 transition-colors hover:text-gold-400">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-gold-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-gold-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-gold-400">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 transition-colors hover:text-gold-400">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
