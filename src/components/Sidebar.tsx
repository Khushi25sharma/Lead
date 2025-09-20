import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiActivity, FiPackage, FiBell, FiSettings } from 'react-icons/fi';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  currentPath: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, currentPath }) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center p-2 text-base font-normal rounded-md transition-colors ${
          isActive
            ? 'text-white bg-blue-700 hover:bg-blue-800'
            : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
        }`}
      >
        <span className="w-6 h-6">{icon}</span>
        <span className="ml-3">{label}</span>
      </Link>
    </li>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { to: '/', icon: <FiHome />, label: 'Dashboard' },
    { to: '/leads', icon: <FiUsers />, label: 'Leads' },
    { to: '/follow-ups', icon: <FiCalendar />, label: 'Follow-ups' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-4 px-3 bg-white dark:bg-gray-800">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              currentPath={currentPath}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
