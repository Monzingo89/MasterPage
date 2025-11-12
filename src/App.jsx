import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

// Configuration object for subdomain URLs
const config = {
  subdomains: {
    1: 'https://subdomain1.example.com',
    2: 'https://subdomain2.example.com',
    3: 'https://subdomain3.example.com',
    4: 'https://subdomain4.example.com',
    5: 'https://subdomain5.example.com',
    6: 'https://subdomain6.example.com',
    7: 'https://subdomain7.example.com',
    8: 'https://subdomain8.example.com',
    9: 'https://subdomain9.example.com'
  }
}

const platforms = [
  {
    id: 1,
    title: 'VAT - Video Automation TikTok',
    description: 'Automated daily TikTok posts featuring historical "on this day" content',
    progress: null,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6"></path>
        <path d="M12 18v4"></path>
        <path d="m4.93 4.93 4.24 4.24"></path>
        <path d="m14.83 14.83 4.24 4.24"></path>
        <path d="M2 12h6"></path>
        <path d="M18 12h4"></path>
        <path d="m4.93 19.07 4.24-4.24"></path>
        <path d="m14.83 9.17 4.24-4.24"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    )
  },
  {
    id: 2,
    title: 'VS - Video Sora',
    description: 'Automated Sora-generated video clips for daily content creation',
    progress: null,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
    )
  },
  {
    id: 3,
    title: 'GaaS - Grading as a Service',
    description: 'AI-powered card grading with 360° imaging and PSA criteria analysis',
    progress: 56,
    isDemo: true,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M12 18v-6"></path>
        <path d="M9 15l3 3 3-3"></path>
      </svg>
    )
  },
  {
    id: 2,
    title: 'Platform 2',
    description: 'Access the second service',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    )
  },
  {
    id: 3,
    title: 'Platform 3',
    description: 'Access the third service',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  },
  {
    id: 4,
    title: 'Platform 4',
    description: 'Access the fourth service',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    )
  },
  {
    id: 5,
    title: 'Platform 5',
    description: 'Access the fifth service',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
    )
  },
  {
    id: 6,
    title: 'Platform 6',
    description: 'Access the sixth service',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    )
  },
  {
    id: 7,
    title: 'Platform 7',
    description: 'Access the seventh service',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6m0 6v6m8.66-11.66l-5.2 3M8.54 14l-5.2 3m13.32 0l-5.2-3m-2.92-6l-5.2-3"></path>
      </svg>
    )
  },
  {
    id: 8,
    title: 'Platform 8',
    description: 'Access the eighth service',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="12" y1="18" x2="12" y2="12"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
      </svg>
    )
  },
  {
    id: 9,
    title: 'Platform 9',
    description: 'Access the ninth service',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
        <line x1="7" y1="7" x2="7.01" y2="7"></line>
      </svg>
    )
  }
]

function Card({ platform }) {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  const url = config.subdomains[platform.id]

  const handleClick = (e) => {
    if (platform.id === 3) {
      // GaaS demo page - navigate to detail page
      e.preventDefault()
      navigate('/gaas-demo')
      return
    }
    
    if (!url || url.includes('example.com')) {
      e.preventDefault()
      alert(`Please configure the URL for ${platform.title} in App.jsx`)
      return
    }
    console.log(`Navigating to ${platform.title}: ${url}`)
  }

  return (
    <a
      href={url}
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="card-icon">
        {platform.icon}
      </div>
      <h2 className="card-title">{platform.title}</h2>
      <p className="card-description">{platform.description}</p>
      
      {platform.progress !== null && (
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${platform.progress}%` }}></div>
          </div>
          <span className="progress-text">{platform.progress}% Complete</span>
        </div>
      )}
      
      {platform.isDemo && (
        <span className="demo-badge">Sunday Demo</span>
      )}
      
      <span className="card-arrow">→</span>
    </a>
  )
}

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Virtual Commerce Ventures</h1>
        <p className="subtitle">Choose your destination</p>
      </header>

      <main className="grid-container">
        {platforms.map((platform) => (
          <Card key={platform.id} platform={platform} />
        ))}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Virtual Commerce Ventures. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
