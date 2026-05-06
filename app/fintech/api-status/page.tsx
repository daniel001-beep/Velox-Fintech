'use client';

import React from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import { Activity, CheckCircle } from 'lucide-react';

export default function APIStatusPage() {
  const apiEndpoints = [
    { name: 'Portfolio Analysis API', latency: '8.3ms', status: 'healthy' },
    { name: 'Multi-Currency Engine', latency: '5.1ms', status: 'healthy' },
    { name: 'Transaction Processor', latency: '12.4ms', status: 'healthy' },
    { name: 'Risk Management API', latency: '15.2ms', status: 'healthy' },
    { name: 'Settlement Engine', latency: '9.8ms', status: 'healthy' },
    { name: 'Reconciliation Service', latency: '18.5ms', status: 'healthy' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 border-b border-slate-800 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-500/10 rounded-sm border border-blue-500/20">
            <Activity className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-100">System Status</h1>
            <p className="text-slate-400 mt-1">Real-time system health and endpoint latency</p>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900 border border-slate-700 rounded-sm p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-100 mb-2">Overall Status</h2>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-sm animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm">All Systems Operational</span>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Uptime</p>
            <p className="text-2xl font-bold text-slate-100">99.99%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {apiEndpoints.map((endpoint) => (
          <div key={endpoint.name} className="bg-slate-900 border border-slate-700 rounded-sm p-6 hover:bg-slate-800 transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-2 bg-slate-800 rounded-sm border border-slate-700">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                </div>
                <div>
                  <p className="font-bold text-slate-100">{endpoint.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm"></div>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{endpoint.status}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg text-cyan-400 font-bold">{endpoint.latency}</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">latency</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
