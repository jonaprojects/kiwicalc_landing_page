import React from 'react';
import {
  Calculator,
  Sparkles,
  TrendingUp,
  Compass,
  Grid,
  FileText,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';
import CodeBlock from './CodeBlock';
import './Features.css';

const FEATURES_DATA = [
  {
    id: 'equations',
    icon: Calculator,
    tag: 'Solvers',
    title: 'Equations & Systems',
    description:
      'Solve linear, quadratic, cubic, quartic, and polynomial equations with real or complex root support in a single line.',
    code: 'solutions = solve_quadratic_real(1, 6, 8)\n# => [-2.0, -4.0]',
    docUrl: 'https://jona-projects.gitbook.io/kiwicalc/equations/linear-equations',
    accentColor: '#10b981',
  },
  {
    id: 'symbolic',
    icon: Sparkles,
    tag: 'Algebra',
    title: 'Symbolic Computation',
    description:
      'Build and simplify algebraic expressions with pure symbolic variables, trigonometric identities, logarithms, and powers.',
    code: "x = Var('x')\nexpr = 3*x**2 + 5*x - 2",
    docUrl: 'https://jona-projects.gitbook.io/kiwicalc/symbolic-computation/var',
    accentColor: '#84cc16',
  },
  {
    id: 'calculus',
    icon: TrendingUp,
    tag: 'Calculus',
    title: 'Functions & Derivatives',
    description:
      'Compute analytical derivatives, evaluate finite integrals, chain transformations with FunctionChain, and find roots.',
    code: 'f = Function(lambda x: x**3 - 2*x)\ndf = f.derivative()',
    docUrl: 'https://jona-projects.gitbook.io/kiwicalc/functions/derivatives',
    accentColor: '#06b6d4',
  },
  {
    id: 'geometry',
    icon: Compass,
    tag: 'Geometry',
    title: 'Analytic Geometry & 3D',
    description:
      'Model 2D/3D vectors, point collections, circles, surfaces, and compute dot products, cross products, and projections.',
    code: 'u = Vector([3, 4, 0])\nprint(u.norm()) # => 5.0',
    docUrl: 'https://jona-projects.gitbook.io/kiwicalc/analytic-geometry/vector',
    accentColor: '#3b82f6',
  },
  {
    id: 'linalg',
    icon: Grid,
    tag: 'Linear Algebra',
    title: 'Matrices & Transforms',
    description:
      'High-performance matrix operations: determinants, inverses, eigenvalues, decompositions, and systems of linear equations.',
    code: 'A = Matrix([[2, 1], [5, 3]])\nA_inv = A.inverse()',
    docUrl: 'https://jona-projects.gitbook.io/kiwicalc/linear-algebra/matrices',
    accentColor: '#a855f7',
  },
  {
    id: 'pdf-worksheets',
    icon: FileText,
    tag: 'Education',
    title: 'PDF Worksheet Generator',
    description:
      'Instantly generate clean, printable PDF worksheets for math classes with exercises and auto-computed step-by-step solution sheets.',
    code: 'ws = Worksheet(title="Calculus I")\nws.export_pdf("exam.pdf")',
    docUrl: 'https://jona-projects.gitbook.io/kiwicalc/pdf-worksheets/creating-pdfs',
    accentColor: '#f59e0b',
  },
];

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <span className="badge-sparkle">✦</span>
            <span>Mathematical Capabilities</span>
          </div>
          <h2 className="section-title">
            Engineered for <span className="text-gradient">Every Branch</span> of Mathematics
          </h2>
          <p className="section-subtitle">
            From foundational school algebra to advanced university-level calculus, linear
            transformations, and automated worksheet generation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="features-grid">
          {FEATURES_DATA.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={feat.id}
                className="feature-card"
                style={{ '--card-accent': feat.accentColor }}
                id={`feature-${feat.id}`}
              >
                <div className="card-ambient-glow" />
                
                <div className="card-top">
                  <div className="card-icon-box">
                    <IconComponent size={22} className="card-icon" />
                  </div>
                  <span className="card-tag">{feat.tag}</span>
                </div>

                <h3 className="card-title">{feat.title}</h3>
                <p className="card-description">{feat.description}</p>

                {/* Mini Code Snippet with Syntax Highlighting */}
                <div className="card-snippet">
                  <CodeBlock code={feat.code} language="python" />
                </div>

                {/* GitBook Documentation Link */}
                <a
                  href={feat.docUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="card-doc-link"
                  title={`Read ${feat.title} in KiwiCalc Docs`}
                >
                  <span>Explore Documentation</span>
                  <ArrowUpRight size={15} className="arrow-icon" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Banner callout at the bottom */}
        <div className="features-bottom-callout">
          <div className="callout-content">
            <h4>Need more than just the basics?</h4>
            <p>
              KiwiCalc also includes probability trees, sequence progressions (arithmetic, geometric, recursive), and lightweight ML foundations.
            </p>
          </div>
          <a
            href="https://jona-projects.gitbook.io/kiwicalc"
            target="_blank"
            rel="noreferrer"
            className="callout-btn"
          >
            <span>View Full GitBook Index</span>
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
