
import React, { useState, useEffect } from 'react';
import { X, User, LogOut, Building, Mail, Lock, Camera, MapPin, ShieldCheck } from 'lucide-react';
import Swal from 'sweetalert2';
import { User as UserType } from '../types';

interface ModalProps {
  onClose: () => void;
  onSuccess?: (data?: any) => void;
}

export const HostModal: React.FC<ModalProps & { user: UserType }> = ({ onClose, user, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const target = e.target as any;
    const propertyData = {
      propertyName: target.propertyName.value,
      propertyAddress: target.propertyAddress.value
    };

    // Simulate network latency
    await new Promise(r => setTimeout(r, 1200));
    
    onSuccess?.(propertyData);

    Swal.fire({
      title: 'Request Submitted!',
      text: 'Your property has been sent to the Main Administrator for approval. You will be notified via email.',
      icon: 'success',
      confirmButtonColor: '#2563eb',
      background: document.documentElement.classList.contains('dark') ? '#1e293b' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
    });
    
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-lg shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
          <X size={24} />
        </button>
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-blue-600 mx-auto mb-4">
            <Building size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white">Join as Host</h2>
          <p className="text-slate-500 text-sm mt-1">Submit your property for admin approval.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Property Name</label>
            <input name="propertyName" type="text" required className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-bold" placeholder="e.g. Skyline Residency" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Location Details</label>
            <input name="propertyAddress" type="text" required className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-bold" placeholder="e.g. 5 mins walk from Gate A" />
          </div>
          <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 transition-all mt-4 flex items-center justify-center">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Sending Request...
              </>
            ) : 'Submit for Approval'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const ProfileModal: React.FC<ModalProps & { user: UserType, onUpdate: (user: UserType) => void }> = ({ onClose, user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserType>({ ...user });

  useEffect(() => {
    setFormData({ ...user });
  }, [user]);

  const handleSave = () => {
    onUpdate({ ...formData });
    setIsEditing(false);
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Changes saved successfully',
      showConfirmButton: false,
      timer: 2000,
      background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
          <button onClick={onClose} className="absolute top-6 right-6 text-white/80 hover:text-white p-2">
            <X size={24} />
          </button>
        </div>
        <div className="px-10 pb-10 -mt-12">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-[2.2rem] bg-white dark:bg-slate-800 p-1.5 shadow-xl">
               <div className="w-full h-full rounded-[1.8rem] bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 relative overflow-hidden group">
                  {formData.avatar ? (
                    <img src={formData.avatar} className="w-full h-full object-cover" />
                  ) : (
                    <div className="bg-blue-600 w-full h-full flex items-center justify-center text-white text-3xl font-black">
                        {formData.name.charAt(0)}
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={24} />
                    </div>
                  )}
               </div>
            </div>
            <div className={`absolute bottom-2 left-20 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 ${user.role === 'admin' ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-bold"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Campus / Location</label>
                <input 
                  type="text" 
                  value={formData.campus || ''}
                  onChange={(e) => setFormData({...formData, campus: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-bold"
                  placeholder="e.g. Main Campus"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-600/20 active:scale-95 transition-all">Apply Changes</button>
                <button onClick={() => setIsEditing(false)} className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{user.name}</h2>
                <div className="space-y-1.5">
                  <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center font-bold">
                    <Mail size={16} className="mr-3 text-blue-500" /> {user.email}
                  </p>
                  {user.campus && (
                    <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center font-bold">
                      <MapPin size={16} className="mr-3 text-blue-500" /> {user.campus}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                   <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</span>
                   <span className="text-blue-600 dark:text-blue-400 font-black text-sm capitalize flex items-center">
                      <ShieldCheck size={14} className="mr-1.5" /> {user.role}
                   </span>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                   <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Resident Since</span>
                   <span className="text-slate-800 dark:text-slate-200 font-black text-sm">
                    {new Date(user.joinedAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
                   </span>
                </div>
              </div>
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full py-5 border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                 Edit Profile Settings
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const LogoutModal: React.FC<ModalProps> = ({ onClose, onSuccess }) => {
  const handleLogout = () => {
    onSuccess?.();
    Swal.fire({
      icon: 'success',
      title: 'Signed Out!',
      text: 'Thank you for using Campus Pata Nyumba. Come back soon!',
      showConfirmButton: false,
      timer: 2000,
      background: document.documentElement.classList.contains('dark') ? '#0f172a' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#f8fafc' : '#0f172a',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-sm shadow-2xl p-10 text-center relative overflow-hidden">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <LogOut size={32} />
        </div>
        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Ready to Leave?</h3>
        <p className="text-slate-500 text-sm mb-10 font-medium leading-relaxed">Ensure you've saved all your favorite homes before signing out.</p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-red-500/20 active:scale-95"
          >
            Yes, Log Me Out
          </button>
          <button 
            onClick={onClose}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95"
          >
            Stay Signed In
          </button>
        </div>
      </div>
    </div>
  );
};
