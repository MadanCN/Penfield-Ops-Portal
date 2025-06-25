import React, { useState } from 'react';
import Layout from './components/layout.jsx';
import PatientModule from './components/PatientModule.jsx';
import TaskModule from './components/Task.jsx';
import AppointmentModule from './components/Appointments.jsx';
import { Plus } from 'lucide-react';
import './App.css';

const App = () => {
  const [activeModule, setActiveModule] = useState('home');

  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
  };

  const renderModuleContent = () => {
    const commonStyles = {
      content: {
        flex: 1,
        overflow: 'auto',  
        backgroundColor: '#111827',
        padding: '24px'
      },
      pageTitle: {
        fontSize: '24px',
        fontWeight: '600',
        color: 'white',
        margin: '0 0 24px 0'
      },
      card: {
        backgroundColor: '#1f2937',
        borderRadius: '8px',
        padding: '24px'
      },
      button: {
        backgroundColor: '#2563eb',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '500'
      }
    };

    switch (activeModule) {
      case 'home':
        return (
          <div style={commonStyles.content}>
            <h1 style={commonStyles.pageTitle}>Dashboard</h1>
            <div style={{
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div style={commonStyles.card}>
                <h3 style={{fontSize: '18px', fontWeight: '500', color: 'white', margin: '0 0 8px 0'}}>
                  Today's Appointments
                </h3>
                <p style={{fontSize: '32px', fontWeight: '700', margin: 0, color: '#60a5fa'}}>24</p>
              </div>
              <div style={commonStyles.card}>
                <h3 style={{fontSize: '18px', fontWeight: '500', color: 'white', margin: '0 0 8px 0'}}>
                  Pending Tasks
                </h3>
                <p style={{fontSize: '32px', fontWeight: '700', margin: 0, color: '#fbbf24'}}>8</p>
              </div>
              <div style={commonStyles.card}>
                <h3 style={{fontSize: '18px', fontWeight: '500', color: 'white', margin: '0 0 8px 0'}}>
                  Active Patients
                </h3>
                <p style={{fontSize: '32px', fontWeight: '700', margin: 0, color: '#34d399'}}>156</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={commonStyles.card}>
              <h3 style={{color: 'white', marginBottom: '16px', fontSize: '18px', fontWeight: '600'}}>
                Quick Actions
              </h3>
              <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
                <button 
                  style={commonStyles.button}
                  onClick={() => setActiveModule('patients')}
                >
                  <Plus size={16} />
                  Add New Patient
                </button>
                <button 
                  style={{...commonStyles.button, backgroundColor: '#059669'}}
                  onClick={() => setActiveModule('appointments')}
                >
                  <Plus size={16} />
                  Schedule Appointment
                </button>
                <button 
                  style={{...commonStyles.button, backgroundColor: '#dc2626'}}
                  onClick={() => setActiveModule('tasks')}
                >
                  <Plus size={16} />
                  Create Task
                </button>
                <button 
                  style={{...commonStyles.button, backgroundColor: '#7c3aed'}}
                  onClick={() => setActiveModule('forms')}
                >
                  <Plus size={16} />
                  Create Form
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'patients':
        return <PatientModule />;
      
      case 'tasks':
        return <TaskModule />;

      case 'appointments':
        return <AppointmentModule />;

      case 'forms':
        return (
          <div style={commonStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h1 style={commonStyles.pageTitle}>Form Builder</h1>
              <button style={commonStyles.button}>
                <Plus size={16} />
                Create Form
              </button>
            </div>
            <div style={commonStyles.card}>
              <p style={{color: '#9ca3af', margin: 0, fontSize: '16px'}}>
                Form builder module will be implemented here. This will include:
              </p>
              <ul style={{color: '#d1d5db', marginTop: '16px', paddingLeft: '20px'}}>
                <li>Drag-and-drop form builder</li>
                <li>Form templates and libraries</li>
                <li>Digital signature capabilities</li>
                <li>Form analytics and reporting</li>
                <li>Patient portal integration</li>
              </ul>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div style={commonStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h1 style={commonStyles.pageTitle}>Reports & Analytics</h1>
              <button style={commonStyles.button}>
                <Plus size={16} />
                Generate Report
              </button>
            </div>
            <div style={commonStyles.card}>
              <p style={{color: '#9ca3af', margin: 0, fontSize: '16px'}}>
                Reports and analytics module will be implemented here. This will include:
              </p>
              <ul style={{color: '#d1d5db', marginTop: '16px', paddingLeft: '20px'}}>
                <li>Patient demographics and statistics</li>
                <li>Treatment outcome analytics</li>
                <li>Financial and billing reports</li>
                <li>Staff productivity metrics</li>
                <li>Custom report builder</li>
              </ul>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div style={commonStyles.content}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h1 style={commonStyles.pageTitle}>Messages & Communication</h1>
              <button style={commonStyles.button}>
                <Plus size={16} />
                New Message
              </button>
            </div>
            <div style={commonStyles.card}>
              <p style={{color: '#9ca3af', margin: 0, fontSize: '16px'}}>
                Messages and communication module will be implemented here. This will include:
              </p>
              <ul style={{color: '#d1d5db', marginTop: '16px', paddingLeft: '20px'}}>
                <li>Internal team messaging</li>
                <li>Patient communication portal</li>
                <li>Automated notifications</li>
                <li>Message templates and signatures</li>
                <li>Communication audit trail</li>
              </ul>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div style={commonStyles.content}>
            <h1 style={commonStyles.pageTitle}>Settings</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px'}}>
              <div style={commonStyles.card}>
                <h3 style={{color: 'white', marginBottom: '16px', fontSize: '16px', fontWeight: '600'}}>
                  System Configuration
                </h3>
                <ul style={{color: '#d1d5db', margin: 0, paddingLeft: '20px'}}>
                  <li>User roles and permissions</li>
                  <li>Clinic settings and preferences</li>
                  <li>Integration configurations</li>
                  <li>Security settings</li>
                </ul>
              </div>
              <div style={commonStyles.card}>
                <h3 style={{color: 'white', marginBottom: '16px', fontSize: '16px', fontWeight: '600'}}>
                  User Management
                </h3>
                <ul style={{color: '#d1d5db', margin: 0, paddingLeft: '20px'}}>
                  <li>Staff accounts and profiles</li>
                  <li>Department assignments</li>
                  <li>Access control settings</li>
                  <li>Training and certifications</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'help':
        return (
          <div style={commonStyles.content}>
            <h1 style={commonStyles.pageTitle}>Help & Support</h1>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px'}}>
              <div style={commonStyles.card}>
                <h3 style={{color: 'white', marginBottom: '16px', fontSize: '16px', fontWeight: '600'}}>
                  Documentation
                </h3>
                <ul style={{color: '#d1d5db', margin: 0, paddingLeft: '20px'}}>
                  <li>User guides and tutorials</li>
                  <li>API documentation</li>
                  <li>Best practices guide</li>
                  <li>Troubleshooting FAQ</li>
                </ul>
              </div>
              <div style={commonStyles.card}>
                <h3 style={{color: 'white', marginBottom: '16px', fontSize: '16px', fontWeight: '600'}}>
                  Support Options
                </h3>
                <ul style={{color: '#d1d5db', margin: 0, paddingLeft: '20px'}}>
                  <li>Contact technical support</li>
                  <li>Request new features</li>
                  <li>Report bugs or issues</li>
                  <li>Training resources</li>
                </ul>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div style={commonStyles.content}>
            <h1 style={commonStyles.pageTitle}>Module Not Found</h1>
            <div style={commonStyles.card}>
              <p style={{color: '#9ca3af', margin: 0}}>
                The requested module is not yet implemented.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <Layout activeModule={activeModule} onModuleChange={handleModuleChange}>
      {renderModuleContent()}
    </Layout>
  );
};

export default App;