'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Activity, Info } from 'lucide-react';
import DashboardLayout from '@/app/components/DashboardLayout';
import AssetAllocation from '@/app/components/AssetAllocation';

export default function DashboardPage() {
  // Portfolio stat cards
  const statCards = [
    {
      label: 'Total Balance',
      value: '$2,847,392.50',
      subtext: '+$12,430 today',
      icon: TrendingUp,
      color: '#22c55e',
    },
    {
      label: 'Net Position',
      value: '+$485,920.00',
      subtext: '+20.58% overall return',
      icon: TrendingUp,
      color: '#22c55e',
    },
    {
      label: 'Monthly Yield',
      value: '4.28%',
      subtext: 'Above market avg by 1.2%',
      icon: TrendingUp,
      color: '#22c55e',
    },
    {
      label: 'Active Assets',
      value: '34 Positions',
      subtext: 'Across 8 asset classes',
      icon: Info,
      color: '#3b82f6',
    },
  ];

  // Top holdings data
  const topHoldings = [
    {
      asset: 'Apple Inc.',
      ticker: 'AAPL',
      value: '$324,500',
      change: '+2.4%',
      weight: '11.4%',
      isPositive: true,
    },
    {
      asset: 'US Treasury Bond 10Y',
      ticker: 'UST10',
      value: '$280,000',
      change: '+0.3%',
      weight: '9.8%',
      isPositive: true,
    },
    {
      asset: 'Microsoft Corp',
      ticker: 'MSFT',
      value: '$215,300',
      change: '+1.8%',
      weight: '7.6%',
      isPositive: true,
    },
    {
      asset: 'Vanguard Real Estate ETF',
      ticker: 'VNQ',
      value: '$140,200',
      change: '-0.5%',
      weight: '4.9%',
      isPositive: false,
    },
    {
      asset: 'Gold Futures',
      ticker: 'XAUUSD',
      value: '$98,700',
      change: '+1.1%',
      weight: '3.5%',
      isPositive: true,
    },
  ];

  // Recent transactions
  const recentTransactions = [
    {
      id: 'TXN-001',
      type: 'TRANSFER',
      description: 'Wire to Checking Account',
      amount: '-$25,000.00',
      status: 'completed',
    },
    {
      id: 'TXN-002',
      type: 'DEPOSIT',
      description: 'Deposit from Wire',
      amount: '+$50,000.00',
      status: 'completed',
    },
    {
      id: 'TXN-003',
      type: 'TRANSFER',
      description: 'Multi-Currency Exchange',
      amount: '-$15,000.00',
      status: 'completed',
    },
    {
      id: 'TXN-004',
      type: 'BUY',
      description: 'Apple Inc. AAPL x50',
      amount: '-$8,750.00',
      status: 'completed',
    },
    {
      id: 'TXN-005',
      type: 'DIVIDEND',
      description: 'MSFT Quarterly Dividend',
      amount: '+$1,240.00',
      status: 'pending',
    },
  ];

  return (
    <DashboardLayout>
      {/* Header with live indicator */}
      <div className="border-b border-slate-700 pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-100 mb-2">Portfolio Dashboard</h1>
            <p className="text-slate-400">Real-time portfolio analytics and transaction history</p>
          </div>
          <div className="flex items-center gap-3 self-start md:self-center">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-sm border border-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-sm animate-pulse"></div>
              <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Live</span>
            </div>
            <span className="text-xs text-slate-500">Last synced: just now</span>
          </div>
        </div>
      </div>

      {/* Portfolio Stats Grid - 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-slate-900 border border-slate-700 rounded-sm p-8 hover:bg-slate-800/50 transition-all duration-200 flex flex-col items-center text-center"
            >
              <div className="p-3 rounded-sm bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                {card.label}
              </span>
              <p className="text-xl font-bold text-slate-100 mb-2">{card.value}</p>
              <p className="text-sm text-slate-400 font-medium">{card.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8">
        {/* Asset Allocation Section */}
        <div className="bg-slate-900 border border-slate-700 rounded-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-100">Asset Allocation</h2>
            <div className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-sm border border-slate-700">
              Updated Real-time
            </div>
          </div>
          <AssetAllocation />
        </div>

        {/* Top Holdings Table */}
        <div className="bg-slate-900 border border-slate-700 rounded-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-900/50">
            <h2 className="text-2xl font-bold text-slate-100">Top Holdings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Asset
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Ticker
                  </th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Value
                  </th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Change
                  </th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Weight
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {topHoldings.map((holding) => (
                  <tr key={holding.ticker} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-5 px-6 text-slate-200 font-semibold">{holding.asset}</td>
                    <td className="py-5 px-6">
                      <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded-sm text-xs font-mono">
                        {holding.ticker}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right font-mono text-slate-100">{holding.value}</td>
                    <td
                      className={`py-5 px-6 text-right font-mono font-bold ${
                        holding.isPositive ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {holding.isPositive ? '↑' : '↓'} {holding.change.replace('+', '').replace('-', '')}
                    </td>
                    <td className="py-5 px-6 text-right font-mono text-slate-400">{holding.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-900 border border-slate-700 rounded-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-900/50">
            <h2 className="text-2xl font-bold text-slate-100">Recent Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    ID
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Type
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Description
                  </th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Amount
                  </th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-5 px-6 font-mono text-slate-500 text-xs uppercase">{tx.id}</td>
                    <td className="py-5 px-6">
                      <span className="text-slate-200 font-bold text-xs tracking-wider">{tx.type}</span>
                    </td>
                    <td className="py-5 px-6 text-slate-400 text-sm font-medium">{tx.description}</td>
                    <td
                      className={`py-5 px-6 text-right font-mono font-bold ${
                        tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-slate-100'
                      }`}
                    >
                      {tx.amount}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-bold ${
                          tx.status === 'completed'
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            : tx.status === 'pending'
                              ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                        }`}
                      >
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
