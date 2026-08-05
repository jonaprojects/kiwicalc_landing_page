import React, { useState } from 'react';
import {
  Calculator,
  Compass,
  Layers,
  Play,
  RotateCcw,
  Sparkles,
  Check,
  Copy,
  ArrowRight,
} from 'lucide-react';
import CodeBlock from './CodeBlock';
import './Playground.css';

export default function Playground() {
  const [activeTab, setActiveTab] = useState('quadratic');
  const [copiedCode, setCopiedCode] = useState(false);

  // Tab 1: Quadratic State
  const [quadA, setQuadA] = useState(1);
  const [quadB, setQuadB] = useState(6);
  const [quadC, setQuadC] = useState(8);

  // Tab 2: Vector State
  const [vecU, setVecU] = useState([3, 4, 0]);
  const [vecV, setVecV] = useState([1, 2, 2]);

  // Tab 3: Sequence State
  const [seqType, setSeqType] = useState('arithmetic');
  const [seqA1, setSeqA1] = useState(3);
  const [seqStep, setSeqStep] = useState(4);
  const [seqN, setSeqN] = useState(6);

  // Calculations for Quadratic
  const computeQuadratic = () => {
    const a = parseFloat(quadA) || 0;
    const b = parseFloat(quadB) || 0;
    const c = parseFloat(quadC) || 0;

    if (a === 0) {
      return {
        discriminant: 0,
        type: 'Linear Equation',
        roots: b !== 0 ? [-c / b] : ['Undefined'],
        vertex: null,
      };
    }

    const delta = b * b - 4 * a * c;
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;

    if (delta > 0) {
      const r1 = (-b + Math.sqrt(delta)) / (2 * a);
      const r2 = (-b - Math.sqrt(delta)) / (2 * a);
      return {
        discriminant: delta,
        type: 'Two Distinct Real Roots',
        roots: [r1.toFixed(4).replace(/\.?0+$/, ''), r2.toFixed(4).replace(/\.?0+$/, '')],
        vertex: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`,
      };
    } else if (delta === 0) {
      const r = -b / (2 * a);
      return {
        discriminant: 0,
        type: 'One Repeated Real Root',
        roots: [r.toFixed(4).replace(/\.?0+$/, '')],
        vertex: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`,
      };
    } else {
      const realPart = (-b / (2 * a)).toFixed(3);
      const imagPart = (Math.sqrt(-delta) / (2 * a)).toFixed(3);
      return {
        discriminant: delta,
        type: 'Two Complex Conjugate Roots',
        roots: [`${realPart} + ${imagPart}i`, `${realPart} - ${imagPart}i`],
        vertex: `(${vertexX.toFixed(2)}, ${vertexY.toFixed(2)})`,
      };
    }
  };

  // Calculations for Vector
  const computeVectors = () => {
    const u = vecU.map((val) => parseFloat(val) || 0);
    const v = vecV.map((val) => parseFloat(val) || 0);

    const normU = Math.sqrt(u[0] ** 2 + u[1] ** 2 + u[2] ** 2);
    const normV = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
    const dot = u[0] * v[0] + u[1] * v[1] + u[2] * v[2];

    const cross = [
      u[1] * v[2] - u[2] * v[1],
      u[2] * v[0] - u[0] * v[2],
      u[0] * v[1] - u[1] * v[0],
    ];

    let angleDeg = 0;
    if (normU > 0 && normV > 0) {
      const cosTheta = Math.max(-1, Math.min(1, dot / (normU * normV)));
      angleDeg = (Math.acos(cosTheta) * (180 / Math.PI)).toFixed(2);
    }

    return {
      normU: normU.toFixed(3),
      normV: normV.toFixed(3),
      dot: dot.toFixed(3),
      cross: `[${cross.join(', ')}]`,
      angle: `${angleDeg}°`,
    };
  };

  // Calculations for Sequences
  const computeSequence = () => {
    const a1 = parseFloat(seqA1) || 0;
    const step = parseFloat(seqStep) || 0;
    const n = Math.max(1, Math.min(15, parseInt(seqN, 10) || 1));

    const terms = [];
    let sum = 0;

    for (let i = 0; i < n; i++) {
      let term = 0;
      if (seqType === 'arithmetic') {
        term = a1 + i * step;
      } else {
        term = a1 * Math.pow(step, i);
      }
      terms.push(Number.isInteger(term) ? term : term.toFixed(2));
      sum += typeof term === 'number' ? term : parseFloat(term);
    }

    const nthTerm = terms[terms.length - 1];

    return {
      terms,
      nthTerm,
      sum: Number.isInteger(sum) ? sum : sum.toFixed(2),
    };
  };

  const quadResult = computeQuadratic();
  const vecResult = computeVectors();
  const seqResult = computeSequence();

  // Python Code Generation
  const getPythonSnippet = () => {
    if (activeTab === 'quadratic') {
      return `from kiwicalc import solve_quadratic, solve_quadratic_real\n\n# Solve equation: ${quadA}x² + ${quadB}x + ${quadC} = 0\nsolutions = solve_quadratic(${quadA}, ${quadB}, ${quadC})\nprint(f"Roots: {solutions}")`;
    } else if (activeTab === 'vector') {
      return `from kiwicalc import Vector\n\nu = Vector([${vecU.join(', ')}])\nv = Vector([${vecV.join(', ')}])\n\nprint("Dot product:", u.dot(v))\nprint("Cross product:", u.cross(v))\nprint("Angle (deg):", u.angle_between(v))`;
    } else {
      return `from kiwicalc import ${seqType === 'arithmetic' ? 'ArithmeticProgression' : 'GeometricProgression'}\n\nseq = ${seqType === 'arithmetic' ? 'ArithmeticProgression' : 'GeometricProgression'}(a1=${seqA1}, ${seqType === 'arithmetic' ? 'd' : 'r'}=${seqStep})\nterms = seq.get_terms(n=${seqN})\nprint(f"Terms: {terms}")\nprint(f"Sum (S_{seqN}):", seq.sum(${seqN}))`;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getPythonSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="playground-section" id="playground">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={14} className="badge-sparkle" />
            <span>Interactive Sandbox</span>
          </div>
          <h2 className="section-title">
            Test KiwiCalc <span className="text-gradient">Live in Your Browser</span>
          </h2>
          <p className="section-subtitle">
            Interact with live computational models to see how KiwiCalc solves equations,
            vector geometry, and mathematical progressions with precision.
          </p>
        </div>

        {/* Sandbox Shell */}
        <div className="sandbox-wrapper">
          {/* Tabs Navigation */}
          <div className="sandbox-tabs">
            <button
              className={`sandbox-tab ${activeTab === 'quadratic' ? 'active' : ''}`}
              onClick={() => setActiveTab('quadratic')}
              id="tab-btn-quadratic"
            >
              <Calculator size={18} />
              <span>Quadratic Solver</span>
            </button>
            <button
              className={`sandbox-tab ${activeTab === 'vector' ? 'active' : ''}`}
              onClick={() => setActiveTab('vector')}
              id="tab-btn-vector"
            >
              <Compass size={18} />
              <span>Vector & 3D Geometry</span>
            </button>
            <button
              className={`sandbox-tab ${activeTab === 'sequence' ? 'active' : ''}`}
              onClick={() => setActiveTab('sequence')}
              id="tab-btn-sequence"
            >
              <Layers size={18} />
              <span>Progressions & Series</span>
            </button>
          </div>

          {/* Sandbox Main Container */}
          <div className="sandbox-grid">
            {/* Left: Interactive Controls */}
            <div className="sandbox-controls">
              {/* TAB 1: QUADRATIC CONTROLS */}
              {activeTab === 'quadratic' && (
                <div className="tab-panel">
                  <div className="panel-header">
                    <span className="formula-display">
                      Formula: <strong>{quadA}x² + {quadB}x + {quadC} = 0</strong>
                    </span>
                  </div>

                  <div className="inputs-row">
                    <div className="input-group">
                      <label htmlFor="quad-a">Coefficient a</label>
                      <input
                        id="quad-a"
                        type="number"
                        value={quadA}
                        onChange={(e) => setQuadA(e.target.value)}
                        className="sandbox-input"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="quad-b">Coefficient b</label>
                      <input
                        id="quad-b"
                        type="number"
                        value={quadB}
                        onChange={(e) => setQuadB(e.target.value)}
                        className="sandbox-input"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="quad-c">Coefficient c</label>
                      <input
                        id="quad-c"
                        type="number"
                        value={quadC}
                        onChange={(e) => setQuadC(e.target.value)}
                        className="sandbox-input"
                      />
                    </div>
                  </div>

                  {/* Preset quick buttons */}
                  <div className="presets-row">
                    <span className="presets-label">Presets:</span>
                    <button
                      className="btn-preset"
                      onClick={() => {
                        setQuadA(1);
                        setQuadB(6);
                        setQuadC(8);
                      }}
                    >
                      x² + 6x + 8
                    </button>
                    <button
                      className="btn-preset"
                      onClick={() => {
                        setQuadA(2);
                        setQuadB(-4);
                        setQuadC(-6);
                      }}
                    >
                      2x² - 4x - 6
                    </button>
                    <button
                      className="btn-preset"
                      onClick={() => {
                        setQuadA(1);
                        setQuadB(2);
                        setQuadC(5);
                      }}
                    >
                      Complex (x² + 2x + 5)
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: VECTOR CONTROLS */}
              {activeTab === 'vector' && (
                <div className="tab-panel">
                  <div className="panel-header">
                    <span className="formula-display">
                      Vectors: <strong>u = [{vecU.join(', ')}]</strong> & <strong>v = [{vecV.join(', ')}]</strong>
                    </span>
                  </div>

                  <div className="vector-inputs-block">
                    <span className="vector-label">Vector u (x, y, z):</span>
                    <div className="inputs-row">
                      {[0, 1, 2].map((idx) => (
                        <input
                          key={`u-${idx}`}
                          type="number"
                          value={vecU[idx]}
                          onChange={(e) => {
                            const newU = [...vecU];
                            newU[idx] = e.target.value;
                            setVecU(newU);
                          }}
                          className="sandbox-input"
                          aria-label={`u coordinate ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <span className="vector-label" style={{ marginTop: '0.75rem' }}>
                      Vector v (x, y, z):
                    </span>
                    <div className="inputs-row">
                      {[0, 1, 2].map((idx) => (
                        <input
                          key={`v-${idx}`}
                          type="number"
                          value={vecV[idx]}
                          onChange={(e) => {
                            const newV = [...vecV];
                            newV[idx] = e.target.value;
                            setVecV(newV);
                          }}
                          className="sandbox-input"
                          aria-label={`v coordinate ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Preset quick buttons */}
                  <div className="presets-row">
                    <span className="presets-label">Presets:</span>
                    <button
                      className="btn-preset"
                      onClick={() => {
                        setVecU([3, 4, 0]);
                        setVecV([1, 2, 2]);
                      }}
                    >
                      Orthogonal & 3D
                    </button>
                    <button
                      className="btn-preset"
                      onClick={() => {
                        setVecU([1, 0, 0]);
                        setVecV([0, 1, 0]);
                      }}
                    >
                      Perpendicular (90°)
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: SEQUENCE CONTROLS */}
              {activeTab === 'sequence' && (
                <div className="tab-panel">
                  <div className="progression-type-toggle">
                    <button
                      className={`btn-toggle ${seqType === 'arithmetic' ? 'active' : ''}`}
                      onClick={() => setSeqType('arithmetic')}
                    >
                      Arithmetic Progression
                    </button>
                    <button
                      className={`btn-toggle ${seqType === 'geometric' ? 'active' : ''}`}
                      onClick={() => setSeqType('geometric')}
                    >
                      Geometric Progression
                    </button>
                  </div>

                  <div className="inputs-row">
                    <div className="input-group">
                      <label htmlFor="seq-a1">First Term (a₁)</label>
                      <input
                        id="seq-a1"
                        type="number"
                        value={seqA1}
                        onChange={(e) => setSeqA1(e.target.value)}
                        className="sandbox-input"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="seq-step">
                        {seqType === 'arithmetic' ? 'Common Diff (d)' : 'Common Ratio (r)'}
                      </label>
                      <input
                        id="seq-step"
                        type="number"
                        value={seqStep}
                        onChange={(e) => setSeqStep(e.target.value)}
                        className="sandbox-input"
                      />
                    </div>
                    <div className="input-group">
                      <label htmlFor="seq-n">Terms Count (n)</label>
                      <input
                        id="seq-n"
                        type="number"
                        min="1"
                        max="15"
                        value={seqN}
                        onChange={(e) => setSeqN(e.target.value)}
                        className="sandbox-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Output Results Box */}
              <div className="results-box">
                <div className="results-header">
                  <span className="results-title">Calculated Results</span>
                  <span className="results-status">Live Evaluated</span>
                </div>

                {activeTab === 'quadratic' && (
                  <div className="results-grid">
                    <div className="result-item">
                      <span className="result-label">Discriminant (Δ):</span>
                      <span className="result-value text-kiwi">{quadResult.discriminant}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Root Classification:</span>
                      <span className="result-value">{quadResult.type}</span>
                    </div>
                    <div className="result-item full-width">
                      <span className="result-label">Solutions [x₁, x₂]:</span>
                      <div className="roots-tags">
                        {quadResult.roots.map((r, i) => (
                          <span key={i} className="root-pill">
                            x{i + 1} = <strong>{r}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'vector' && (
                  <div className="results-grid">
                    <div className="result-item">
                      <span className="result-label">Norm ||u||:</span>
                      <span className="result-value text-kiwi">{vecResult.normU}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Norm ||v||:</span>
                      <span className="result-value text-kiwi">{vecResult.normV}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Dot Product (u · v):</span>
                      <span className="result-value">{vecResult.dot}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Angle (θ):</span>
                      <span className="result-value text-lime">{vecResult.angle}</span>
                    </div>
                    <div className="result-item full-width">
                      <span className="result-label">Cross Product (u × v):</span>
                      <span className="result-value text-mono">{vecResult.cross}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'sequence' && (
                  <div className="results-grid">
                    <div className="result-item">
                      <span className="result-label">n-th Term (a_{seqN}):</span>
                      <span className="result-value text-kiwi">{seqResult.nthTerm}</span>
                    </div>
                    <div className="result-item">
                      <span className="result-label">Series Sum (S_{seqN}):</span>
                      <span className="result-value text-lime">{seqResult.sum}</span>
                    </div>
                    <div className="result-item full-width">
                      <span className="result-label">Sequence Terms:</span>
                      <div className="sequence-stream">
                        {seqResult.terms.map((term, i) => (
                          <span key={i} className="seq-bubble">
                            {term}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Python Equivalent Snippet with Syntax Highlighting */}
            <div className="sandbox-code-preview">
              <div className="preview-top">
                <div className="preview-indicator">
                  <span className="dot dot-green" />
                  <span className="preview-title">Equivalent Python Code</span>
                </div>
                <button
                  className={`btn-copy-code ${copiedCode ? 'copied' : ''}`}
                  onClick={handleCopyCode}
                  title="Copy Python Code"
                  id="sandbox-copy-code-btn"
                >
                  {copiedCode ? (
                    <>
                      <Check size={14} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Snippet</span>
                    </>
                  )}
                </button>
              </div>

              <div className="preview-code-body">
                <CodeBlock code={getPythonSnippet()} language="python" />
              </div>

              <div className="preview-footer">
                <span>Directly compatible with KiwiCalc v0.1.0</span>
                <a
                  href="https://jona-projects.gitbook.io/kiwicalc"
                  target="_blank"
                  rel="noreferrer"
                  className="preview-doc-link"
                >
                  <span>Doc Reference</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
