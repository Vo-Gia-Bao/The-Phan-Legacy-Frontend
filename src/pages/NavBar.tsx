
import { useEffect, useState } from 'react';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <button
        className="nav-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        THE PHAN LEGACY<span>.</span>
      </button>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      <nav className={`nav-links ${menuOpen ? 'menu-open' : ''}`}>
        <a href="/tour" onClick={() => setMenuOpen(false)}>
          Tour
        </a>
        <a href="#history" onClick={() => setMenuOpen(false)}>
          Lịch Sử
        </a>
        <a href="#features" onClick={() => setMenuOpen(false)}>
          Thành Tích
        </a>
        <a href="/pov" onClick={() => setMenuOpen(false)}>
          POV
        </a>
      </nav>
    </header>
  );
}
