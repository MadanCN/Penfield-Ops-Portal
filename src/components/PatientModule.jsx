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
  AlertTriangle
} from 'lucide-react';

// Mock Data
const mockPatients = [
  {
    id: 1,
    fullName: 'John Smith',
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
    status: 'Insurance Verification',
    patientType: 'New Patient',
    insurance: {
      primary: {
        company: 'Blue Cross Blue Shield',
        policyHolder: 'John Smith',
        policyHolderRelation: 'Self',
        memberId: 'BC123456789',
        verificationStatus: 'Pending Verification'
      },
      secondary: null
    }
  },
  {
    id: 2,
    fullName: 'Sarah Johnson',
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
    status: 'Treatment plan assigned',
    patientType: 'Returning Patient',
    insurance: {
      primary: {
        company: 'Aetna',
        policyHolder: 'Sarah Johnson',
        policyHolderRelation: 'Self',
        memberId: 'AT987654321',
        verificationStatus: 'Verified'
      }
    }
  }
];

const mockStaff = [
  { id: 1, name: 'Dr. Sarah Wilson', role: 'Psychiatrist' },
  { id: 2, name: 'Dr. Michael Chen', role: 'Therapist' },
  { id: 3, name: 'Lisa Rodriguez', role: 'Nurse Practitioner' }
];

const PATIENT_STATUSES = {
  INTAKE: 'Intake',
  INSURANCE_VERIFICATION: 'Insurance Verification',
  TREATMENT_PLAN_ASSIGNED: 'Treatment plan assigned',
  TREATMENT_PLAN_ACTIVATED: 'Treatment plan activated',
  REJECTED: 'Rejected'
};

const INSURANCE_STATUSES = {
  PENDING: 'Pending Verification',
  VERIFIED: 'Verified',
  REJECTED: 'Rejected'
};

const APPOINTMENT_STATUSES = {
  SCHEDULED: 'Scheduled',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
};

const NOTE_TYPES = {
  CLINICAL: 'Clinical Note',
  PROGRESS: 'Progress Note',
  ASSESSMENT: 'Assessment',
  TREATMENT: 'Treatment Note',
  MEDICATION: 'Medication Note',
  DISCHARGE: 'Discharge Summary'
};

const TREATMENT_PLANS = [
  'Spravato',
  'Med Management',
  'Therapy',
  'Testing'
];

const TREATMENT_STAGES = [
  'Schedule Evaluation',
  'Initial Evaluation', 
  'REMS portal update',
  'Insurance Authorization',
  'Care treatment'
];

const FORM_SETS = [
  { id: 1, name: 'New Patient Intake Forms', type: 'Form Set' },
  { id: 2, name: 'Depression Assessment (PHQ-9)', type: 'Form' },
  { id: 3, name: 'Anxiety Assessment (GAD-7)', type: 'Form' },
  { id: 4, name: 'Treatment Consent Forms', type: 'Form Set' },
  { id: 5, name: 'Insurance Information Form', type: 'Form' }
];

// Mock data functions
const getAppointmentsByPatientId = (patientId) => [
  {
    id: 1,
    patientId,
    date: '2024-06-20',
    time: '10:00 AM',
    providerName: 'Dr. Sarah Wilson',
    type: 'Initial Consultation',
    status: 'Scheduled',
    duration: 60,
    notes: 'First appointment for new patient'
  }
];

const getTreatmentPlansByPatientId = (patientId) => [
  {
    id: 1,
    patientId,
    name: 'Spravato Treatment Plan',
    status: 'Pending Approval',
    providerPOC: 'Dr. Sarah Wilson',
    startDate: '2024-06-25',
    currentStage: 'Schedule Evaluation',
    stages: [
      { id: 1, name: 'Schedule Evaluation', status: 'active' },
      { id: 2, name: 'Initial Evaluation', status: 'pending' },
      { id: 3, name: 'REMS portal update', status: 'pending' },
      { id: 4, name: 'Insurance Authorization', status: 'pending' },
      { id: 5, name: 'Care treatment', status: 'pending' }
    ]
  }
];

const getAuthorizationsByPatientId = (patientId) => [
  {
    id: 1,
    patientId,
    authDate: '2024-06-01',
    expiryDate: '2024-12-01',
    status: 'Active',
    authBy: 'Dr. Sarah Wilson'
  }
];

const getFormsByPatientId = (patientId) => [
  {
    id: 1,
    patientId,
    name: 'New Patient Intake Forms',
    type: 'Form Set',
    status: 'Completed',
    assignedDate: '2024-06-10',
    completedDate: '2024-06-12',
    assignedBy: 'Lisa Rodriguez'
  }
];

const getNotesByPatientId = (patientId) => [
  {
    id: 1,
    patientId,
    type: 'Clinical Note',
    title: 'Initial Assessment',
    content: 'Patient presents with symptoms of depression and anxiety. No immediate safety concerns noted.',
    author: 'Dr. Sarah Wilson',
    authorRole: 'Psychiatrist',
    date: '2024-06-15',
    time: '10:30 AM',
    visibility: 'internal'
  }
];

const PatientModule = () => {
  const [view, setView] = useState('list'); // 'list' | 'detail' | 'add'
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    registrationDate: '',
    appointmentDate: '',
    status: '',
    staff: '',
    insuranceStatus: ''
  });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Modal states
  const [showAddAuth, setShowAddAuth] = useState(false);
  const [showAddTreatmentPlan, setShowAddTreatmentPlan] = useState(false);
  const [showCreateAppointment, setShowCreateAppointment] = useState(false);
  const [showAssignForms, setShowAssignForms] = useState(false);
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
    authDate: '',
    expiryDate: '',
    status: 'Active',
    authBy: ''
  });

  const [treatmentPlanForm, setTreatmentPlanForm] = useState({
    treatmentPlan: '',
    providerPOC: ''
  });

  const [appointmentForm, setAppointmentForm] = useState({
    provider: '',
    selectedSlots: [null, null, null],
    selectedTimes: [null, null, null]
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
      letterSpacing: '0.05em'
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
      fontSize: '14px'
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
      case PATIENT_STATUSES.INTAKE:
        return styles.badgeBlue;
      case PATIENT_STATUSES.INSURANCE_VERIFICATION:
        return styles.badgeYellow;
      case PATIENT_STATUSES.TREATMENT_PLAN_ASSIGNED:
        return styles.badgePurple;
      case PATIENT_STATUSES.TREATMENT_PLAN_ACTIVATED:
        return styles.badgeGreen;
      case PATIENT_STATUSES.REJECTED:
        return styles.badgeRed;
      default:
        return styles.badgeBlue;
    }
  };

  const getStatusProgress = (status) => {
    const statuses = Object.values(PATIENT_STATUSES);
    const currentIndex = statuses.indexOf(status);
    return statuses.map((s, index) => ({
      status: s,
      completed: index < currentIndex,
      current: index === currentIndex,
      color: index < currentIndex ? '#10b981' : index === currentIndex ? '#2563eb' : '#6b7280'
    }));
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

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setView('detail');
    setActiveTab('details');
  };

  const handleBackToList = () => {
    setSelectedPatient(null);
    setView('list');
  };

  const handleAddPatient = () => {
    setView('add');
  };

  const getSortedAndFilteredPatients = () => {
    let filtered = mockPatients.filter(patient => {
      const matchesSearch = !searchTerm || 
        patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !filters.status || patient.status === filters.status;
      const matchesInsurance = !filters.insuranceStatus || 
        patient.insurance.primary?.verificationStatus === filters.insuranceStatus;
      
      return matchesSearch && matchesStatus && matchesInsurance;
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
          aValue = a.fullName;
          bValue = b.fullName;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSaveNewPatient = () => {
    // Logic to save new patient
    console.log('Saving new patient:', newPatientForm);
    // Reset form and go back to list
    setNewPatientForm({
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
    setView('list');
  };

  const handleAddAuth = () => {
    console.log('Adding authorization:', authForm);
    setAuthForm({
      authDate: '',
      expiryDate: '',
      status: 'Active',
      authBy: ''
    });
    setShowAddAuth(false);
  };

  const handleAddTreatmentPlan = () => {
    console.log('Adding treatment plan:', treatmentPlanForm);
    setTreatmentPlanForm({
      treatmentPlan: '',
      providerPOC: ''
    });
    setShowAddTreatmentPlan(false);
  };

  const handleCancelTreatmentPlan = (plan) => {
    setSelectedPlanToCancel(plan);
    setShowCancelPlanDialog(true);
  };

  const confirmCancelTreatmentPlan = () => {
    console.log('Cancelling treatment plan:', selectedPlanToCancel);
    setShowCancelPlanDialog(false);
    setSelectedPlanToCancel(null);
  };

  // Add Patient Component
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
        onClick={handleBackToList}
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
              <option value="Returning Patient">Returning Patient</option>
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
            <input 
              style={styles.input} 
              value={newPatientForm.emergencyContactRelationship}
              onChange={(e) => setNewPatientForm({...newPatientForm, emergencyContactRelationship: e.target.value})}
              placeholder="Spouse, Parent, Sibling, etc."
            />
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
            onClick={handleSaveNewPatient}
          >Save Patient
          </button>
          <button 
            style={{...styles.button, backgroundColor: '#6b7280'}}
            onClick={handleBackToList}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Patient List Component
  const PatientList = () => {
    const filteredPatients = getSortedAndFilteredPatients();

    return (
      <div style={styles.content}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h1 style={styles.pageTitle}>Patient Management</h1>
          <button style={styles.button} onClick={handleAddPatient}>
            <Plus size={16} />
            Add Patient
          </button>
        </div>
        
        {/* Search and Filters Section - Single Line */}
        <div style={{...styles.card, marginBottom: '24px'}}>
          <div style={{display: 'flex', gap: '16px', alignItems: 'end', flexWrap: 'wrap'}}>
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
            
            <div style={{minWidth: '150px'}}>
              <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
                Registration Date
              </label>
              <input 
                type="date" 
                style={styles.select}
                value={filters.registrationDate}
                onChange={(e) => setFilters({...filters, registrationDate: e.target.value})}
              />
            </div>
            
            <div style={{minWidth: '150px'}}>
              <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
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
            
            <div style={{minWidth: '150px'}}>
              <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
                Assigned Staff
              </label>
              <select 
                style={styles.select}
                value={filters.staff}
                onChange={(e) => setFilters({...filters, staff: e.target.value})}
              >
                <option value="">All Staff</option>
                {mockStaff.map(staff => (
                  <option key={staff.id} value={staff.name}>{staff.name}</option>
                ))}
              </select>
            </div>
            
            <div style={{minWidth: '150px'}}>
              <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
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
          </div>
        </div>

        {/* Patient List Table */}
        <div style={styles.table}>
          <div style={{overflowX: 'auto'}}>
            <table style={styles.tableElement}>
              <thead>
                <tr>
                  <th 
                    style={{...styles.th, cursor: 'pointer'}}
                    onClick={() => handleSort('name')}
                  >
                    PATIENT NAME {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th style={styles.th}>DATE OF BIRTH</th>
                  <th style={styles.th}>PHONE NUMBER</th>
                  <th 
                    style={{...styles.th, cursor: 'pointer'}}
                    onClick={() => handleSort('email')}
                  >
                    EMAIL ADDRESS {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    style={{...styles.th, cursor: 'pointer'}}
                    onClick={() => handleSort('registrationDate')}
                  >
                    REGISTRATION DATE {sortBy === 'registrationDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th style={styles.th}>CURRENT STATUS</th>
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
                      onClick={() => handlePatientSelect(patient)}
                    >
                      {patient.fullName}
                    </td>
                    <td style={styles.td}>
                      {formatDate(patient.dateOfBirth)}
                    </td>
                    <td style={styles.td}>{patient.phone}</td>
                    <td style={styles.td}>{patient.email}</td>
                    <td style={styles.td}>
                      {formatDate(patient.registrationDate)}
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
                      <div style={styles.actionButtons}>
                        <button 
                          style={{...styles.actionButton, ...styles.actionEdit}}
                          onClick={() => handlePatientSelect(patient)}
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
            }}>
              No patients found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    );
  };

  // Patient Detail Tabs Component
  const PatientDetailTabs = ({ patient }) => {
    const tabs = [
      { id: 'details', label: 'Details' },
      { id: 'insurance', label: 'Insurance Information' },
      { id: 'treatment-plans', label: 'Treatment Plans' },
      { id: 'appointments', label: 'Appointments' },
      { id: 'communications', label: 'Communications' },
      { id: 'forms', label: 'Forms & Form Sets' },
      { id: 'documents', label: 'Documents' },
      { id: 'notes', label: 'Notes' }
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
        {/* Tab Navigation */}
        <div style={styles.tabContainer}>
          <ul style={styles.tabList}>
            {tabs.map(tab => (
              <li key={tab.id}>
                <button
                  style={{
                    ...styles.tab,
                    ...(activeTab === tab.id ? styles.activeTab : {})
                  }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div style={{minHeight: '400px'}}>
          {renderTabContent()}
        </div>
      </div>
    );
  };

  // Individual Tab Components
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

  const InsuranceTab = ({ patient }) => {
    const authorizations = getAuthorizationsByPatientId(patient.id);
    
    return (
      <div>
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
            <label style={styles.label}>Policy Number/Insurance ID</label>
            <input style={styles.input} value={patient.insurance.primary?.memberId || 'Not provided'} readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Verification Status</label>
            <select style={styles.select} defaultValue={patient.insurance.primary?.verificationStatus || 'Pending Verification'}>
              {Object.values(INSURANCE_STATUSES).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <h3 style={{color: 'white', marginTop: '32px', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
          Secondary Insurance (Optional)
        </h3>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Insurance Company</label>
            <input style={styles.input} value={patient.insurance.secondary?.company || ''} placeholder="Not provided" readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Policy Holder Name</label>
            <input style={styles.input} value={patient.insurance.secondary?.policyHolder || ''} placeholder="Not provided" readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Policy Holder Relation</label>
            <input style={styles.input} value={patient.insurance.secondary?.policyHolderRelation || ''} placeholder="Not provided" readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Policy Number/Insurance ID</label>
            <input style={styles.input} value={patient.insurance.secondary?.memberId || ''} placeholder="Not provided" readOnly />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Verification Status</label>
            <select style={styles.select} defaultValue={patient.insurance.secondary?.verificationStatus || 'Pending Verification'}>
              {Object.values(INSURANCE_STATUSES).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <h3 style={{color: 'white', marginTop: '32px', marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>
          Authorization Management
        </h3>
        <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h4 style={{color: 'white', margin: 0, fontSize: '16px', fontWeight: '600'}}>
              Authorization Log
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
                    Auth Date
                  </th>
                  <th style={{...styles.label, textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                    Expiry Date
                  </th>
                  <th style={{...styles.label, textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                    Status
                  </th>
                  <th style={{...styles.label, textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                    Auth By
                  </th>
                  <th style={{...styles.label, textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {authorizations.map(auth => (
                  <tr key={auth.id}>
                    <td style={{padding: '12px 8px', color: '#d1d5db', borderBottom: '1px solid #4b5563'}}>
                      {formatDate(auth.authDate)}
                    </td>
                    <td style={{padding: '12px 8px', color: '#d1d5db', borderBottom: '1px solid #4b5563'}}>
                      {formatDate(auth.expiryDate)}
                    </td>
                    <td style={{padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                      <span style={{
                        ...styles.badge,
                        ...(auth.status === 'Active' ? styles.badgeGreen : styles.badgeRed)
                      }}>
                        {auth.status}
                      </span>
                    </td>
                    <td style={{padding: '12px 8px', color: '#d1d5db', borderBottom: '1px solid #4b5563'}}>
                      {auth.authBy}
                    </td>
                    <td style={{padding: '12px 8px', borderBottom: '1px solid #4b5563'}}>
                      <button style={{...styles.actionButton, ...styles.actionEdit}}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const TreatmentPlansTab = ({ patient }) => {
    const treatmentPlans = getTreatmentPlansByPatientId(patient.id);

    const getStageStatus = (stages, currentStage) => {
      const currentIndex = TREATMENT_STAGES.indexOf(currentStage);
      return TREATMENT_STAGES.map((stage, index) => ({
        name: stage,
        status: index < currentIndex ? 'completed' : index === currentIndex ? 'active' : 'pending'
      }));
    };

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
            Treatment Plans
          </h3>
          <button 
            style={{...styles.button, backgroundColor: '#2563eb'}}
            onClick={() => setShowAddTreatmentPlan(true)}
          >
            <Plus size={16} />
            Add Treatment Plan
          </button>
        </div>
        
        {treatmentPlans.length > 0 ? (
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {treatmentPlans.map(plan => {
              const stageProgress = getStageStatus(plan.stages, plan.currentStage);
              return (
                <div key={plan.id} style={{backgroundColor: '#374151', borderRadius: '8px', padding: '20px', border: '1px solid #4b5563'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px'}}>
                    <div>
                      <h4 style={{color: 'white', fontSize: '18px', margin: '0 0 8px 0', fontWeight: '600'}}>
                        {plan.name}
                      </h4>
                      <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                        <span style={{...styles.badge, ...styles.badgeBlue}}>
                          {plan.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minWidth(200px, 1fr))', gap: '16px', marginBottom: '16px'}}>
                    <div>
                      <label style={{...styles.label, marginBottom: '4px'}}>Provider POC</label>
                      <p style={{color: '#d1d5db', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <User size={16} />
                        {plan.providerPOC}
                      </p>
                    </div>
                    <div>
                      <label style={{...styles.label, marginBottom: '4px'}}>Start Date</label>
                      <p style={{color: '#d1d5db', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Calendar size={16} />
                        {formatDate(plan.startDate)}
                      </p>
                    </div>
                    <div>
                      <label style={{...styles.label, marginBottom: '4px'}}>Current Stage</label>
                      <p style={{color: '#d1d5db', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Activity size={16} />
                        {plan.currentStage}
                      </p>
                    </div>
                  </div>

                  {/* Stage Progress */}
                  <div style={{marginBottom: '20px'}}>
                    <label style={{...styles.label, marginBottom: '12px'}}>Progress Timeline</label>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                      {stageProgress.map((stage, index) => (
                        <React.Fragment key={stage.name}>
                          <div style={{
                            width: '24px', height: '24px',
                            backgroundColor: stage.status === 'completed' ? '#10b981' : stage.status === 'active' ? '#2563eb' : '#6b7280',
                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            <span style={{color: 'white', fontSize: '10px', fontWeight: '600'}}>
                              {stage.status === 'completed' ? '✓' : index + 1}
                            </span>
                          </div>
                          {index < stageProgress.length - 1 && (
                            <div style={{width: '20px', height: '2px', backgroundColor: stage.status === 'completed' ? '#10b981' : '#6b7280'}} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <div style={{display: 'flex', gap: '44px', fontSize: '11px', color: '#9ca3af', paddingLeft: '12px'}}>
                      {stageProgress.map(stage => (
                        <span key={stage.name} style={{
                          color: stage.status === 'active' ? '#2563eb' : '#9ca3af',
                          fontWeight: stage.status === 'active' ? '600' : '400'
                        }}>
                          {stage.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{display: 'flex', gap: '12px'}}>
                    <button style={{...styles.button, backgroundColor: '#2563eb'}}>View Details</button>
                    <button style={{...styles.button, backgroundColor: '#2563eb'}}>Edit Plan</button>
                    <button 
                      style={{...styles.button, backgroundColor: '#dc2626'}}
                      onClick={() => handleCancelTreatmentPlan(plan)}
                    >
                      Cancel Plan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '40px', textAlign: 'center'}}>
            <p style={{color: '#9ca3af', margin: '0 0 16px 0', fontSize: '16px'}}>
              No treatment plans found for this patient
            </p>
            <button 
              style={{...styles.button, backgroundColor: '#2563eb'}}
              onClick={() => setShowAddTreatmentPlan(true)}
            >
              <Plus size={16} />
              Create First Treatment Plan
            </button>
          </div>
        )}
      </div>
    );
  };

  const AppointmentsTab = ({ patient }) => {
    const appointments = getAppointmentsByPatientId(patient.id);

    const getStatusBadgeStyle = (status) => {
      switch (status) {
        case APPOINTMENT_STATUSES.SCHEDULED:
          return styles.badgeBlue;
        case APPOINTMENT_STATUSES.CONFIRMED:
          return styles.badgeGreen;
        case APPOINTMENT_STATUSES.COMPLETED:
          return styles.badgeTeal;
        case APPOINTMENT_STATUSES.CANCELLED:
          return styles.badgeRed;
        default:
          return styles.badgeBlue;
      }
    };

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
            Appointments
          </h3>
          <button 
            style={{...styles.button, backgroundColor: '#2563eb'}}
            onClick={() => setShowCreateAppointment(true)}
          >
            <Plus size={16} />
            Create Appointment
          </button>
        </div>
        
        <div style={styles.table}>
          <div style={{overflowX: 'auto'}}>
            <table style={styles.tableElement}>
              <thead>
                <tr>
                  <th style={styles.th}>DATE & TIME</th>
                  <th style={styles.th}>PROVIDER</th>
                  <th style={styles.th}>TYPE</th>
                  <th style={styles.th}>STATUS</th>
                  <th style={styles.th}>DURATION</th>
                  <th style={styles.th}>NOTES</th>
                  <th style={styles.th}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td style={{...styles.td, ...styles.tdWhite}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Calendar size={14} style={{color: '#9ca3af'}} />
                        <div>
                          <div>{formatDate(appointment.date)}</div>
                          <div style={{fontSize: '12px', color: '#9ca3af'}}>
                            <Clock size={12} style={{display: 'inline', marginRight: '4px'}} />
                            {appointment.time}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <User size={14} style={{color: '#9ca3af'}} />
                        {appointment.providerName}
                      </div>
                    </td>
                    <td style={styles.td}>{appointment.type}</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...getStatusBadgeStyle(appointment.status)}}>
                        {appointment.status}
                      </span>
                    </td>
                    <td style={styles.td}>{appointment.duration} min</td>
                    <td style={styles.td}>
                      <div style={{maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {appointment.notes || 'No notes'}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button style={{...styles.actionButton, ...styles.actionEdit}}>View</button>
                        {appointment.status === APPOINTMENT_STATUSES.SCHEDULED && (
                          <>
                            <button style={{...styles.actionButton, ...styles.actionEdit}}>Edit</button>
                            <button style={{...styles.actionButton, ...styles.actionDelete}}>Cancel</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {appointments.length === 0 && (
            <div style={{padding: '40px', textAlign: 'center', color: '#9ca3af'}}>
              <Calendar size={48} style={{margin: '0 auto 16px auto', opacity: 0.5}} />
              <p style={{margin: '0 0 16px 0', fontSize: '16px'}}>
                No appointments scheduled for this patient
              </p>
              <button 
                style={{...styles.button, backgroundColor: '#2563eb'}}
                onClick={() => setShowCreateAppointment(true)}
              >
                <Plus size={16} />
                Schedule First Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const FormsTab = ({ patient }) => {
    const forms = getFormsByPatientId(patient.id);

    const getStatusBadgeStyle = (status) => {
      switch (status) {
        case 'Completed':
          return styles.badgeGreen;
        case 'In Progress':
          return styles.badgeBlue;
        case 'Pending':
          return styles.badgeYellow;
        case 'Overdue':
          return styles.badgeRed;
        default:
          return styles.badgeBlue;
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'Completed':
          return <CheckCircle size={16} style={{color: '#10b981'}} />;
        case 'In Progress':
          return <Clock size={16} style={{color: '#2563eb'}} />;
        case 'Pending':
          return <Clock size={16} style={{color: '#d97706'}} />;
        case 'Overdue':
          return <AlertCircle size={16} style={{color: '#dc2626'}} />;
        default:
          return <FileText size={16} style={{color: '#6b7280'}} />;
      }
    };

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
            Forms & Form Sets
          </h3>
          <button 
            style={{...styles.button, backgroundColor: '#2563eb'}}
            onClick={() => setShowAssignForms(true)}
          >
            <Plus size={16} />
            Assign Forms
          </button>
        </div>

        <div style={styles.table}>
          <div style={{overflowX: 'auto'}}>
            <table style={styles.tableElement}>
              <thead>
                <tr>
                  <th style={styles.th}>FORM NAME</th>
                  <th style={styles.th}>TYPE</th>
                  <th style={styles.th}>STATUS</th>
                  <th style={styles.th}>ASSIGNED DATE</th>
                  <th style={styles.th}>COMPLETED DATE</th>
                  <th style={styles.th}>ASSIGNED BY</th>
                  <th style={styles.th}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {forms.map(form => (
                  <tr key={form.id}>
                    <td style={{...styles.td, ...styles.tdWhite}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        {getStatusIcon(form.status)}
                        {form.name}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, backgroundColor: '#7c3aed', color: 'white'}}>
                        {form.type}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...getStatusBadgeStyle(form.status)}}>
                        {form.status}
                      </span>
                    </td>
                    <td style={styles.td}>{formatDate(form.assignedDate)}</td>
                    <td style={styles.td}>{formatDate(form.completedDate)}</td>
                    <td style={styles.td}>{form.assignedBy}</td>
                    <td style={styles.td}>
                      <div style={styles.actionButtons}>
                        <button style={{...styles.actionButton, ...styles.actionEdit}}>View</button>
                        <button style={{...styles.actionButton, ...styles.actionClone}}>Export</button>
                        {form.status !== 'Completed' && (
                          <>
                            <button style={{...styles.actionButton, ...styles.actionClone}}>Remind</button>
                            <button style={{...styles.actionButton, ...styles.actionDelete}}>Cancel</button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const CommunicationsTab = ({ patient }) => (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>Communications</h3>
        <button style={{...styles.button, backgroundColor: '#2563eb'}}>
          <Send size={16} />
          Send Message
        </button>
      </div>
      <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '40px', textAlign: 'center'}}>
        <MessageSquare size={48} style={{margin: '0 auto 16px auto', opacity: 0.5, color: '#9ca3af'}} />
        <p style={{color: '#9ca3af', margin: 0, fontSize: '16px'}}>
          Individual patient chat history with the care team will be displayed here
        </p>
      </div>
    </div>
  );

  const DocumentsTab = ({ patient }) => (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
        <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>Documents</h3>
        <button style={{...styles.button, backgroundColor: '#2563eb'}}>
          <Upload size={16} />
          Upload Document
        </button>
      </div>
      <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '40px', textAlign: 'center'}}>
        <FileText size={48} style={{margin: '0 auto 16px auto', opacity: 0.5, color: '#9ca3af'}} />
        <p style={{color: '#9ca3af', margin: 0, fontSize: '16px'}}>
          Uploaded patient files and documents will be displayed here
        </p>
      </div>
    </div>
  );

  const NotesTab = ({ patient }) => {
    const [showAddNote, setShowAddNote] = useState(false);
    const [notes, setNotes] = useState(getNotesByPatientId(patient.id));
    const [noteForm, setNoteForm] = useState({
      type: '',
      title: '',
      content: '',
      visibility: 'internal',
      document: null
    });

    const handleAddNote = () => {
      if (!noteForm.type || !noteForm.title || !noteForm.content) {
        alert('Please fill in all required fields');
        return;
      }

      const newNote = {
        id: Date.now(),
        patientId: patient.id,
        ...noteForm,
        author: 'Dr. Sarah Wilson',
        authorRole: 'Psychiatrist',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        lastModified: new Date().toISOString().split('T')[0]
      };

      setNotes([newNote, ...notes]);
      setNoteForm({ type: '', title: '', content: '', visibility: 'internal', document: null });
      setShowAddNote(false);
    };

    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
            Clinical Notes ({notes.length})
          </h3>
          <button 
            style={{...styles.button, backgroundColor: '#2563eb'}}
            onClick={() => setShowAddNote(!showAddNote)}
          >
            <Plus size={16} />
            Add Note
          </button>
        </div>

        {/* Add Note Form */}
        {showAddNote && (
          <div style={{backgroundColor: '#374151', borderRadius: '8px', padding: '24px', marginBottom: '24px'}}>
            <h4 style={{color: 'white', margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600'}}>
              Add New Note
            </h4>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Note Type</label>
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
                <label style={styles.label}>Visibility</label>
                <select 
                  style={styles.select}
                  value={noteForm.visibility}
                  onChange={(e) => setNoteForm({...noteForm, visibility: e.target.value})}
                >
                  <option value="internal">Internal Only</option>
                  <option value="shared">Shared with Patient</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Note Title</label>
              <input 
                style={styles.input}
                value={noteForm.title}
                onChange={(e) => setNoteForm({...noteForm, title: e.target.value})}
                placeholder="Enter note title..."
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Note Content</label>
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
                onChange={(e) => setNoteForm({...noteForm, document: e.target.files[0]})}
                accept=".pdf,.doc,.docx,.jpg,.png"
              />
            </div>

            <div style={{display: 'flex', gap: '12px'}}>
              <button 
                style={{...styles.button, backgroundColor: '#10b981'}}
                onClick={handleAddNote}
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
        )}

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
                  <div style={{display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px'}}>
                    <span style={{...styles.badge, backgroundColor: '#7c3aed', color: 'white'}}>
                      {note.type}
                    </span>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: note.visibility === 'shared' ? '#059669' : '#6b7280',
                      color: 'white'
                    }}>
                      {note.visibility === 'shared' ? (
                        <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                          <Eye size={12} /> Shared
                        </span>
                      ) : (
                        <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                          <EyeOff size={12} /> Internal
                        </span>
                      )}
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
                whiteSpace: 'pre-wrap'
              }}>
                {note.content}
              </div>
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

  // Patient Detail Component
  const PatientDetail = ({ patient }) => {
    const statusProgress = getStatusProgress(patient.status);

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
          onClick={handleBackToList}
        >
          <ArrowLeft size={16} />
          Back to Patient List
        </button>

        {/* Patient Summary Header */}
        <div style={{
          ...styles.card, 
          marginBottom: '24px', 
          border: '2px solid #2563eb'
        }}>
          {/* Name and Action Buttons Row */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h2 style={{
              color: 'white', 
              fontSize: '24px', 
              fontWeight: '600', 
              margin: 0,
              backgroundColor: '#2563eb',
              padding: '8px 16px',
              borderRadius: '6px'
            }}>
              {patient.fullName}
            </h2>
            <div style={{display: 'flex', gap: '12px'}}>
              <button style={{...styles.button, backgroundColor: '#2563eb'}}>
                <Edit2 size={16} />
                Edit
              </button>
              <button style={{...styles.button, backgroundColor: '#2563eb'}}>
                <Shield size={16} />
                Initiate IV
              </button>
              <button style={{...styles.button, backgroundColor: '#2563eb'}}>
                <FileText size={16} />
                Assign Forms
              </button>
              <button style={{...styles.button, backgroundColor: '#2563eb'}}>
                <Plus size={16} />
                Create Task
              </button>
              <button style={{...styles.button, backgroundColor: '#dc2626'}}>
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            gap: '24px', 
            marginBottom: '20px'
          }}>
            <div>
              <p style={{color: '#d1d5db', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Calendar size={16} />
                DOB: {formatDate(patient.dateOfBirth)} ({calculateAge(patient.dateOfBirth)} years)
              </p>
              <p style={{color: '#d1d5db', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <User size={16} />
                Gender: {patient.gender}
              </p>
              <p style={{color: '#d1d5db', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Users size={16} />
                Patient Type: {patient.patientType}
              </p>
            </div>
            <div>
              <p style={{color: '#d1d5db', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Phone size={16} />
                {patient.phone}
              </p>
              <p style={{color: '#d1d5db', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Mail size={16} />
                {patient.email}
              </p>
              <p style={{color: '#d1d5db', margin: 0}}>
                Preferred: {patient.preferredContact}
              </p>
            </div>
            <div>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '8px'
              }}>
                <Shield size={16} style={{color: '#9ca3af'}} />
                <span style={{
                  ...styles.badge,
                  ...(patient.insurance.primary?.verificationStatus === 'Verified' 
                    ? styles.badgeGreen 
                    : styles.badgeRed)
                }}>
                  Insurance {patient.insurance.primary?.verificationStatus || 'Unknown'}
                </span>
              </div>
              <p style={{color: '#d1d5db', margin: '0 0 4px 0'}}>
                Emergency: {patient.emergencyContact.name} ({patient.emergencyContact.relationship})
              </p>
              <p style={{color: '#d1d5db', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                <Phone size={16} />
                {patient.emergencyContact.phone}
              </p>
            </div>
          </div>
          
          {/* Status Timeline - Salesforce style */}
          <div style={{marginBottom: '20px'}}>
            <h4 style={{color: 'white', margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600'}}>
              Patient Status Progress
            </h4>
            <div style={{
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              marginBottom: '8px'
            }}>
              {statusProgress.map((stage, index) => (
                <React.Fragment key={stage.status}>
                  <div style={{
                    flex: 1,
                    height: '8px',
                    backgroundColor: stage.color,
                    borderRadius: index === 0 ? '4px 0 0 4px' : index === statusProgress.length - 1 ? '0 4px 4px 0' : '0',
                    position: 'relative'
                  }}>
                    {stage.current && (
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        whiteSpace: 'nowrap'
                      }}>
                        Current
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between',
              fontSize: '12px', 
              color: '#d1d5db',
              marginTop: '8px'
            }}>
              {statusProgress.map((stage) => (
                <span 
                  key={stage.status}
                  style={{
                    color: stage.current ? '#2563eb' : '#d1d5db',
                    fontWeight: stage.current ? '600' : '400',
                    fontSize: '11px'
                  }}
                >
                  {stage.status}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Detail Tabs */}
        <div style={styles.card}>
          <PatientDetailTabs patient={patient} />
        </div>
      </div>
    );
  };

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
              <label style={styles.label}>Authorization Date</label>
              <input 
                type="date"
                style={styles.input}
                value={authForm.authDate}
                onChange={(e) => setAuthForm({...authForm, authDate: e.target.value})}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Expiry Date</label>
              <input 
                type="date"
                style={styles.input}
                value={authForm.expiryDate}
                onChange={(e) => setAuthForm({...authForm, expiryDate: e.target.value})}
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
                <option value="Expired">Expired</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Authorized By</label>
              <select 
                style={styles.select}
                value={authForm.authBy}
                onChange={(e) => setAuthForm({...authForm, authBy: e.target.value})}
              >
                <option value="">Select Provider</option>
                {mockStaff.map(staff => (
                  <option key={staff.id} value={staff.name}>{staff.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{display: 'flex', gap: '12px', marginTop: '20px'}}>
            <button 
              style={{...styles.button, backgroundColor: '#10b981'}}
              onClick={handleAddAuth}
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

  const AddTreatmentPlanModal = () => (
    showAddTreatmentPlan && (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Add Treatment Plan
            </h3>
            <button 
              style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer'}}
              onClick={() => setShowAddTreatmentPlan(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Select Treatment Plan *</label>
            <select 
              style={styles.select}
              value={treatmentPlanForm.treatmentPlan}
              onChange={(e) => setTreatmentPlanForm({...treatmentPlanForm, treatmentPlan: e.target.value})}
            >
              <option value="">Select Treatment Plan</option>
              {TREATMENT_PLANS.map(plan => (
                <option key={plan} value={plan}>{plan}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Select Provider POC *</label>
            <select 
              style={styles.select}
              value={treatmentPlanForm.providerPOC}
              onChange={(e) => setTreatmentPlanForm({...treatmentPlanForm, providerPOC: e.target.value})}
            >
              <option value="">Select Provider</option>
              {mockStaff.map(staff => (
                <option key={staff.id} value={staff.name}>{staff.name}</option>
              ))}
            </select>
          </div>

          <div style={{display: 'flex', gap: '12px', marginTop: '20px'}}>
            <button 
              style={{...styles.button, backgroundColor: '#10b981'}}
              onClick={handleAddTreatmentPlan}
            >
              Send for Approval
            </button>
            <button 
              style={{...styles.button, backgroundColor: '#6b7280'}}
              onClick={() => setShowAddTreatmentPlan(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );

  const CancelPlanDialog = () => (
    showCancelPlanDialog && (
      <div style={styles.modal}>
        <div style={{...styles.modalContent, maxWidth: '500px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
            <AlertTriangle size={24} style={{color: '#dc2626'}} />
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Cancel Treatment Plan
            </h3>
          </div>

          <p style={{color: '#d1d5db', marginBottom: '20px', lineHeight: '1.5'}}>
            Are you sure you want to cancel this treatment plan? This action will:
          </p>
          
          <ul style={{color: '#d1d5db', marginBottom: '20px', lineHeight: '1.5', paddingLeft: '20px'}}>
            <li>Delete all related tasks</li>
            <li>Cancel all associated appointments</li>
            <li>Remove all progress tracking</li>
            <li>Archive all plan documentation</li>
          </ul>

          <p style={{color: '#dc2626', marginBottom: '20px', fontWeight: '600'}}>
            This action cannot be undone.
          </p>

          <div style={{display: 'flex', gap: '12px'}}>
            <button 
              style={{...styles.button, backgroundColor: '#dc2626'}}
              onClick={confirmCancelTreatmentPlan}
            >
              Yes, Cancel Plan
            </button>
           <button 
  style={{...styles.button, backgroundColor: '#6b7280'}}
  onClick={() => setShowCancelPlanDialog(false)}
>
  Keep Plan
</button>
          </div>
        </div>
      </div>
    )
  );

  const CreateAppointmentModal = () => {
    const timeSlots = {
      morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM'],
      afternoon: ['1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'],
      evening: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM']
    };

    const getSlotColor = (time) => {
      // Mock availability - in real app this would come from API
      const unavailable = ['9:30 AM', '2:00 PM', '5:00 PM'];
      const blocked = ['10:30 AM', '4:30 PM'];
      
      if (blocked.includes(time)) return '#dc2626'; // Red - blocked
      if (unavailable.includes(time)) return '#6b7280'; // Gray - booked
      return '#2563eb'; // Blue - available
    };

    const isSlotDisabled = (time) => {
      const unavailable = ['9:30 AM', '2:00 PM', '5:00 PM'];
      const blocked = ['10:30 AM', '4:30 PM'];
      return unavailable.includes(time) || blocked.includes(time);
    };

    return (
      showCreateAppointment && (
        <div style={styles.modal}>
          <div style={{...styles.modalContent, maxWidth: '800px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
              <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
                Create Appointment
              </h3>
              <button 
                style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer'}}
                onClick={() => setShowCreateAppointment(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Step 1: Provider Selection */}
            <div style={{marginBottom: '24px'}}>
              <h4 style={{color: 'white', margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600'}}>
                Step 1: Provider Selection
              </h4>
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Provider</label>
                <select 
                  style={styles.select}
                  value={appointmentForm.provider}
                  onChange={(e) => setAppointmentForm({...appointmentForm, provider: e.target.value})} >
                  <option value="">Select Provider</option>
                  {mockStaff.map(staff => (
                    <option key={staff.id} value={staff.name}>{staff.name} - {staff.role}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 2: Date & Time Selection */}
            <div style={{marginBottom: '24px'}}>
              <h4 style={{color: 'white', margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600'}}>
                Step 2: Date & Time Slot Selection
              </h4>
              
              {[1, 2, 3].map(slotNumber => (
                <div key={slotNumber} style={{marginBottom: '20px', backgroundColor: '#374151', padding: '16px', borderRadius: '8px'}}>
                  <h5 style={{color: 'white', margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600'}}>
                    Slot {slotNumber}
                  </h5>
                  
                  <div style={{marginBottom: '12px'}}>
                    <label style={styles.label}>Select Date</label>
                    <input 
                      type="date"
                      style={styles.input}
                      value={appointmentForm.selectedSlots[slotNumber - 1] || ''}
                      onChange={(e) => {
                        const newSlots = [...appointmentForm.selectedSlots];
                        newSlots[slotNumber - 1] = e.target.value;
                        setAppointmentForm({...appointmentForm, selectedSlots: newSlots});
                      }}
                    />
                  </div>

                  {appointmentForm.selectedSlots[slotNumber - 1] && (
                    <div>
                      <p style={{color: '#d1d5db', margin: '0 0 8px 0', fontSize: '14px'}}>
                        Date: {new Date(appointmentForm.selectedSlots[slotNumber - 1]).toLocaleDateString()}
                      </p>
                      
                      {/* Morning Slots */}
                      <div style={{marginBottom: '12px'}}>
                        <p style={{color: '#d1d5db', margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600'}}>
                          Morning:
                        </p>
                        <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                          {timeSlots.morning.map(time => (
                            <button
                              key={time}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: getSlotColor(time),
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: isSlotDisabled(time) ? 'not-allowed' : 'pointer',
                                opacity: isSlotDisabled(time) ? 0.6 : 1
                              }}
                              disabled={isSlotDisabled(time)}
                              onClick={() => {
                                if (!isSlotDisabled(time)) {
                                  const newTimes = [...appointmentForm.selectedTimes];
                                  newTimes[slotNumber - 1] = time;
                                  setAppointmentForm({...appointmentForm, selectedTimes: newTimes});
                                }
                              }}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Afternoon Slots */}
                      <div style={{marginBottom: '12px'}}>
                        <p style={{color: '#d1d5db', margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600'}}>
                          Afternoon:
                        </p>
                        <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                          {timeSlots.afternoon.map(time => (
                            <button
                              key={time}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: getSlotColor(time),
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: isSlotDisabled(time) ? 'not-allowed' : 'pointer',
                                opacity: isSlotDisabled(time) ? 0.6 : 1
                              }}
                              disabled={isSlotDisabled(time)}
                              onClick={() => {
                                if (!isSlotDisabled(time)) {
                                  const newTimes = [...appointmentForm.selectedTimes];
                                  newTimes[slotNumber - 1] = time;
                                  setAppointmentForm({...appointmentForm, selectedTimes: newTimes});
                                }
                              }}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Evening Slots */}
                      <div style={{marginBottom: '12px'}}>
                        <p style={{color: '#d1d5db', margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600'}}>
                          Evening:
                        </p>
                        <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                          {timeSlots.evening.map(time => (
                            <button
                              key={time}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: getSlotColor(time),
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: isSlotDisabled(time) ? 'not-allowed' : 'pointer',
                                opacity: isSlotDisabled(time) ? 0.6 : 1
                              }}
                              disabled={isSlotDisabled(time)}
                              onClick={() => {
                                if (!isSlotDisabled(time)) {
                                  const newTimes = [...appointmentForm.selectedTimes];
                                  newTimes[slotNumber - 1] = time;
                                  setAppointmentForm({...appointmentForm, selectedTimes: newTimes});
                                }
                              }}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      {appointmentForm.selectedTimes[slotNumber - 1] && (
                        <p style={{color: '#10b981', margin: '8px 0 0 0', fontSize: '12px', fontWeight: '600'}}>
                          Selected: {appointmentForm.selectedTimes[slotNumber - 1]}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Color Legend */}
              <div style={{backgroundColor: '#1f2937', padding: '12px', borderRadius: '6px', marginTop: '16px'}}>
                <p style={{color: 'white', margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600'}}>
                  Color Coding:
                </p>
                <div style={{display: 'flex', gap: '16px', fontSize: '12px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                    <div style={{width: '12px', height: '12px', backgroundColor: '#2563eb', borderRadius: '2px'}} />
                    <span style={{color: '#d1d5db'}}>Available</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                    <div style={{width: '12px', height: '12px', backgroundColor: '#6b7280', borderRadius: '2px'}} />
                    <span style={{color: '#d1d5db'}}>Booked</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                    <div style={{width: '12px', height: '12px', backgroundColor: '#dc2626', borderRadius: '2px'}} />
                    <span style={{color: '#d1d5db'}}>Blocked</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{display: 'flex', gap: '12px'}}>
              <button 
                style={{...styles.button, backgroundColor: '#10b981'}}
                onClick={() => {
                  console.log('Creating appointment:', appointmentForm);
                  setShowCreateAppointment(false);
                  setAppointmentForm({
                    provider: '',
                    selectedSlots: [null, null, null],
                    selectedTimes: [null, null, null]
                  });
                }}
              >
                Create Appointment
              </button>
              <button 
                style={{...styles.button, backgroundColor: '#6b7280'}}
                onClick={() => setShowCreateAppointment(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

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
                  <button 
                    style={{...styles.button, backgroundColor: '#10b981'}}
                    onClick={() => {
                      console.log('Assigning form:', form);
                      // Handle form assignment
                    }}
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{display: 'flex', gap: '12px'}}>
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
      <AddTreatmentPlanModal />
      <CancelPlanDialog />
      <CreateAppointmentModal />
      <AssignFormsModal />
    </>
  );
};

export default PatientModule;