import React, { useState, useMemo } from 'react';
import { UserPlus, Wallet, Edit, ChevronLeft, ChevronRight, Search, ChevronDown, ChevronUp, Trash2, ShieldAlert, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface User {
  id: string;
  username: string;
  avatar: string;
  subscription: 'Free' | 'Premium' | 'VIP';
  balance: number;
  lastActive: string;
  lastActiveTimestamp: number;
  joinDate: string;
  commandsRun: number;
}

const MOCK_USERS: User[] = [
  {
    id: '88291032',
    username: '@cypher_mesh',
    avatar: 'https://picsum.photos/seed/user1/100/100',
    subscription: 'VIP',
    balance: 45200.00,
    lastActive: '2 mins ago',
    lastActiveTimestamp: Date.now() - 120000,
    joinDate: 'OCT 24, 2023',
    commandsRun: 1492
  },
  {
    id: '11223344',
    username: '@neon_ghost',
    avatar: 'https://picsum.photos/seed/user2/100/100',
    subscription: 'Premium',
    balance: 12500.50,
    lastActive: '15 mins ago',
    lastActiveTimestamp: Date.now() - 900000,
    joinDate: 'NOV 12, 2023',
    commandsRun: 452
  },
  {
    id: '55667788',
    username: '@void_walker',
    avatar: 'https://picsum.photos/seed/user3/100/100',
    subscription: 'Free',
    balance: 150.00,
    lastActive: '1 hour ago',
    lastActiveTimestamp: Date.now() - 3600000,
    joinDate: 'JAN 05, 2024',
    commandsRun: 12
  },
  {
    id: '99001122',
    username: '@data_drifter',
    avatar: 'https://picsum.photos/seed/user4/100/100',
    subscription: 'Premium',
    balance: 8900.00,
    lastActive: '5 mins ago',
    lastActiveTimestamp: Date.now() - 300000,
    joinDate: 'DEC 20, 2023',
    commandsRun: 890
  },
  {
    id: '33445566',
    username: '@pixel_punk',
    avatar: 'https://picsum.photos/seed/user5/100/100',
    subscription: 'VIP',
    balance: 120400.00,
    lastActive: 'Just now',
    lastActiveTimestamp: Date.now() - 10000,
    joinDate: 'SEP 15, 2023',
    commandsRun: 3201
  },
  {
    id: '44556677',
    username: '@cyber_samurai',
    avatar: 'https://picsum.photos/seed/user6/100/100',
    subscription: 'Premium',
    balance: 5600.00,
    lastActive: '12 mins ago',
    lastActiveTimestamp: Date.now() - 720000,
    joinDate: 'FEB 10, 2024',
    commandsRun: 210
  },
  {
    id: '77889900',
    username: '@glitch_hop',
    avatar: 'https://picsum.photos/seed/user7/100/100',
    subscription: 'Free',
    balance: 0.00,
    lastActive: '3 days ago',
    lastActiveTimestamp: Date.now() - 259200000,
    joinDate: 'MAR 01, 2024',
    commandsRun: 5
  },
  {
    id: '22334455',
    username: '@bit_bandit',
    avatar: 'https://picsum.photos/seed/user8/100/100',
    subscription: 'VIP',
    balance: 88900.00,
    lastActive: '1 min ago',
    lastActiveTimestamp: Date.now() - 60000,
    joinDate: 'AUG 12, 2023',
    commandsRun: 5432
  },
  {
    id: '66778899',
    username: '@null_pointer',
    avatar: 'https://picsum.photos/seed/user9/100/100',
    subscription: 'Premium',
    balance: 3400.00,
    lastActive: '45 mins ago',
    lastActiveTimestamp: Date.now() - 2700000,
    joinDate: 'JAN 22, 2024',
    commandsRun: 156
  },
  {
    id: '11002233',
    username: '@root_access',
    avatar: 'https://picsum.photos/seed/user10/100/100',
    subscription: 'VIP',
    balance: 250000.00,
    lastActive: 'Just now',
    lastActiveTimestamp: Date.now() - 5000,
    joinDate: 'JUL 04, 2023',
    commandsRun: 12842
  },
  {
    id: '55443322',
    username: '@echo_location',
    avatar: 'https://picsum.photos/seed/user11/100/100',
    subscription: 'Free',
    balance: 12.50,
    lastActive: '2 hours ago',
    lastActiveTimestamp: Date.now() - 7200000,
    joinDate: 'MAR 15, 2024',
    commandsRun: 8
  },
  {
    id: '88776655',
    username: '@ghost_shell',
    avatar: 'https://picsum.photos/seed/user12/100/100',
    subscription: 'Premium',
    balance: 15600.00,
    lastActive: '10 mins ago',
    lastActiveTimestamp: Date.now() - 600000,
    joinDate: 'DEC 01, 2023',
    commandsRun: 670
  }
];

type SortKey = 'username' | 'subscription' | 'balance' | 'lastActiveTimestamp';

export const Users = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null);
  const [selectedUser, setSelectedUser] = useState<User>(MOCK_USERS[0]);

  const handleSort = (key: SortKey) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...MOCK_USERS].filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.includes(searchQuery)
    );

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [searchQuery, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-on-surface-variant uppercase tracking-widest text-[10px] font-bold mb-1">Central Directory</p>
          <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight">User Management</h2>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface-container px-4 py-2 rounded-md border border-outline-variant/20 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all">Export JSON</button>
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Add New Node
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-2">Total Entities</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-headline font-bold text-on-surface">12,842</span>
            <span className="text-secondary text-xs font-mono">+12%</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold">Tier Distribution</p>
            <div className="group relative">
              <Info className="w-3.5 h-3.5 text-on-surface-variant cursor-help" />
              <div className="absolute right-0 top-6 w-48 p-3 bg-surface-container-high border border-outline-variant/20 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                <p className="text-[10px] font-bold text-white uppercase mb-2">Tier Benefits</p>
                <div className="space-y-2">
                  <p className="text-[9px] text-on-surface-variant"><span className="text-white font-bold">Free:</span> Standard queue, 10 daily limit</p>
                  <p className="text-[9px] text-primary"><span className="font-bold">Premium:</span> Priority queue, 50 daily limit</p>
                  <p className="text-[9px] text-secondary"><span className="font-bold">VIP:</span> Instant queue, Unlimited daily</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-on-surface-variant/30 w-[45%]" />
              <div className="h-full bg-primary w-[35%]" />
              <div className="h-full bg-secondary w-[20%]" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">Free</span>
                <span className="text-lg font-headline font-bold text-on-surface">45%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-primary uppercase">Prem</span>
                <span className="text-lg font-headline font-bold text-on-surface">35%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-secondary uppercase">VIP</span>
                <span className="text-lg font-headline font-bold text-on-surface">20%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-2">Aggregate Balance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-headline font-bold text-on-surface">Rp 24.2B</span>
            <span className="text-on-surface-variant text-xs font-mono">(4.8M TRK)</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
          <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-2">System Load</p>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-headline font-bold text-on-surface">Optimal</span>
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary" />
            </span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10">
        <div className="p-4 border-b border-outline-variant/10 flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface-container-lowest/30">
          <div className="relative w-full sm:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant group-focus-within:text-primary transition-colors" />
            <input 
              type="text"
              placeholder="Search by username or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Rows:</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-surface-container-lowest border border-outline-variant/20 rounded-md py-1.5 px-3 text-xs font-bold focus:outline-none focus:border-primary/50 cursor-pointer hover:bg-surface-container-low transition-colors"
              >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <div className="h-6 w-px bg-outline-variant/10" />
            <p className="text-[10px] text-on-surface-variant font-mono uppercase">
              Total: <span className="text-on-surface font-bold">{filteredAndSortedUsers.length}</span>
            </p>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-outline-variant/10 bg-surface-container-lowest/10">
              <th 
                onClick={() => handleSort('username')}
                className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant cursor-pointer hover:text-primary hover:bg-primary/5 transition-all group select-none"
              >
                <div className="flex items-center gap-2">
                  User Entity 
                  <div className="flex flex-col -space-y-1">
                    <ChevronUp className={cn("w-2.5 h-2.5 transition-opacity", sortConfig?.key === 'username' && sortConfig.direction === 'asc' ? "text-primary opacity-100" : "opacity-20")} />
                    <ChevronDown className={cn("w-2.5 h-2.5 transition-opacity", sortConfig?.key === 'username' && sortConfig.direction === 'desc' ? "text-primary opacity-100" : "opacity-20")} />
                  </div>
                </div>
              </th>
              <th 
                onClick={() => handleSort('subscription')}
                className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant cursor-pointer hover:text-primary hover:bg-primary/5 transition-all group select-none"
              >
                <div className="flex items-center gap-2">
                  Subscription
                  <div className="flex flex-col -space-y-1">
                    <ChevronUp className={cn("w-2.5 h-2.5 transition-opacity", sortConfig?.key === 'subscription' && sortConfig.direction === 'asc' ? "text-primary opacity-100" : "opacity-20")} />
                    <ChevronDown className={cn("w-2.5 h-2.5 transition-opacity", sortConfig?.key === 'subscription' && sortConfig.direction === 'desc' ? "text-primary opacity-100" : "opacity-20")} />
                  </div>
                </div>
              </th>
              <th 
                onClick={() => handleSort('balance')}
                className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant cursor-pointer hover:text-primary hover:bg-primary/5 transition-all group select-none"
              >
                <div className="flex items-center gap-2">
                  Balance (Rp)
                  <div className="flex flex-col -space-y-1">
                    <ChevronUp className={cn("w-2.5 h-2.5 transition-opacity", sortConfig?.key === 'balance' && sortConfig.direction === 'asc' ? "text-primary opacity-100" : "opacity-20")} />
                    <ChevronDown className={cn("w-2.5 h-2.5 transition-opacity", sortConfig?.key === 'balance' && sortConfig.direction === 'desc' ? "text-primary opacity-100" : "opacity-20")} />
                  </div>
                </div>
              </th>
              <th 
                onClick={() => handleSort('lastActiveTimestamp')}
                className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant cursor-pointer hover:text-primary hover:bg-primary/5 transition-all group select-none"
              >
                <div className="flex items-center gap-2">
                  Telemetry
                  <div className="flex flex-col -space-y-1">
                    <ChevronUp className={cn("w-2.5 h-2.5 transition-opacity", sortConfig?.key === 'lastActiveTimestamp' && sortConfig.direction === 'asc' ? "text-primary opacity-100" : "opacity-20")} />
                    <ChevronDown className={cn("w-2.5 h-2.5 transition-opacity", sortConfig?.key === 'lastActiveTimestamp' && sortConfig.direction === 'desc' ? "text-primary opacity-100" : "opacity-20")} />
                  </div>
                </div>
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant text-right select-none">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/5">
            {paginatedUsers.map((user) => (
              <tr 
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={cn(
                  "hover:bg-surface-container transition-colors group cursor-pointer",
                  selectedUser.id === user.id ? "bg-surface-container/50 border-l-2 border-primary" : ""
                )}
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt="User"
                      className="w-10 h-10 rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-sm font-bold text-on-surface font-headline">{user.username}</div>
                      <div className="text-xs text-on-surface-variant">ID: {user.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={cn(
                    "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter flex items-center w-fit gap-1",
                    user.subscription === 'VIP' ? "bg-secondary/10 text-secondary shadow-[0_0_8px_rgba(131,252,142,0.15)]" :
                    user.subscription === 'Premium' ? "bg-primary/10 text-primary" : "bg-surface-container-highest text-on-surface-variant"
                  )}>
                    <span className={cn("w-1 h-1 rounded-full", 
                      user.subscription === 'VIP' ? "bg-secondary" : 
                      user.subscription === 'Premium' ? "bg-primary" : "bg-on-surface-variant"
                    )} /> {user.subscription}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="font-mono text-sm text-primary">Rp {(user.balance * 5000).toLocaleString('id-ID')}</span>
                    <span className="text-[10px] text-on-surface-variant font-mono">{user.balance.toLocaleString('en-US')} TRK</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-xs text-on-surface-variant">Last Active</div>
                  <div className="text-sm text-on-surface">{user.lastActive}</div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-surface-container-high rounded transition-all text-on-surface-variant hover:text-primary">
                      <Wallet className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-surface-container-high rounded transition-all text-on-surface-variant hover:text-primary">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-on-surface-variant italic text-sm">
                  No entities found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="p-4 border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-xs text-on-surface-variant font-mono">
            Showing {Math.min(filteredAndSortedUsers.length, itemsPerPage)} of {filteredAndSortedUsers.length} entities
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="p-2 hover:bg-surface-container-high rounded-md transition-all text-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="p-2 hover:bg-surface-container-high rounded-md transition-all text-on-surface-variant disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 flex flex-col items-center text-center">
          <img
            src={selectedUser.avatar}
            alt="User"
            className="w-24 h-24 rounded-2xl mb-4 border-2 border-primary/20 p-1"
            referrerPolicy="no-referrer"
          />
          <h3 className="font-headline text-2xl font-bold text-on-surface">{selectedUser.username.replace('@', '')}</h3>
          <p className="text-primary text-sm font-mono mb-6">{selectedUser.username} • {selectedUser.id}</p>
          <div className="w-full space-y-3 mb-8">
            <div className="flex justify-between py-2 border-b border-outline-variant/5">
              <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Status</span>
              <span className="text-xs text-secondary font-bold">ACTIVE NODE</span>
            </div>
            <div className="flex justify-between py-2 border-b border-outline-variant/5">
              <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Join Date</span>
              <span className="text-xs text-on-surface">{selectedUser.joinDate}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Commands Run</span>
              <span className="text-xs text-on-surface">{selectedUser.commandsRun.toLocaleString()} Executions</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <button className="bg-surface-container border border-outline-variant/20 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-surface-container-high transition-all">Freeze Account</button>
            <button className="bg-surface-container border border-error-dim/20 text-error py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-error-container/20 transition-all">Revoke Access</button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-headline text-xl font-bold">Credit Control</h4>
              <span className="text-xs font-mono text-on-surface-variant">Manual Injection Enabled</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Adjust Balance (TRK)</label>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input className="flex-1 bg-surface-container-lowest border border-outline-variant/20 rounded-md py-2 px-4 text-sm focus:outline-none focus:border-primary/50 transition-all font-mono" type="number" defaultValue={selectedUser.balance} key={selectedUser.id} />
                    <button className="bg-primary text-on-primary px-4 rounded-md font-bold text-sm">Update</button>
                  </div>
                  <p className="text-[10px] text-secondary font-bold uppercase tracking-tighter">
                    Equivalent: Rp {(selectedUser.balance * 5000).toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Subscription Tier</label>
                <div className="flex gap-2">
                  <select defaultValue={selectedUser.subscription + " Tier"} key={selectedUser.id + "_tier"} className="flex-1 bg-surface-container-lowest border border-outline-variant/20 rounded-md py-2 px-4 text-sm focus:outline-none focus:border-primary/50 transition-all appearance-none cursor-pointer">
                    <option>Free Tier</option>
                    <option>Premium Tier</option>
                    <option>VIP Tier</option>
                  </select>
                  <button className="bg-surface-container-highest border border-outline-variant/20 px-4 rounded-md font-bold text-sm">Save</button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10">
            <h4 className="font-headline text-xl font-bold mb-6">Activity Timeline</h4>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 shadow-[0_0_8px_rgba(131,252,142,0.4)]" />
                <div>
                  <p className="text-sm text-on-surface font-medium">Executed <span className="text-primary">/upscale_cinematic</span></p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">2 Minutes Ago • Request ID: #A92-FF</p>
                </div>
              </div>
              <div className="flex gap-4 items-start opacity-70">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="text-sm text-on-surface font-medium">Balance Injection +10,000 TRK (Rp 50.000.000)</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">4 Hours Ago • System Auto-Refill</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
