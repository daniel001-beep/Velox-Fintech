"use client";

import Link from 'next/link';
import { DollarSign, BarChart3, Lock, Server } from 'lucide-react';

const Navbar = () => {
  const navLinks = [
    { href: '/fintech/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/fintech/marketplace', label: 'Marketplace', icon: DollarSign },
    { href: '/fintech/ledger', label: 'Ledger', icon: BarChart3 },
    { href: '/fintech/security', label: 'Security', icon: Lock },
    { href: '/fintech/api-status', label: 'API Status', icon: Server },
  ];

  return (
    <header className="navbar sticky-glass">
      <div className="container flex items-center justify-between">
        <Link href="/fintech/dashboard" className="text-2xl font-bold text-white tracking-wider">
          VELOX <span className="text-sm font-light text-blue-400">FINTECH</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <ul className="nav-menu">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link href={link.href} className="nav-link-anim flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;