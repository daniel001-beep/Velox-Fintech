import React from 'react';
import { CheckCircle, Zap, Shield, TrendingUp, Key, Cpu, Lock, AlertCircle } from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  compliance: ('soc2' | 'pci')[];
  pricingModel: string;
  icon: React.ElementType;
  gradient: string;
}

const products: Product[] = [
  {
    id: 'fraud-detection',
    title: 'AI Fraud Detection',
    description: 'Real-time monitoring powered by Gemini LLM. Detect anomalies in milliseconds with machine learning precision.',
    category: 'Security',
    features: [
      'Real-time anomaly detection',
      'Gemini LLM integration',
      'Sub-millisecond latency',
      'Customizable thresholds',
    ],
    compliance: ['soc2', 'pci'],
    pricingModel: 'Usage-based • $0.05-0.50/1M transactions',
    icon: Zap,
    gradient: 'from-[#635BFF] to-[#7A73FF]',
  },
  {
    id: 'multicurrency',
    title: 'Multi-Currency Engine',
    description: 'Automatic reconciliation API with live FX rates. Handle 50+ currencies with sub-10ms latency.',
    category: 'Integration',
    features: [
      'Live FX rate updates',
      'Automatic reconciliation',
      '50+ currency support',
      'Sub-10ms latency guarantee',
    ],
    compliance: ['pci'],
    pricingModel: 'Subscription • $499-2,990/month',
    icon: TrendingUp,
    gradient: 'from-[#00FFC2] to-[#00E6AA]',
  },
  {
    id: 'commerce-agent',
    title: 'Autonomous Commerce Agent',
    description: 'Secure HTTP stablecoin protocol (x402). Orchestrate complex transactions autonomously.',
    category: 'Protocol',
    features: [
      'x402 protocol compliance',
      'Autonomous execution',
      'Stablecoin settlement',
      'Zero-trust architecture',
    ],
    compliance: ['soc2', 'pci'],
    pricingModel: 'License • $1,950/month',
    icon: Cpu,
    gradient: 'from-[#FFB740] to-[#FFC857]',
  },
  {
    id: 'insurtech',
    title: 'Embedded Insurtech API',
    description: 'Dynamic policy purchasing with real-time quote generation. Programmatic insurance integration.',
    category: 'Insurance',
    features: [
      'Real-time quote generation',
      'Dynamic policy purchasing',
      'Automated claims processing',
      'Risk assessment engine',
    ],
    compliance: ['soc2'],
    pricingModel: 'Credits • $0.10-0.75 per policy',
    icon: Shield,
    gradient: 'from-[#FF6B6B] to-[#FF8787]',
  },
  {
    id: 'digital-id',
    title: 'Digital ID Verification',
    description: 'Biometric KYC/AML verification. Enterprise-grade compliance with real-time decisioning.',
    category: 'Compliance',
    features: [
      'Biometric verification',
      'KYC/AML screening',
      'Real-time decisioning',
      'GDPR-compliant storage',
    ],
    compliance: ['soc2', 'pci'],
    pricingModel: 'Usage-based • $0.75-2.50 per verification',
    icon: Lock,
    gradient: 'from-[#9F7AEA] to-[#B794F6]',
  },
  {
    id: 'cash-flow',
    title: 'Cash Flow Forecaster',
    description: 'Predictive liquidity algorithms using supervised learning. Pro Plan includes real-time dashboards.',
    category: 'Analytics',
    features: [
      'Predictive modeling',
      'Liquidity forecasts',
      'Real-time dashboards',
      '90-day projections',
    ],
    compliance: ['pci'],
    pricingModel: 'Pro Plan • $2,490/month',
    icon: TrendingUp,
    gradient: 'from-[#48BB78] to-[#68D391]',
  },
  {
    id: 'spend-optimizer',
    title: 'SaaS Spend Optimizer',
    description: 'Subscription rate negotiator tool powered by AI. Achieve 30%+ savings on enterprise SaaS.',
    category: 'Optimization',
    features: [
      'AI-powered negotiation',
      'Spend analytics',
      '30%+ savings average',
      'Audit trail logging',
    ],
    compliance: [],
    pricingModel: 'Revenue share • 20% of savings',
    icon: AlertCircle,
    gradient: 'from-[#ECC94B] to-[#F6E05E]',
  },
  {
    id: 'wallet-rails',
    title: 'Programmable Wallet Rails',
    description: 'Key governance API License for wallet infrastructure. Secure fund movement with audit logging.',
    category: 'Infrastructure',
    features: [
      'Key governance',
      'Fund movement APIs',
      'Audit trail logging',
      'Multi-sig support',
    ],
    compliance: ['soc2', 'pci'],
    pricingModel: 'License • $3,990/month',
    icon: Key,
    gradient: 'from-[#ED64A6] to-[#F687B3]',
  },
];

interface MarketplaceGridProps {
  onSelectProduct?: (productId: string) => void;
}

export default function MarketplaceGrid({ onSelectProduct }: MarketplaceGridProps) {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-[rgba(99,91,255,0.1)] px-8 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Digital Marketplace
        </h1>
        <p className="text-text-secondary max-w-2xl">
          Enterprise-grade financial infrastructure. Select and integrate services directly into your ledger.
        </p>
      </div>

      {/* Product Grid - 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {products.map((product) => {
          const Icon = product.icon;
          
          return (
            <div
              key={product.id}
              className="group glass-panel hover:bg-[rgba(99,91,255,0.1)] hover:border-[rgba(99,91,255,0.2)] transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Header Gradient Accent */}
              <div className={`h-1 bg-linear-to-r ${product.gradient}`}></div>

              {/* Product Content */}
              <div className="flex flex-col gap-4 p-6 flex-1">
                {/* Icon & Title */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-white mb-1">
                      {product.title}
                    </h3>
                    <p className="text-xs text-[#00FFC2] font-semibold uppercase tracking-wider">
                      {product.category}
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${product.gradient} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {product.description}
                </p>

                {/* Features List */}
                <div className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-[#00FFC2] shrink-0 mt-0.5" />
                      <span className="text-xs text-text-secondary">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Compliance Badges */}
                {product.compliance.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {product.compliance.map((badge) => (
                      <span
                        key={badge}
                        className={`text-xs font-semibold px-2.5 py-1 rounded border ${
                          badge === 'soc2'
                            ? 'bg-[rgba(0,255,194,0.1)] border-[rgba(0,255,194,0.3)] text-carbon-mint'
                            : 'bg-[rgba(99,91,255,0.1)] border-[rgba(99,91,255,0.3)] text-electric-pulse'
                        }`}
                      >
                        {badge.toUpperCase()} Type II
                      </span>
                    ))}
                  </div>
                )}

                {/* Pricing Model */}
                <div className="pt-2 border-t border-[rgba(99,91,255,0.1)]">
                  <p className="text-xs text-text-tertiary mb-3">
                    {product.pricingModel}
                  </p>

                  {/* Select Button */}
                  <button
                    onClick={() => onSelectProduct?.(product.id)}
                    className="w-full py-2.5 px-4 bg-linear-to-r from-electric-pulse to-electric-pulse-light hover:from-electric-pulse-light hover:to-[#8B81FF] text-white text-sm font-semibold rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(99,91,255,0.3)]"
                  >
                    Select Service
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="border-t border-[rgba(99,91,255,0.1)] px-8 py-12 bg-[rgba(99,91,255,0.02)]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-carbon-mint font-bold text-lg mb-2">SOC 2 Type II</h4>
            <p className="text-sm text-text-secondary">
              Enterprise-grade security and compliance certifications across all services
            </p>
          </div>
          <div>
            <h4 className="text-electric-pulse font-bold text-lg mb-2">Sub-50ms Latency</h4>
            <p className="text-sm text-text-secondary">
              Optimized for high-frequency trading and real-time reconciliation
            </p>
          </div>
          <div>
            <h4 className="text-carbon-mint font-bold text-lg mb-2">Usage-Based Pricing</h4>
            <p className="text-sm text-text-secondary">
              Scale-as-you-grow model with transparent billing and no hidden fees
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
