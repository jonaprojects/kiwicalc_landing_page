import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Playground from './components/Playground';
import Recipes from './components/Recipes';
import WorksheetSpotlight from './components/WorksheetSpotlight';
import DocsCTA from './components/DocsCTA';
import { GithubIcon, GitBookIcon } from './components/Icons';
import './App.css';

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Playground />
        <Recipes />
        <WorksheetSpotlight />
        <DocsCTA />
      </main>

      {/* Rich Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top-grid">
            {/* Brand Column */}
            <div className="footer-brand-col">
              <div className="brand-link">
                <div className="brand-logo-icon">
                  <svg viewBox="0 0 100 100" className="kiwi-svg-logo">
                    <circle cx="50" cy="50" r="46" fill="#10b981" />
                    <circle cx="50" cy="50" r="38" fill="#84cc16" />
                    <circle cx="50" cy="50" r="25" fill="#f7fee7" />
                    <circle cx="50" cy="50" r="14" fill="#15803d" />
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
              </div>
              <p className="footer-tagline">
                Fast, intuitive mathematical computing library in Python. From linear algebra and
                calculus to automated PDF worksheets.
              </p>
              <div className="footer-socials">
                <a
                  href="https://jona-projects.gitbook.io/kiwicalc"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  title="KiwiCalc GitBook"
                >
                  <GitBookIcon size={16} />
                  <span>GitBook Docs</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-btn"
                  title="GitHub Repository"
                >
                  <GithubIcon size={16} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div className="footer-links-col">
              <h5 className="footer-col-title">Mathematical Modules</h5>
              <ul className="footer-nav-list">
                <li>
                  <a
                    href="https://jona-projects.gitbook.io/kiwicalc/equations/linear-equations"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Equations & Solvers
                  </a>
                </li>
                <li>
                  <a
                    href="https://jona-projects.gitbook.io/kiwicalc/symbolic-computation/var"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Symbolic Algebra
                  </a>
                </li>
                <li>
                  <a
                    href="https://jona-projects.gitbook.io/kiwicalc/functions/derivatives"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Functions & Derivatives
                  </a>
                </li>
                <li>
                  <a
                    href="https://jona-projects.gitbook.io/kiwicalc/analytic-geometry/vector"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Analytic Geometry & 3D
                  </a>
                </li>
                <li>
                  <a
                    href="https://jona-projects.gitbook.io/kiwicalc/linear-algebra/matrices"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Matrices & Linear Algebra
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h5 className="footer-col-title">Documentation</h5>
              <ul className="footer-nav-list">
                <li>
                  <a
                    href="https://jona-projects.gitbook.io/kiwicalc/basics/installation"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Installation Guide
                  </a>
                </li>
                <li>
                  <a
                    href="https://jona-projects.gitbook.io/kiwicalc/basics/usage"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Basic Usage & Imports
                  </a>
                </li>
                <li>
                  <a
                    href="https://jona-projects.gitbook.io/kiwicalc/pdf-worksheets/creating-pdfs"
                    target="_blank"
                    rel="noreferrer"
                  >
                    PDF Worksheets Guide
                  </a>
                </li>
                <li>
                  <a
                    href="https://jona-projects.gitbook.io/kiwicalc/numerical-methods/finite-integrals"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Numerical Integrals
                  </a>
                </li>
                <li>
                  <a
                    href="https://jona-projects.gitbook.io/kiwicalc/probability/probability-trees"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Probability Trees
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h5 className="footer-col-title">Quick Jump</h5>
              <ul className="footer-nav-list">
                <li>
                  <a href="#features">Features Grid</a>
                </li>
                <li>
                  <a href="#playground">Live Sandbox</a>
                </li>
                <li>
                  <a href="#recipes">Code Recipes</a>
                </li>
                <li>
                  <a href="#worksheets">Worksheet Generator</a>
                </li>
                <li>
                  <a href="#docs">GitBook Hub</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <p className="footer-copy">
              © {new Date().getFullYear()} KiwiCalc. Open Source under the MIT License.
            </p>
            <div className="footer-bottom-tags">
              <span className="status-pill">
                <span className="dot dot-green" />
                Pure Python • Zero Complex Build Tools
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
