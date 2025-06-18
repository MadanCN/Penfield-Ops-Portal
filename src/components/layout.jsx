import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  CheckSquare, 
  Calendar, 
  FileText, 
  Settings, 
  HelpCircle, 
  MessageSquare,
  Menu,
  Sun,
  Moon
} from 'lucide-react';

const Layout = ({ children, activeModule, onModuleChange }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
   
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const bottomSidebarItems = [
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#111827',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    sidebar: {
      width: sidebarCollapsed ? '64px' : '256px',
      backgroundColor: '#1f2937',
      transition: 'width 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #374151'
    },
    sidebarHeader: {
      padding: '16px',
      borderBottom: '1px solid #374151',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logo: {
      width: '32px',
      height: '32px',
      backgroundColor: '#2563eb',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logoText: {
      color: 'white',
      fontWeight: '600',
      fontSize: '18px',
      display: sidebarCollapsed ? 'none' : 'block'
    },
    nav: {
      flex: 1,
      padding: '16px'
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    navItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '8px 12px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: 'none',
      background: 'transparent',
      width: '100%',
      textAlign: 'left',
      color: '#d1d5db'
    },
    bottomNav: {
      padding: '16px',
      borderTop: '1px solid #374151'
    },
    userProfile: {
      padding: '16px',
      borderTop: '1px solid #374151',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    avatar: {
      width: '32px',
      height: '32px',
      backgroundColor: '#10b981',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500'
    },
    userInfo: {
      display: sidebarCollapsed ? 'none' : 'block'
    },
    userName: {
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      margin: 0
    },
    userRole: {
      color: '#9ca3af',
      fontSize: '12px',
      margin: 0
    },
    mainContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      backgroundColor: '#1f2937',
      borderBottom: '1px solid #374151',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    menuButton: {
      background: 'none',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      padding: '4px'
    },
    breadcrumb: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px'
    },
    breadcrumbItem: {
      color: '#9ca3af'
    },
    breadcrumbActive: {
      color: 'white'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    contentArea: {
      flex: 1,
      overflow: 'auto',
      backgroundColor: '#111827'
    }
  };

  const getCurrentPageTitle = () => {
    const currentItem = sidebarItems.find(item => item.id === activeModule) || 
                      bottomSidebarItems.find(item => item.id === activeModule);
    return currentItem?.label || 'Dashboard';
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Logo/Header */}
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <FileText size={16} color="white" />
          </div>
          <span style={styles.logoText}>OpsPortal</span>
        </div>

        {/* Navigation */}
        <nav style={styles.nav}>
          <ul style={styles.navList}>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onModuleChange(item.id)}
                    style={{
                      ...styles.navItem,
                      backgroundColor: isActive ? '#2563eb' : 'transparent',
                      color: isActive ? 'white' : '#d1d5db'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = '#374151';
                        e.target.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#d1d5db';
                      }
                    }}
                  >
                    <Icon size={18} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Navigation */}
        <div style={styles.bottomNav}>
          <ul style={styles.navList}>
            {bottomSidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onModuleChange(item.id)}
                    style={{
                      ...styles.navItem,
                      backgroundColor: isActive ? '#2563eb' : 'transparent',
                      color: isActive ? 'white' : '#d1d5db'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = '#374151';
                        e.target.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#d1d5db';
                      }
                    }}
                  >
                    <Icon size={18} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* User Profile */}
        <div style={styles.userProfile}>
          <div style={styles.avatar}>
            <span>DW</span>
          </div>
          <div style={styles.userInfo}>
            <p style={styles.userName}>Wilson</p>
            <p style={styles.userRole}>Ops User</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Top Bar */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={styles.menuButton}
            >
              <Menu size={20} />
            </button>
            <nav style={styles.breadcrumb}>
              <span style={styles.breadcrumbItem}>Home</span>
              <span style={styles.breadcrumbItem}>•</span>
              <span style={styles.breadcrumbActive}>
                {getCurrentPageTitle()}
              </span>
            </nav>
          </div>
          
          <div style={styles.headerRight}>
            <span style={{color: '#9ca3af', fontSize: '14px'}}>US</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={styles.menuButton}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main style={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;