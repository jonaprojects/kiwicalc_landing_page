import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Terminal, ExternalLink } from 'lucide-react';
import { GithubIcon, GitBookIcon } from './Icons';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand */}
        <a href="#" className="brand-link">
          <div className="brand-logo-icon">
            <svg viewBox="0 0 100 100" className="kiwi-svg-logo">
              <circle cx="50" cy="50" r="46" fill="#10b981" />
              <circle cx="50" cy="50" r="38" fill="#84cc16" />
              <circle cx="50" cy="50" r="25" fill="#f7fee7" />
              <circle cx="50" cy="50" r="14" fill="#15803d" />
              {/* Seeds */}
              <circle cx="45" cy="45" r="2.8" fill="#0f172a" />
              <circle cx="55" cy="45" r="2.8" fill="#0f172a" />
              <circle cx="50" cy="55" r="2.8" fill="#0f172a" />
              <circle cx="43" cy="52" r="2.8" fill="#0f172a" />
              <circle cx="57" cy="52" r="2.8" fill="#0f172a" />
            </svg>
          </div>
          <span className="brand-name">
            Kiwi<span className="brand-accent">Calc</span>
          </span>
          <span className="brand-badge">v0.1.0</span>
        </a>

        {/* Links */}
        <nav className="nav-menu">
          <a href="#features" className="nav-link">
            Features
          </a>
          <a href="#playground" className="nav-link">
            Sandbox
          </a>
          <a href="#recipes" className="nav-link">
            Recipes
          </a>
          <a href="#worksheets" className="nav-link">
            Worksheets
          </a>
          <a
            href="https://jona-projects.gitbook.io/kiwicalc"
            target="_blank"
            rel="noreferrer"
            className="nav-link doc-link"
          >
            <GitBookIcon size={15} className="nav-link-icon" />
            <span>Docs</span>
            <ExternalLink size={12} className="nav-link-external" />
          </a>
        </nav>

        {/* Action Button */}
        <div className="nav-actions">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn-github"
            id="nav-github-btn"
          >
            <GithubIcon size={18} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
