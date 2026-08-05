import React, { useState } from 'react';
import {
  Copy,
  Check,
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  ShieldCheck,
  Box,
  Terminal as TerminalIcon,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import CodeBlock from './CodeBlock';
import './Hero.css';

const CODE_EXAMPLES = {
  matrices: {
    title: 'matrix_ops.py',
    label: 'Linear Algebra',
    code: `import kiwicalc as kc

# Define matrices with clean, intuitive syntax
A = kc.Matrix([[4, 2], [1, 3]])
B = kc.Matrix([[1, 0], [2, 5]])

# Perform operations & eigenvalue analysis
C = A @ B + kc.eye(2)
det = C.determinant()
eigenvalues = C.eigenvalues()

print(f"Result Matrix:\\n{C}")
print(f"det(C) = {det}")
print(f"Eigenvalues = {eigenvalues}")`,
    output: `Result Matrix:
[[ 9  10]
 [ 7  16]]
det(C) = 74.00
Eigenvalues = [21.81, 3.19]`,
  },
  calculus: {
    title: 'calculus.py',
    label: 'Calculus & Solvers',
    code: `import kiwicalc as kc

# Define symbolic or numerical expressions
f = lambda x: x**3 - 4*x**2 + 6*x - 2

# Compute derivative, integral, and roots
df = kc.derivative(f, order=1)
integral_val = kc.integrate(f, lower=0, upper=3)
root = kc.solve_root(f, initial_guess=0.5)

print(f"f'(2.0) = {df(2.0)}")
print(f"Area under f (0 to 3) = {integral_val:.4f}")
print(f"Root near 0.5 = {root:.4f}")`,
    output: `f'(2.0) = 2.0000
Area under f (0 to 3) = 5.2500
Root near 0.5 = 0.4421`,
  },
  vectors: {
    title: 'vectors_stats.py',
    label: 'Vectors & Stats',
    code: `import kiwicalc as kc

# Vector algebra and statistical distribution
u = kc.Vector([3.0, 4.0, 0.0])
v = kc.Vector([1.0, 2.0, 2.0])

dot_prod = u.dot(v)
angle = u.angle_with(v, unit='degrees')
norm = u.norm()

print(f"Dot Product (u · v) = {dot_prod}")
print(f"Angle between u & v = {angle:.2f}°")
print(f"Norm ||u|| = {norm}")`,
    output: `Dot Product (u · v) = 11.0
Angle between u & v = 42.83°
Norm ||u|| = 5.0`,
  },
};

export default function Hero() {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('matrices');
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(true);

  const installCommand = 'pip install kiwicalc';

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(installCommand);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_EXAMPLES[activeTab].code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setShowOutput(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowOutput(true);
    }, 400);
  };

  return (
    <section className="hero-section">
      {/* Subtle background glow effect */}
      <div className="hero-glow-sphere" />

      <div className="container hero-container">
        {/* Left Column: Hero Content & CTA */}
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <span className="badge-pulse-dot" />
            <span className="badge-text">Modern Python Math & Computing</span>
          </div>

          {/* Headline */}
          <h1 className="hero-title">
            Fast, Intuitive <br />
            <span className="text-gradient">Mathematical Computing</span> <br />
            in Python
          </h1>

          {/* Description */}
          <p className="hero-description">
            KiwiCalc blends the elegance of clean mathematical syntax with
            high-performance computation. From matrix decompositions to numerical calculus
            and vector calculus—solve complex math with minimal code.
          </p>

          {/* 1-Click Install Bar */}
          <div className="hero-install-box">
            <div className="install-prompt">
              <span className="terminal-symbol">$</span>
              <code className="install-text">{installCommand}</code>
            </div>
            <button
              className={`btn-copy-install ${copiedInstall ? 'copied' : ''}`}
              onClick={handleCopyInstall}
              title="Copy to clipboard"
              id="hero-copy-install-btn"
            >
              {copiedInstall ? (
                <>
                  <Check size={16} className="text-kiwi" />
                  <span className="copy-label">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span className="copy-label">Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions">
            <a href="#playground" className="btn-primary" id="hero-get-started-btn">
              <span>Try Live Sandbox</span>
              <ArrowRight size={18} />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              id="hero-view-github-btn"
            >
              <GithubIcon size={18} />
              <span>View on GitHub</span>
            </a>
          </div>

          {/* Highlights / Badges */}
          <div className="hero-highlights">
            <div className="highlight-item">
              <Zap size={16} className="highlight-icon" />
              <span>Fast & Vectorized</span>
            </div>
            <div className="highlight-item">
              <Box size={16} className="highlight-icon" />
              <span>Zero Bloat</span>
            </div>
            <div className="highlight-item">
              <ShieldCheck size={16} className="highlight-icon" />
              <span>100% Type-Safe</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Code Showcase IDE */}
        <div className="hero-showcase">
          <div className="ide-window">
            {/* Window Top Bar */}
            <div className="ide-header">
              <div className="ide-controls">
                <span className="control-dot close" />
                <span className="control-dot minimize" />
                <span className="control-dot expand" />
              </div>

              {/* Tabs */}
              <div className="ide-tabs">
                {Object.entries(CODE_EXAMPLES).map(([key, item]) => (
                  <button
                    key={key}
                    className={`ide-tab ${activeTab === key ? 'active' : ''}`}
                    onClick={() => setActiveTab(key)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Header Action Buttons */}
              <div className="ide-actions">
                <button
                  className="ide-btn-action"
                  onClick={handleCopyCode}
                  title="Copy code snippet"
                  id="ide-copy-code-btn"
                >
                  {copiedCode ? <Check size={14} className="text-kiwi" /> : <Copy size={14} />}
                </button>
                <button
                  className={`ide-btn-run ${isRunning ? 'running' : ''}`}
                  onClick={handleRunCode}
                  title="Run code"
                  id="ide-run-code-btn"
                >
                  <Play size={13} fill="currentColor" />
                  <span>Run</span>
                </button>
              </div>
            </div>

            {/* Code Body with Syntax Highlighting */}
            <div className="ide-code-container">
              <CodeBlock code={CODE_EXAMPLES[activeTab].code} language="python" />
            </div>

            {/* Simulated Live Output Console */}
            <div className="ide-console">
              <div className="console-header">
                <div className="console-title">
                  <TerminalIcon size={13} />
                  <span>Terminal Output</span>
                </div>
                <span className="console-status">
                  {isRunning ? 'Computing...' : 'Status: 0 (Success)'}
                </span>
              </div>
              <div className="console-body">
                {isRunning ? (
                  <div className="console-loading">
                    <span className="spinner" />
                    <span>Executing Python kernel...</span>
                  </div>
                ) : showOutput ? (
                  <pre className="console-output">
                    {CODE_EXAMPLES[activeTab].output}
                  </pre>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
