
import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  Heart,
  CheckCircle,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Ruler,
  Home
} from 'lucide-react';
import { House } from '../types';

interface PropertyDetailsPageProps {
  house: House;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onBack: () => void;
  onContact: () => void;
}

export const PropertyDetailsPage: React.FC<PropertyDetailsPageProps> = ({
  house,
  isFavorite,
  onToggleFavorite,
  onBack,
  onContact
}) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const photos = house.photos || [];

  const changePhoto = (direction: number) => {
    if (photos.length < 2) return;

    setCurrentPhoto(
      (currentPhoto + direction + photos.length) % photos.length
    );
  };

  const handleContact = () => {
    onContact();

    const message = `Hello ${house.landlordName}, I'm interested in the ${house.type} at ${house.title} I saw on Campus Pata.`;

    const whatsappUrl =
      `https://wa.me/${house.whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 rounded-xl px-4 py-3
          font-bold text-slate-600 hover:bg-slate-100
          dark:text-slate-300 dark:hover:bg-slate-800 transition"
      >
        <ArrowLeft size={18} />
        Back to properties
      </button>

      {/* Property photos */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl
        overflow-hidden border border-slate-200 dark:border-slate-800">

        <div className="relative h-72 sm:h-96 lg:h-[480px] bg-slate-100 dark:bg-slate-800">
          {photos.length > 0 ? (
            <img
              src={photos[currentPhoto]}
              alt={`${house.title} - photo ${currentPhoto + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center
              justify-center text-slate-400 gap-3">
              <Home size={48} />
              <p>No property photos available</p>
            </div>
          )}

          {photos.length > 1 && (
            <>
              <button
                onClick={() => changePhoto(-1)}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2
                  p-3 rounded-full bg-white/90 text-slate-800 shadow-lg"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={() => changePhoto(1)}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2
                  p-3 rounded-full bg-white/90 text-slate-800 shadow-lg"
              >
                <ChevronRight size={22} />
              </button>

              <span className="absolute bottom-4 right-4 rounded-full
                bg-black/60 text-white text-sm px-4 py-2">
                {currentPhoto + 1} / {photos.length}
              </span>
            </>
          )}
        </div>

        {photos.length > 1 && (
          <div className="flex gap-3 p-4 overflow-x-auto">
            {photos.map((photo, index) => (
              <button
                key={`${photo}-${index}`}
                onClick={() => setCurrentPhoto(index)}
                aria-label={`View photo ${index + 1}`}
                className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden
                  border-2 ${
                    currentPhoto === index
                      ? 'border-blue-600'
                      : 'border-transparent'
                  }`}
              >
                <img
                  src={photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Property details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white dark:bg-slate-900
          rounded-3xl p-6 md:p-8 border border-slate-200
          dark:border-slate-800 space-y-7">

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-2 rounded-xl bg-blue-50
                dark:bg-blue-900/30 text-blue-700 dark:text-blue-300
                text-xs font-bold">
                {house.type}
              </span>

              <span className="px-3 py-2 rounded-xl bg-emerald-50
                dark:bg-emerald-900/30 text-emerald-700
                dark:text-emerald-300 text-xs font-bold">
                <Calendar size={13} className="inline mr-1" />
                {house.available}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black
              text-slate-900 dark:text-white">
              {house.title}
            </h1>

            <p className="flex items-center gap-2 mt-3
              text-slate-500 dark:text-slate-400">
              <MapPin size={18} className="text-blue-600 shrink-0" />
              {house.location} · Near {house.campus}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-blue-50
              dark:bg-blue-900/20">
              <p className="text-xs uppercase tracking-wider
                font-bold text-blue-600 dark:text-blue-400">
                Monthly rent
              </p>
              <p className="text-3xl font-black mt-2
                text-slate-900 dark:text-white">
                KSh {house.price.toLocaleString()}
              </p>
              <p className="text-sm text-slate-500 mt-1">Per month</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50
              dark:bg-slate-800/60">
              <p className="text-xs uppercase tracking-wider
                font-bold text-slate-500">
                Distance to campus
              </p>
              <p className="text-xl font-black mt-3
                text-slate-900 dark:text-white">
                <Ruler size={18} className="inline mr-2 text-blue-600" />
                {house.distance}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-900
              dark:text-white mb-3">
              About this property
            </h2>
            <p className="leading-7 text-slate-600 dark:text-slate-300
              whitespace-pre-line">
              {house.description || 'No description provided yet.'}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-900
              dark:text-white mb-4">
              Amenities and facilities
            </h2>

            {house.amenities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {house.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3
                    text-slate-700 dark:text-slate-300">
                    <CheckCircle size={18} className="text-emerald-500" />
                    {amenity}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No amenities listed.</p>
            )}
          </div>

          {house.mapLink && (
            <a
              href={house.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold
                text-blue-600 hover:underline"
            >
              <MapPin size={18} />
              View property on Google Maps
            </a>
          )}
        </section>

        {/* Landlord and actions */}
        <aside className="h-fit bg-white dark:bg-slate-900
          rounded-3xl p-6 border border-slate-200
          dark:border-slate-800 lg:sticky lg:top-6">

          <p className="text-xs uppercase tracking-wider
            font-bold text-slate-500">
            Listed by
          </p>

          <h2 className="text-2xl font-black mt-2
            text-slate-900 dark:text-white">
            {house.landlordName}
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Property contact
          </p>

          <button
            onClick={() => onToggleFavorite(house.id)}
            className={`w-full mt-6 flex items-center justify-center
              gap-2 rounded-xl border py-3 font-bold transition ${
                isFavorite
                  ? 'border-red-200 bg-red-50 text-red-600'
                  : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
              }`}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
            {isFavorite ? 'Saved to favourites' : 'Save to favourites'}
          </button>

          <button
            onClick={handleContact}
            className="w-full mt-3 flex items-center justify-center
              gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600
              text-white py-4 font-black transition"
          >
            <MessageCircle size={20} />
            Contact on WhatsApp
          </button>

          <p className="text-xs text-slate-500 mt-4 leading-5">
            Confirm the rent, availability and viewing arrangements
            with the property contact before making any payment.
          </p>
        </aside>
      </div>
    </div>
  );
};
