import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, Users, Banknote, Settings, Bolt } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: ListOrdered, label: 'Queue', to: '/queue' },
    { icon: Users, label: 'Users', to: '/users' },
    { icon: Banknote, label: 'Monetization', to: '/monetization' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ];

  return (
    <aside className="flex flex-col fixed left-0 top-0 h-screen w-64 border-r border-outline-variant/15 bg-surface shadow-[0_0_32px_rgba(255,255,255,0.06)] z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
            <Bolt className="text-on-primary w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-primary font-headline">UpscaleBot HQ</h1>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(131,252,142,0.4)]" />
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-medium">Service: Active</span>
            </div>
          </div>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md font-headline text-sm tracking-wide transition-colors duration-200",
                  isActive
                    ? "text-primary border-r-2 border-primary bg-surface-container"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-6 border-t border-outline-variant/10">
        <div className="flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0awfQPKvDcgvCnlqOPan6WzH1DZ3uJ5vqNuvEfxDSHGNMeIvR3aJoAR1PwcBuCgMP3HdBhaLdgs1iKQAwae58zNsj5om5Qhe8AjVfDldVdjvZD7s0s1YLiivsvQ2gq53w2Ev-hivXbZC0AwOTXGBuwMxQRzn8D68WD7D8vC9eoy0fTHC4eA_fW6XlozPE1s34bQZxuLSNWIxIVjRxQ7_IdI3avFNCrAcmA_YX5WE2xYpUiGsvdVELiayFyuD4NhGE6uB9-rSJgtx0"
            alt="Admin Avatar"
            className="w-10 h-10 rounded-lg bg-surface-container-high object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-on-surface truncate">Root_Admin</p>
            <p className="text-[10px] text-on-surface-variant truncate uppercase tracking-tighter">Level 5 Clearance</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
