
import React, { useState } from 'react';
import { SmartAlert, FilterCriteria } from '../types';
import { Bell, BellOff, Plus, Trash2, Clock } from 'lucide-react';

interface SmartAlertsProps {
  alerts: SmartAlert[];
  onAddAlert: (name: string, criteria: FilterCriteria) => void;
  onRemoveAlert: (id: string) => void;
  currentCriteria: FilterCriteria;
}

export const SmartAlerts: React.FC<SmartAlertsProps> = ({ alerts, onAddAlert, onRemoveAlert, currentCriteria }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');

  const handleSave = () => {
    if (!newName.trim()) return;
    onAddAlert(newName, currentCriteria);
    setNewName('');
    setShowAdd(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-black text-slate-800 dark:text-white flex items-center uppercase tracking-widest text-xs">
          <Bell size={20} className="mr-3 text-amber-500" />
          Smart Alerts
        </h2>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl hover:bg-blue-100 transition-all active:scale-95"
        >
          {showAdd ? <BellOff size={20} /> : <Plus size={20} />}
        </button>
      </div>

      {showAdd && (
        <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-3xl animate-in slide-in-from-top-4 duration-300">
          <p className="text-[10px] text-blue-600 dark:text-blue-400 font-black mb-4 uppercase tracking-[0.2em]">Save Search Name</p>
          <input 
            type="text" 
            placeholder="e.g. Town Bedsitters"
            className="w-full bg-white dark:bg-slate-800 border-none px-5 py-4 rounded-2xl mb-4 focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold dark:text-white"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <div className="flex gap-3">
            <button 
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              Enable Alert
            </button>
            <button 
              onClick={() => setShowAdd(false)}
              className="px-4 py-3.5 text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-10 px-4">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-600">
               <BellOff size={24} />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No active alerts.</p>
            <p className="text-slate-400 dark:text-slate-600 text-[10px] mt-2 leading-relaxed">We'll notify you the instant new houses matching your filters are listed.</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div key={alert.id} className="p-5 border border-slate-100 dark:border-slate-800 rounded-3xl group hover:border-blue-200 dark:hover:border-blue-900 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-slate-800 dark:text-white text-sm">{alert.name}</span>
                <button 
                  onClick={() => onRemoveAlert(alert.id)}
                  className="text-slate-300 dark:text-slate-600 hover:text-red-500 transition-colors p-1.5"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {alert.criteria.campus && <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest rounded-lg text-slate-500 dark:text-slate-400">{alert.criteria.campus}</span>}
                {alert.criteria.type && <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest rounded-lg text-slate-500 dark:text-slate-400">{alert.criteria.type}</span>}
                {alert.criteria.maxPrice && <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-[9px] font-black uppercase tracking-widest rounded-lg text-slate-500 dark:text-slate-400">Under {alert.criteria.maxPrice.toLocaleString()}</span>}
              </div>
              <div className="flex items-center text-[10px] font-bold text-slate-400 dark:text-slate-500">
                <Clock size={12} className="mr-1.5" />
                Updated {new Date(alert.lastChecked).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
