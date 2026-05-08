"use client";
import React from 'react';
import { Home, BookOpen, Heart, Activity, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: BookOpen, label: 'Al-Qur\'an', href: '/quran' },
  { icon: Heart, label: 'Donasi ZIS', href: '/donations' },
  { icon: Activity, label: 'Jadwal Sholat', href: '/prayer' },
  { icon: User, label: 'Profil User', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-slate-900 border-r border-emerald-900/50 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          SuperApp
        </h1>
        <p className="text-xs text-emerald-500/60 uppercase tracking-widest mt-1">Keislaman</p>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              pathname === item.href 
                ? "bg-emerald-600/10 text-emerald-400 border border-emerald-500/20" 
                : "text-slate-400 hover:bg-slate-800 hover:text-emerald-300"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              pathname === item.href ? "text-emerald-400" : "group-hover:text-emerald-400"
            )} />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="bg-emerald-600/10 rounded-2xl p-4 border border-emerald-500/20">
          <p className="text-xs text-emerald-400 font-semibold mb-1">PRO ACCOUNT</p>
          <p className="text-xs text-slate-400 leading-tight">Mendukung Fitur Audio High-Res & Tanpa Iklan.</p>
        </div>
      </div>
    </div>
  );
}
