
import React from 'react';
import { HostRequest, ContactLead } from '../types';
import { ShieldCheck, Check, X, Building, Clock, User, ArrowUpRight } from 'lucide-react';
import Swal from 'sweetalert2';

interface AdminDashboardProps {
  requests: HostRequest[];
  leads: ContactLead[];
  onAction: (requestId: string, action: 'approved' | 'declined') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ requests, leads, onAction }) => {
  const pending = requests.filter(r => r.status === 'pending');

  const handleAction = (id: string, action: 'approved' | 'declined') => {
    Swal.fire({
      title: `Confirm ${action}?`,
      text: `Are you sure you want to ${action} this host application?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: action === 'approved' ? '#10b981' : '#ef4444'
    }).then((result) => {
      if (result.isConfirmed) {
        onAction(id, action);
      }
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-amber-500 rounded-2xl text-white">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">Lead Notification Center</h2>
          <p className="text-slate-500 text-sm">Monitoring marketplace activity and host requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Real-time Lead Tracker */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
              <ArrowUpRight size={16} className="mr-2 text-emerald-500" />
              Recent Contact Leads
            </h3>
            <span className="bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-black">{leads.length} NEW</span>
          </div>
          
          <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {leads.length === 0 ? (
              <div className="text-center py-12">
                 <p className="text-slate-400 text-sm font-bold">Waiting for students to contact landlords...</p>
              </div>
            ) : (
              leads.map(lead => (
                <div key={lead.id} className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800/50">
                   <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-black text-slate-800 dark:text-white">{lead.studentName}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{new Date(lead.timestamp).toLocaleTimeString()}</p>
                   </div>
                   <p className="text-xs text-slate-500 dark:text-slate-400">
                     Contacted <span className="text-blue-600 font-bold">{lead.landlordName}</span> regarding <span className="font-bold">"{lead.propertyName}"</span>
                   </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Host Applications */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex justify-between items-center">
            Host Applications
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px]">{pending.length}</span>
          </h3>
          
          <div className="space-y-4">
            {pending.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-bold text-sm">No new applications.</div>
            ) : (
              pending.map(req => (
                <div key={req.id} className="p-5 border border-slate-100 dark:border-slate-800 rounded-3xl group">
                   <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400"><User size={20} /></div>
                         <div>
                            <p className="text-sm font-black text-slate-800 dark:text-white">{req.userName}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{req.propertyName}</p>
                         </div>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleAction(req.id, 'approved')} className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"><Check size={18} /></button>
                        <button onClick={() => handleAction(req.id, 'declined')} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><X size={18} /></button>
                      </div>
                   </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
