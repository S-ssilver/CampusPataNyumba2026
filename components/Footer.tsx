
import React from 'react';
import { Logo } from './Logo';
import { Instagram, Twitter, MessageCircle, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <Logo size="lg" />
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
            The #1 student housing portal in Nairobi. We connect thousands of students with safe, affordable, and quality campus accommodation.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
              <Instagram size={20} />
            </a>
            <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-sky-500 hover:text-white transition-all">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-emerald-500 hover:text-white transition-all">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-widest text-xs">Quick Links</h4>
          <ul className="space-y-4">
            {['Search Houses', 'Favorites', 'Smart Alerts', 'List Property', 'Privacy Policy'].map(link => (
              <li key={link}>
                <a href="#" className="text-slate-500 dark:text-slate-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center group">
                  <ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-widest text-xs">Get in Touch</h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 text-sm text-slate-500 dark:text-slate-400">
              <MapPin size={18} className="text-blue-600 flex-shrink-0" />
              <span>12th Floor, Prism Tower, 3rd Ngong Avenue, Nairobi, Kenya</span>
            </li>
            <li className="flex items-center space-x-3 text-sm text-slate-500 dark:text-slate-400">
              <Phone size={18} className="text-blue-600 flex-shrink-0" />
              <span>+254 745 565 431</span>
            </li>
            <li className="flex items-center space-x-3 text-sm text-slate-500 dark:text-slate-400">
              <Mail size={18} className="text-blue-600 flex-shrink-0" />
              <span>campuspatanyumba@gmail.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 dark:text-white mb-6 uppercase tracking-widest text-xs">Stay Updated</h4>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Join 5,000+ students receiving weekly housing updates.</p>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-transparent border-none focus:ring-0 text-sm px-3 flex-1 text-slate-800 dark:text-white outline-none" 
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-xs font-medium">
          © {new Date().getFullYear()} Campus Pata Nyumba. Built with ❤️ for Students.
        </p>
        <div className="flex space-x-6 text-xs font-medium text-slate-400">
          <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Cookies</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Safety Guide</a>
        </div>
      </div>
    </footer>
  );
};
