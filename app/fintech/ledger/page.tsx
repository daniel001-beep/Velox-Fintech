'use client';

import React from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import { BookOpen } from 'lucide-react';

export default function LedgerPage() {
  return (
    <DashboardLayout activeTab="ledger">
      <div className="min-h-screen bg-base-bg p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-8 h-8 text-[#635BFF]" />
            <h1 className="text-3xl font-bold text-white">Ledger</h1>
          </div>
          
          <div className="glass-panel p-12 text-center">
            <p className="text-text-secondary mb-4">
              Complete transaction history and reconciliation
            </p>
            <p className="text-sm text-text-tertiary">
              Coming soon: Advanced ledger analytics, export capabilities, and real-time reconciliation status
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
