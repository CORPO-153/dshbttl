import React from 'react';
import { Search, Bell, Radio, Clock } from 'lucide-react';

export const TopBar = () => {
  return (
    <header className="flex items-center justify-between px-8 ml-64 w-[calc(100%-16rem)] h-16 border-b border-outline-variant/15 bg-surface/60 backdrop-blur-xl fixed top-0 right-0 z-40">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input
            type="text"
            placeholder="Search system logs..."
            className="w-full bg-surface-container-lowest border border-outline-variant/20 outline-none focus:ring-1 focus:ring-primary rounded-md py-2 pl-10 pr-4 text-xs font-sans placeholder:text-outline/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="font-headline font-bold text-lg text-primary">Command & Control</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button className="relative hover:text-white transition-all cursor-pointer opacity-90 hover:opacity-100">
            <Bell className="text-on-surface-variant w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full" />
          </button>
          <button className="hover:text-white transition-all cursor-pointer opacity-90 hover:opacity-100">
            <Radio className="text-on-surface-variant w-5 h-5" />
          </button>
        </div>
        <div className="h-8 w-[1px] bg-outline-variant/20" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold uppercase tracking-tighter text-on-surface">Uptime</p>
            <p className="text-xs font-mono text-secondary">42:12:04:11</p>
          </div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFflTotysxZAEaiG7fwKLd0pyeAnldKBQ8PdEucnzOFV3Vu2IriQnaHjNyxprEcrwG6ZMJwMhjZddIKlTJhJEWYqtIGRt8LGG7pfhSYcrUAhLiwU9msaiAbtgv-ElPV50f2XjE5Rd6HZSQcgnxZ_i-l70VdxzqMjb6aKM1tDpaw3q9C3uabVzA32TCIf4fluouURGfzXR9FRD05puAsSQtTX9VJgz5p9E5xTEO3qMjm5kD8Z9EAZZXthPnDDNVPw7flWZYYQqlVYxL"
            alt="Admin Profile"
            className="w-8 h-8 rounded-md bg-surface-container-high border border-outline-variant/30"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
};
