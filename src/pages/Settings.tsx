import React from 'react';
import { Network, Settings, Shield, Zap, Eye, EyeOff, Construction, Info } from 'lucide-react';

export const SettingsPage = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-headline text-3xl font-bold tracking-tight text-white mb-2">Bot & Integration</h2>
          <p className="text-on-surface-variant text-sm">Configure external API gateways, webhook listeners, and neural model parameters.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 rounded-lg border border-primary/30 text-primary font-sans text-sm hover:border-primary transition-all">
            Reset Defaults
          </button>
          <button className="px-6 py-2 rounded-lg bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold font-sans text-sm hover:opacity-90 active:scale-95 transition-all shadow-[0_0_20px_rgba(132,173,255,0.2)]">
            Save Configuration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <section className="md:col-span-8 bg-surface-container-low rounded-xl p-6 border-l-4 border-primary shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="text-primary w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold">Telegram Bot API</h3>
              <p className="text-xs text-on-surface-variant">Primary interface for bot communications</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="group">
              <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Bot Token Key</label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 rounded-lg py-3 px-4 font-mono text-sm focus:ring-primary transition-all text-primary"
                  readOnly
                  type="password"
                  defaultValue="734912056:AAFd8eR-N2v7Y2zX-k0oX9m8L4kP2wS1tG0"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-white transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/5">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-1">Status</p>
                <p className="text-sm text-secondary flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" /> Connected
                </p>
              </div>
              <div className="p-4 bg-surface-container rounded-lg border border-outline-variant/5">
                <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider mb-1">Webhook Latency</p>
                <p className="text-sm font-headline">42ms</p>
              </div>
            </div>
          </div>
        </section>

        <section className="md:col-span-4 bg-surface-container-high rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-error/10 rounded-full blur-3xl" />
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline text-lg font-bold">Maintenance</h3>
              <Construction className="text-error w-5 h-5" />
            </div>
            <p className="text-xs text-on-surface-variant mb-6">Restrict bot access to admins only during core upgrades.</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg">
            <span className="text-sm font-medium">System Lockdown</span>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-surface-variant transition-colors focus:outline-none ring-1 ring-outline-variant/20">
              <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-on-surface-variant transition-transform" />
            </button>
          </div>
        </section>

        <section className="md:col-span-12 lg:col-span-5 bg-surface-container-low rounded-xl p-6 border-l-4 border-tertiary shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center">
              <Shield className="text-tertiary w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold">Trakteer Webhook</h3>
              <p className="text-xs text-on-surface-variant">Inbound payment notification listener</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Webhook URL</label>
              <input
                className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 rounded-lg py-2 px-4 text-xs font-mono text-tertiary"
                readOnly
                type="text"
                defaultValue="https://api.upscalebot.hq/v1/webhook/trakteer/4f2d"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Secret Key</label>
              <input
                className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/20 rounded-lg py-2 px-4 text-xs font-mono"
                type="password"
                defaultValue="••••••••••••••••"
              />
            </div>
          </div>
        </section>

        <section className="md:col-span-12 lg:col-span-7 bg-surface-container rounded-xl p-6 shadow-xl ring-1 ring-outline-variant/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Zap className="text-secondary w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold">Neural Parameters</h3>
              <p className="text-xs text-on-surface-variant">Fine-tune the upscaling engine and model weightings</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Target Resolution</label>
                  <span className="text-xs text-primary font-bold">x4 High Fidelity</span>
                </div>
                <input className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary" max="4" min="1" type="range" defaultValue="4" />
                <div className="flex justify-between mt-2 px-1">
                  <span className="text-[9px] text-on-surface-variant">x1</span>
                  <span className="text-[9px] text-on-surface-variant">x2</span>
                  <span className="text-[9px] text-on-surface-variant">x4</span>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Model Selection</label>
                <select defaultValue="Real-ESRGAN (Anime/Illustration)" className="w-full bg-surface-container-lowest border-none ring-1 ring-outline-variant/30 rounded-lg py-2.5 px-4 text-sm focus:ring-primary appearance-none cursor-pointer">
                  <option>ESRGAN_v4_General</option>
                  <option>Real-ESRGAN (Anime/Illustration)</option>
                  <option>SwinIR_Large (Photorealistic)</option>
                  <option>BSRGAN_v2 (Heavy Artifact Removal)</option>
                </select>
              </div>
            </div>
            <div className="bg-surface-container-lowest/50 rounded-xl p-4 flex flex-col items-center justify-center border border-dashed border-outline-variant/20">
              <img
                src="https://picsum.photos/seed/neural/300/300"
                alt="Model Preview"
                className="w-32 h-32 rounded-lg object-cover mb-3 opacity-80 border border-outline-variant/30"
                referrerPolicy="no-referrer"
              />
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Processing Preview</p>
              <p className="text-[9px] text-outline text-center px-4 mt-1">Real-time sampling of current model configurations applied to sample data.</p>
            </div>
          </div>
        </section>

        <section className="md:col-span-12 bg-surface-container-lowest rounded-xl p-4 font-mono text-[11px] text-on-surface-variant/70 border border-outline-variant/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-secondary uppercase font-bold text-[9px] tracking-[0.2em]">System Event Log</span>
            <span className="text-[9px]">v2.4.1-STABLE</span>
          </div>
          <div className="space-y-1">
            <p><span className="text-outline">[2023-10-24 14:02:11]</span> <span className="text-secondary">INFO:</span> Integration layer established for Telegram @UpscaleBot_hq</p>
            <p><span className="text-outline">[2023-10-24 14:05:04]</span> <span className="text-primary">WEBHOOK:</span> Inbound ping from Trakteer.id (200 OK)</p>
            <p><span className="text-outline">[2023-10-24 14:12:45]</span> <span className="text-tertiary">KERNEL:</span> Neural Model 'Real-ESRGAN' loaded into VRAM (4.2GB reserved)</p>
            <p><span className="text-outline">[2023-10-24 14:15:32]</span> <span className="text-error">WARN:</span> API Key exposure detected in logs; obfuscating output strings...</p>
          </div>
        </section>
      </div>
    </div>
  );
};
