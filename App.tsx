
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { houses } from './houses';
import { House, FilterCriteria, SmartAlert, AppNotification, User, HostRequest, ContactLead } from './types';
import { HouseCard } from './components/HouseCard';
import { Filters } from './components/Filters';
import { PropertyModal } from './components/PropertyModal';
import { SmartAlerts } from './components/SmartAlerts';
import { NotificationToast } from './components/NotificationToast';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import { HostModal, ProfileModal, LogoutModal } from './components/ActionModals';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginPage } from './components/LoginPage';
import { Home, Heart, LogOut, User as UserIcon, Sun, Moon, Compass, Sparkles, Building, Shield, SlidersHorizontal, X, LogIn } from 'lucide-react';
import Swal from 'sweetalert2';

const AUTO_LOGOUT_TIMEOUT = 10 * 60 * 1000; 

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('cpn_user');
    const lastActive = localStorage.getItem('cpn_last_active');
    if (savedUser && lastActive) {
      const isExpired = Date.now() - parseInt(lastActive, 10) > AUTO_LOGOUT_TIMEOUT;
      if (isExpired) {
        localStorage.removeItem('cpn_user');
        localStorage.removeItem('cpn_last_active');
        return null;
      }
      return JSON.parse(savedUser);
    }
    return null;
  });

  const [activeTab, setActiveTab] = useState<'discover' | 'favorites' | 'admin'>('discover');
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({ campus: '', type: '', maxPrice: null });
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cpn_theme') === 'dark' || 
        (!localStorage.getItem('cpn_theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [activeModal, setActiveModal] = useState<'host' | 'profile' | 'logout' | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('cpn_favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [alerts, setAlerts] = useState<SmartAlert[]>(() => {
    const saved = localStorage.getItem('cpn_alerts');
    return saved ? JSON.parse(saved) : [];
  });
  const [hostRequests, setHostRequests] = useState<HostRequest[]>(() => {
    const saved = localStorage.getItem('cpn_host_requests');
    return saved ? JSON.parse(saved) : [];
  });
  const [leads, setLeads] = useState<ContactLead[]>(() => {
    const saved = localStorage.getItem('cpn_leads');
    return saved ? JSON.parse(saved) : [];
  });
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const handleLogout = useCallback((reason?: string) => {
    setCurrentUser(null);
    localStorage.removeItem('cpn_user');
    localStorage.removeItem('cpn_last_active');
    setActiveTab('discover');
    if (reason === 'inactivity') {
      Swal.fire({
        title: 'Session Expired',
        text: 'You have been logged out due to inactivity.',
        icon: 'info',
        confirmButtonColor: '#2563eb',
        background: isDarkMode ? '#0f172a' : '#fff',
        color: isDarkMode ? '#f8fafc' : '#0f172a',
      });
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('cpn_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('cpn_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => { localStorage.setItem('cpn_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('cpn_alerts', JSON.stringify(alerts)); }, [alerts]);
  useEffect(() => { localStorage.setItem('cpn_host_requests', JSON.stringify(hostRequests)); }, [hostRequests]);
  useEffect(() => { localStorage.setItem('cpn_leads', JSON.stringify(leads)); }, [leads]);

  const filteredHouses = useMemo(() => {
    return houses.filter(h => {
      const matchCampus = !filterCriteria.campus || h.campus === filterCriteria.campus;
      const matchType = !filterCriteria.type || h.type === filterCriteria.type;
      const matchPrice = !filterCriteria.maxPrice || h.price <= filterCriteria.maxPrice;
      const matchFavorites = activeTab !== 'favorites' || favorites.includes(h.id);
      return matchCampus && matchType && matchPrice && matchFavorites;
    });
  }, [filterCriteria, activeTab, favorites]);

  const recordContactLead = (house: House) => {
    const newLead: ContactLead = {
      id: Math.random().toString(36).substring(7),
      studentName: currentUser?.name || 'Guest Student',
      propertyName: house.title,
      landlordName: house.landlordName,
      timestamp: new Date().toISOString()
    };
    
    setLeads(prev => [newLead, ...prev]);

    // UI Feedback: Always show lead recorded success
    addNotification({
      title: 'Lead Recorded',
      message: `Request for ${house.title} logged in Admin Dashboard.`,
      type: 'success'
    });

    // Special Alert for the Admin user specifically
    if (currentUser?.role === 'admin') {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: 'New Lead Generated!',
        text: `${newLead.studentName} contacted ${house.landlordName}`,
        showConfirmButton: false,
        timer: 4000
      });
    }
  };

  const addNotification = (n: Omit<AppNotification, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { ...n, id }]);
  };

  const ensureLoggedIn = (action: () => void) => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return;
    }
    action();
  };

  const toggleFavorite = (id: number) => {
    ensureLoggedIn(() => {
      setFavorites(prev => {
        const isFav = prev.includes(id);
        if (isFav) {
           addNotification({ title: 'Removed', message: 'Home removed from favorites', type: 'info' });
           return prev.filter(fid => fid !== id);
        }
        addNotification({ title: 'Saved!', message: 'Home added to your favorites', type: 'success' });
        return [...prev, id];
      });
    });
  };

  const handleAdminAction = (id: string, action: 'approved' | 'declined') => {
    setHostRequests(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-8 sticky top-0 h-screen transition-colors z-30 overflow-y-auto custom-scrollbar">
        <div className="mb-10">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1">
          <NavItem icon={<Home size={20} />} label="Discover" active={activeTab === 'discover'} onClick={() => setActiveTab('discover')} />
          <NavItem icon={<Heart size={20} />} label="Favorites" count={favorites.length} active={activeTab === 'favorites'} onClick={() => setActiveTab('favorites')} />
          {currentUser?.role === 'admin' && (
            <div className="pt-6 animate-in slide-in-from-left-4">
              <p className="px-4 text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-3">Management</p>
              <NavItem icon={<Shield size={20} />} label="Admin Console" active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} />
            </div>
          )}
        </nav>
        
        <div className="mt-auto pt-8 border-t dark:border-slate-800">
           {currentUser ? (
             <div className="space-y-4">
               <button onClick={() => setActiveModal('profile')} className="w-full flex items-center space-x-3 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20">{currentUser.name.charAt(0)}</div>
                  <div className="text-left overflow-hidden">
                    <p className="text-xs font-black truncate dark:text-white">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{currentUser.role}</p>
                  </div>
               </button>
               <button onClick={() => setActiveModal('logout')} className="w-full flex items-center space-x-3 p-3 text-slate-400 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                  <span className="text-xs font-bold">Logout</span>
               </button>
             </div>
           ) : (
             <button onClick={() => setIsLoginModalOpen(true)} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all">Sign In / Join</button>
           )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen pb-24 md:pb-0 overflow-x-hidden">
        <main className="flex-1 p-4 md:p-10 lg:p-12 w-full max-w-[1600px] mx-auto">
          {activeTab === 'admin' && currentUser?.role === 'admin' ? (
            <AdminDashboard requests={hostRequests} leads={leads} onAction={handleAdminAction} />
          ) : (
            <div className="flex flex-col space-y-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="max-w-2xl">
                   <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6">
                    <Sparkles size={12} className="mr-2" /> 
                    Premium Student Housing Portal
                  </div>
                   <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mb-4 leading-tight">Find your <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Perfect</span> Home.</h1>
                   <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium">Verified rooms, bedsitters, and hostels across Nairobi's major campuses.</p>
                </div>
              </div>

              <div className="sticky top-0 z-20 md:relative">
                <Filters criteria={filterCriteria} onChange={setFilterCriteria} onClear={() => setFilterCriteria({ campus: '', type: '', maxPrice: null })} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                {filteredHouses.map(h => (
                  <HouseCard key={h.id} house={h} isFavorite={favorites.includes(h.id)} onToggleFavorite={toggleFavorite} onSelect={setSelectedHouse} />
                ))}
              </div>

              {filteredHouses.length === 0 && (
                <div className="py-32 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-8 text-slate-300 dark:text-slate-700">
                    <Compass size={48} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">No matching properties.</h3>
                  <p className="text-slate-500 mb-8">Try adjusting your filters to find more results.</p>
                  <button onClick={() => setFilterCriteria({ campus: '', type: '', maxPrice: null })} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest">Reset Filters</button>
                </div>
              )}
            </div>
          )}
        </main>
        <Footer />
      </div>

      {/* Property Modal */}
      {selectedHouse && (
        <PropertyModal 
          house={selectedHouse} 
          onClose={() => setSelectedHouse(null)} 
          onContact={() => recordContactLead(selectedHouse)}
        />
      )}

      {/* Auth Modals */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl h-[90vh] md:h-auto overflow-hidden rounded-[3rem] shadow-2xl bg-white dark:bg-slate-900">
            <button onClick={() => setIsLoginModalOpen(false)} className="absolute top-8 right-8 z-50 p-2 text-slate-400 hover:text-white transition-colors"><X size={28} /></button>
            <LoginPage onLogin={(user) => { setCurrentUser(user); setIsLoginModalOpen(false); }} />
          </div>
        </div>
      )}

      {activeModal === 'profile' && currentUser && <ProfileModal user={currentUser} onUpdate={setCurrentUser} onClose={() => setActiveModal(null)} />}
      {activeModal === 'logout' && <LogoutModal onClose={() => setActiveModal(null)} onSuccess={() => handleLogout()} />}
      
      <NotificationToast notifications={notifications} onDismiss={(id) => setNotifications(prev => prev.filter(n => n.id !== id))} />
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active: boolean, count?: number, onClick: () => void }> = ({ icon, label, active, count, onClick }) => (
  <button onClick={onClick} className={`flex items-center justify-between w-full px-6 py-4.5 rounded-2xl transition-all duration-300 group ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
    <div className="flex items-center space-x-4">
      <span className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-all`}>{icon}</span>
      <span className="font-bold text-sm tracking-wide">{label}</span>
    </div>
    {count !== undefined && count > 0 && <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${active ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>{count}</span>}
  </button>
);

export default App;
