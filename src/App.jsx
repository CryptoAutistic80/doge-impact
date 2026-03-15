import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, Beaker, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      <nav className="navbar">
        <Link to="/" className="brand">
          <Activity size={20} color="var(--red)" />
          <span>DOGE IMPACT</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Overview</Link>
          <Link to="/methodology" className={location.pathname === '/methodology' ? 'active' : ''}>Methodology</Link>
          <Link to="/sources" className={location.pathname === '/sources' ? 'active' : ''}>Sources</Link>
        </div>
      </nav>

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
