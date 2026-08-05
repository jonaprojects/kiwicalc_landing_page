import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Download,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';
import CodeBlock from './CodeBlock';
import './WorksheetSpotlight.css';

const WORKSHEET_SNIPPET = `from kiwicalc import PDFWorksheet

ws = PDFWorksheet(title="Calculus Quiz 1")
ws.add_exercise("Differentiate f(x) = 3x^3 - 5x + 2")
ws.export_pdf("Calculus_Quiz.pdf", include_solutions=True)`;

export default function WorksheetSpotlight() {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <section className="worksheets-section" id="worksheets">
      <div className="container">
        <div className="worksheets-card">
          <div className="worksheets-grid">
            {/* Left: Value Proposition */}
            <div className="worksheets-info">
              <div className="section-badge">
                <GraduationCap size={14} className="badge-sparkle" />
                <span>For Educators & Students</span>
              </div>

              <h2 className="worksheets-title">
                Generate <span className="text-gradient">PDF Worksheets</span> with Solutions
              </h2>

              <p className="worksheets-description">
                KiwiCalc includes a built-in engine to generate clean, printable math
                worksheets. Perfect for teachers, tutors, and students preparing for exams.
              </p>

              <div className="worksheets-features-list">
                <div className="feat-bullet">
                  <CheckCircle2 size={18} className="feat-check" />
                  <span>Auto-generates exercises with randomized parameters</span>
                </div>
                <div className="feat-bullet">
                  <CheckCircle2 size={18} className="feat-check" />
                  <span>Exports both student worksheets and instructor solution keys</span>
                </div>
                <div className="feat-bullet">
                  <CheckCircle2 size={18} className="feat-check" />
                  <span>Clean LaTeX-style mathematical typesetting in PDF</span>
                </div>
              </div>

              {/* Code Snippet with Syntax Highlighting */}
              <div className="worksheet-code-box">
                <CodeBlock code={WORKSHEET_SNIPPET} language="python" />
              </div>

              <div className="worksheets-cta-row">
                <a
                  href="https://jona-projects.gitbook.io/kiwicalc/pdf-worksheets/creating-pdfs"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-worksheet-doc"
                >
                  <span>Read Worksheet Docs</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* Right: Interactive PDF Preview Card */}
            <div className="worksheets-preview-col">
              <div className="paper-mockup">
                <div className="paper-header">
                  <div className="paper-branding">
                    <span className="paper-subject">MATHEMATICS 101 • CALCULUS I</span>
                    <span className="paper-doc-title">Quiz Worksheet #4</span>
                  </div>
                  <button
                    className="btn-toggle-solution"
                    onClick={() => setShowSolution(!showSolution)}
                    id="worksheet-toggle-solution-btn"
                  >
                    <Eye size={14} />
                    <span>{showSolution ? 'Hide Solutions' : 'Reveal Solutions'}</span>
                  </button>
                </div>

                <div className="paper-body">
                  {/* Problem 1 */}
                  <div className="paper-problem">
                    <div className="problem-num">Problem 1:</div>
                    <div className="problem-text">
                      Given the function <code>f(x) = 2x³ - 6x² + 4x - 5</code>, calculate the
                      derivative <code>f'(x)</code> and determine the value at <code>x = 2</code>.
                    </div>
                    {showSolution && (
                      <div className="problem-solution">
                        <span className="sol-tag">Solution:</span>
                        <div className="sol-math">
                          f'(x) = 6x² - 12x + 4 <br />
                          f'(2) = 6(4) - 12(2) + 4 = <strong>4.0</strong>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Problem 2 */}
                  <div className="paper-problem">
                    <div className="problem-num">Problem 2:</div>
                    <div className="problem-text">
                      Find all real roots of the quadratic equation <code>x² + 6x + 8 = 0</code>.
                    </div>
                    {showSolution && (
                      <div className="problem-solution">
                        <span className="sol-tag">Solution:</span>
                        <div className="sol-math">
                          Δ = 6² - 4(1)(8) = 4 <br />
                          Roots: <strong>x₁ = -2.0, x₂ = -4.0</strong>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="paper-footer">
                  <span>Generated with KiwiCalc PDF Engine</span>
                  <span className="paper-badge">Page 1 of 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
