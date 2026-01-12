
import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const iconSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <div className="flex items-center space-x-3 group">
      <div className={`${iconSize} relative`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300"></div>
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="absolute inset-0 w-full h-full p-2 text-white" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
          <circle cx="12" cy="12" r="1" className="animate-pulse-soft fill-current"></circle>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`${textSize} font-black tracking-tight leading-none text-slate-800 dark:text-white`}>
          CAMPUS <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">PATA</span>
        </span>
        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 tracking-[0.2em] uppercase -mt-0.5">
          Nyumba
        </span>
      </div>
    </div>
  );
};
