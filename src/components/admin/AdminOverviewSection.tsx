"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Activity,
  Github,
  CloudUpload,
  Briefcase,
  FolderKanban,
  Cpu,
  User,
  Clock,
  Info,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  XCircle
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  AreaChart,
  Area
} from "recharts";

// --- Types ---
interface SystemHealth {
  api: { successRate: string; latency: string; status: string; sparkline: number[] };
  cdn: { status: string; uploadSuccess: string; lastUpload: string };
  github: { status: string; lastSync: string };
}

interface Stats {
  projects: { total: number; live: number; draft: number; trend: string; lastUpdated: string };
  experience: { total: number; activeRole: string; continuity: string };
  skills: { total: number; categories: number; growth: string };
  skillEvolution: { month: string; count: number }[];
  projectComplexity: { type: string; count: number; proportion: number }[];
}

interface ActivityItem {
  id: string;
  type: "UPDATE" | "SYSTEM" | "ERROR" | "commit" | string;
  message: string;
  timestamp: string;
  author: string;
}

import { useSession } from "@/context/SessionContext";

export default function AdminOverviewSection() {
  const { systemStatus, remainingTime, extendSession, logout } = useSession();

  const [stats, setStats] = useState<Stats | null>(null);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [lastSync, setLastSync] = useState<string>("Initializing...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          fetch("/api/admin/system/stats"),
          fetch("/api/admin/system/activity")
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (activityRes.ok) {
          const data = await activityRes.json();
          const normalized = data.activity.map((item: any) => ({
            ...item,
            type: item.type === "commit" ? "UPDATE" : item.type
          }));
          setActivity(prev => {
            const newItems = normalized.filter((item: ActivityItem) => !prev.find(p => p.id === item.id));
            return [...newItems, ...prev].slice(0, 10);
          });
        }
        setLastSync(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);


  if (!stats || !systemStatus) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="w-8 h-8 border-2 border-light-textAccent border-t-transparent rounded-full animate-spin" />
        <p className="text-light-textMuted dark:text-dark-textMuted font-mono text-xs uppercase tracking-widest">Booting Control Panel...</p>
      </div>
    );
  }


  return (
    <div className="space-y-10 pb-20 max-w-[1400px] mx-auto">
      {/* 1. HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold tracking-tight">Overview</h1>
          <p className="text-sm text-light-textMuted dark:text-dark-textMuted">System overview and live operational state</p>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono text-light-textMuted uppercase tracking-wider">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Last Sync: {lastSync}
        </div>
      </header>

      <div className="bg-light-bgSecondary/40 dark:bg-dark-bgSecondary/40 backdrop-blur-sm border border-light-border dark:border-dark-border px-6 py-3 rounded-xl flex items-center gap-8 overflow-x-auto no-scrollbar">
        <StatusChip label="AUTH" value="ACTIVE" icon={ShieldCheck} status="healthy" />
        <div className="h-4 w-px bg-light-border dark:border-dark-border" />
        <StatusChip label="API" value={`${systemStatus.api.successRate}%`} icon={Activity} status={systemStatus.api.status} />
        <div className="h-4 w-px bg-light-border dark:border-dark-border" />
        <StatusChip label="GITHUB" value="SYNCED" icon={Github} status={systemStatus.github.status} />
        <div className="h-4 w-px bg-light-border dark:border-dark-border" />
        <StatusChip label="CDN" value="OK" icon={CloudUpload} status={systemStatus.cdn.status} />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Main Operational Area */}
        <div className="lg:col-span-3 space-y-10">

          {/* 3. CORE KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KPICard
              title="Projects"
              value={stats.projects.total}
              insight={`${stats.projects.live} Live / ${stats.projects.draft} Draft`}
            />
            <KPICard
              title="Experience"
              value={stats.experience.total}
              insight={stats.experience.activeRole}
            />
            <KPICard
              title="Skills"
              value={stats.skills.total}
              insight={`${stats.skills.categories} Categories`}
            />
          </div>

          {/* 4. ACTIVITY FEED */}
          <section className="bg-light-bgSurface dark:bg-dark-bgSurface border border-light-border dark:border-dark-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-light-border dark:border-dark-border flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-light-textMuted flex items-center gap-2">
                <RefreshCw size={12} className="animate-spin-slow" />
                Operational Feed
              </h3>
            </div>
            <div className="min-h-[150px] max-h-[300px] overflow-y-auto no-scrollbar">
              <AnimatePresence initial={false}>
                {activity.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-6 py-4 flex items-center justify-between border-b border-light-border/30 dark:border-dark-border/30 last:border-0 group hover:bg-light-bgSecondary/20"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <TypeBadge type={item.type} />
                      <p className="text-sm font-medium truncate">{item.message}</p>
                    </div>
                    <span className="text-[10px] font-mono text-light-textMuted whitespace-nowrap ml-4">
                      {formatRelativeTime(item.timestamp)}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {activity.length === 0 && (
                <div className="flex items-center justify-center h-32 text-light-textMuted text-xs italic">
                  No recent operational events detected.
                </div>
              )}
            </div>
          </section>

          {/* 5. CHARTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-light-bgSurface dark:bg-dark-bgSurface border border-light-border dark:border-dark-border rounded-xl p-6">
              <h4 className="text-[10px] font-bold text-light-textMuted uppercase mb-6 tracking-widest">Skill Evolution</h4>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.skillEvolution}>
                    <defs>
                      <linearGradient id="colorSkills" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E85D45" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#E85D45" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" hide />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '10px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="count" stroke="#E85D45" strokeWidth={1.5} fillOpacity={1} fill="url(#colorSkills)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-light-bgSurface dark:bg-dark-bgSurface border border-light-border dark:border-dark-border rounded-xl p-6">
              <h4 className="text-[10px] font-bold text-light-textMuted uppercase mb-6 tracking-widest">Architecture Proportions</h4>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.projectComplexity} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="type" type="category" axisLine={false} tickLine={false} width={70} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#8A6E64' }} />
                    <Tooltip
                      cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '10px' }}
                    />
                    <Bar dataKey="proportion" radius={[0, 4, 4, 0]} barSize={12}>
                      {stats.projectComplexity.map((entry, index) => (
                        <Cell key={index} fill={index === 0 ? '#E85D45' : index === 1 ? '#D7745B' : '#A48C82'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Operational Area */}
        <aside className="space-y-10">
          <div className="bg-light-bgSurface dark:bg-dark-bgSurface border border-light-border dark:border-dark-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-light-bgSecondary dark:bg-dark-bgSecondary flex items-center justify-center border border-light-border">
                <User size={18} className="text-light-textMuted" />
              </div>
              <div>
                <p className="text-xs font-bold">Admin User</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-green-500 uppercase">Authenticated</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-light-border/50">
              <div className="w-full flex justify-between items-center text-[10px] mb-2">
                <span className="text-light-textMuted">Session Expiry</span>
                <span className={`font-mono font-bold ${remainingTime < 120 ? 'text-red-500' : 'text-light-textAccent'}`}>
                  {formatTime(remainingTime)}
                </span>
              </div>
              <button 
                onClick={extendSession}
                className="px-3 py-2 bg-light-bgSecondary hover:bg-light-bgSurface text-light-textPrimary border border-light-border/50 rounded-lg text-[10px] font-bold transition-all active:scale-95"
              >
                Extend Session
              </button>
              <button 
                onClick={() => logout(true)}
                className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-[10px] font-bold transition-all active:scale-95"
              >
                Logout
              </button>
            </div>
          </div>


          <div className="bg-light-bgSecondary/20 dark:bg-dark-bgSecondary/10 rounded-xl p-6 border border-light-border/30">
            <h4 className="text-[10px] font-bold text-light-textMuted uppercase mb-3">Operational Notes</h4>
            <p className="text-[10px] leading-relaxed text-light-textMuted">
              System state is normalized. No critical alerts detected in last 24h cycle. GitHub sync is healthy.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

// --- Sub-components ---

function StatusChip({ label, value, icon: Icon, status }: any) {
  const colorClass = status === 'healthy' ? 'text-green-500' : status === 'warning' ? 'text-amber-500' : 'text-red-500';
  const dotColor = status === 'healthy' ? 'bg-green-500' : status === 'warning' ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <span className="text-[10px] font-bold text-light-textMuted tracking-tight">{label}</span>
      <div className={`flex items-center gap-1 text-[10px] font-bold ${colorClass}`}>
        <div className={`w-1 h-1 rounded-full ${dotColor} animate-pulse`} />
        {value}
      </div>
    </div>
  );
}

function KPICard({ title, value, insight }: any) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let totalMiliseconds = 500;
    let incrementTime = totalMiliseconds / end;

    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="bg-light-bgSurface/50 dark:bg-dark-bgSurface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 shadow-sm">
      <h4 className="text-[10px] font-bold text-light-textMuted uppercase mb-2 tracking-widest">{title}</h4>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-heading font-bold mb-3 text-light-textPrimary dark:text-dark-textPrimary"
      >
        {count}
      </motion.div>
      <p className="text-[10px] text-light-textMuted font-medium truncate">{insight}</p>
    </div>
  );
}


function TypeBadge({ type }: { type: string }) {
  let colors = "bg-light-bgSecondary text-light-textMuted";
  if (type === "UPDATE") colors = "bg-blue-500/10 text-blue-500";
  if (type === "SYSTEM") colors = "bg-green-500/10 text-green-500";
  if (type === "ERROR") colors = "bg-red-500/10 text-red-500";

  return (
    <span className={`px-2 py-0.5 rounded text-[8px] font-bold tracking-tighter ${colors}`}>
      {type}
    </span>
  );
}

function formatRelativeTime(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
