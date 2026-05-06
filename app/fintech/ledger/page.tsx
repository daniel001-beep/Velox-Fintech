'use client';

import React from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import { BookOpen } from 'lucide-react';

export default function LedgerPage() {
  const transactionHistory = [
    { id: 'TXN-001', type: 'TRANSFER', description: 'Wire to Checking', date: '2026-04-26', amount: '$25,000.00', status: 'Completed' },
    { id: 'TXN-002', type: 'DEPOSIT', description: 'Deposit from Wire', date: '2026-04-25', amount: '$50,000.00', status: 'Completed' },
    { id: 'TXN-003', type: 'BUY', description: 'Apple Inc. AAPL', date: '2026-04-24', amount: '$8,750.00', status: 'Completed' },
    { id: 'TXN-004', type: 'DIVIDEND', description: 'MSFT Dividend', date: '2026-04-23', amount: '$1,240.00', status: 'Completed' },
    { id: 'TXN-005', type: 'EXCHANGE', description: 'Multi-Currency', date: '2026-04-22', amount: '$15,000.00', status: 'Completed' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-500/10 rounded-sm border border-blue-500/20">
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-100">Financial Ledger</h1>
            <p className="text-slate-400 mt-1">Complete transaction history and reconciliation</p>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900 border border-slate-700 rounded-sm overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-slate-100">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">ID</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Type</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Description</th>
                <th className="text-left py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="text-right py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {transactionHistory.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-5 px-6 font-mono text-slate-500 text-xs uppercase">{tx.id}</td>
                  <td className="py-5 px-6">
                    <span className="text-slate-200 font-bold text-xs tracking-wider">{tx.type}</span>
                  </td>
                  <td className="py-5 px-6 text-slate-400 text-sm font-medium">{tx.description}</td>
                  <td className="py-5 px-6 text-slate-400 text-sm">{tx.date}</td>
                  <td className="py-5 px-6 text-right font-mono font-bold text-slate-100">{tx.amount}</td>
                  <td className="py-5 px-6 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {tx.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
