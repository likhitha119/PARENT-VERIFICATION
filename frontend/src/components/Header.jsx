import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Explicit path mapping
  // This tells the app exactly where to go if "Back" is pressed
  const getBackPath = () => {
    switch (location.pathname) {
      case '/dashboard':
      case '/financials':
      case '/faculty':
      case '/chat':
        return '/home'; // All main pages go back to Home
      case '/profile':
        return '/home'; // Profile goes back to Home
      default:
        return '/home';
    }
  };

  // This tells the app exactly where to go if "Forward" is pressed
  const getForwardPath = () => {
    switch (location.pathname) {
      case '/home':
        return '/dashboard'; // From home, forward goes to dashboard
      default:
        return null; // Disable if no logical forward path
    }
  };

  return (
    <header className="main-top-header">
       <div className="header-nav-arrows">
         {/* Manual Back Button */}
         <button 
           className="nav-arrow-btn" 
           onClick={() => navigate(getBackPath())} 
           title="Go Back"
         >
           <ChevronLeft size={30} />
         </button>
         
         {/* Manual Forward Button */}
         <button 
           className="nav-arrow-btn" 
           onClick={() => {
             const next = getForwardPath();
             if(next) navigate(next);
           }} 
           title="Go Forward"
           style={{ opacity: getForwardPath() ? 1 : 0.5, cursor: getForwardPath() ? 'pointer' : 'not-allowed' }}
         >
           <ChevronRight size={30} />
         </button>
       </div>

       <div className="header-right-actions">
          <button className="icon-round-btn"><Bell size={26} /></button>
          <Link to="/profile" className="user-mini-avatar">
            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Ethan&backgroundColor=e2e8f0" alt="Profile" />
          </Link>
       </div>
    </header>
  );
};

export default Header;