import React, { useState } from 'react';
import { Wallet, Layers, CheckCircle2, Currency, Receipt, Info, Plus, Save, Trash2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const Monetization = () => {
  const [tiers, setTiers] = useState([
    {
      id: 1,
      name: 'Free',
      category: 'Standard',
      credits: 0,
      features: ['10 Daily Upscales', 'Standard Queue'],
      popular: false,
      color: 'secondary'
    },
    {
      id: 2,
      name: 'Premium',
      category: 'Advanced',
      credits: 2500,
      features: ['50 Daily Upscales', 'Priority Queue', 'Neural Model Switch'],
      popular: true,
      color: 'primary'
    },
    {
      id: 3,
      name: 'VIP',
      category: 'Ultimate',
      credits: 7500,
      features: ['Unlimited Upscales', 'Instant Execution', 'ZIP Archive Export', 'Priority Jump'],
      popular: false,
      color: 'secondary'
    }
  ]);

  const [executionCosts, setExecutionCosts] = useState([
    { label: 'Single Image Upscale', cost: 10, desc: 'Standard 4x neural upscaling' },
    { label: 'Chapter Processing', cost: 250, desc: 'Batch processing up to 50 images' },
    { label: 'ZIP Archive Export', cost: 500, desc: 'Full archive processing & compression' },
    { label: 'Neural Model Switch', cost: 5, desc: 'VRAM allocation for custom models' },
    { label: 'Priority Jump', cost: 20, desc: 'Bypass standard queue latency' },
    { label: 'API Webhook Call', cost: 2, desc: 'External integration notification' },
  ]);

  const [trkRate, setTrkRate] = useState(100);
  const [isSaving, setIsSaving] = useState<string | null>(null);

  const handleTierChange = (id: number, field: string, value: any) => {
    setTiers(tiers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleFeatureChange = (tierId: number, featureIndex: number, value: string) => {
    setTiers(tiers.map(t => {
      if (t.id === tierId) {
        const newFeatures = [...t.features];
        newFeatures[featureIndex] = value;
        return { ...t, features: newFeatures };
      }
      return t;
    }));
  };

  const removeFeature = (tierId: number, featureIndex: number) => {
    setTiers(tiers.map(t => {
      if (t.id === tierId) {
        return { ...t, features: t.features.filter((_, i) => i !== featureIndex) };
      }
      return t;
    }));
  };

  const addFeature = (tierId: number) => {
    setTiers(tiers.map(t => {
      if (t.id === tierId) {
        return { ...t, features: [...t.features, 'New Feature'] };
      }
      return t;
    }));
  };

  const handleCostChange = (index: number, field: string, value: any) => {
    const updated = [...executionCosts];
    (updated[index] as any)[field] = field === 'cost' ? (parseInt(value) || 0) : value;
    setExecutionCosts(updated);
  };

  const simulateSave = (section: string) => {
    setIsSaving(section);
    setTimeout(() => setIsSaving(null), 2000);
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Technical Telemetry // Commerce</p>
          <h1 className="font-headline text-4xl font-bold tracking-tight text-white">Monetization & Pricing</h1>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Revenue Stats */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Wallet className="w-16 h-16" />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Total Net Revenue</p>
                <h2 className="text-3xl font-headline font-bold text-white">Rp 192.637.500</h2>
              </div>
              <div className="w-2 h-2 rounded-full bg-secondary pulse-glow animate-pulse" />
            </div>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-on-surface-variant">Subscriptions</span>
                  <span className="text-white font-mono">Rp 126.300.000</span>
                </div>
                <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[65%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-on-surface-variant">Credit Top-ups</span>
                  <span className="text-white font-mono">Rp 66.337.500</span>
                </div>
                <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full w-[35%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10">
            <h3 className="font-headline font-bold text-sm tracking-tight mb-4 flex items-center gap-2">
              <span className="text-primary">⚡</span> Active Pulse
            </h3>
            <div className="relative h-32 w-full bg-surface-container-lowest rounded-md overflow-hidden mb-4">
              <img
                src="https://picsum.photos/seed/telemetry/800/400?blur=10"
                alt="Telemetry Sparkline"
                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent" />
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">System observing a 12% increase in Premium tier conversions over the last 24 orbital cycles.</p>
          </div>
        </div>

        {/* Subscription Tiers Editor */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl p-8 border border-outline-variant/5 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Layers className="text-primary w-5 h-5" />
              <h2 className="font-headline font-bold text-xl tracking-tight text-white">Subscription Tiers</h2>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => simulateSave('tiers')}
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                  isSaving === 'tiers' ? "bg-secondary text-on-secondary" : "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20"
                )}
              >
                <Save className="w-3 h-3" /> {isSaving === 'tiers' ? 'Saved!' : 'Save Tiers'}
              </button>
              <button className="text-primary text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add New Tier
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div 
                key={tier.id} 
                className={cn(
                  "p-6 rounded-lg border flex flex-col transition-all group",
                  tier.popular ? "bg-surface-container-high border-primary shadow-[0_0_24px_rgba(132,173,255,0.1)]" : "bg-surface-container border-outline-variant/10 hover:border-primary/30"
                )}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-primary text-on-primary text-[9px] font-bold px-3 py-1 rounded-bl-md uppercase tracking-tighter">Most Popular</div>
                )}
                <div className="mb-4 space-y-2">
                  <input
                    value={tier.category}
                    onChange={(e) => handleTierChange(tier.id, 'category', e.target.value)}
                    className="w-full bg-transparent border-none p-0 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest focus:ring-0"
                  />
                  <input
                    value={tier.name}
                    onChange={(e) => handleTierChange(tier.id, 'name', e.target.value)}
                    className="w-full bg-transparent border-none p-0 text-xl font-headline font-bold text-white focus:ring-0"
                  />
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <input
                    type="number"
                    value={tier.credits}
                    onChange={(e) => handleTierChange(tier.id, 'credits', parseInt(e.target.value) || 0)}
                    className="w-24 bg-surface-container-lowest border border-outline-variant/20 rounded px-2 py-1 text-2xl font-bold font-headline text-secondary focus:outline-none focus:border-secondary"
                  />
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Credits</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Features</span>
                  <button 
                    onClick={() => addFeature(tier.id)}
                    className="p-1 hover:bg-primary/10 text-primary rounded transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <ul className="space-y-3 mb-10 flex-1">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 group/feat">
                      <CheckCircle2 className="w-3 h-3 text-secondary shrink-0" />
                      <input
                        value={feature}
                        onChange={(e) => handleFeatureChange(tier.id, idx, e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-[11px] text-on-surface-variant focus:ring-0 focus:text-white transition-colors"
                      />
                      <button 
                        onClick={() => removeFeature(tier.id, idx)}
                        className="opacity-0 group-hover/feat:opacity-100 p-1 hover:bg-error/10 text-error rounded transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2">
                  <button className="flex-1 py-2.5 bg-surface-container-highest hover:bg-primary hover:text-on-primary border border-outline-variant/20 text-[10px] font-bold font-headline uppercase tracking-widest rounded-md transition-all">
                    Configure
                  </button>
                  <button className="p-2.5 text-on-surface-variant hover:text-error transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Execution Costs Editor */}
        <div className="col-span-12 lg:col-span-7 bg-surface-container-low rounded-xl p-8 border border-outline-variant/5 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Currency className="text-secondary w-5 h-5" />
              <h2 className="font-headline font-bold text-xl tracking-tight text-white">Execution Costs (Pay-As-You-Go)</h2>
            </div>
            <button 
              onClick={() => simulateSave('costs')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                isSaving === 'costs' ? "bg-secondary text-on-secondary" : "bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20"
              )}
            >
              <Save className="w-3 h-3" /> {isSaving === 'costs' ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {executionCosts.map((item, i) => (
              <div key={i} className="p-4 bg-surface-container rounded-lg border border-outline-variant/10 flex flex-col gap-3 group hover:bg-surface-container-high transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-4 space-y-1">
                    <input
                      value={item.label}
                      onChange={(e) => handleCostChange(i, 'label', e.target.value)}
                      className="w-full bg-transparent border-none p-0 text-sm font-bold text-white focus:ring-0"
                    />
                    <input
                      value={item.desc}
                      onChange={(e) => handleCostChange(i, 'desc', e.target.value)}
                      className="w-full bg-transparent border-none p-0 text-[10px] text-on-surface-variant focus:ring-0"
                    />
                  </div>
                  <div className="w-24 relative">
                    <input
                      type="number"
                      value={item.cost}
                      onChange={(e) => handleCostChange(i, 'cost', e.target.value)}
                      className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded py-1.5 px-2 text-xs font-mono font-bold text-secondary text-right focus:outline-none focus:border-secondary/50"
                    />
                    <span className="absolute -top-3 right-0 text-[8px] text-on-surface-variant uppercase font-bold">Credits</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trakteer Integration Editor */}
        <div className="col-span-12 lg:col-span-5 bg-surface-container-low rounded-xl p-8 border border-outline-variant/5 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Receipt className="text-tertiary w-5 h-5" />
              <h2 className="font-headline font-bold text-xl tracking-tight text-white">Trakteer Integration</h2>
            </div>
            <button 
              onClick={() => simulateSave('trk')}
              className={cn(
                "flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all",
                isSaving === 'trk' ? "bg-secondary text-on-secondary" : "bg-tertiary/10 text-tertiary border border-tertiary/20 hover:bg-tertiary/20"
              )}
            >
              <Save className="w-3 h-3" /> {isSaving === 'trk' ? 'Saved!' : 'Save Rate'}
            </button>
          </div>
          <div className="flex-1 space-y-6">
            <div className="p-6 bg-tertiary/5 rounded-xl border border-tertiary/20 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                <Receipt className="w-24 h-24 text-tertiary" />
              </div>
              <p className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-2">Conversion Rate</p>
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <h3 className="text-3xl font-headline font-bold text-white">1 TRK</h3>
                  <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">(Rp 5.000)</span>
                </div>
                <span className="text-on-surface-variant text-2xl">=</span>
                <div className="relative">
                  <input
                    type="number"
                    value={trkRate}
                    onChange={(e) => setTrkRate(parseInt(e.target.value) || 0)}
                    className="w-32 bg-surface-container-lowest border border-tertiary/30 rounded-lg py-2 px-3 text-2xl font-headline font-bold text-secondary focus:outline-none focus:border-secondary"
                  />
                  <span className="absolute -top-4 left-0 text-[9px] text-on-surface-variant uppercase font-bold">Credits Output</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-tertiary shrink-0" />
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <span className="text-white font-bold">Auto-Sync:</span> Balances are synchronized every 5 minutes via Trakteer Webhook.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-tertiary shrink-0" />
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <span className="text-white font-bold">Minimum:</span> 10 TRK required for initial node activation.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-tertiary shrink-0" />
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <span className="text-white font-bold">Priority:</span> Trakteer credits are consumed <span className="italic">after</span> subscription daily quotas are exhausted.
                </p>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-3 bg-surface-container-highest border border-outline-variant/20 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-tertiary hover:text-on-tertiary transition-all">
            Configure Webhook Gateway
          </button>
        </div>
      </div>
    </div>
  );
};
