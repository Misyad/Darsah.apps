import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  lastReadSurah: { number: number; name: string; ayah: number } | null;
  setLastReadSurah: (s: { number: number; name: string; ayah: number }) => void;
  tasbihCount: number;
  incrementTasbih: () => void;
  resetTasbih: () => void;
  tasbihTarget: number;
  setTasbihTarget: (n: number) => void;
  location: { city: string; lat: number; lng: number } | null;
  setLocation: (l: { city: string; lat: number; lng: number }) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('darsah-theme') as 'light' | 'dark') || 'light';
  });

  const [lastReadSurah, setLastReadSurahState] = useState<{ number: number; name: string; ayah: number } | null>(() => {
    const saved = localStorage.getItem('darsah-last-surah');
    return saved ? JSON.parse(saved) : { number: 1, name: 'Al-Fatihah', ayah: 1 };
  });

  const [tasbihCount, setTasbihCount] = useState(0);
  const [tasbihTarget, setTasbihTargetState] = useState(33);
  const [location, setLocationState] = useState<{ city: string; lat: number; lng: number } | null>(() => {
    const saved = localStorage.getItem('darsah-location');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('darsah-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const setLastReadSurah = (s: { number: number; name: string; ayah: number }) => {
    setLastReadSurahState(s);
    localStorage.setItem('darsah-last-surah', JSON.stringify(s));
  };

  const incrementTasbih = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    setTasbihCount(c => c + 1);
  };

  const resetTasbih = () => setTasbihCount(0);

  const setTasbihTarget = (n: number) => setTasbihTargetState(n);

  const setLocation = (l: { city: string; lat: number; lng: number }) => {
    setLocationState(l);
    localStorage.setItem('darsah-location', JSON.stringify(l));
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      lastReadSurah, setLastReadSurah,
      tasbihCount, incrementTasbih, resetTasbih,
      tasbihTarget, setTasbihTarget,
      location, setLocation,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
