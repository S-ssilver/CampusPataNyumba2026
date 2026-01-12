
import React, { useState } from 'react';
import { House } from '../types';
import { X, MapPin, CheckCircle, MessageCircle, ChevronLeft, ChevronRight, Share2, Calendar } from 'lucide-react';

interface PropertyModalProps {
  house: House;
  onClose: () => void;
  onContact: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({ house, onClose, onContact }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const handleContact = () => {
    // Record lead for admin
    onContact();
    
    // Open specific landlord's WhatsApp
    const whatsappUrl = `https://wa.me/${house.whatsappNumber}?text=${encodeURIComponent(
      `Hello ${house.landlordName}, I'm interested in the ${house.type} at ${house.title} I saw on Campus Pata.`
    )}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4 lg:p-10 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 w-full h-full md:h-auto md:max-w-6xl md:max-h-[92vh] md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl animate-in zoom-in-95 relative" onClick={(e) => e.stopPropagation()}>
        
        {/* Gallery */}
        <div className="relative w-full md:w-[45%] h-[40vh] md:h-full bg-slate-100 flex-shrink-0 group">
          <img src={house.photos[currentPhoto]} className="w-full h-full object-cover" alt={house.title} />
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); setCurrentPhoto(prev => (prev - 1 + house.photos.length) % house.photos.length); }} className="p-3 bg-white/90 rounded-full"><ChevronLeft size={20} /></button>
            <button onClick={(e) => { e.stopPropagation(); setCurrentPhoto(prev => (prev + 1) % house.photos.length); }} className="p-3 bg-white/90 rounded-full"><ChevronRight size={20} /></button>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto custom-scrollbar flex flex-col pb-28 md:pb-12">
          <div className="flex justify-between items-start mb-6">
             <div>
                <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white leading-tight">{house.title}</h2>
                <div className="flex items-center text-slate-500 mt-2 font-medium">
                  <MapPin size={16} className="mr-2 text-blue-500" />
                  {house.campus} • {house.location}
                </div>
             </div>
             <button onClick={onClose} className="p-3 text-slate-400 hover:bg-slate-100 rounded-2xl"><X size={24} /></button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl text-center">
              <span className="block text-blue-600 text-[10px] font-black uppercase tracking-widest mb-1">Owner</span>
              <span className="text-xl font-black text-slate-800 dark:text-white">{house.landlordName}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl text-center">
              <span className="block text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Rent</span>
              <span className="text-xl font-black text-slate-800 dark:text-white">Ksh {house.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-6 flex-1">
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 border-b pb-2">Description</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{house.description}</p>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 border-b pb-2">Amenities</h3>
              <div className="grid grid-cols-2 gap-y-3">
                {house.amenities.map(a => (
                  <div key={a} className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300">
                    <CheckCircle size={14} className="text-emerald-500 mr-2" /> {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="mt-8 flex gap-3">
             <button 
              onClick={handleContact}
              className="flex-1 flex items-center justify-center bg-emerald-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all"
             >
                <MessageCircle className="mr-3" size={20} />
                Contact {house.landlordName}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
