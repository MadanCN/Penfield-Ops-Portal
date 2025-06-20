import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  User, 
  X,
  SortAsc,
  SortDesc,
  Edit2,
  Trash2,
  AlertTriangle
} from 'lucide-react';

const AppointmentModule = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clinicFilter, setClinicFilter] = useState('');
  const [providerFilter, setProviderFilter] = useState('');
  const [sortBy, setSortBy] = useState('appointmentDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  // Form states
  const [appointmentForm, setAppointmentForm] = useState({
    selectedDates: ['', '', ''],
    selectedTimes: [null, null, null],
    durations: [30, 30, 30],
    type: '',
    provider: '',
    patient: '',
    clinic: '',
    notes: ''
  });

  const [editForm, setEditForm] = useState({});
  const [cancelReason, setCancelReason] = useState('');

  // Mock data
  const mockAppointments = [
    {
      id: 1,
      appointmentDate: '2024-06-25',
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      duration: 60,
      provider: 'Dr. Sarah Wilson',
      patient: 'John Smith',
      type: 'Initial Consultation',
      status: 'Scheduled',
      clinic: 'Main Clinic',
      notes: 'First appointment for new patient'
    },
    {
      id: 2,
      appointmentDate: '2024-06-24',
      startTime: '2:00 PM',
      endTime: '2:30 PM',
      duration: 30,
      provider: 'Dr. Michael Chen',
      patient: 'Sarah Johnson',
      type: 'Follow-up',
      status: 'Completed',
      clinic: 'Downtown Clinic',
      notes: 'Regular check-up'
    },
    {
      id: 3,
      appointmentDate: '2024-06-23',
      startTime: '9:00 AM',
      endTime: '10:00 AM',
      duration: 60,
      provider: 'Lisa Rodriguez',
      patient: 'Michael Brown',
      type: 'Therapy Session',
      status: 'No Show',
      clinic: 'Main Clinic',
      notes: 'Patient did not appear'
    },
    {
      id: 4,
      appointmentDate: '2024-06-22',
      startTime: '3:00 PM',
      endTime: '3:45 PM',
      duration: 45,
      provider: 'Dr. Emily Davis',
      patient: 'Emma Wilson',
      type: 'Assessment',
      status: 'Waitlisted',
      clinic: 'North Branch',
      notes: 'Initial assessment for treatment planning'
    }
  ];

  const APPOINTMENT_STATUSES = {
    WAITLISTED: 'Waitlisted',
    SCHEDULED: 'Scheduled',
    CHECKED_IN: 'Checked In',
    COMPLETED: 'Completed',
    NO_SHOW: 'No Show',
    CANCELLED_BY_PATIENT: 'Cancelled By Patient',
    CANCELLED_BY_PROVIDER: 'Cancelled by Provider',
    CANCELLED_BY_CLINIC: 'Cancellation by Clinic',
    RESCHEDULED: 'Reschedules'
  };

  const APPOINTMENT_TYPES = [
    'Initial Consultation',
    'Follow-up',
    'Therapy Session',
    'Medication Review',
    'Assessment',
    'Treatment Planning'
  ];

  const CLINICS = [
    'Main Clinic',
    'Downtown Clinic',
    'North Branch',
    'South Branch'
  ];

  const PROVIDERS = [
    'Dr. Sarah Wilson',
    'Dr. Michael Chen',
    'Lisa Rodriguez',
    'Dr. Emily Davis'
  ];

  const PATIENTS = [
    'John Smith',
    'Sarah Johnson',
    'Michael Brown',
    'Emma Wilson',
    'David Martinez',
    'Lisa Thompson'
  ];

  const CANCELLATION_REASONS = [
    'Cancelled By Patient',
    'Cancelled by Provider', 
    'Cancellation by Clinic'
  ];

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
      fontSize: '14px',
      width: '100%'
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
    badgeGray: { backgroundColor: '#6b7280', color: 'white' },
    badgeTeal: { backgroundColor: '#0d9488', color: 'white' },
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
    actionSuccess: { color: '#34d399' },
    actionDelete: { color: '#f87171' },
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
      maxWidth: '800px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto'
    },
    sidebar: {
      position: 'fixed',
      top: 0,
      right: showSidebar ? 0 : '-400px',
      width: '400px',
      height: '100vh',
      backgroundColor: '#1f2937',
      boxShadow: '-2px 0 10px rgba(0, 0, 0, 0.3)',
      transition: 'right 0.3s ease',
      zIndex: 1000,
      overflow: 'auto'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
      display: showSidebar ? 'block' : 'none'
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
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case APPOINTMENT_STATUSES.WAITLISTED:
        return styles.badgeYellow;
      case APPOINTMENT_STATUSES.SCHEDULED:
        return styles.badgeBlue;
      case APPOINTMENT_STATUSES.CHECKED_IN:
        return styles.badgeTeal;
      case APPOINTMENT_STATUSES.COMPLETED:
        return styles.badgeGreen;
      case APPOINTMENT_STATUSES.NO_SHOW:
        return styles.badgeRed;
      case APPOINTMENT_STATUSES.CANCELLED_BY_PATIENT:
      case APPOINTMENT_STATUSES.CANCELLED_BY_PROVIDER:
      case APPOINTMENT_STATUSES.CANCELLED_BY_CLINIC:
        return styles.badgeGray;
      case APPOINTMENT_STATUSES.RESCHEDULED:
        return styles.badgePurple;
      default:
        return styles.badgeBlue;
    }
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'Not provided';
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getSortedAndFilteredAppointments = () => {
    let filtered = mockAppointments.filter(appointment => {
      const matchesSearch = !searchTerm || 
        appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesClinic = !clinicFilter || appointment.clinic === clinicFilter;
      const matchesProvider = !providerFilter || appointment.provider === providerFilter;
      
      return matchesSearch && matchesClinic && matchesProvider;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'appointmentDate':
          aValue = new Date(a.appointmentDate + ' ' + a.startTime);
          bValue = new Date(b.appointmentDate + ' ' + b.startTime);
          break;
        case 'provider':
          aValue = a.provider;
          bValue = b.provider;
          break;
        case 'patient':
          aValue = a.patient;
          bValue = b.patient;
          break;
        default:
          aValue = new Date(a.appointmentDate + ' ' + a.startTime);
          bValue = new Date(b.appointmentDate + ' ' + b.startTime);
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowSidebar(true);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setEditForm({...appointment});
    setShowEditModal(true);
  };

  const handleCancelAppointment = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowCancelModal(true);
  };

  const confirmCancelAppointment = () => {
    if (!cancelReason) {
      alert('Please select a cancellation reason');
      return;
    }
    console.log('Cancelling appointment:', appointmentToCancel, 'Reason:', cancelReason);
    setShowCancelModal(false);
    setAppointmentToCancel(null);
    setCancelReason('');
  };

  const saveCreateAppointment = () => {
    console.log('Creating appointment:', appointmentForm);
    setShowCreateModal(false);
    setAppointmentForm({
      selectedDates: ['', '', ''],
      selectedTimes: [null, null, null],
      durations: [30, 30, 30],
      type: '',
      provider: '',
      patient: '',
      clinic: '',
      notes: ''
    });
  };

  const saveEditAppointment = () => {
    console.log('Saving appointment changes:', editForm);
    setShowEditModal(false);
    setEditForm({});
    setSelectedAppointment(null);
  };

  // Time slot generation
  const generateTimeSlots = (duration) => {
    const slots = {
      morning: [],
      afternoon: [],
      evening: []
    };

    // Morning slots (9 AM - 12 PM)
    for (let hour = 9; hour < 12; hour++) {
      for (let min = 0; min < 60; min += duration) {
        const time = `${hour}:${min.toString().padStart(2, '0')} AM`;
        slots.morning.push(time);
      }
    }

    // Afternoon slots (1 PM - 5 PM)
    for (let hour = 13; hour < 17; hour++) {
      for (let min = 0; min < 60; min += duration) {
        const displayHour = hour > 12 ? hour - 12 : hour;
        const time = `${displayHour}:${min.toString().padStart(2, '0')} PM`;
        slots.afternoon.push(time);
      }
    }

    // Evening slots (5 PM - 8 PM)
    for (let hour = 17; hour < 20; hour++) {
      for (let min = 0; min < 60; min += duration) {
        const displayHour = hour > 12 ? hour - 12 : hour;
        const time = `${displayHour}:${min.toString().padStart(2, '0')} PM`;
        slots.evening.push(time);
      }
    }

    return slots;
  };

  const getSlotColor = (time, isSelected) => {
    if (isSelected) return '#2563eb'; // Selected - blue
    
    // Mock availability - in real app this would come from API
    const bookedSlots = ['10:00 AM', '2:00 PM', '5:00 PM'];
    
    if (bookedSlots.includes(time)) return '#6b7280'; // Booked - gray
    return '#374151'; // Available - default
  };

  const isSlotDisabled = (time) => {
    const bookedSlots = ['10:00 AM', '2:00 PM', '5:00 PM'];
    return bookedSlots.includes(time);
  };

  // Appointment List Component
  const AppointmentList = () => {
    const filteredAppointments = getSortedAndFilteredAppointments();

    return (
      <div>
        {/* Header */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h1 style={styles.pageTitle}>Appointment Management</h1>
          <button 
            style={styles.button}
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} />
            Create Appointment
          </button>
        </div>

        {/* Search and Filters */}
        <div style={{...styles.card, marginBottom: '24px'}}>
          <div style={{display: 'flex', gap: '16px', alignItems: 'end', flexWrap: 'wrap'}}>
            <div style={styles.searchWrapper}>
              <Search style={styles.searchIcon} size={16} />
              <input 
                type="text" 
                placeholder="Search appointments..." 
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div style={{minWidth: '150px'}}>
              <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
                Clinic
              </label>
              <select 
                style={styles.select}
                value={clinicFilter}
                onChange={(e) => setClinicFilter(e.target.value)}
              >
                <option value="">All Clinics</option>
                {CLINICS.map(clinic => (
                  <option key={clinic} value={clinic}>{clinic}</option>
                ))}
              </select>
            </div>
            
            <div style={{minWidth: '150px'}}>
              <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
                Provider
              </label>
              <select 
                style={styles.select}
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value)}
              >
                <option value="">All Providers</option>
                {PROVIDERS.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div style={styles.table}>
          <div style={{overflowX: 'auto'}}>
            <table style={styles.tableElement}>
              <thead>
                <tr>
                  <th 
                    style={styles.th}
                    onClick={() => handleSort('appointmentDate')}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      APPOINTMENT DATE
                      {sortBy === 'appointmentDate' && (
                        sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </div>
                  </th>
                  <th 
                    style={styles.th}
                    onClick={() => handleSort('provider')}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      PROVIDER
                      {sortBy === 'provider' && (
                        sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </div>
                  </th>
                  <th style={styles.th}>PATIENT</th>
                  <th style={styles.th}>TYPE</th>
                  <th style={styles.th}>STATUS</th>
                  <th style={styles.th}>DURATION</th>
                  <th style={styles.th}>NOTES</th>
                  <th style={styles.th}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td style={{...styles.td, ...styles.tdWhite}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Calendar size={14} style={{color: '#9ca3af'}} />
                        <div>
                          <div>{formatDate(appointment.appointmentDate)}</div>
                          <div style={{fontSize: '12px', color: '#9ca3af'}}>
                            {appointment.startTime} - {appointment.endTime}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <User size={14} style={{color: '#9ca3af'}} />
                        {appointment.provider}
                      </div>
                    </td>
                    <td style={styles.td}>{appointment.patient}</td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...styles.badgePurple}}>
                        {appointment.type}
                      </span>
                    </td>
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
                        <button 
                          style={{...styles.actionButton, ...styles.actionEdit}}
                          onClick={() => handleViewAppointment(appointment)}
                        >
                          View
                        </button>
                        <button 
                          style={{...styles.actionButton, ...styles.actionEdit}}
                          onClick={() => handleEditAppointment(appointment)}
                        >
                          Edit
                        </button>
                        <button 
                          style={{...styles.actionButton, ...styles.actionDelete}}
                          onClick={() => handleCancelAppointment(appointment)}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredAppointments.length === 0 && (
            <div style={{
              padding: '40px', 
              textAlign: 'center', 
              color: '#9ca3af'
            }}>
              No appointments found matching your criteria.
            </div>
          )}
        </div>
      </div>
    );
  };

  // Appointment Detail Sidebar
  const AppointmentDetailSidebar = () => (
    <>
      <div style={styles.overlay} onClick={() => setShowSidebar(false)} />
      <div style={styles.sidebar}>
        <div style={{padding: '24px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Appointment Details
            </h3>
            <button 
              style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer'}}
              onClick={() => setShowSidebar(false)}
            >
              <X size={24} />
            </button>
          </div>

          {selectedAppointment && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div>
                <div style={{display: 'flex', gap: '8px', marginBottom: '12px'}}>
                  <span style={{...styles.badge, ...getStatusBadgeStyle(selectedAppointment.status)}}>
                    {selectedAppointment.status}
                  </span>
                  <span style={{...styles.badge, ...styles.badgePurple}}>
                    {selectedAppointment.type}
                  </span>
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '16px'}}>
                <div>
                  <label style={styles.label}>Appointment Date</label>
                  <p style={{color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Calendar size={16} />
                    {formatDate(selectedAppointment.appointmentDate)}
                  </p>
                </div>

                <div>
                  <label style={styles.label}>Start Time</label>
                  <p style={{color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Clock size={16} />
                    {selectedAppointment.startTime}
                  </p>
                </div>

                <div>
                  <label style={styles.label}>End Time</label>
                  <p style={{color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Clock size={16} />
                    {selectedAppointment.endTime}
                  </p>
                </div>

                <div>
                  <label style={styles.label}>Duration</label>
                  <p style={{color: 'white', margin: 0}}>
                    {selectedAppointment.duration} minutes
                  </p>
                </div>

                <div>
                  <label style={styles.label}>Provider</label>
                  <p style={{color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <User size={16} />
                    {selectedAppointment.provider}
                  </p>
                </div>

                <div>
                  <label style={styles.label}>Patient</label>
                  <p style={{color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <User size={16} />
                    {selectedAppointment.patient}
                  </p>
                </div>

                <div>
                  <label style={styles.label}>Clinic</label>
                  <p style={{color: 'white', margin: 0}}>
                    {selectedAppointment.clinic}
                  </p>
                </div>

                <div>
                  <label style={styles.label}>Notes</label>
                  <p style={{color: '#d1d5db', margin: 0, lineHeight: '1.5'}}>
                    {selectedAppointment.notes || 'No notes provided'}
                  </p>
                </div>
              </div>

              <div style={{display: 'flex', gap: '12px', marginTop: '20px'}}>
                <button 
                  style={{...styles.button, backgroundColor: '#2563eb'}}
                  onClick={() => handleEditAppointment(selectedAppointment)}
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button 
                  style={{...styles.button, backgroundColor: '#dc2626'}}
                  onClick={() => handleCancelAppointment(selectedAppointment)}
                >
                  <Trash2 size={16} />
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Create Appointment Modal
  const CreateAppointmentModal = () => (
  showCreateModal && (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
            Create Appointment
          </h3>
          <button 
            style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer'}}
            onClick={() => setShowCreateModal(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Date and Time Selection */}
        <div style={{marginBottom: '24px'}}>
          <h4 style={{color: 'white', margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600'}}>
            Select Appointment Dates & Times
          </h4>
          
          {[1, 2, 3].map(slotNumber => (
            <div key={slotNumber} style={{marginBottom: '20px', backgroundColor: '#374151', padding: '16px', borderRadius: '8px'}}>
              <h5 style={{color: 'white', margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600'}}>
                Date {slotNumber}
              </h5>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px'}}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Select Date</label>
                  <input 
                    type="date"
                    style={styles.input}
                    value={appointmentForm.selectedDates[slotNumber - 1]}
                    onChange={(e) => {
                      const newDates = [...appointmentForm.selectedDates];
                      newDates[slotNumber - 1] = e.target.value;
                      setAppointmentForm({...appointmentForm, selectedDates: newDates});
                    }}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>Duration</label>
                  <select 
                    style={styles.select}
                    value={appointmentForm.durations[slotNumber - 1]}
                    onChange={(e) => {
                      const newDurations = [...appointmentForm.durations];
                      newDurations[slotNumber - 1] = parseInt(e.target.value);
                      setAppointmentForm({...appointmentForm, durations: newDurations});
                    }}
                  >
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                    <option value={45}>45 min</option>
                    <option value={60}>60 min</option>
                  </select>
                </div>
              </div>

              {appointmentForm.selectedDates[slotNumber - 1] && (
                <div>
                  <p style={{color: '#d1d5db', margin: '0 0 8px 0', fontSize: '14px'}}>
                    Available slots for {new Date(appointmentForm.selectedDates[slotNumber - 1]).toLocaleDateString()}:
                  </p>
                  
                  {['morning', 'afternoon', 'evening'].map(period => {
                    const slots = generateTimeSlots(appointmentForm.durations[slotNumber - 1])[period];
                    return (
                      <div key={period} style={{marginBottom: '12px'}}>
                        <p style={{color: '#d1d5db', margin: '0 0 6px 0', fontSize: '12px', fontWeight: '600', textTransform: 'capitalize'}}>
                          {period}:
                        </p>
                        <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                          {slots.slice(0, 8).map(time => (
                            <button
                              key={time}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: getSlotColor(time, appointmentForm.selectedTimes[slotNumber - 1] === time),
                                color: 'white',
                                border: appointmentForm.selectedTimes[slotNumber - 1] === time ? '2px solid #2563eb' : 'none',
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
                    );
                  })}

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
              Slot Colors:
            </p>
            <div style={{display: 'flex', gap: '16px', fontSize: '12px'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <div style={{width: '12px', height: '12px', backgroundColor: '#374151', borderRadius: '2px'}} />
                <span style={{color: '#d1d5db'}}>Available</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <div style={{width: '12px', height: '12px', backgroundColor: '#6b7280', borderRadius: '2px'}} />
                <span style={{color: '#d1d5db'}}>Booked</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <div style={{width: '12px', height: '12px', backgroundColor: '#2563eb', borderRadius: '2px'}} />
                <span style={{color: '#d1d5db'}}>Selected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Details */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px'}}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Type *</label>
            <select 
              style={styles.select}
              value={appointmentForm.type}
              onChange={(e) => setAppointmentForm({...appointmentForm, type: e.target.value})}
            >
              <option value="">Select Type</option>
              {APPOINTMENT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Provider *</label>
            <select 
              style={styles.select}
              value={appointmentForm.provider}
              onChange={(e) => setAppointmentForm({...appointmentForm, provider: e.target.value})}
            >
              <option value="">Select Provider</option>
              {PROVIDERS.map(provider => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Patient *</label>
            <select 
              style={styles.select}
              value={appointmentForm.patient}
              onChange={(e) => setAppointmentForm({...appointmentForm, patient: e.target.value})}
            >
              <option value="">Select Patient</option>
              {PATIENTS.map(patient => (
                <option key={patient} value={patient}>{patient}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Clinic *</label>
            <select 
              style={styles.select}
              value={appointmentForm.clinic}
              onChange={(e) => setAppointmentForm({...appointmentForm, clinic: e.target.value})}
            >
              <option value="">Select Clinic</option>
              {CLINICS.map(clinic => (
                <option key={clinic} value={clinic}>{clinic}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Notes</label>
          <textarea 
            style={{...styles.input, minHeight: '80px', resize: 'vertical'}}
            value={appointmentForm.notes}
            onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
            placeholder="Add any additional notes..."
          />
        </div>

        <div style={{display: 'flex', gap: '12px'}}>
          <button 
            style={{...styles.button, backgroundColor: '#10b981'}}
            onClick={saveCreateAppointment}
          >
            Save Appointment
          </button>
          <button 
            style={{...styles.button, backgroundColor: '#6b7280'}}
            onClick={() => setShowCreateModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
);

  // Edit Appointment Modal
  const EditAppointmentModal = () => (
    showEditModal && (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Edit Appointment
            </h3>
            <button 
              style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer'}}
              onClick={() => setShowEditModal(false)}
            >
              <X size={24} />
            </button>
          </div>

          {editForm && (
            <>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px'}}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Appointment Date</label>
                  <input 
                    type="date"
                    style={styles.input}
                    value={editForm.appointmentDate || ''}
                    onChange={(e) => setEditForm({...editForm, appointmentDate: e.target.value})}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Start Time</label>
                  <input 
                    type="time"
                    style={styles.input}
                    value={editForm.startTime ? editForm.startTime.replace(' AM', '').replace(' PM', '') : ''}
                    onChange={(e) => setEditForm({...editForm, startTime: e.target.value})}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Duration (minutes)</label>
                  <select 
                    style={styles.select}
                    value={editForm.duration || 30}
                    onChange={(e) => setEditForm({...editForm, duration: parseInt(e.target.value)})}
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Status</label>
                  <select 
                    style={styles.select}
                    value={editForm.status || ''}
                    onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                  >
                    {Object.values(APPOINTMENT_STATUSES).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Type</label>
                  <select 
                    style={styles.select}
                    value={editForm.type || ''}
                    onChange={(e) => setEditForm({...editForm, type: e.target.value})}
                  >
                    {APPOINTMENT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Provider</label>
                  <select 
                    style={styles.select}
                    value={editForm.provider || ''}
                    onChange={(e) => setEditForm({...editForm, provider: e.target.value})}
                  >
                    {PROVIDERS.map(provider => (
                      <option key={provider} value={provider}>{provider}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Patient</label>
                  <select 
                    style={styles.select}
                    value={editForm.patient || ''}
                    onChange={(e) => setEditForm({...editForm, patient: e.target.value})}
                  >
                    {PATIENTS.map(patient => (
                      <option key={patient} value={patient}>{patient}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Clinic</label>
                  <select 
                    style={styles.select}
                    value={editForm.clinic || ''}
                    onChange={(e) => setEditForm({...editForm, clinic: e.target.value})}
                  >
                    {CLINICS.map(clinic => (
                      <option key={clinic} value={clinic}>{clinic}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Notes</label>
                <textarea 
                  style={{...styles.input, minHeight: '80px', resize: 'vertical'}}
                  value={editForm.notes || ''}
                  onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                  placeholder="Add any additional notes..."
                />
              </div>

              {/* Status Change Warning */}
              {editForm.status !== selectedAppointment?.status && (
                <div style={{
                  backgroundColor: '#374151',
                  padding: '16px',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  border: '1px solid #fbbf24'
                }}>
                  <p style={{color: '#fbbf24', margin: 0, fontSize: '14px', fontWeight: '600'}}>
                    ⚠️ Status Change Detected
                  </p>
                  <p style={{color: '#d1d5db', margin: '8px 0 0 0', fontSize: '14px'}}>
                    The appointment status will be changed from "{selectedAppointment?.status}" to "{editForm.status}". 
                    Are you sure you want to proceed?
                  </p>
                </div>
              )}

              <div style={{display: 'flex', gap: '12px'}}>
                <button 
                  style={{...styles.button, backgroundColor: '#10b981'}}
                  onClick={saveEditAppointment}
                >
                  Save Changes
                </button>
                <button 
                  style={{...styles.button, backgroundColor: '#6b7280'}}
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );

  // Cancel Appointment Modal
  const CancelAppointmentModal = () => (
    showCancelModal && (
      <div style={styles.modal}>
        <div style={{...styles.modalContent, maxWidth: '500px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
            <AlertTriangle size={24} style={{color: '#dc2626'}} />
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Cancel Appointment
            </h3>
          </div>

          {appointmentToCancel && (
            <div style={{marginBottom: '20px'}}>
              <p style={{color: '#d1d5db', marginBottom: '16px'}}>
                Are you sure you want to cancel the appointment for <strong>{appointmentToCancel.patient}</strong> 
                with <strong>{appointmentToCancel.provider}</strong> on{' '}
                <strong>{formatDate(appointmentToCancel.appointmentDate)}</strong> at{' '}
                <strong>{appointmentToCancel.startTime}</strong>?
              </p>

              <div style={styles.formGroup}>
                <label style={styles.label}>Cancellation Reason *</label>
                <select 
                  style={styles.select}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                >
                  <option value="">Select cancellation reason</option>
                  {CANCELLATION_REASONS.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
              </div>

              <div style={{
                backgroundColor: '#374151',
                padding: '16px',
                borderRadius: '6px',
                marginTop: '16px',
                border: '1px solid #dc2626'
              }}>
                <p style={{color: '#fbbf24', margin: 0, fontSize: '14px', fontWeight: '600'}}>
                  ⚠️ Important Note
                </p>
                <p style={{color: '#d1d5db', margin: '8px 0 0 0', fontSize: '14px'}}>
                  This action will free up the provider's time slot and notify all relevant parties about the cancellation.
                </p>
              </div>
            </div>
          )}

          <div style={{display: 'flex', gap: '12px'}}>
            <button 
              style={{...styles.button, backgroundColor: '#dc2626'}}
              onClick={confirmCancelAppointment}
            >
              Cancel Appointment
            </button>
            <button 
              style={{...styles.button, backgroundColor: '#6b7280'}}
              onClick={() => setShowCancelModal(false)}
            >
              Keep Appointment
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div style={styles.content}>
      <AppointmentList />
      
      {showSidebar && <AppointmentDetailSidebar />}
      <CreateAppointmentModal />
      <EditAppointmentModal />
      <CancelAppointmentModal />
    </div>
  );
};

export default AppointmentModule;