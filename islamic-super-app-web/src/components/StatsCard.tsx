import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  subLabel?: string;
  color?: string;
}

export function StatsCard({ label, value, icon: Icon, subLabel, color = "emerald" }: StatsCardProps) {
  const colorClasses: Record<string, string> = {
    emerald: "from-emerald-600/20 to-emerald-900/10 text-emerald-400 border-emerald-500/20",
    gold: "from-amber-600/20 to-amber-900/10 text-amber-400 border-amber-500/20",
    teal: "from-teal-600/20 to-teal-900/10 text-teal-400 border-teal-500/20",
  };

  return (
    <div className={`bg-slate-900/50 backdrop-blur-sm p-6 rounded-3xl border ${colorClasses[color]} flex items-start justify-between`}>
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
        <h3 className="text-3xl font-bold mb-1 tracking-tight">{value}</h3>
        {subLabel && <p className="text-xs text-slate-500">{subLabel}</p>}
      </div>
      <div className={`p-3 rounded-2xl bg-gradient-to-br ${colorClasses[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );
}
