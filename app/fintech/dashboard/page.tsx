'use client';

import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, Zap, BarChart3 } from 'lucide-react';
import DashboardLayout from '@/app/components/DashboardLayout';

interface KPIData {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ElementType;
}

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');

  const kpiData: KPIData[] = [
    {
      label: 'Total Balance',
      value: '$2,847,391.52',
      change: '+12.85%',
      isPositive: true,
      icon: BarChart3,
    },
    {
      label: 'Net Position',
      value: '+$485,920.34',
      change: '+4.23%',
      isPositive: true,
      icon: TrendingUp,
    },
    {
      label: 'Monthly Yield',
      value: '4.28%',
      change: '+0.67%',
      isPositive: true,
      icon: Zap,
    },
  ];

  // Mock transaction data
  const recentTransactions = [
    {
      id: 'TXN-001',
      type: 'TRANSFER',
      description: 'Wire to Checking Account',
      amount: '-$25,000.00',
      amountRaw: 25000,
      status: 'completed',
      timestamp: '2025-04-17 14:32:05',
    },
    {
      id: 'TXN-002',
      type: 'DEPOSIT',
      description: 'Deposit from Wire',
      amount: '+$50,000.00',
      amountRaw: 50000,
      status: 'completed',
      timestamp: '2025-04-17 13:15:42',
    },
    {
      id: 'TXN-003',
      type: 'DIVIDEND',
      description: 'Quarterly Dividend Payment',
      amount: '+$12,150.75',
      amountRaw: 12150.75,
      status: 'completed',
      timestamp: '2025-04-17 09:45:18',
    },
    {
      id: 'TXN-004',
      type: 'FEE',
      description: 'Platform Maintenance Fee',
      amount: '-$100.00',
      amountRaw: 100,
      status: 'pending',
      timestamp: '2025-04-17 08:12:33',
    },
    {
      id: 'TXN-005',
      type: 'TRANSFER',
      description: 'Multi-Currency Exchange',
      amount: '-€15,000.00',
      amountRaw: 15000,
      status: 'completed',
      timestamp: '2025-04-16 16:44:22',
    },
  ];

  return (
    <DashboardLayout activeTab="dashboard">
      {/* Main Content */}
      <div className="min-h-screen bg-base-bg">
        {/* Header */}
        <div className="border-b border-[rgba(99,91,255,0.1)] px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                Dashboard
              </h1>
              <p className="text-text-secondary">
                Real-time portfolio insight and transaction ledger
              </p>
            </div>
            <div className="flex gap-2">
              {['24h', '7d', '30d', '90d'].map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTimeframe === tf
                      ? 'bg-[#635BFF] text-white'
                    : 'bg-[rgba(99,91,255,0.1)] text-text-secondary hover:bg-[rgba(99,91,255,0.15)]'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Bento Grid */}
        <div className="bento-grid">
          {/* KPI Cards - 2x2 Section */}
          <div className="bento-item bento-item-2x2 glass-panel-strong">
            <h2 className="text-lg font-bold text-white mb-6">Portfolio Overview</h2>
            <div className="grid grid-cols-3 gap-4 h-full">
              {kpiData.map((kpi) => {
                const Icon = kpi.icon;
                
                return (
                  <div
                    key={kpi.label}
                    className="glass-panel p-4 flex flex-col justify-between hover:bg-[rgba(99,91,255,0.08)] transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="w-4 h-4 text-[#635BFF]" />
                        <span className="kpi-label">{kpi.label}</span>
                      </div>
                      <p className="kpi-value">{kpi.value}</p>
                    </div>
                    <div className={`kpi-change ${kpi.isPositive ? 'positive' : 'negative'}`}>
                      {kpi.isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {kpi.change}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Agent Pulse - 1x1 */}
          <div className="bento-item bento-item-1x1 glass-panel-strong flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-[#00FFC2] rounded-full pulse-active"></div>
                <h3 className="text-sm font-bold text-white">AI Agent</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Fraud Detection Model: Active
              </p>
            </div>
            <div className="mt-4 p-3 bg-[rgba(0,255,194,0.05)] border border-[rgba(0,255,194,0.1)] rounded-lg">
              <p className="text-xs text-[#00FFC2] typewriter">
                Monitoring 847 transactions...
              </p>
            </div>
          </div>

          {/* Real-Time Transaction Feed - 2x1 */}
          <div className="bento-item bento-item-2x1 glass-panel-strong flex flex-col">
            <h3 className="text-lg font-bold text-white mb-4">Recent Transactions</h3>
            
            <div className="overflow-x-auto flex-1">
              <table className="transaction-table w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="text-electric-pulse">{tx.id}</td>
                      <td className="font-semibold">{tx.type}</td>
                      <td className="text-text-secondary">{tx.description}</td>
                      <td className={tx.amount.startsWith('+') ? 'text-carbon-mint' : 'text-negative'}>
                        {tx.amount}
                      </td>
                      <td>
                        <span className={`status-badge status-${tx.status}`}>
                          {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                        </span>
                      </td>
                      <td className="text-xs text-text-tertiary">{tx.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Status - 1x1 */}
          <div className="bento-item bento-item-1x1 glass-panel-strong">
            <h3 className="text-sm font-bold text-white mb-4">System Health</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-text-secondary">API Uptime</span>
                  <span className="text-xs text-[#00FFC2] font-semibold">99.99%</span>
                </div>
                <div className="w-full h-1.5 bg-[rgba(99,91,255,0.1)] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00FFC2] rounded-full" style={{ width: '99.99%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-text-secondary">Ledger Sync</span>
                  <span className="text-xs text-[#00FFC2] font-semibold">100%</span>
                </div>
                <div className="w-full h-1.5 bg-[rgba(99,91,255,0.1)] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00FFC2] rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
