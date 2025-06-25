import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  Edit2, 
  Trash2, 
  Filter,
  Upload,
  Send,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Users,
  Shield,
  Activity,
  X,
  Download,
  AlertTriangle,
  SortAsc,
  SortDesc
} from 'lucide-react';

// Enhanced Mock Data with more detailed patient information
const mockPatients = [
  {
    id: 1,
    fullName: 'John Michael Smith',
    preferredName: 'John',
    dateOfBirth: '1985-06-15',
    gender: 'Male',
    pronouns: 'He/Him',
    maritalStatus: 'Married',
    phone: '(555) 123-4567',
    email: 'john.smith@email.com',
    preferredContact: 'Email',
    address: {
      home: '123 Main St, Anytown, ST 12345',
      mailing: '123 Main St, Anytown, ST 12345'
    },
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '(555) 987-6543',
      email: 'jane.smith@email.com'
    },
    registrationDate: '2024-01-15',
    status: 'Active',
    patientType: 'New Patient',
    insurance: {
      primary: {
        company: 'Blue Cross Blue Shield',
        policyHolder: 'John Smith',
        policyHolderRelation: 'Self',
        memberId: 'BC123456789',
        expiryDate: '2024-12-31',
        verificationStatus: 'Verified'
      },
      secondary: null
    },
    assignedStaff: ['Dr. Sarah Wilson', 'Lisa Rodriguez'],
    careTeam: ['Dr. Sarah Wilson', 'Lisa Rodriguez', 'Mike Johnson']
  },
  {
    id: 2,
    fullName: 'Sarah Michelle Johnson',
    preferredName: 'Sarah',
    dateOfBirth: '1990-03-22',
    gender: 'Female',
    pronouns: 'She/Her',
    maritalStatus: 'Single',
    phone: '(555) 234-5678',
    email: 'sarah.johnson@email.com',
    preferredContact: 'Phone',
    address: {
      home: '456 Oak Ave, Somewhere, ST 23456',
      mailing: '456 Oak Ave, Somewhere, ST 23456'
    },
    emergencyContact: {
      name: 'Robert Johnson',
      relationship: 'Father',
      phone: '(555) 876-5432',
      email: 'robert.johnson@email.com'
    },
    registrationDate: '2024-02-01',
    status: 'Active',
    patientType: 'Follow Up',
    insurance: {
      primary: {
        company: 'Aetna',
        policyHolder: 'Sarah Johnson',
        policyHolderRelation: 'Self',
        memberId: 'AT987654321',
        expiryDate: '2025-06-30',
        verificationStatus: 'Verified'
      }
    },
    assignedStaff: ['Dr. Michael Chen', 'Emily Davis'],
    careTeam: ['Dr. Michael Chen', 'Emily Davis']
  },
  {
    id: 3,
    fullName: 'Michael Brown',
    preferredName: 'Mike',
    dateOfBirth: '1978-11-08',
    gender: 'Male',
    pronouns: 'He/Him',
    maritalStatus: 'Divorced',
    phone: '(555) 345-6789',
    email: 'mike.brown@email.com',
    preferredContact: 'Text',
    address: {
      home: '789 Pine Rd, Another City, ST 34567',
      mailing: 'PO Box 123, Another City, ST 34567'
    },
    emergencyContact: {
      name: 'Jennifer Brown',
      relationship: 'Ex-Wife',
      phone: '(555) 765-4321',
      email: 'jen.brown@email.com'
    },
    registrationDate: '2024-03-10',
    status: 'Inactive',
    patientType: 'Follow Up',
    insurance: {
      primary: {
        company: 'UnitedHealth',
        policyHolder: 'Michael Brown',
        policyHolderRelation: 'Self',
        memberId: 'UH456789123',
        expiryDate: '2024-08-15',
        verificationStatus: 'Pending'
      }
    },
    assignedStaff: ['Dr. Sarah Wilson'],
    careTeam: ['Dr. Sarah Wilson', 'Lisa Rodriguez']
  }
];

const mockStaff = [
  { id: 1, name: 'Dr. Sarah Wilson', role: 'Psychiatrist' },
  { id: 2, name: 'Dr. Michael Chen', role: 'Therapist' },
  { id: 3, name: 'Lisa Rodriguez', role: 'Nurse Practitioner' },
  { id: 4, name: 'Emily Davis', role: 'Intake Specialist' },
  { id: 5, name: 'Mike Johnson', role: 'Scheduler' }
];

const PATIENT_STATUSES = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
};

const INSURANCE_STATUSES = {
  PENDING: 'Pending',
  VERIFIED: 'Verified',
  FAILED: 'Failed',
  EXPIRED: 'Expired'
};

const PATIENT_TYPES = {
  NEW: 'New Patient',
  FOLLOW_UP: 'Follow Up'
};

const TREATMENT_PLANS = [
  'Spravato Treatment',
  'Medication Management',
  'Therapy Sessions',
  'Psychological Testing'
];

const FORM_SETS = [
  { id: 1, name: 'New Patient Intake Forms', type: 'Form Set' },
  { id: 2, name: 'Depression Assessment (PHQ-9)', type: 'Form' },
  { id: 3, name: 'Anxiety Assessment (GAD-7)', type: 'Form' },
  { id: 4, name: 'Treatment Consent Forms', type: 'Form Set' },
  { id: 5, name: 'Insurance Information Form', type: 'Form' }
];

const NOTE_TYPES = {
  SOAP: 'SOAP Notes',
  PROGRESS: 'Progress Notes',
  HP: 'H&P',
  DISCHARGE: 'Discharge Summary',
  OPERATIVE: 'Operative Notes',
  MAR: 'MAR Notes',
  CONSULTATION: 'Consultation Notes',
  CARE_COORDINATION: 'Care Coordination'
};

const PatientModule = () => {
  const [view, setView] = useState('list'); // 'list' | 'detail' | 'add'
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    registrationDateFrom: '',
    registrationDateTo: '',
    patientType: '',
    assignedStaff: '',
    insuranceStatus: '',
    status: ''
  });
  const [sortBy, setSortBy] = useState('registrationDate');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Modal states
  const [showAddAuth, setShowAddAuth] = useState(false);
  const [showAddTreatmentPlan, setShowAddTreatmentPlan] = useState(false);
  const [showCreateAppointment, setShowCreateAppointment] = useState(false);
  const [showAssignForms, setShowAssignForms] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [showCancelPlanDialog, setShowCancelPlanDialog] = useState(false);
  const [selectedPlanToCancel, setSelectedPlanToCancel] = useState(null);

  // Form states
  const [newPatientForm, setNewPatientForm] = useState({
    fullName: '',
    preferredName: '',
    dateOfBirth: '',
    gender: '',
    pronouns: '',
    maritalStatus: '',
    phone: '',
    email: '',
    preferredContact: 'Email',
    homeAddress: '',
    mailingAddress: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    emergencyContactEmail: '',
    patientType: 'New Patient'
  });

  const [authForm, setAuthForm] = useState({
    service: '',
    authNumber: '',
    dateApproved: '',
    effectiveDate: '',
    expiryDate: '',
    unitsAuthorized: '',
    status: 'Active'
  });

  const [treatmentPlanForm, setTreatmentPlanForm] = useState({
    treatmentPlan: '',
    providerPOC: ''
  });

  const [noteForm, setNoteForm] = useState({
    type: '',
    title: '',
    content: '',
    visibility: 'Internal Only',
    attachments: []
  });

  // Common styles object
  const styles = {
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
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      backgroundColor: '#374151',
      border: '1px solid #4b5563',
      borderRadius: '6px',
      color: 'white',
      fontSize: '14px'
    },
    select: {
      backgroundColor: '#374151',
      color: 'white',
      border: '1px solid #4b5563',
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '14px'
    },
    table: {
      width: '100%',
      backgroundColor: '#1f2937',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    tableElement: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      backgroundColor: '#374151',
      color: '#d1d5db',
      padding: '16px',
      textAlign: 'left',
      fontSize: '12px',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      cursor: 'pointer'
    },
    td: {
      padding: '16px',
      borderBottom: '1px solid #374151',
      color: '#d1d5db'
    },
    tdWhite: {
      color: 'white'
    },
    badge: {
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500'
    },
    badgeGreen: { backgroundColor: '#059669', color: 'white' },
    badgeBlue: { backgroundColor: '#2563eb', color: 'white' },
    badgeRed: { backgroundColor: '#dc2626', color: 'white' },
    badgeYellow: { backgroundColor: '#d97706', color: 'white' },
    badgePurple: { backgroundColor: '#7c3aed', color: 'white' },
    badgeTeal: { backgroundColor: '#0d9488', color: 'white' },
    badgeGray: { backgroundColor: '#6b7280', color: 'white' },
    searchWrapper: {
      position: 'relative',
      flex: 1,
      maxWidth: '320px'
    },
    searchInput: {
      backgroundColor: '#374151',
      color: 'white',
      border: '1px solid #4b5563',
      borderRadius: '8px',
      padding: '8px 8px 8px 40px',
      fontSize: '14px',
      width: '100%'
    },
    searchIcon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    actionButton: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      padding: '4px 8px',
      borderRadius: '4px'
    },
    actionEdit: { color: '#60a5fa' },
    actionClone: { color: '#34d399' },
    actionDelete: { color: '#f87171' },
    tabContainer: {
      borderBottom: '1px solid #374151',
      marginBottom: '24px'
    },
    tabList: {
      display: 'flex',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      gap: '4px'
    },
    tab: {
      padding: '12px 16px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      borderBottom: '2px solid transparent',
      fontSize: '14px',
      fontWeight: '500'
    },
    activeTab: {
      color: '#2563eb',
      borderBottomColor: '#2563eb'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      color: '#d1d5db',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '6px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: '#1f2937',
      borderRadius: '8px',
      padding: '24px',
      maxWidth: '600px',
      maxHeight: '80vh',
      overflow: 'auto',
      width: '90%'
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case PATIENT_STATUSES.ACTIVE:
        return styles.badgeGreen;
      case PATIENT_STATUSES.INACTIVE:
        return styles.badgeGray;
      default:
        return styles.badgeBlue;
    }
  };

  const getInsuranceBadgeStyle = (status) => {
    switch (status) {
      case INSURANCE_STATUSES.VERIFIED:
        return styles.badgeGreen;
      case INSURANCE_STATUSES.PENDING:
        return styles.badgeYellow;
      case INSURANCE_STATUSES.FAILED:
        return styles.badgeRed;
      case INSURANCE_STATUSES.EXPIRED:
        return styles.badgeRed;
      default:
        return styles.badgeGray;
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'Not provided';
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortedAndFilteredPatients = () => {
    let filtered = mockPatients.filter(patient => {
      const matchesSearch = !searchTerm || 
        patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPatientType = !filters.patientType || patient.patientType === filters.patientType;
      const matchesStatus = !filters.status || patient.status === filters.status;
      const matchesInsurance = !filters.insuranceStatus || 
        patient.insurance.primary?.verificationStatus === filters.insuranceStatus;
      const matchesStaff = !filters.assignedStaff || 
        patient.assignedStaff.includes(filters.assignedStaff);
      
      // Date range filtering
      let matchesDateRange = true;
      if (filters.registrationDateFrom) {
        matchesDateRange = matchesDateRange && new Date(patient.registrationDate) >= new Date(filters.registrationDateFrom);
      }
      if (filters.registrationDateTo) {
        matchesDateRange = matchesDateRange && new Date(patient.registrationDate) <= new Date(filters.registrationDateTo);
      }
      
      return matchesSearch && matchesPatientType && matchesStatus && matchesInsurance && matchesStaff && matchesDateRange;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'name':
          aValue = a.fullName;
          bValue = b.fullName;
          break;
        case 'registrationDate':
          aValue = new Date(a.registrationDate);
          bValue = new Date(b.registrationDate);
          break;
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        default:
          aValue = new Date(a.registrationDate);
          bValue = new Date(b.registrationDate);
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  // Patient List Component
  const PatientList = () => {
    const filteredPatients = getSortedAndFilteredPatients();

    return (
      <div style={styles.content}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h1 style={styles.pageTitle}>Patient Management</h1>
          <button style={styles.button} onClick={() => setView('add')}>
            <Plus size={16} />
            Add Patient
          </button>
        </div>
        
        {/* Enhanced Search and Filters Section */}
        <div style={{...styles.card, marginBottom: '24px'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end'}}>
            <div style={styles.searchWrapper}>
              <Search style={styles.searchIcon} size={16} />
              <input 
                type="text" 
                placeholder="Search by Name, Phone, or Email..." 
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label style={{...styles.label, fontSize: '12px', marginBottom: '4px'}}>
                Registration From
              </label>
              <input 
                type="date" 
                style={styles.select}
                value={filters.registrationDateFrom}
                onChange={(e) => setFilters({...filters, registrationDateFrom: e.target.value})}
              />
            </div>

            <div>
              <label style={{...styles.label, fontSize: '12px', marginBottom: '4px'}}>
                Registration To
              </label>
              <input 
                type="date" 
                style={styles.select}
                value={filters.registrationDateTo}
                onChange={(e) => setFilters({...filters, registrationDateTo: e.target.value})}
              />
            </div>
            
            <div>
              <label style={{...styles.label, fontSize: '12px', marginBottom: '4px'}}>
                Patient Type
              </label>
              <select 
                style={styles.select}
                value={filters.patientType}
                onChange={(e) => setFilters({...filters, patientType: e.target.value})}
              >
                <option value="">All Types</option>
                {Object.values(PATIENT_TYPES).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{...styles.label, fontSize: '12px', marginBottom: '4px'}}>
                Patient Status
              </label>
              <select 
                style={styles.select}
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">All Statuses</option>
                {Object.values(PATIENT_STATUSES).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{...styles.label, fontSize: '12px', marginBottom: '4px'}}>
                Assigned Staff
              </label>
              <select 
                style={styles.select}
                value={filters.assignedStaff}
                onChange={(e) => setFilters({...filters, assignedStaff: e.target.value})}
              >
                <option value="">All Staff</option>
                {mockStaff.map(staff => (
                  <option key={staff.id} value={staff.name}>{staff.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{...styles.label, fontSize: '12px', marginBottom: '4px'}}>
                Insurance Status
              </label>
              <select 
                style={styles.select}
                value={filters.insuranceStatus}
                onChange={(e) => setFilters({...filters, insuranceStatus: e.target.value})}
              >
                <option value="">All Insurance</option>
                {Object.values(INSURANCE_STATUSES).map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div>
              <button 
                style={{...styles.button, backgroundColor: '#6b7280'}}
                onClick={() => setFilters({
                  registrationDateFrom: '',
                  registrationDateTo: '',
                  patientType: '',
                  assignedStaff: '',
                  insuranceStatus: '',
                  status: ''
                })}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Patient List Table */}
        <div style={styles.table}>
          <div style={{overflowX: 'auto'}}>
            <table style={styles.tableElement}>
              <thead>
                <tr>
                  <th 
                    style={styles.th}
                    onClick={() => handleSort('name')}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      PATIENT NAME
                      {sortBy === 'name' && (sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                    </div>
                  </th>
                  <th style={styles.th}>DATE OF BIRTH / AGE</th>
                  <th style={styles.th}>CONTACT</th>
                  <th 
                    style={styles.th}
                    onClick={() => handleSort('registrationDate')}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      REGISTRATION DATE
                      {sortBy === 'registrationDate' && (sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                    </div>
                  </th>
                  <th style={styles.th}>PATIENT TYPE</th>
                  <th style={styles.th}>STATUS</th>
                  <th style={styles.th}>INSURANCE</th>
                  <th style={styles.th}>ASSIGNED STAFF</th>
                  <th style={styles.th}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(patient => (
                  <tr key={patient.id}>
                    <td 
                      style={{
                        ...styles.td, 
                        ...styles.tdWhite, 
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }} 
                      onClick={() => {
                        setSelectedPatient(patient);
                        setView('detail');
                      }}
                    >
                      <div>
                        <div>{patient.fullName}</div>
                        {patient.preferredName && patient.preferredName !== patient.fullName.split(' ')[0] && (
                          <div style={{fontSize: '12px', color: '#9ca3af'}}>
                            Preferred: {patient.preferredName}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div>
                        <div>{formatDate(patient.dateOfBirth)}</div>
                        <div style={{fontSize: '12px', color: '#9ca3af'}}>
                          Age: {calculateAge(patient.dateOfBirth)}
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px'}}>
                          <Phone size={12} />
                          {patient.phone}
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#9ca3af'}}>
                          <Mail size={12} />
                          {patient.email}
                        </div>
                        <div style={{fontSize: '11px', color: '#6b7280', marginTop: '2px'}}>
                          Prefers: {patient.preferredContact}
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      {formatDate(patient.registrationDate)}
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge, 
                        backgroundColor: patient.patientType === 'New Patient' ? '#7c3aed' : '#0d9488',
                        color: 'white'
                      }}>
                        {patient.patientType}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        ...styles.badge, 
                        ...getStatusBadgeStyle(patient.status)
                      }}>
                        {patient.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div>
                        <div style={{fontSize: '13px', marginBottom: '2px'}}>
                          {patient.insurance.primary?.company || 'None'}
                        </div>
                        <span style={{
                          ...styles.badge, 
                          ...getInsuranceBadgeStyle(patient.insurance.primary?.verificationStatus)
                        }}>
                          {patient.insurance.primary?.verificationStatus || 'Unknown'}
                        </span>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{fontSize: '12px'}}>
                        {patient.assignedStaff.slice(0, 2).map((staff, index) => (
                          <div key={index} style={{marginBottom: '2px'}}>{staff}</div>
                        ))}
                        {patient.assignedStaff.length > 2 && (
                          <div style={{color: '#9ca3af'}}>+{patient.assignedStaff.length - 2} more</div>
                        )}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button 
                          style={{...styles.actionButton, ...styles.actionEdit}}
                          onClick={() => {
                            setSelectedPatient(patient);
                            setView('detail');
                          }}
                        >
                          View
                        </button>
                        <button style={{...styles.actionButton, ...styles.actionEdit}}>
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPatients.length === 0 && (
            <div style={{
              padding: '40px', 
              textAlign: 'center', 
              color: '#9ca3af'
            }}> No patients found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    );
  };

  // Patient Detail Component with Enhanced Tabs
  const PatientDetail = ({ patient }) => {
    return (
      <div style={styles.content}>
        {/* Back Button */}
        <button 
          style={{
            ...styles.button,
            backgroundColor: 'transparent',
            color: '#9ca3af',
            padding: '8px 0',
            marginBottom: '16px'
          }}
          onClick={() => setView('list')}
        >
          <ArrowLeft size={16} />
          Back to Patient List
        </button>

        {/* Enhanced Patient Summary Header */}
        <div style={{
          ...styles.card, 
          marginBottom: '24px', 
          border: '2px solid #2563eb'
        }}>
          {/* Name and Action Buttons Row */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <div>
              <h2 style={{
                color: 'white', 
                fontSize: '24px', 
                fontWeight: '600', 
                margin: '0 0 4px 0'
              }}>
                {patient.fullName}
              </h2>
              {patient.preferredName && (
                <p style={{color: '#9ca3af', margin: 0, fontSize: '14px'}}>
                  Preferred Name: {patient.preferredName}
                </p>
              )}
            </div>
            <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
              <button style={{...styles.button, backgroundColor: '#2563eb'}}>
                <Edit2 size={16} />
                Edit Patient
              </button>
              <button 
                style={{...styles.button, backgroundColor: '#7c3aed'}}
                onClick={() => setShowAssignForms(true)}
              >
                <FileText size={16} />
                Assign Forms
              </button>
              <button style={{...styles.button, backgroundColor: '#059669'}}>
                <Send size={16} />
                Send Message
              </button>
              <button 
                style={{...styles.button, backgroundColor: '#dc2626'}}
                onClick={() => {/* Handle delete */}}
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '24px', 
            marginBottom: '20px'
          }}>
            <div>
              <h4 style={{color: '#d1d5db', margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600'}}>
                Personal Information
              </h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                <p style={{color: '#d1d5db', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Calendar size={16} />
                  DOB: {formatDate(patient.dateOfBirth)} ({calculateAge(patient.dateOfBirth)} years)
                </p>
                <p style={{color: '#d1d5db', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <User size={16} />
                  {patient.gender} • {patient.pronouns}
                </p>
                <p style={{color: '#d1d5db', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Users size={16} />
                  {patient.maritalStatus}
                </p>
              </div>
            </div>
            
            <div>
              <h4 style={{color: '#d1d5db', margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600'}}>
                Contact Information
              </h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
                <p style={{color: '#d1d5db', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Phone size={16} />
                  {patient.phone}
                </p>
                <p style={{color: '#d1d5db', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Mail size={16} />
                  {patient.email}
                </p>
                <p style={{color: '#9ca3af', margin: 0, fontSize: '12px'}}>
                  Preferred Contact: {patient.preferredContact}
                </p>
              </div>
            </div>

            <div>
              <h4 style={{color: '#d1d5db', margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600'}}>
                Status & Insurance
              </h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <span style={{...styles.badge, ...getStatusBadgeStyle(patient.status)}}>
                    {patient.status}
                  </span>
                  <span style={{...styles.badge, backgroundColor: patient.patientType === 'New Patient' ? '#7c3aed' : '#0d9488', color: 'white'}}>
                    {patient.patientType}
                  </span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <Shield size={16} style={{color: '#9ca3af'}} />
                  <span style={{...styles.badge, ...getInsuranceBadgeStyle(patient.insurance.primary?.verificationStatus)}}>
                    Insurance {patient.insurance.primary?.verificationStatus || 'Unknown'}
                  </span>
                </div>
                <p style={{color: '#d1d5db', margin: 0, fontSize: '12px'}}>
                  Emergency: {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
                </p>
              </div>
            </div>
          </div>

          {/* Care Team Section */}
          <div>
            <h4 style={{color: '#d1d5db', margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600'}}>
              Care Team
            </h4>
            <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
              {patient.careTeam.map((member, index) => (
                <span key={index} style={{...styles.badge, ...styles.badgeBlue}}>
                  {member}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <div style={styles.card}>
          <PatientDetailTabs patient={patient} />
        </div>
      </div>
    );
  };

  // Enhanced Tab Components
  const PatientDetailTabs = ({ patient }) => {
    const tabs = [
      { id: 'details', label: 'Details', icon: User },
      { id: 'insurance', label: 'Insurance Information', icon: Shield },
      { id: 'treatment-plans', label: 'Treatment Plans', icon: Activity },
      { id: 'appointments', label: 'Appointments', icon: Calendar },
      { id: 'communications', label: 'Communications', icon: MessageSquare },
      { id: 'forms', label: 'Forms', icon: FileText },
      { id: 'documents', label: 'Documents', icon: Upload },
      { id: 'notes', label: 'Notes', icon: Edit2 }
    ];

    const renderTabContent = () => {
      switch (activeTab) {
        case 'details':
          return <DetailsTab patient={patient} />;
        case 'insurance':
          return <InsuranceTab patient={patient} />;
        case 'treatment-plans':
          return <TreatmentPlansTab patient={patient} />;
        case 'appointments':
          return <AppointmentsTab patient={patient} />;
        case 'communications':
          return <CommunicationsTab patient={patient} />;
        case 'forms':
          return <FormsTab patient={patient} />;
        case 'documents':
          return <DocumentsTab patient={patient} />;
        case 'notes':
          return <NotesTab patient={patient} />;
        default:
          return <DetailsTab patient={patient} />;
      }
    };

    return (
      <div>
        {/* Enhanced Tab Navigation */}
        <div style={styles.tabContainer}>
          <ul style={styles.tabList}>
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <li key={tab.id}>
                  <button
                    style={{
                      ...styles.tab,
                      ...(activeTab === tab.id ? styles.activeTab : {})
                    }}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                      <IconComponent size={16} />
                      {tab.label}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Tab Content */}
        <div style={{minHeight: '400px'}}>
          {renderTabContent()}
        </div>
      </div>
    );
  };

  // Enhanced Insurance Tab with Authorization Grid
  const InsuranceTab = ({ patient }) => {
    const mockAuthorizations = [
      {
        id: 1,
        service: 'Spravato Treatment',
        authNumber: 'AUTH123456',
        dateApproved: '2024-06-01',
        effectiveDate: '2024-06-05',
        expiryDate: '2024-12-05',
        unitsAuthorized: 24,
        unitsUsed: 8,
        status: 'Active'
      },
      {
        id: 2,
        service: 'Therapy Sessions',
        authNumber: 'AUTH789012',
        dateApproved: '2024-05-15',
        effectiveDate: '2024-05-20',
        expiryDate: '2024-11-20',
        unitsAuthorized: 12,
        unitsUsed: 12,
        status: 'Expired'
      }
    ];

    return (
      <div>
        {/* Primary Insurance */}
        <h3 style={{color: 'white', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
          Primary Insurance
        </h3>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Insurance Company</label>
            <input style={styles.input} value={patient.insurance.primary?.company || 'Not provided'} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Policy Holder Name</label>
            <input style={styles.input} value={patient.insurance.primary?.policyHolder || 'Not provided'} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Policy Holder Relation</label>
            <input style={styles.input} value={patient.insurance.primary?.policyHolderRelation || 'Not provided'} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Member ID</label>
            <input style={styles.input} value={patient.insurance.primary?.memberId || 'Not provided'} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Expiry Date</label>
            <input style={styles.input} value={formatDate(patient.insurance.primary?.expiryDate)} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Verification Status</label>
            <div style={{padding: '8px 0'}}>
              <span style={{...styles.badge, ...getInsuranceBadgeStyle(patient.insurance.primary?.verificationStatus)}}>
                {patient.insurance.primary?.verificationStatus || 'Unknown'}
              </span>
            </div>
          </div>
        </div>

        {/* Authorization Management Grid */}
        <h3 style={{color: 'white', marginTop: '32px', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
          Authorization Management
        </h3>
        <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h4 style={{color: 'white', margin: 0, fontSize: '16px', fontWeight: '600'}}>
              Authorization Grid
            </h4>
            <button 
              style={{...styles.button, backgroundColor: '#10b981'}}
              onClick={() => setShowAddAuth(true)}
            >
              <Plus size={16} />
              Add Authorization
            </button>
          </div>
          
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr>
                  <th style={{...styles.label, textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                    Service/Procedure
                  </th>
                  <th style={{...styles.label, textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                    Auth Number
                  </th>
                  <th style={{...styles.label, textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                    Date Approved
                  </th>
                  <th style={{...styles.label, textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                    Expiry Date
                  </th>
                  <th style={{...styles.label, textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                    Units Auth/Used/Remaining
                  </th>
                  <th style={{...styles.label, textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                    Status
                  </th>
                  <th style={{...styles.label, textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockAuthorizations.map(auth => {
                  const remaining = auth.unitsAuthorized - auth.unitsUsed;
                  const isExpiringSoon = new Date(auth.expiryDate) <= new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);
                  
                  return (
                    <tr key={auth.id}>
                      <td style={{padding: '12px 8px', color: '#d1d5db', borderBottom: '1px solid #4b5563'}}>
                        {auth.service}
                      </td>
                      <td style={{padding: '12px 8px', color: '#d1d5db', borderBottom: '1px solid #4b5563'}}>
                        {auth.authNumber}
                      </td>
                      <td style={{padding: '12px 8px', color: '#d1d5db', borderBottom: '1px solid #4b5563'}}>
                        {formatDate(auth.dateApproved)}
                      </td>
                      <td style={{padding: '12px 8px', color: '#d1d5db', borderBottom: '1px solid #4b5563'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                          {formatDate(auth.expiryDate)}
                          {isExpiringSoon && (
                            <AlertTriangle size={14} style={{color: '#f59e0b'}} title="Expiring soon" />
                          )}
                        </div>
                      </td>
                      <td style={{padding: '12px 8px', color: '#d1d5db', borderBottom: '1px solid #4b5563'}}>
                        <div style={{fontSize: '12px'}}>
                          <div>Authorized: {auth.unitsAuthorized}</div>
                          <div>Used: {auth.unitsUsed}</div>
                          <div style={{color: remaining > 0 ? '#10b981' : '#ef4444'}}>
                            Remaining: {remaining}
                          </div>
                        </div>
                      </td>
                      <td style={{padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                        <span style={{
                          ...styles.badge,
                          backgroundColor: auth.status === 'Active' ? '#10b981' : 
                                         auth.status === 'Expired' ? '#ef4444' : '#6b7280',
                          color: 'white'
                        }}>
                          {auth.status}
                        </span>
                      </td>
                      <td style={{padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                        <div style={styles.actionButtons}>
                          <button style={{...styles.actionButton, ...styles.actionEdit}}>Edit</button>
                          <button style={{...styles.actionButton, ...styles.actionClone}}>Renew</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Auto-Alert Notifications */}
          <div style={{marginTop: '16px', padding: '12px', backgroundColor: '#1f2937', borderRadius: '6px', border: '1px solid #f59e0b'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
              <AlertTriangle size={16} style={{color: '#f59e0b'}} />
              <span style={{color: '#f59e0b', fontWeight: '600', fontSize: '14px'}}>Auto-Alert System Active</span>
            </div>
            <p style={{color: '#d1d5db', margin: 0, fontSize: '12px'}}>
              System will automatically create tasks 14 days before authorization expiry and assign to designated RCM staff member.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Notes Tab with Advanced Note Types
  const NotesTab = ({ patient }) => {
    const [notes, setNotes] = useState([
      {
        id: 1,
        type: 'SOAP Notes',
        title: 'Initial Assessment - Depression and Anxiety',
        content: 'SUBJECTIVE: Patient reports feeling depressed for the past 6 months with decreased appetite and sleep disturbances.\n\nOBJECTIVE: Patient appears tired, makes good eye contact, speech is normal rate and rhythm.\n\nASSESSMENT: Major Depressive Disorder, moderate severity with anxiety features.\n\nPLAN: Start Spravato treatment protocol, weekly therapy sessions.',
        author: 'Dr. Sarah Wilson',
        authorRole: 'Psychiatrist',
        date: '2024-06-15',
        time: '10:30 AM',
        visibility: 'Internal Only',
        attachments: []
      },
      {
        id: 2,
        type: 'Progress Notes',
        title: 'Treatment Progress - Week 4',
        content: 'Patient showing significant improvement in mood and energy levels. Reports better sleep quality and increased motivation for daily activities. No adverse reactions to current treatment protocol.',
        author: 'Dr. Michael Chen',
        authorRole: 'Therapist',
        date: '2024-06-20',
        time: '2:15 PM',
        visibility: 'Shared with Patient',
        attachments: ['progress_chart.pdf']
      }
    ]);

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
            Clinical Notes ({notes.length})
          </h3>
          <button 
            style={{...styles.button, backgroundColor: '#2563eb'}}
            onClick={() => setShowAddNote(true)}
          >
            <Plus size={16} />
            Add Note
          </button>
        </div>

        {/* Notes List */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {notes.map(note => (
            <div 
              key={note.id}
              style={{backgroundColor: '#374151', borderRadius: '8px', padding: '20px', border: '1px solid #4b5563'}}
            >
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px'}}>
                <div>
                  <h4 style={{color: 'white', margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600'}}>
                    {note.title}
                  </h4>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', marginBottom: '8px'}}>
                    <span style={{...styles.badge, backgroundColor: '#7c3aed', color: 'white'}}>
                      {note.type}
                    </span>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: note.visibility === 'Shared with Patient' ? '#059669' : '#6b7280',
                      color: 'white'
                    }}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        {note.visibility === 'Shared with Patient' ? <Eye size={12} /> : <EyeOff size={12} />}
                        {note.visibility}
                      </div>
                    </span>
                  </div>
                </div>
                
                <div style={{textAlign: 'right', fontSize: '14px', color: '#9ca3af'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px'}}>
                    <User size={12} />
                    {note.author} ({note.authorRole})
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <Calendar size={12} />
                    {formatDate(note.date)} {note.time}
                  </div>
                </div>
              </div>
              
              <div style={{
                color: '#d1d5db',
                fontSize: '14px',
                lineHeight: '1.5',
                backgroundColor: '#1f2937',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #4b5563',
                whiteSpace: 'pre-wrap',
                marginBottom: '12px'
              }}>
                {note.content}
              </div>

              {note.attachments && note.attachments.length > 0 && (
                <div>
                  <label style={{color: '#d1d5db', fontSize: '12px', fontWeight: '600', marginBottom: '6px', display: 'block'}}>
                    Attachments:
                  </label>
                  <div style={{display: 'flex', gap: '8px'}}>
                    {note.attachments.map((attachment, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        backgroundColor: '#1f2937',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#60a5fa',
                        cursor: 'pointer'
                      }}>
                        <FileText size={12} />
                        {attachment}
                        <Download size={10} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '40px', textAlign: 'center'}}>
            <FileText size={48} style={{margin: '0 auto 16px auto', opacity: 0.5, color: '#9ca3af'}} />
            <p style={{color: '#9ca3af', margin: '0 0 16px 0', fontSize: '16px'}}>
              No clinical notes found for this patient
            </p>
            <button 
              style={{...styles.button, backgroundColor: '#2563eb'}}
              onClick={() => setShowAddNote(true)}
            >
              <Plus size={16} />
              Add First Note
            </button>
          </div>
        )}
      </div>
    );
  };

  // Add other tab components (DetailsTab, TreatmentPlansTab, etc.) here
  const DetailsTab = ({ patient }) => (
    <div>
      <h3 style={{color: 'white', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
        Basic Information
      </h3>
      <div style={styles.grid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Legal Name</label>
          <input style={styles.input} value={patient.fullName} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Preferred Name</label>
          <input style={styles.input} value={patient.preferredName} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Date of Birth</label>
          <input style={styles.input} value={formatDate(patient.dateOfBirth)} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Gender</label>
          <input style={styles.input} value={patient.gender} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Pronouns</label>
          <input style={styles.input} value={patient.pronouns} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Marital Status</label>
          <input style={styles.input} value={patient.maritalStatus} readOnly />
        </div>
      </div>
      
      <h3 style={{color: 'white', marginTop: '32px', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
        Contact Information
      </h3>
      <div style={styles.grid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Primary Phone</label>
          <input style={styles.input} value={patient.phone} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} value={patient.email} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Preferred Contact Method</label>
          <input style={styles.input} value={patient.preferredContact} readOnly />
        </div>
      </div>

      <h3 style={{color: 'white', marginTop: '32px', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
        Address Information
      </h3>
      <div style={styles.grid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Home Address</label>
          <input style={styles.input} value={patient.address.home} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mailing Address</label>
          <input style={styles.input} value={patient.address.mailing} readOnly />
        </div>
      </div>

      <h3 style={{color: 'white', marginTop: '32px', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
        Emergency Contact
      </h3>
      <div style={styles.grid}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name</label>
          <input style={styles.input} value={patient.emergencyContact.name} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Relationship</label>
          <input style={styles.input} value={patient.emergencyContact.relationship} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Phone</label>
          <input style={styles.input} value={patient.emergencyContact.phone} readOnly />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} value={patient.emergencyContact.email} readOnly />
        </div>
      </div>
    </div>
  );

  // Placeholder components for other tabs
  const TreatmentPlansTab = () => <div style={{padding: '20px', color: '#9ca3af'}}>Treatment Plans functionality will be implemented here</div>;
  const AppointmentsTab = () => <div style={{padding: '20px', color: '#9ca3af'}}>Appointments functionality will be implemented here</div>;
  const CommunicationsTab = () => <div style={{padding: '20px', color: '#9ca3af'}}>Communications functionality will be implemented here</div>;
  const FormsTab = () => <div style={{padding: '20px', color: '#9ca3af'}}>Forms functionality will be implemented here</div>;
  const DocumentsTab = () => <div style={{padding: '20px', color: '#9ca3af'}}>Documents functionality will be implemented here</div>;

  // Add Patient Form Component
  const AddPatient = () => (
    <div style={styles.content}>
      <button 
        style={{
          ...styles.button,
          backgroundColor: 'transparent',
          color: '#9ca3af',
          padding: '8px 0',
          marginBottom: '16px'
        }}
        onClick={() => setView('list')}
      >
        <ArrowLeft size={16} />
        Back to Patient List
      </button>

      <h1 style={styles.pageTitle}>Add New Patient</h1>

      <div style={styles.card}>
        <h3 style={{color: 'white', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
          Basic Information
        </h3>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Legal Name *</label>
            <input 
              style={styles.input} 
              value={newPatientForm.fullName}
              onChange={(e) => setNewPatientForm({...newPatientForm, fullName: e.target.value})}
              placeholder="Enter full legal name"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Preferred Name</label>
            <input 
              style={styles.input} 
              value={newPatientForm.preferredName}
              onChange={(e) => setNewPatientForm({...newPatientForm, preferredName: e.target.value})}
              placeholder="Enter preferred name"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date of Birth *</label>
            <input 
              type="date"
              style={styles.input} 
              value={newPatientForm.dateOfBirth}
              onChange={(e) => setNewPatientForm({...newPatientForm, dateOfBirth: e.target.value})}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Gender *</label>
            <select 
              style={styles.select}
              value={newPatientForm.gender}
              onChange={(e) => setNewPatientForm({...newPatientForm, gender: e.target.value})}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Pronouns</label>
            <select 
              style={styles.select}
              value={newPatientForm.pronouns}
              onChange={(e) => setNewPatientForm({...newPatientForm, pronouns: e.target.value})}
            >
              <option value="">Select Pronouns</option>
              <option value="He/Him">He/Him</option>
              <option value="She/Her">She/Her</option>
              <option value="They/Them">They/Them</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Marital Status</label>
            <select 
              style={styles.select}
              value={newPatientForm.maritalStatus}
              onChange={(e) => setNewPatientForm({...newPatientForm, maritalStatus: e.target.value})}
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Patient Type *</label>
            <select 
              style={styles.select}
              value={newPatientForm.patientType}
              onChange={(e) => setNewPatientForm({...newPatientForm, patientType: e.target.value})}
            >
              <option value="New Patient">New Patient</option>
              <option value="Follow Up">Follow Up</option>
              <option value="Transfer Patient">Transfer Patient</option>
            </select>
          </div>
        </div>

        <h3 style={{color: 'white', marginTop: '32px', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
          Contact Information
        </h3>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Primary Phone *</label>
            <input 
              style={styles.input} 
              value={newPatientForm.phone}
              onChange={(e) => setNewPatientForm({...newPatientForm, phone: e.target.value})}
              placeholder="(555) 123-4567"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email *</label>
            <input 
              type="email"
              style={styles.input} 
              value={newPatientForm.email}
              onChange={(e) => setNewPatientForm({...newPatientForm, email: e.target.value})}
              placeholder="email@example.com"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Preferred Contact Method</label>
            <select 
              style={styles.select}
              value={newPatientForm.preferredContact}
              onChange={(e) => setNewPatientForm({...newPatientForm, preferredContact: e.target.value})}
            >
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="Text">Text</option>
              <option value="Portal Message">Portal Message</option>
            </select>
          </div>
        </div>

        <h3 style={{color: 'white', marginTop: '32px', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
          Address Information
        </h3>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Home Address *</label>
            <input 
              style={styles.input} 
              value={newPatientForm.homeAddress}
              onChange={(e) => setNewPatientForm({...newPatientForm, homeAddress: e.target.value})}
              placeholder="123 Main St, City, State, ZIP"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mailing Address</label>
            <input 
              style={styles.input} 
              value={newPatientForm.mailingAddress}
              onChange={(e) => setNewPatientForm({...newPatientForm, mailingAddress: e.target.value})}
              placeholder="Leave blank if same as home address"
            />
          </div>
        </div>

        <h3 style={{color: 'white', marginTop: '32px', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
          Emergency Contact
        </h3>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name *</label>
            <input 
              style={styles.input} 
              value={newPatientForm.emergencyContactName}
              onChange={(e) => setNewPatientForm({...newPatientForm, emergencyContactName: e.target.value})}
              placeholder="Emergency contact name"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Relationship *</label>
            <select 
              style={styles.select}
              value={newPatientForm.emergencyContactRelationship}
              onChange={(e) => setNewPatientForm({...newPatientForm, emergencyContactRelationship: e.target.value})}
            >
              <option value="">Select Relationship</option>
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Child">Child</option>
              <option value="Sibling">Sibling</option>
              <option value="Friend">Friend</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone *</label>
            <input 
              style={styles.input} 
              value={newPatientForm.emergencyContactPhone}
              onChange={(e) => setNewPatientForm({...newPatientForm, emergencyContactPhone: e.target.value})}
              placeholder="(555) 123-4567"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input 
              type="email"
              style={styles.input} 
              value={newPatientForm.emergencyContactEmail}
              onChange={(e) => setNewPatientForm({...newPatientForm, emergencyContactEmail: e.target.value})}
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div style={{display: 'flex', gap: '12px', marginTop: '32px'}}>
          <button 
            style={{...styles.button, backgroundColor: '#10b981'}}
            onClick={() => {
              console.log('Saving patient:', newPatientForm);
              setView('list');
            }}
          >
            Save Patient
          </button>
          <button 
            style={{...styles.button, backgroundColor: '#6b7280'}}
            onClick={() => setView('list')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Modal Components
  const AddAuthModal = () => (
    showAddAuth && (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Add Authorization
            </h3>
            <button 
              style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer'}}
              onClick={() => setShowAddAuth(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div style={styles.grid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Service/Procedure *</label>
              <input 
                style={styles.input}
                value={authForm.service}
                onChange={(e) => setAuthForm({...authForm, service: e.target.value})}
                placeholder="Enter service name"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Authorization Number *</label>
              <input 
                style={styles.input}
                value={authForm.authNumber}
                onChange={(e) => setAuthForm({...authForm, authNumber: e.target.value})}
                placeholder="AUTH123456"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Date Approved *</label>
              <input 
                type="date"
                style={styles.input}
                value={authForm.dateApproved}
                onChange={(e) => setAuthForm({...authForm, dateApproved: e.target.value})}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Effective Date *</label>
              <input 
                type="date"
                style={styles.input}
                value={authForm.effectiveDate}
                onChange={(e) => setAuthForm({...authForm, effectiveDate: e.target.value})}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Expiry Date *</label>
              <input 
                type="date"
                style={styles.input}
                value={authForm.expiryDate}
                onChange={(e) => setAuthForm({...authForm, expiryDate: e.target.value})}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Units Authorized *</label>
              <input 
                type="number"
                style={styles.input}
                value={authForm.unitsAuthorized}
                onChange={(e) => setAuthForm({...authForm, unitsAuthorized: e.target.value})}
                placeholder="24"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select 
                style={styles.select}
                value={authForm.status}
                onChange={(e) => setAuthForm({...authForm, status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Denied">Denied</option>
              </select>
            </div>
          </div>

          <div style={{display: 'flex', gap: '12px', marginTop: '20px'}}>
            <button 
              style={{...styles.button, backgroundColor: '#10b981'}}
              onClick={() => {
                console.log('Adding authorization:', authForm);
                setShowAddAuth(false);
              }}
            >
              Add Authorization
            </button>
            <button 
              style={{...styles.button, backgroundColor: '#6b7280'}}
              onClick={() => setShowAddAuth(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );

  const AddNoteModal = () => (
    showAddNote && (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Add Clinical Note
            </h3>
            <button 
              style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer'}}
              onClick={() => setShowAddNote(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Note Type *</label>
              <select 
                style={styles.select}
                value={noteForm.type}
                onChange={(e) => setNoteForm({...noteForm, type: e.target.value})}
              >
                <option value="">Select Note Type</option>
                {Object.entries(NOTE_TYPES).map(([key, value]) => (
                  <option key={key} value={value}>{value}</option>
                ))}
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Visibility *</label>
              <select 
                style={styles.select}
                value={noteForm.visibility}
                onChange={(e) => setNoteForm({...noteForm, visibility: e.target.value})}
              >
                <option value="Internal Only">Internal Only</option>
                <option value="Shared with Patient">Shared with Patient</option>
              </select>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Note Title *</label>
            <input 
              style={styles.input}
              value={noteForm.title}
              onChange={(e) => setNoteForm({...noteForm, title: e.target.value})}
              placeholder="Enter note title..."
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Note Content *</label>
            <textarea 
              style={{...styles.input, minHeight: '120px', resize: 'vertical'}}
              value={noteForm.content}
              onChange={(e) => setNoteForm({...noteForm, content: e.target.value})}
              placeholder="Enter note content..."
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Attach Document (Optional)</label>
            <input 
              type="file"
              style={styles.input}
              onChange={(e) => setNoteForm({...noteForm, attachments: Array.from(e.target.files || [])})}
              accept=".pdf,.doc,.docx,.jpg,.png"
              multiple
            />
          </div>

          <div style={{display: 'flex', gap: '12px'}}>
            <button 
              style={{...styles.button, backgroundColor: '#10b981'}}
              onClick={() => {
                console.log('Adding note:', noteForm);
                setShowAddNote(false);
              }}
            >
              Save Note
            </button>
            <button 
              style={{...styles.button, backgroundColor: '#6b7280'}}
              onClick={() => setShowAddNote(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );

  const AssignFormsModal = () => (
    showAssignForms && (
      <div style={styles.modal}>
        <div style={{...styles.modalContent, maxWidth: '700px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Assign Forms & Form Sets
            </h3>
            <button 
              style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer'}}
              onClick={() => setShowAssignForms(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div style={{marginBottom: '20px'}}>
            <h4 style={{color: 'white', margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600'}}>
              Available Forms & Form Sets
            </h4>
            
            <div style={{maxHeight: '400px', overflowY: 'auto'}}>
              {FORM_SETS.map(form => (
                <div key={form.id} style={{
                  backgroundColor: '#374151',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h5 style={{color: 'white', margin: '0 0 4px 0', fontSize: '16px', fontWeight: '600'}}>
                      {form.name}
                    </h5>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: form.type === 'Form Set' ? '#7c3aed' : '#2563eb',
                      color: 'white'
                    }}>
                      {form.type}
                    </span>
                  </div>
                  <div style={{display: 'flex', gap: '8px'}}>
                    <input type="checkbox" style={{marginRight: '8px'}} />
                    <button 
                      style={{...styles.button, backgroundColor: '#10b981', fontSize: '12px', padding: '4px 8px'}}
                      onClick={() => {
                        console.log('Assigning form:', form);
                      }}
                    >
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{display: 'flex', gap: '12px'}}>
            <button 
              style={{...styles.button, backgroundColor: '#10b981'}}
              onClick={() => {
                console.log('Bulk assigning selected forms');
                setShowAssignForms(false);
              }}
            >
              Assign Selected
            </button>
            <button 
              style={{...styles.button, backgroundColor: '#6b7280'}}
              onClick={() => setShowAssignForms(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Main Render Function
  const renderView = () => {
    switch (view) {
      case 'add':
        return <AddPatient />;
      case 'detail':
        return selectedPatient ? <PatientDetail patient={selectedPatient} /> : <PatientList />;
      default:
        return <PatientList />;
    }
  };

  return (
    <>
      {renderView()}
      
      {/* Modals */}
      <AddAuthModal />
      <AddNoteModal />
      <AssignFormsModal />
    </>
  );
};

export default PatientModule;



