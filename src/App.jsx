import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/" className="brand" onClick={closeMenu}>
          <Activity size={20} color="var(--red)" />
          <span>DOGE IMPACT</span>
        </Link>

        {/* Desktop nav links */}
        <div className="nav-links desktop-nav">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Overview</Link>
          <Link to="/methodology" className={location.pathname === '/methodology' ? 'active' : ''}>Methodology</Link>
          <Link to="/sources" className={location.pathname === '/sources' ? 'active' : ''}>Sources</Link>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMenu}>Overview</Link>
            <Link to="/methodology" className={location.pathname === '/methodology' ? 'active' : ''} onClick={closeMenu}>Methodology</Link>
            <Link to="/sources" className={location.pathname === '/sources' ? 'active' : ''} onClick={closeMenu}>Sources</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="page-content"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <footer className="footer">
        <p>
          Based on peer-reviewed research from Boston University,<br />
          The Lancet, and the Center for Global Development.<br /><br />
          Two-thirds of the dead are children.<br /><br />
          "Zero people have died." — Elon Musk<br /><br />
          Last updated: March 2026
        </p>
      </footer>
    </div>
  );
}

