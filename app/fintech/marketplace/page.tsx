'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import MarketplaceGrid from '@/app/components/MarketplaceGrid';

export default function MarketplacePage() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleSelectProduct = (productId: string) => {
    setSelectedProduct(productId);
    // Show toast or modal for product selection
    console.log(`Selected product: ${productId}`);
  };

  return (
    <DashboardLayout activeTab="marketplace">
      <div className="min-h-screen bg-base-bg">
        <MarketplaceGrid onSelectProduct={handleSelectProduct} />
      </div>
    </DashboardLayout>
  );
}
