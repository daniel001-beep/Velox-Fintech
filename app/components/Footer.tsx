import Link from 'next/link';

const Footer = () => {
  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ];

  const socialLinks = [
    { icon: 'fa-twitter', href: '#' },
    { icon: 'fa-instagram', href: '#' },
    { icon: 'fa-facebook', href: '#' },
    { icon: 'fa-linkedin', href: '#' },
  ];

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 text-gray-400 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link href="/" className="text-3xl font-bold text-white tracking-wider mb-4 inline-block">
              VELOX
            </Link>
            <p className="text-sm">Premium E-Commerce Store for curated collections.</p>
          </div>

          {/* Links Section */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href} className="mb-2">
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.icon} href={social.href} target="_blank" rel="noopener noreferrer" className="text-xl hover:text-white transition-colors">
                  <i className={`fab ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Velox. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;