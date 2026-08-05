import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Calculator,
  Sparkles,
  Compass,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import CodeBlock from './CodeBlock';
import './Recipes.css';

const RECIPES = [
  {
    id: 'equations',
    name: 'Solving Equations',
    icon: Calculator,
    docUrl: 'https://jona-projects.gitbook.io/kiwicalc/equations/linear-equations',
    desc: 'Solve linear, quadratic, cubic, and polynomial equations in one line.',
    code: `import kiwicalc as kw

# Solve quadratic equation: x² + 6x + 8 = 0
solutions = kw.solve_quadratic_real(1, 6, 8)
print("Real roots:", solutions)
# Output: [-2.0, -4.0]

# Solve higher-order polynomial equation: x³ - 6x² + 11x - 6 = 0
poly_eq = kw.PolynomialEquation([1, -6, 11, -6])
print("Roots:", poly_eq.solve())
# Output: [1.0, 2.0, 3.0]`,
  },
  {
    id: 'symbolic',
    name: 'Symbolic Algebra',
    icon: Sparkles,
    docUrl: 'https://jona-projects.gitbook.io/kiwicalc/symbolic-computation/var',
    desc: 'Work with symbolic variables, polynomials, and trigonometric expressions.',
    code: `from kiwicalc import Var, Poly, TrigoExpr

# Define symbolic variables
x = Var('x')
y = Var('y')

# Compose symbolic algebraic expression: 3x² + 5xy - 7
f = 3 * (x ** 2) + 5 * x * y - 7
print("Expression:", f)

# Substitute values at runtime
result = f.evaluate({'x': 2, 'y': 3})
print("f(2, 3) =", result)
# Output: 35.0`,
  },
  {
    id: 'vectors',
    name: 'Vectors & 3D Geometry',
    icon: Compass,
    docUrl: 'https://jona-projects.gitbook.io/kiwicalc/analytic-geometry/vector',
    desc: 'High-precision 2D/3D vectors, norms, angles, dot, and cross products.',
    code: `from kiwicalc import Vector

# Define 3D vectors
u = Vector([3, 4, 0])
v = Vector([1, 2, 2])

print("Magnitude ||u||:", u.norm())             # Output: 5.0
print("Dot product u · v:", u.dot(v))           # Output: 11.0
print("Cross product u × v:", u.cross(v))       # Output: [8.0, -6.0, 2.0]
print("Angle between (deg):", u.angle_between(v))`,
  },
  {
    id: 'calculus',
    name: 'Functions & Calculus',
    icon: TrendingUp,
    docUrl: 'https://jona-projects.gitbook.io/kiwicalc/functions/derivatives',
    desc: 'Function chaining, limits, and high-order analytical derivatives.',
    code: `from kiwicalc import Function, FunctionChain

# Define mathematical function f(x) = x³ - 3x + 1
f = Function(lambda x: x**3 - 3*x + 1)

# Compute 1st and 2nd derivatives
df = f.derivative()
d2f = df.derivative()

print("f'(2)  =", df(2))   # Output: 9.0
print("f''(2) =", d2f(2))  # Output: 12.0`,
  },
];

export default function Recipes() {
  const [activeRecipeId, setActiveRecipeId] = useState('equations');
  const [copied, setCopied] = useState(false);

  const activeRecipe = RECIPES.find((r) => r.id === activeRecipeId) || RECIPES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeRecipe.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="recipes-section" id="recipes">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Code size={14} className="badge-sparkle" />
            <span>Code Recipes</span>
          </div>
          <h2 className="section-title">
            Clean, Expressive <span className="text-gradient">Pythonic Syntax</span>
          </h2>
          <p className="section-subtitle">
            KiwiCalc is designed from the ground up for developer readability. Solve complex
            equations and matrix systems in just a few lines.
          </p>
        </div>

        {/* Recipes Container */}
        <div className="recipes-layout">
          {/* Navigation Sidebar */}
          <div className="recipes-sidebar">
            {RECIPES.map((recipe) => {
              const IconComp = recipe.icon;
              const isActive = recipe.id === activeRecipeId;
              return (
                <button
                  key={recipe.id}
                  className={`recipe-nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveRecipeId(recipe.id)}
                  id={`recipe-tab-${recipe.id}`}
                >
                  <div className="recipe-nav-icon">
                    <IconComp size={18} />
                  </div>
                  <div className="recipe-nav-text">
                    <span className="recipe-nav-title">{recipe.name}</span>
                    <span className="recipe-nav-desc">{recipe.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Code Viewer Panel */}
          <div className="recipes-code-panel">
            <div className="code-panel-header">
              <div className="code-panel-title">
                <span className="window-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </span>
                <span className="file-name">{activeRecipe.id}_example.py</span>
              </div>

              <div className="code-panel-actions">
                <button
                  className={`btn-recipe-copy ${copied ? 'copied' : ''}`}
                  onClick={handleCopy}
                  title="Copy code"
                  id="recipe-copy-btn"
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Body with Syntax Highlighting */}
            <div className="code-panel-body">
              <CodeBlock code={activeRecipe.code} language="python" />
            </div>

            <div className="code-panel-footer">
              <span className="footer-tip">Tested against KiwiCalc v0.1.0</span>
              <a
                href={activeRecipe.docUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-doc-btn"
              >
                <span>Read Full Documentation</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
