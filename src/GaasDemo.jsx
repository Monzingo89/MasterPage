import { useState } from 'react'
import { Link } from 'react-router-dom'
import './GaasDemo.css'

const psaCriteria = {
  centering: {
    title: 'Centering',
    description: 'Front centering tolerance: 60/40 or better on PSA 10',
    details: [
      'Front: 60/40 tolerance or better',
      'Back: 75/25 tolerance or better',
      'Measured from card edges to image borders',
      'Both left-right and top-bottom axes'
    ]
  },
  corners: {
    title: 'Corners',
    description: 'Sharp, pointed corners with minimal wear',
    details: [
      'All four corners must be sharp',
      'No visible rounding or fraying',
      'Under magnification: minimal to no wear',
      'Corner wear most common grading deduction'
    ]
  },
  edges: {
    title: 'Edges',
    description: 'Clean, straight edges without chips or wear',
    details: [
      'Edges must be crisp and clean',
      'No chipping, whitening, or fraying',
      'Consistent color along all edges',
      'Check under magnification for micro-damage'
    ]
  },
  surface: {
    title: 'Surface',
    description: 'Clean surface free from scratches, print defects, or damage',
    details: [
      'No scratches, creases, or dents',
      'No print lines or defects',
      'Clean glossy finish',
      'No staining or discoloration',
      'Check both front and back surfaces'
    ]
  }
}

function GaasDemo() {
  const [selectedGrader, setSelectedGrader] = useState('PSA')
  const [openAccordion, setOpenAccordion] = useState(null)

  const toggleAccordion = (key) => {
    setOpenAccordion(openAccordion === key ? null : key)
  }

  return (
    <div className="gaas-container">
      <header className="gaas-header">
        <Link to="/" className="back-link">← Back to Portal</Link>
        <h1 className="gaas-title">GaaS - Grading as a Service</h1>
        <p className="gaas-subtitle">AI-Powered Card Grading with 360° Imaging</p>
        <div className="progress-badge">
          <span>Demo Progress: 56% Complete</span>
        </div>
      </header>

      <section className="gaas-overview">
        <h2>What is GaaS?</h2>
        <p>
          Grading as a Service (GaaS) is an AI-powered platform that provides professional-grade card analysis 
          before you submit for official grading. Our technology captures 360° images of your cards and applies 
          the same criteria used by professional grading companies like PSA.
        </p>
      </section>

      <section className="gaas-features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🎯 Pre-Grading Analysis</h3>
            <p>Know if your card is worth submitting before paying grading fees</p>
          </div>
          <div className="feature-card">
            <h3>📸 360° Imaging</h3>
            <p>Capture every angle of your card for complete analysis</p>
          </div>
          <div className="feature-card">
            <h3>🤖 AI Algorithm</h3>
            <p>Trained on professional grading criteria and standards</p>
          </div>
          <div className="feature-card">
            <h3>📦 GLB Export</h3>
            <p>Convert your card scan to 3D GLB file format</p>
          </div>
        </div>
      </section>

      <section className="gaas-tiers">
        <h2>Service Tiers</h2>
        <div className="tiers-container">
          <div className="tier-card">
            <div className="tier-header">
              <h3>Basic Tier</h3>
              <p className="tier-price">$X.XX + Kit Fee</p>
            </div>
            <ul className="tier-features">
              <li>✓ AI Pre-Grading Analysis</li>
              <li>✓ 360° Image Capture</li>
              <li>✓ PSA Criteria Evaluation</li>
              <li>✓ Detailed Report</li>
              <li>✓ Grading Kit Required (Flat Fee)</li>
            </ul>
          </div>

          <div className="tier-card premium">
            <div className="tier-badge">RECOMMENDED</div>
            <div className="tier-header">
              <h3>Premium Tier</h3>
              <p className="tier-price">$XX.XX + Kit Fee</p>
            </div>
            <ul className="tier-features">
              <li>✓ Everything in Basic</li>
              <li>✓ High-Resolution Scans</li>
              <li>✓ GLB 3D File Export</li>
              <li>✓ Multiple Grader Comparisons</li>
              <li>✓ Priority Processing</li>
              <li>✓ Advanced Analytics Dashboard</li>
              <li>✓ Grading Kit Required (Flat Fee)</li>
            </ul>
          </div>
        </div>
        <p className="kit-note">
          <strong>Note:</strong> Both tiers require a professional imaging kit (one-time flat fee) to ensure 
          consistent, high-quality captures for accurate AI analysis. This standardization is essential for 
          reliable grading predictions.
        </p>
      </section>

      <section className="gaas-demo-section">
        <h2>Demo: Sunday Presentation</h2>
        <p className="demo-description">
          Select a grading service to see the criteria used for evaluation. Upload close-up images of your 
          card, and our AI will analyze it against professional standards.
        </p>

        <div className="grader-selector">
          <label htmlFor="grader-select">Select Grading Service:</label>
          <select 
            id="grader-select"
            value={selectedGrader} 
            onChange={(e) => setSelectedGrader(e.target.value)}
            className="grader-dropdown"
          >
            <option value="PSA">PSA (Professional Sports Authenticator)</option>
          </select>
        </div>

        {selectedGrader === 'PSA' && (
          <div className="criteria-section">
            <h3>PSA Grading Criteria</h3>
            <p className="criteria-intro">
              PSA evaluates cards based on four main categories. Click each to see detailed requirements:
            </p>

            <div className="accordion-container">
              {Object.entries(psaCriteria).map(([key, criterion]) => (
                <div key={key} className={`accordion-item ${openAccordion === key ? 'open' : ''}`}>
                  <button 
                    className="accordion-header"
                    onClick={() => toggleAccordion(key)}
                  >
                    <span className="accordion-title">{criterion.title}</span>
                    <span className="accordion-icon">{openAccordion === key ? '−' : '+'}</span>
                  </button>
                  {openAccordion === key && (
                    <div className="accordion-content">
                      <p className="criterion-description">{criterion.description}</p>
                      <ul className="criterion-details">
                        {criterion.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="coming-soon">
              <p>📷 <strong>Image Upload & Analysis Coming Soon</strong></p>
              <p>Take close-up photos of your card from multiple angles and our AI will provide a detailed analysis.</p>
            </div>
          </div>
        )}
      </section>

      <footer className="gaas-footer">
        <p>&copy; 2025 Virtual Commerce Ventures - GaaS Platform</p>
      </footer>
    </div>
  )
}

export default GaasDemo
