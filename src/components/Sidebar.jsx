import { Heart, Home, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Simulating active route for demo
const useLocation = () => ({ pathname: '/' });

function Sidebar() {
  return (
    <div>
      <DesktopSidebar />
      <MobileSidebar />
    </div>
  );
}

const NavLink = ({ to, icon: Icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
      ${isActive 
        ? 'bg-orange-50 text-orange-600' 
        : 'hover:bg-gray-50 text-gray-600'
      }
    `}
  >
    <Icon 
      size={24} 
      className={`transition-colors duration-200
        ${isActive 
          ? 'text-orange-600' 
          : 'group-hover:text-orange-600'
        }
      `}
    />
    <span className={`font-medium hidden md:block transition-colors duration-200
      ${isActive 
        ? 'text-orange-600' 
        : 'group-hover:text-orange-600'
      }
    `}>
      {label}
    </span>
    {isActive && (
      <div className="absolute left-0 w-1.5 h-8 bg-orange-500 rounded-r-full transform -translate-x-4 transition-all duration-200" />
    )}
  </Link>
);

const DesktopSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`hidden sm:block fixed top-0 left-0 h-screen bg-white border-r border-gray-100 shadow-sm
      transition-all duration-300 ease-in-out
      ${isCollapsed ? 'w-20' : 'w-64'}
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <span className="text-orange-600 font-bold text-xl">R</span>
            </div>
            <h1 className={`ml-3 font-bold text-gray-800 transition-opacity duration-200
              ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}
            `}>
              Recipe App
            </h1>
          </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <Menu size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          <NavLink 
            to="/" 
            icon={Home} 
            label="Home" 
            isActive={location.pathname === '/'} 
          />
          <NavLink 
            to="/favorites" 
            icon={Heart} 
            label="Favorites" 
            isActive={location.pathname === '/favorites'} 
          />
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 font-medium text-sm">JD</span>
            </div>
            <div className={`transition-opacity duration-200
              ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}
            `}>
              <p className="text-sm font-medium text-gray-800">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileSidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 sm:hidden z-50">
      <nav className="max-w-md mx-auto px-6 py-4 flex justify-around">
        <Link 
          to="/"
          className={`p-3 rounded-xl transition-colors duration-200 relative
            ${location.pathname === '/' 
              ? 'bg-orange-50 text-orange-600' 
              : 'text-gray-600 hover:bg-gray-50'
            }
          `}
        >
          <Home size={24} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full
            ${location.pathname === '/' ? 'block' : 'hidden'}
          "></span>
        </Link>
        
        <Link 
          to="/favorites"
          className={`p-3 rounded-xl transition-colors duration-200 relative
            ${location.pathname === '/favorites' 
              ? 'bg-orange-50 text-orange-600' 
              : 'text-gray-600 hover:bg-gray-50'
            }
          `}
        >
          <Heart size={24} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full
            ${location.pathname === '/favorites' ? 'block' : 'hidden'}
          "></span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;