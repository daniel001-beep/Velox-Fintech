"use client";

import { useState } from 'react';
import Link from 'next/link';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const footerLinks = [
    { href: '/fintech/dashboard', label: 'Dashboard' },
    { href: '/fintech/marketplace', label: 'Marketplace' },
    { href: '/fintech/ledger', label: 'Ledger' },
    { href: '/fintech/security', label: 'Security' },
    { href: '/fintech/api-status', label: 'API Status' },
  ];

  const productCategories = [
    { label: 'Asset Management' },
    { label: 'Fixed Income' },
    { label: 'Equities' },
    { label: 'Derivatives' },
  ];

  const socialLinks = [
    { icon: 'fa-twitter', href: '#', label: 'Twitter' },
    { icon: 'fa-linkedin', href: '#', label: 'LinkedIn' },
    { icon: 'fa-github', href: '#', label: 'GitHub' },
    { icon: 'fa-globe', href: '#', label: 'Website' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 text-gray-400 py-16">
      <div className="container mx-auto px-6">
        {/* Newsletter Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Stay Connected</h3>
            <p className="text-gray-400 mb-6">Get real-time market updates, portfolio insights, and exclusive fintech news delivered to your inbox.</p>
            {subscribed ? (
              <div className="inline-block text-emerald-400 font-medium">✓ You're all set! Check your inbox for a welcome guide.</div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link href="/fintech/dashboard" className="text-3xl font-bold text-white tracking-wider mb-4 inline-block">
              VELOX<span className="text-sm text-blue-400 ml-1">Fintech</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">Enterprise-grade financial asset management platform built for wealth optimization and real-time trading.</p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title={social.label}
                >
                  <i className={`fab ${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              {productCategories.map((cat, idx) => (
                <li key={idx}>
                  <a href="#" className="text-sm hover:text-white transition-colors">
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">API Docs</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Cookies</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Sitemap</a></li>
              <li><a href="#" className="text-sm hover:text-white transition-colors">Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Velox Fintech. All Rights Reserved. | Enterprise Financial Platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;