import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Terminal, Clock, CheckCircle2, AlertTriangle, Filter, Plus, RefreshCw, X, Zap, Layers, Cpu, Activity, Thermometer, Database } from 'lucide-react';

const velocityData = [
  { time: '12:00', value: 40 },
  { time: '', value: 55 },
  { time: '', value: 45 },
  { time: '15:00', value: 70 },
  { time: '', value: 85 },
  { time: '', value: 95 },
  { time: '18:00', value: 60 },
  { time: '', value: 45 },
  { time: '', value: 30 },
  { time: '21:00', value: 50 },
  { time: '', value: 65 },
  { time: '', value: 40 },
  { time: '', value: 75 },
  { time: 'NOW', value: 90 },
];

type TaskStatus = 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

interface Task {
  id: string;
  user: string;
  userInitials: string;
  userColor: string;
  size: string;
  progress: number;
  status: TaskStatus;
  telemetry: string;
  timeAgo?: string;
}

const MOCK_TASKS: Task[] = [
  {
    id: '#TX-8829-X',
    user: 'Elias.Loomis',
    userInitials: 'EL',
    userColor: 'text-primary',
    size: '14.2 MB',
    progress: 76,
    status: 'PROCESSING',
    telemetry: 'SCALING_X4'
  },
  {
    id: '#TX-8830-Y',
    user: 'Sarah.Rift',
    userInitials: 'SR',
    userColor: 'text-tertiary',
    size: '2.8 MB',
    progress: 0,
    status: 'QUEUED',
    telemetry: 'WAITING...'
  },
  {
    id: '#TX-8825-Z',
    user: 'K.Voss',
    userInitials: 'KV',
    userColor: 'text-secondary',
    size: '128.4 MB',
    progress: 100,
    status: 'COMPLETED',
    telemetry: 'FINALISED',
    timeAgo: '2M AGO'
  },
  {
    id: '#TX-8824-A',
    user: 'Unknown.User',
    userInitials: 'UA',
    userColor: 'text-error',
    size: '0.5 MB',
    progress: 15,
    status: 'FAILED',
    telemetry: 'IO_TIMEOUT'
  },
  {
    id: '#TX-8831-B',
    user: 'Marcus.Vane',
    userInitials: 'MV',
    userColor: 'text-primary',
    size: '45.1 MB',
    progress: 42,
    status: 'PROCESSING',
    telemetry: 'ENCODING_H265'
  },
  {
    id: '#TX-8832-C',
    user: 'Luna.Star',
    userInitials: 'LS',
    userColor: 'text-secondary',
    size: '12.4 MB',
    progress: 0,
    status: 'QUEUED',
    telemetry: 'WAITING...'
  },
  {
    id: '#TX-8820-D',
    user: 'Alex.Chen',
    userInitials: 'AC',
    userColor: 'text-tertiary',
    size: '89.2 MB',
    progress: 100,
    status: 'COMPLETED',
    telemetry: 'FINALISED',
    timeAgo: '15M AGO'
  }
];

export const Queue = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | TaskStatus>('ALL');

  const filteredTasks = useMemo(() => {
    if (activeTab === 'ALL') return MOCK_TASKS;
    return MOCK_TASKS.filter(task => task.status === activeTab);
  }, [activeTab]);

  const stats = useMemo(() => {
    return {
      active: MOCK_TASKS.filter(t => t.status === 'PROCESSING').length,
      queued: MOCK_TASKS.filter(t => t.status === 'QUEUED').length,
      completed: MOCK_TASKS.filter(t => t.status === 'COMPLETED').length,
      failed: MOCK_TASKS.filter(t => t.status === 'FAILED').length
    };
  }, []);

  return (
    <div className="space-y-10">
      {/* Header & Pulse Indicator */}
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            <span className="text-xs font-medium tracking-[0.1em] text-secondary-dim uppercase font-headline">Real-time Telemetry Active</span>
          </div>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white">Queue Manager</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-bright border border-outline-variant/20 text-on-surface-variant hover:text-white rounded-md transition-all text-sm font-medium">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-md hover:opacity-90 transition-all text-sm font-bold">
            <Plus className="w-4 h-4" />
            New Batch
          </button>
        </div>
      </div>

      {/* Metric Overview Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-low p-6 rounded-xl border-l-2 border-primary-dim shadow-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Active Jobs</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-headline">{stats.active}</span>
            <span className="text-[10px] text-secondary">+2.4%</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border-l-2 border-secondary shadow-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">In Queue</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-headline">{stats.queued}</span>
            <span className="text-[10px] text-secondary">Optimal</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border-l-2 border-tertiary-dim shadow-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Queue Latency</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-headline">120ms</span>
            <span className="text-[10px] text-primary-dim">Stable</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border-l-2 border-error-dim shadow-sm">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Failed Tasks</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-headline">{stats.failed}</span>
            <span className="text-[10px] text-error-dim">Alert</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-surface-container-low rounded-lg w-fit border border-outline-variant/10">
        {[
          { id: 'ALL', label: 'All Tasks', icon: Layers },
          { id: 'QUEUED', label: 'In Queue', icon: Clock },
          { id: 'PROCESSING', label: 'Processing', icon: Terminal },
          { id: 'COMPLETED', label: 'Completed', icon: CheckCircle2 },
          { id: 'FAILED', label: 'Failed', icon: AlertTriangle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeTab === tab.id
                ? 'bg-surface-bright text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <tab.icon className={`w-3 h-3 ${activeTab === tab.id ? 'text-primary' : ''}`} />
            {tab.label}
            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[8px] ${
              activeTab === tab.id ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface-variant'
            }`}>
              {tab.id === 'ALL' ? MOCK_TASKS.length : MOCK_TASKS.filter(t => t.status === tab.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Tactical Data Table */}
      <div className="bg-surface-container-low rounded-xl overflow-hidden shadow-[0_0_32px_rgba(255,255,255,0.02)]">
        <table className="w-full text-left border-separate border-spacing-y-1 px-4 py-4">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.15em] text-on-surface-variant font-bold">
              <th className="px-6 py-4">Task ID</th>
              <th className="px-6 py-4">User Name</th>
              <th className="px-6 py-4 text-right">Size</th>
              <th className="px-6 py-4">Progress Telemetry</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Control</th>
            </tr>
          </thead>
          <tbody className="space-y-1">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <tr key={task.id} className="group hover:bg-surface-container-high transition-colors duration-200">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {task.status === 'PROCESSING' && <Terminal className="text-primary-dim w-4 h-4" />}
                      {task.status === 'QUEUED' && <Clock className="text-on-surface-variant w-4 h-4" />}
                      {task.status === 'COMPLETED' && <CheckCircle2 className="text-secondary w-4 h-4" />}
                      {task.status === 'FAILED' && <AlertTriangle className="text-error w-4 h-4" />}
                      <span className="font-mono text-xs text-white">{task.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded bg-surface-container flex items-center justify-center text-[10px] font-bold ${task.userColor}`}>{task.userInitials}</div>
                      <span className="text-sm font-medium">{task.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right font-mono text-xs text-on-surface-variant">{task.size}</td>
                  <td className="px-6 py-5">
                    <div className={`flex flex-col gap-2 w-48 ${task.status === 'QUEUED' ? 'opacity-40' : ''}`}>
                      <div className={`flex justify-between text-[10px] font-mono ${
                        task.status === 'COMPLETED' ? 'text-secondary' : 
                        task.status === 'FAILED' ? 'text-error' : 
                        task.status === 'PROCESSING' ? 'text-primary' : 'text-on-surface-variant'
                      }`}>
                        <span>{task.telemetry}</span>
                        <span>{task.status === 'FAILED' ? 'ERR' : `${task.progress}%`}</span>
                      </div>
                      <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            task.status === 'COMPLETED' ? 'bg-secondary' : 
                            task.status === 'FAILED' ? 'bg-error' : 
                            'bg-gradient-to-r from-primary to-primary-container'
                          }`} 
                          style={{ width: `${task.progress}%` }} 
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold border ${
                      task.status === 'PROCESSING' ? 'bg-primary/10 text-primary border-primary/20' :
                      task.status === 'QUEUED' ? 'bg-surface-container-highest text-on-surface-variant border-outline-variant/20' :
                      task.status === 'COMPLETED' ? 'bg-secondary-container/20 text-secondary border-secondary/20 status-glow-success' :
                      'bg-error-container/20 text-error border-error/20 status-glow-error'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    {task.status === 'FAILED' ? (
                      <button className="p-1.5 hover:bg-primary/10 hover:text-primary rounded transition-all text-[10px] font-bold flex items-center gap-1 ml-auto">
                        <RefreshCw className="w-3 h-3" />
                        RETRY
                      </button>
                    ) : task.status === 'COMPLETED' ? (
                      <span className="text-[10px] font-mono text-on-surface-variant uppercase">{task.timeAgo}</span>
                    ) : (
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-error/10 hover:text-error rounded transition-all">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-2 opacity-40">
                    <Layers className="w-8 h-8" />
                    <p className="text-sm font-medium">No tasks found in this category</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="p-6 border-t border-outline-variant/10 flex items-center justify-between">
          <div className="text-[10px] text-on-surface-variant font-mono uppercase tracking-widest">
            Showing {filteredTasks.length} of {MOCK_TASKS.length} records
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-surface-container text-xs border border-outline-variant/20 rounded hover:bg-surface-bright transition-all disabled:opacity-30" disabled>PREV</button>
            <button className="px-3 py-1 bg-surface-container text-xs border border-outline-variant/20 rounded hover:bg-surface-bright transition-all">NEXT</button>
          </div>
        </div>
      </div>

      {/* Sidebar Activity Feed / Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-8 border border-outline-variant/5">
          <h3 className="font-headline text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="text-primary w-5 h-5" />
            Processing Velocity
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData}>
                <Bar dataKey="value" fill="#84adff" radius={[2, 2, 0, 0]} opacity={0.6} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#adaaaa', fontSize: 10, fontFamily: 'monospace' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(132, 173, 255, 0.1)' }}
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #484847', borderRadius: '4px', fontSize: '10px' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-surface-container-high rounded-xl p-8 border border-primary/10 flex flex-col justify-between">
          <div>
            <h3 className="font-headline text-xl font-bold mb-2 flex items-center gap-2">
              <Cpu className="text-primary w-5 h-5" />
              System Telemetry
            </h3>
            <p className="text-xs text-on-surface-variant mb-6 uppercase tracking-[0.1em] font-bold">Node: GPU-CLUSTER-01 // ACTIVE</p>
            
            <div className="space-y-6">
              {/* CPU Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                  <span className="flex items-center gap-1.5"><Activity className="w-3 h-3" /> CPU Load</span>
                  <span className="text-white">42%</span>
                </div>
                <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[42%] transition-all duration-500" />
                </div>
                <div className="flex justify-between text-[9px] text-on-surface-variant/60 font-mono">
                  <span>AMD EPYC 7763 64-Core</span>
                  <span>1.4 GHz / 3.5 GHz</span>
                </div>
              </div>

              {/* RAM Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                  <span className="flex items-center gap-1.5"><Database className="w-3 h-3" /> System RAM</span>
                  <span className="text-white">64GB / 128GB</span>
                </div>
                <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[50%] transition-all duration-500" />
                </div>
                <div className="flex justify-between text-[9px] text-on-surface-variant/60 font-mono">
                  <span>DDR4-3200 ECC</span>
                  <span>50% Utilization</span>
                </div>
              </div>

              {/* VGA / VRAM Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                  <span className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> NVIDIA RTX 4090</span>
                  <span className="text-white">22GB / 24GB</span>
                </div>
                <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[92%] transition-all duration-500" />
                </div>
                <div className="flex justify-between text-[9px] text-on-surface-variant/60 font-mono">
                  <span>VRAM Usage</span>
                  <span>92% Allocation</span>
                </div>
              </div>

              {/* Temperature Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
                  <span className="flex items-center gap-1.5"><Thermometer className="w-3 h-3" /> Core Temperature</span>
                  <span className="text-error">72°C</span>
                </div>
                <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-error w-[72%] transition-all duration-500" />
                </div>
                <div className="flex justify-between text-[9px] text-on-surface-variant/60 font-mono">
                  <span>Fan Speed: 85%</span>
                  <span>Thermal Limit: 95°C</span>
                </div>
              </div>
            </div>
          </div>
          <button className="w-full mt-8 py-3 border border-outline-variant/20 rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-surface-bright transition-all flex items-center justify-center gap-2">
            <Terminal className="w-3 h-3" /> Full System Diagnostics
          </button>
        </div>
      </div>
    </div>
  );
};
