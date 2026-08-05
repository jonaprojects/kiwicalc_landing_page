import React from 'react';
import {
  BookOpen,
  ArrowRight,
  Calculator,
  Sparkles,
  Compass,
  FileText,
  Activity,
  Layers,
  Star,
} from 'lucide-react';
import { GithubIcon, GitBookIcon } from './Icons';
import './DocsCTA.css';

const DOC_CHAPTERS = [
  {
    title: 'Basics & Setup',
    desc: 'Installation, imports, and 30-second primer.',
    url: 'https://jona-projects.gitbook.io/kiwicalc/basics/installation',
    icon: BookOpen,
  },
  {
    title: 'Equations & Systems',
    desc: 'Linear, quadratic, cubic, and polynomial solvers.',
    url: 'https://jona-projects.gitbook.io/kiwicalc/equations/linear-equations',
    icon: Calculator,
  },
  {
    title: 'Symbolic Algebra',
    desc: 'Variables, Polynomials, and Trigonometry.',
    url: 'https://jona-projects.gitbook.io/kiwicalc/symbolic-computation/var',
    icon: Sparkles,
  },
  {
    title: 'Analytic Geometry',
    desc: '2D/3D vectors, points, circles, and surfaces.',
    url: 'https://jona-projects.gitbook.io/kiwicalc/analytic-geometry/vector',
    icon: Compass,
  },
  {
    title: 'Numerical Methods',
    desc: 'Finite integrals and root-finding algorithms.',
    url: 'https://jona-projects.gitbook.io/kiwicalc/numerical-methods/finite-integrals',
    icon: Activity,
  },
  {
    title: 'PDF Worksheets',
    desc: 'Generate printable exercises and solution sheets.',
    url: 'https://jona-projects.gitbook.io/kiwicalc/pdf-worksheets/getting-started',
    icon: FileText,
  },
];

export default function DocsCTA() {
  return (
    <section className="docs-section" id="docs">
      <div className="container">
        {/* Banner Card */}
        <div className="docs-hero-banner">
          <div className="banner-glow-bg" />

          <div className="banner-header">
            <div className="section-badge">
              <GitBookIcon size={16} />
              <span>Official GitBook Documentation</span>
            </div>

            <h2 className="banner-title">
              Everything You Need to Master <span className="text-gradient">KiwiCalc</span>
            </h2>

            <p className="banner-subtitle">
              Comprehensive API references, mathematical proofs, code recipes, and step-by-step
              tutorials are available on our official GitBook documentation.
            </p>

            <div className="banner-actions">
              <a
                href="https://jona-projects.gitbook.io/kiwicalc"
                target="_blank"
                rel="noreferrer"
                className="btn-gitbook-primary"
                id="docs-open-gitbook-btn"
              >
                <GitBookIcon size={18} />
                <span>Open KiwiCalc GitBook</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="https://github.com/jonaprojects/kiwicalc_landing_page"
                target="_blank"
                rel="noreferrer"
                className="btn-github-secondary"
                id="docs-star-github-btn"
              >
                <GithubIcon size={18} />
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>

          {/* Quick Jump Links */}
          <div className="doc-chapters-grid">
            {DOC_CHAPTERS.map((chap, idx) => {
              const IconComp = chap.icon;
              return (
                <a
                  key={idx}
                  href={chap.url}
                  target="_blank"
                  rel="noreferrer"
                  className="chapter-card"
                  id={`doc-chapter-${idx}`}
                >
                  <div className="chapter-icon-box">
                    <IconComp size={18} />
                  </div>
                  <div className="chapter-info">
                    <span className="chapter-title">{chap.title}</span>
                    <span className="chapter-desc">{chap.desc}</span>
                  </div>
                  <ArrowRight size={15} className="chapter-arrow" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
