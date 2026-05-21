import React from 'react';
import { House } from '../types';
import { Heart, MapPin, Ruler, Calendar, ChevronRight } from 'lucide-react';

interface HouseCardProps {
  house: House;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onSelect: (house: House) => void;
}

export const HouseCard: React.FC<HouseCardProps> = ({
  house,
  isFavorite,
  onToggleFavorite,
  onSelect
}) => {
  return (
    <div
      onClick={() => onSelect(house)}
      className="bg-white dark:bg-slate-900 rounded-[2.2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-slate-100 dark:border-slate-800 group cursor-pointer flex flex-col h-full"
    >
      {/* IMAGE */}
      <div className="relative h-44 md:h-52 overflow-hidden flex-shrink-0">
        <img
          src={house.photos[0]}
          alt={house.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://picsum.photos/seed/fallback/800/600";
          }}
        />

        {/* TYPE */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest backdrop-blur-md bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white shadow-lg border border-white/20">
            {house.type}
          </span>
        </div>

        {/* FAVORITE */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(house.id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all active:scale-90 ${
            isFavorite
              ? 'bg-red-500 text-white shadow-xl scale-110'
              : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* AVAILABLE */}
        <div className="absolute bottom-3 left-4">
          <div className="bg-slate-950/40 backdrop-blur-md text-white px-3 py-1.5 rounded-xl flex items-center text-[9px] font-bold border border-white/10">
            <Calendar size={11} className="mr-1.5 text-blue-400" />
            {house.available}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-lg font-black text-slate-800 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
            {house.title}
          </h3>

          <div className="flex items-center text-slate-500 dark:text-slate-400 text-[11px] mt-1.5">
            <MapPin size={12} className="text-blue-500 mr-1.5 flex-shrink-0" />
            <span className="truncate font-medium">{house.campus}</span>
          </div>
        </div>

        {/* DISTANCE */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
            <Ruler size={11} className="mr-1.5 text-blue-500" />
            {house.distance}
          </div>
        </div>

        {/* MAP BUTTON (NEW) */}
        {house.mapLink && (
          <a
            href={house.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-1 mb-4"
          >
            <MapPin size={12} />
            View on Map
          </a>
        )}

        {/* PRICE + ACTION */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
          <div className="flex flex-col">
            <span className="text-xl font-black text-blue-600 dark:text-blue-400 leading-none mb-1">
              Ksh {house.price.toLocaleString()}
            </span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
              Month
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};