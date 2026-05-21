
import React from 'react';
import { FilterCriteria } from '../types';
import { SlidersHorizontal, X } from 'lucide-react';

interface FiltersProps {
  criteria: FilterCriteria;
  onChange: (criteria: FilterCriteria) => void;
  onClear: () => void;
}

export const Filters: React.FC<FiltersProps> = ({ criteria, onChange, onClear }) => {
  const campuses = ["KINAP", "JKUAT", "KU", "Strathmore", "UON"];
  const types = ["Bedsitter", "Single Room", "Shared Room","Studio Apartment"];
  const priceRanges = [5000, 10000, 15000, 20000];

  const hasFilters = criteria.campus !== '' || criteria.type !== '' || criteria.maxPrice !== null;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 mb-8 md:mb-12 transition-colors">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center uppercase tracking-widest text-xs">
          <SlidersHorizontal size={18} className="mr-2 md:mr-3 text-blue-600" />
          Filter Results
        </h2>
        {hasFilters && (
          <button 
            onClick={onClear}
            className="text-[10px] font-black text-slate-400 hover:text-red-500 flex items-center transition-colors uppercase tracking-widest"
          >
            Reset <X size={12} className="ml-1" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        <div className="space-y-2">
          <label className="text-[9px] md:text-[10px] font-black text-slate-400 dark:text-slate-500 ml-1 uppercase tracking-widest">Campus</label>
          <select 
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none dark:text-white font-bold text-xs md:text-sm"
            value={criteria.campus}
            onChange={(e) => onChange({ ...criteria, campus: e.target.value })}
          >
            <option value="">Any Campus</option>
            {campuses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] md:text-[10px] font-black text-slate-400 dark:text-slate-500 ml-1 uppercase tracking-widest">Room Type</label>
          <select 
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none dark:text-white font-bold text-xs md:text-sm"
            value={criteria.type}
            onChange={(e) => onChange({ ...criteria, type: e.target.value })}
          >
            <option value="">Any Type</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[9px] md:text-[10px] font-black text-slate-400 dark:text-slate-500 ml-1 uppercase tracking-widest">Budget (Ksh)</label>
          <select 
            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl md:rounded-2xl px-4 py-3 md:px-5 md:py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none dark:text-white font-bold text-xs md:text-sm"
            value={criteria.maxPrice || ''}
            onChange={(e) => onChange({ ...criteria, maxPrice: e.target.value ? Number(e.target.value) : null })}
          >
            <option value="">Any Price</option>
            {priceRanges.map(p => <option key={p} value={p}>Under {p.toLocaleString()}</option>)}
          </select>
        </div>
      </div>
      
      {hasFilters && (
        <div className="mt-6 md:mt-8 flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          {criteria.campus && (
            <FilterBadge label={criteria.campus} onRemove={() => onChange({...criteria, campus: ''})} color="blue" />
          )}
          {criteria.type && (
            <FilterBadge label={criteria.type} onRemove={() => onChange({...criteria, type: ''})} color="purple" />
          )}
          {criteria.maxPrice && (
            <FilterBadge label={`Max ${criteria.maxPrice.toLocaleString()}`} onRemove={() => onChange({...criteria, maxPrice: null})} color="emerald" />
          )}
        </div>
      )}
    </div>
  );
};

const FilterBadge: React.FC<{ label: string, onRemove: () => void, color: 'blue' | 'purple' | 'emerald' }> = ({ label, onRemove, color }) => {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-800',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${colors[color]}`}>
      {label}
      <X size={10} className="ml-1.5 cursor-pointer hover:text-red-500 transition-colors" onClick={onRemove} />
    </span>
  );
};
