import Link from 'next/link';

const Navbar = () => {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <header className="navbar sticky-glass">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white tracking-wider">
          VELOX
        </Link>
        <nav className="hidden md:block">
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link-anim">{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;