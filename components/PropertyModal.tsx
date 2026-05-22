import React, { useState, useEffect } from 'react';
import { House } from '../types';
import {
  X,
  MapPin,
  CheckCircle,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface PropertyModalProps {
  house: House;
  onClose: () => void;
  onContact: () => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  house,
  onClose,
  onContact
}) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  // Reset slider when opening a new property
  useEffect(() => {
    setCurrentPhoto(0);
  }, [house]);

  const photos = house.photos || [];

  const handleContact = () => {
    onContact();

    const whatsappUrl = `https://wa.me/${house.whatsappNumber}?text=${encodeURIComponent(
      `Hello ${house.landlordName}, I'm interested in the ${house.type} at ${house.title} I saw on Campus Pata.`
    )}`;

    window.open(whatsappUrl, '_blank');
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photos.length === 0) return;

    setCurrentPhoto((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photos.length === 0) return;

    setCurrentPhoto((prev) =>
      (prev - 1 + photos.length) % photos.length
    );
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4 lg:p-10 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 w-full h-full md:h-auto md:max-w-6xl md:max-h-[92vh] md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >

        {/* IMAGE GALLERY */}
        <div className="relative w-full md:w-[45%] h-[40vh] md:h-full bg-slate-100 group">
          
          <img
            src={
              photos[currentPhoto] ||
              photos[0] ||
              "https://picsum.photos/800/600"
            }
            className="w-full h-full object-cover"
            alt={house.title}
          />

          {/* NAV BUTTONS */}
          {photos.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={prevPhoto}
                className="p-3 bg-white/90 rounded-full"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextPhoto}
                className="p-3 bg-white/90 rounded-full"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* INFO SECTION */}
        <div className="flex-1 p-6 md:p-12 overflow-y-auto flex flex-col pb-28 md:pb-12">

          {/* HEADER */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white">
                {house.title}
              </h2>

              <div className="flex items-center text-slate-500 mt-2">
                <MapPin size={16} className="mr-2 text-blue-500" />
                {house.campus} • {house.location}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-3 text-slate-400 hover:bg-slate-100 rounded-2xl"
            >
              <X size={24} />
            </button>
          </div>

          {/* PRICE + OWNER */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-3xl text-center">
              <span className="block text-blue-600 text-[10px] font-black uppercase mb-1">
                Owner
              </span>
              <span className="text-xl font-black text-slate-800 dark:text-white">
                {house.landlordName}
              </span>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl text-center">
              <span className="block text-slate-500 text-[10px] font-black uppercase mb-1">
                Rent
              </span>
              <span className="text-xl font-black text-slate-800 dark:text-white">
                Ksh {house.price.toLocaleString()}
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase mb-2">
              Description
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              {house.description}
            </p>
          </div>

          {/* AMENITIES */}
          <div>
            <h3 className="text-[10px] font-black text-slate-400 uppercase mb-2">
              Amenities
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {house.amenities.map((a) => (
                <div
                  key={a}
                  className="flex items-center text-sm font-bold text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle
                    size={14}
                    className="text-emerald-500 mr-2"
                  />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT BUTTON */}
          <div className="mt-8">
            <button
              onClick={handleContact}
              className="w-full flex items-center justify-center bg-emerald-500 text-white py-5 rounded-2xl font-black text-sm uppercase"
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