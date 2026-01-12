
import React, { useState } from 'react';
import { User, Mail, Lock, Building, ArrowRight, Shield, MessageSquare, Phone, X } from 'lucide-react';
import { Logo } from './Logo';
import Swal from 'sweetalert2';
import { User as UserType } from '../types';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      name: { value: string };
      password: { value: string };
    };

    const email = target.email.value.trim().toUpperCase();
    const password = target.password.value.trim();
    const name = isRegister ? target.name.value : 'Student User';
    
    const isAdminCredentials = email === 'ADMIN@CAMPUSPATA.COM' && password === 'PSSR.COM';

    if (isAdminMode && !isAdminCredentials && !isRegister) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Admin Credentials',
        text: 'The email or password provided does not match the administrator records.',
        confirmButtonColor: '#f59e0b',
      });
      return;
    }

    let role: UserType['role'] = 'student';
    let finalName = name;

    if (isAdminCredentials) {
      role = 'admin';
      finalName = 'Main Administrator';
    }

    const user: UserType = {
      id: Math.random().toString(36).substring(7),
      name: finalName,
      email: target.email.value.toLowerCase(),
      role,
      joinedAt: new Date().toISOString()
    };

    onLogin(user);
    
    Swal.fire({
      icon: 'success',
      title: `Welcome, ${user.name}!`,
      text: role === 'admin' ? 'Administrator access granted.' : 'Searching for the best student deals...',
      showConfirmButton: false,
      timer: 2000,
      background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-white dark:bg-slate-900 transition-colors duration-500">
      {/* Left Visual Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center text-white p-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
        <div className="relative z-10">
          <Logo size="lg" />
          <h2 className="text-4xl font-black mt-10 mb-6 leading-tight">
            Unlock the Best Housing on Campus.
          </h2>
          <ul className="space-y-4 text-blue-100 font-medium">
            <li className="flex items-center"><Shield size={18} className="mr-3 text-white" /> Save your favorite properties</li>
            <li className="flex items-center"><Shield size={18} className="mr-3 text-white" /> Real-time availability alerts</li>
            <li className="flex items-center"><Shield size={18} className="mr-3 text-white" /> Direct secure contact with hosts</li>
          </ul>
        </div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50 animate-pulse-soft"></div>
      </div>

      {/* Right Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 overflow-y-auto">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${isAdminMode ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'}`}>
              {isAdminMode ? <Shield size={12} className="mr-2" /> : <Building size={12} className="mr-2" />}
              {isAdminMode ? 'Management Portal' : 'Student Identity'}
            </div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2 leading-tight">
              {isRegister ? 'Start Your Journey' : 'Log in to Proceed'}
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Join 5,000+ students already settled.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {isRegister && (
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="name" type="text" required className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-bold" placeholder="Full Name" />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input name="email" type="email" required className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-bold" placeholder="Email Address" />
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input name="password" type="password" required className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-bold" placeholder="Password" />
            </div>
            
            <button className="group w-full bg-blue-600 hover:bg-blue-700 text-white py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center space-x-3 active:scale-95">
              <span>{isRegister ? 'Join Community' : 'Sign In'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
             <button 
                onClick={() => { setIsRegister(!isRegister); setIsAdminMode(false); }}
                className="text-slate-400 hover:text-blue-600 font-bold text-xs transition-colors"
              >
                {isRegister ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
              </button>

              <div className="grid grid-cols-1 gap-2 mt-6">
                <button 
                  onClick={() => { setIsAdminMode(!isAdminMode); setIsRegister(false); }}
                  className={`w-full py-3.5 rounded-2xl border-2 font-black text-[9px] uppercase tracking-widest transition-all ${isAdminMode ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:text-amber-500'}`}
                >
                  {isAdminMode ? 'Back to Student Login' : 'Access Administrator Portal'}
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
