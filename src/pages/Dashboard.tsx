import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Wallet, Bolt, Cpu, BarChart3, TrendingUp, Table as TableIcon, Check, RefreshCcw, XCircle, AlertCircle } from 'lucide-react';

const weeklyData = [
  { name: 'Mon', revenue: 30 },
  { name: 'Tue', revenue: 50 },
  { name: 'Wed', revenue: 45 },
  { name: 'Thu', revenue: 85 },
  { name: 'Fri', revenue: 60 },
  { name: 'Sat', revenue: 40 },
  { name: 'Sun', revenue: 55 },
];

const volumeData = [
  { time: '00:00', value: 80 },
  { time: '06:00', value: 60 },
  { time: '12:00', value: 70 },
  { time: '18:00', value: 30 },
  { time: '23:59', value: 50 },
];

export const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Telemetry Overview</p>
          <h2 className="text-4xl font-bold font-headline tracking-tighter text-on-surface">System Performance</h2>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface-container hover:bg-surface-container-high text-xs font-bold rounded-md transition-all">
            Generate Report
          </button>
          <button className="px-4 py-2 bg-gradient-to-br from-primary to-primary-container text-on-primary text-xs font-bold rounded-md transition-all shadow-[0_0_12px_rgba(132,173,255,0.2)]">
            Refresh Node
          </button>
        </div>
      </div>

      {/* Bento Grid: Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Revenue Card */}
        <div className="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Wallet className="w-12 h-12" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Total Revenue (Trakteer)</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-headline font-bold text-on-surface">Rp 12.4M</h3>
            <span className="text-secondary text-xs font-bold font-mono">+12.4%</span>
          </div>
          <div className="mt-4 h-1 w-full bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-secondary w-3/4 shadow-[0_0_8px_rgba(131,252,142,0.3)]" />
          </div>
        </div>

        {/* Active Users Card */}
        <div className="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Bolt className="w-12 h-12" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Active Users (24h)</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-headline font-bold text-on-surface">4,281</h3>
            <span className="text-primary text-xs font-bold font-mono">Live</span>
          </div>
          <div className="mt-4 flex gap-1">
            <div className="h-4 flex-1 bg-primary/20 rounded-sm" />
            <div className="h-4 flex-1 bg-primary/40 rounded-sm" />
            <div className="h-4 flex-1 bg-primary/60 rounded-sm" />
            <div className="h-4 flex-1 bg-primary/80 rounded-sm" />
            <div className="h-4 flex-1 bg-primary rounded-sm shadow-[0_0_8px_rgba(132,173,255,0.3)]" />
          </div>
        </div>

        {/* Processing Queue Card */}
        <div className="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group border border-outline-variant/10">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Cpu className="w-12 h-12" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">Current Processing Queue</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-headline font-bold text-on-surface">14</h3>
            <span className="text-on-surface-variant text-xs font-mono">Tasks</span>
          </div>
          <div className="mt-4 flex items-center justify-between text-[10px] text-on-surface-variant">
            <span>Server Load: 64%</span>
            <span className="text-secondary">Optimal</span>
          </div>
        </div>
      </div>

      {/* Analytical Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Revenue Bar Chart */}
        <div className="bg-surface-container p-8 rounded-xl border border-outline-variant/5 shadow-2xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-lg font-headline font-bold">Weekly Revenue</h4>
              <p className="text-xs text-on-surface-variant">Trakteer donations trend</p>
            </div>
            <BarChart3 className="text-on-surface-variant w-5 h-5" />
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <Bar 
                  dataKey="revenue" 
                  fill="#84adff" 
                  radius={[2, 2, 0, 0]}
                  onMouseEnter={(data, index) => {}}
                />
                <XAxis 
                  dataKey="name" 
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

        {/* Upscaling Volume Line Chart */}
        <div className="bg-surface-container p-8 rounded-xl border border-outline-variant/5 shadow-2xl overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h4 className="text-lg font-headline font-bold">Upscaling Volume</h4>
              <p className="text-xs text-on-surface-variant">Image processing throughput</p>
            </div>
            <TrendingUp className="text-secondary w-5 h-5" />
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#83fc8e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#83fc8e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#83fc8e" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#adaaaa', fontSize: 10, fontFamily: 'monospace' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #484847', borderRadius: '4px', fontSize: '10px' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Queue Table Section */}
      <div className="bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden">
        <div className="p-6 flex justify-between items-center bg-surface-container-high/30">
          <div className="flex items-center gap-3">
            <TableIcon className="text-primary w-5 h-5" />
            <h4 className="text-sm font-bold tracking-tight uppercase">Recent Queue Logs</h4>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center border-2 border-surface">
                <Check className="text-[10px] text-on-secondary w-3 h-3" />
              </div>
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-surface">
                <RefreshCcw className="text-[10px] text-on-primary w-3 h-3" />
              </div>
            </div>
            <span className="text-[10px] text-on-surface-variant font-mono">Live Sync</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] text-on-surface-variant uppercase tracking-[0.1em] border-b border-outline-variant/5">
                <th className="px-6 py-4 font-bold">Task ID</th>
                <th className="px-6 py-4 font-bold">User</th>
                <th className="px-6 py-4 font-bold">Model</th>
                <th className="px-6 py-4 font-bold">Progress</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="px-6 py-5 font-mono text-xs text-primary">#US-9921</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-surface-variant flex items-center justify-center text-[10px]">DA</div>
                    <span className="text-on-surface font-medium">@dimas_arya</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-on-surface-variant">RealESRGAN_x4</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-2/3" />
                    </div>
                    <span className="text-[10px] font-mono">67%</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase">Processing</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-on-surface-variant hover:text-error transition-colors">
                    <XCircle className="w-5 h-5" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="px-6 py-5 font-mono text-xs text-primary">#US-9922</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-surface-variant flex items-center justify-center text-[10px]">SC</div>
                    <span className="text-on-surface font-medium">@sarah_c</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-on-surface-variant">SwinIR_L</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-outline-variant w-0" />
                    </div>
                    <span className="text-[10px] font-mono">0%</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-highest text-on-surface-variant uppercase">Waiting</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <AlertCircle className="w-5 h-5" />
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-high transition-colors group">
                <td className="px-6 py-5 font-mono text-xs text-primary">#US-9923</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-surface-variant flex items-center justify-center text-[10px]">JD</div>
                    <span className="text-on-surface font-medium">@john_doe</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-on-surface-variant">GFPGAN_v1.4</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[92%] shadow-[0_0_8px_rgba(132,173,255,0.4)]" />
                    </div>
                    <span className="text-[10px] font-mono">92%</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 uppercase">Finishing</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="text-on-surface-variant hover:text-error transition-colors">
                    <XCircle className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant/5 bg-surface-container-lowest/50 text-center">
          <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">View All Active Processes</button>
        </div>
      </div>
    </div>
  );
};
