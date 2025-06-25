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
  X,
  Filter,
  SortAsc,
  SortDesc,
  ChevronRight,
  AlertTriangle,
  Users,
  Activity,
  MessageSquare,
  RefreshCw,
  Forward,
  Ban
} from 'lucide-react';

// Enhanced Mock Data based on specifications
const mockTasks = [
  {
    id: 1,
    taskSubject: 'Schedule Initial Evaluation',
    taskDescription: 'Schedule the initial evaluation appointment for John Smith as part of Spravato treatment plan initiation',
    createdDate: '2024-06-20',
    dueDate: '2024-06-22',
    taskType: 'Treatment Plan',
    taskStatus: 'In Progress',
    patientId: 1,
    patientName: 'John Smith',
    assignedToUserId: 'current-user',
    assignedToName: 'Current User',
    createdByUserId: 'dr-wilson',
    createdByName: 'Dr. Sarah Wilson',
    escalationTargetUserId: 'dr-chen',
    escalationTargetName: 'Dr. Michael Chen',
    priority: 'High',
    escalationTimeMinutes: 2880, // 48 hours
    parentTaskId: null,
    treatmentPlanId: 1,
    clinicId: 1
  },
  {
    id: 2,
    taskSubject: 'Insurance Authorization Request',
    taskDescription: 'Submit insurance authorization request for Sarah Johnson Spravato treatment',
    createdDate: '2024-06-19',
    dueDate: '2024-06-21',
    taskType: 'Standard',
    taskStatus: 'Escalated',
    patientId: 2,
    patientName: 'Sarah Johnson',
    assignedToUserId: 'current-user',
    assignedToName: 'Current User',
    createdByUserId: 'lisa-rodriguez',
    createdByName: 'Lisa Rodriguez',
    escalationTargetUserId: 'dr-wilson',
    escalationTargetName: 'Dr. Sarah Wilson',
    priority: 'High',
    escalationTimeMinutes: 1440, // 24 hours
    parentTaskId: null,
    treatmentPlanId: null,
    clinicId: 1
  },
  {
    id: 3,
    taskSubject: 'REMS Portal Update',
    taskDescription: 'Update REMS portal with patient information and treatment plan details for Michael Brown',
    createdDate: '2024-06-18',
    dueDate: '2024-06-20',
    taskType: 'Treatment Plan',
    taskStatus: 'Completed',
    patientId: 3,
    patientName: 'Michael Brown',
    assignedToUserId: 'other-user',
    assignedToName: 'Emily Davis',
    createdByUserId: 'dr-chen',
    createdByName: 'Dr. Michael Chen',
    escalationTargetUserId: 'dr-wilson',
    escalationTargetName: 'Dr. Sarah Wilson',
    priority: 'Medium',
    escalationTimeMinutes: 2880, // 48 hours
    parentTaskId: null,
    treatmentPlanId: 2,
    clinicId: 1
  },
  {
    id: 4,
    taskSubject: 'Rejection Request - Appointment Scheduling',
    taskDescription: 'The following task has been rejected, please review it. Original task: Schedule follow-up appointment for Emma Davis',
    createdDate: '2024-06-17',
    dueDate: '2024-06-19',
    taskType: 'Rejection Request',
    taskStatus: 'In Progress',
    patientId: 4,
    patientName: 'Emma Davis',
    assignedToUserId: 'dr-wilson',
    assignedToName: 'Dr. Sarah Wilson',
    createdByUserId: 'system',
    createdByName: 'System',
    escalationTargetUserId: 'clinic-admin',
    escalationTargetName: 'Clinic Administrator',
    priority: 'Medium',
    escalationTimeMinutes: 1440, // 24 hours
    parentTaskId: 5,
    treatmentPlanId: null,
    clinicId: 1,
    rejectionReason: 'Patient requested different time slot that conflicts with provider availability',
    rejectedBy: 'Mike Johnson'
  },
  {
    id: 6,
    taskSubject: 'Patient Intake Documentation Review',
    taskDescription: 'Review and verify completeness of intake documentation for new patient Jennifer Wilson',
    createdDate: '2024-06-16',
    dueDate: '2024-06-18',
    taskType: 'Standard',
    taskStatus: 'Rejected',
    patientId: 5,
    patientName: 'Jennifer Wilson',
    assignedToUserId: 'other-user',
    assignedToName: 'Emily Davis',
    createdByUserId: 'lisa-rodriguez',
    createdByName: 'Lisa Rodriguez',
    escalationTargetUserId: 'dr-wilson',
    escalationTargetName: 'Dr. Sarah Wilson',
    priority: 'Low',
    escalationTimeMinutes: 4320, // 72 hours
    parentTaskId: null,
    treatmentPlanId: null,
    clinicId: 1
  }
];

const TASK_STATUSES = {
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
  ESCALATED: 'Escalated',
  REASSIGNED: 'Reassigned'
};

const TASK_TYPES = {
  TREATMENT_PLAN: 'Treatment Plan',
  STANDARD: 'Standard',
  REJECTION_REQUEST: 'Rejection Request'
};

const PRIORITY_LEVELS = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical'
};

// Mock users for assignment
const mockUsers = [
  { id: 'dr-wilson', name: 'Dr. Sarah Wilson', role: 'Provider POC' },
  { id: 'dr-chen', name: 'Dr. Michael Chen', role: 'Provider POC' },
  { id: 'lisa-rodriguez', name: 'Lisa Rodriguez', role: 'Intake Team' },
  { id: 'emily-davis', name: 'Emily Davis', role: 'Scheduling Team' },
  { id: 'mike-johnson', name: 'Mike Johnson', role: 'Scheduling Team' }
];

const TaskModule = () => {
  const [activeTab, setActiveTab] = useState('my-tasks');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    taskStatus: '',
    taskType: '',
    priority: '',
    createdDateFrom: '',
    createdDateTo: '',
    dueDateFrom: '',
    dueDateTo: ''
  });
  const [sortBy, setSortBy] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMarkDoneModal, setShowMarkDoneModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showEscalationModal, setShowEscalationModal] = useState(false);
  const [taskToAction, setTaskToAction] = useState(null);
  const [completionComments, setCompletionComments] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [escalationAction, setEscalationAction] = useState('forward'); // forward, reassign, cancel
  const [escalationTarget, setEscalationTarget] = useState('');
  const [escalationInstructions, setEscalationInstructions] = useState('');
  const [reassignmentTarget, setReassignmentTarget] = useState('');
  const [reassignmentNotes, setReassignmentNotes] = useState('');
  const [cancellationReason, setCancellationReason] = useState('');

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
    badgeOrange: { backgroundColor: '#ea580c', color: 'white' },
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
    actionSuccess: { color: '#34d399' },
    actionDelete: { color: '#f87171' },
    actionWarning: { color: '#fbbf24' },
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
    }
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case TASK_STATUSES.IN_PROGRESS:
        return styles.badgeBlue;
      case TASK_STATUSES.COMPLETED:
        return styles.badgeGreen;
      case TASK_STATUSES.REJECTED:
        return styles.badgeRed;
      case TASK_STATUSES.CANCELLED:
        return styles.badgeGray;
      case TASK_STATUSES.ESCALATED:
        return styles.badgeOrange;
      case TASK_STATUSES.REASSIGNED:
        return styles.badgePurple;
      default:
        return styles.badgeBlue;
    }
  };

  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case PRIORITY_LEVELS.CRITICAL:
        return styles.badgeRed;
      case PRIORITY_LEVELS.HIGH:
        return styles.badgeOrange;
      case PRIORITY_LEVELS.MEDIUM:
        return styles.badgeYellow;
      case PRIORITY_LEVELS.LOW:
        return styles.badgeGreen;
      default:
        return styles.badgeGray;
    }
  };

  const getTaskTypeBadgeStyle = (type) => {
    switch (type) {
      case TASK_TYPES.TREATMENT_PLAN:
        return styles.badgePurple;
      case TASK_TYPES.STANDARD:
        return styles.badgeBlue;
      case TASK_TYPES.REJECTION_REQUEST:
        return styles.badgeYellow;
      default:
        return styles.badgeGray;
    }
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'Not provided';
  };

  const formatDateTime = (dateString) => {
    return dateString ? new Date(dateString).toLocaleString() : 'Not provided';
  };

  const calculateDaysOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = today - due;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const isTaskOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getSortedAndFilteredTasks = () => {
    let filtered = mockTasks.filter(task => {
      // Tab filtering - My Tasks shows only current user's tasks with active statuses
      if (activeTab === 'my-tasks') {
        if (task.assignedToUserId !== 'current-user') return false;
        if (!['In Progress', 'Escalated', 'Rejected'].includes(task.taskStatus)) return false;
      }
      
      // Search filtering
      const matchesSearch = !searchTerm || 
        task.taskSubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.patientName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter conditions
      const matchesStatus = !filters.taskStatus || task.taskStatus === filters.taskStatus;
      const matchesType = !filters.taskType || task.taskType === filters.taskType;
      const matchesPriority = !filters.priority || task.priority === filters.priority;
      
      // Date range filtering
      let matchesCreatedDateRange = true;
      if (filters.createdDateFrom) {
        matchesCreatedDateRange = matchesCreatedDateRange && new Date(task.createdDate) >= new Date(filters.createdDateFrom);
      }
      if (filters.createdDateTo) {
        matchesCreatedDateRange = matchesCreatedDateRange && new Date(task.createdDate) <= new Date(filters.createdDateTo);
      }
      
      let matchesDueDateRange = true;
      if (filters.dueDateFrom) {
        matchesDueDateRange = matchesDueDateRange && new Date(task.dueDate) >= new Date(filters.dueDateFrom);
      }
      if (filters.dueDateTo) {
        matchesDueDateRange = matchesDueDateRange && new Date(task.dueDate) <= new Date(filters.dueDateTo);
      }
      
      return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesCreatedDateRange && matchesDueDateRange;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'taskSubject':
          aValue = a.taskSubject;
          bValue = b.taskSubject;
          break;
        case 'createdDate':
          aValue = new Date(a.createdDate);
          bValue = new Date(b.createdDate);
          break;
        case 'dueDate':
          aValue = new Date(a.dueDate);
          bValue = new Date(b.dueDate);
          break;
        case 'priority':
          const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          aValue = priorityOrder[a.priority] || 0;
          bValue = priorityOrder[b.priority] || 0;
          break;
        default:
          aValue = new Date(a.createdDate);
          bValue = new Date(b.createdDate);
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowSidebar(true);
  };

  const handleMarkDone = (task) => {
    setTaskToAction(task);
    setShowMarkDoneModal(true);
  };

  const handleReject = (task) => {
    setTaskToAction(task);
    setShowRejectModal(true);
  };

  const handleEscalation = (task) => {
    setTaskToAction(task);
    setShowEscalationModal(true);
  };

  const confirmMarkDone = () => {
    console.log('Marking task done:', taskToAction, 'Comments:', completionComments);
    setShowMarkDoneModal(false);
    setTaskToAction(null);
    setCompletionComments('');
  };

  const confirmReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please enter a reason for rejection');
      return;
    }
    console.log('Rejecting task:', taskToAction, 'Reason:', rejectionReason);
    setShowRejectModal(false);
    setTaskToAction(null);
    setRejectionReason('');
  };

  const confirmEscalation = () => {
    const escalationData = {
      task: taskToAction,
      action: escalationAction,
      target: escalationTarget,
      instructions: escalationInstructions,
      reassignmentTarget,
      reassignmentNotes,
      cancellationReason
    };
    console.log('Processing escalation:', escalationData);
    setShowEscalationModal(false);
    setTaskToAction(null);
    setEscalationAction('forward');
    setEscalationTarget('');
    setEscalationInstructions('');
    setReassignmentTarget('');
    setReassignmentNotes('');
    setCancellationReason('');
  };

  const handleTaskClick = (task) => {
    console.log('Redirecting to patient record:', task.patientId);
    // In a real app, this would navigate to the patient record
  };

  // Enhanced Task List Component
  const TaskList = () => {
    const filteredTasks = getSortedAndFilteredTasks();

    return (
      <div>
        {/* Enhanced Search and Filters */}
        <div style={{...styles.card, marginBottom: '24px'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end'}}>
            <div style={styles.searchWrapper}>
              <Search style={styles.searchIcon} size={16} />
              <input 
                type="text" 
                placeholder="Search tasks, patients..." 
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {activeTab === 'all-tasks' && (
              <div>
                <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
                  Task Status
                </label>
                <select 
                  style={styles.select}
                  value={filters.taskStatus}
                  onChange={(e) => setFilters({...filters, taskStatus: e.target.value})}
                >
                  <option value="">All Statuses</option>
                  {Object.values(TASK_STATUSES).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
                Task Type
              </label>
              <select 
                style={styles.select}
                value={filters.taskType}
                onChange={(e) => setFilters({...filters, taskType: e.target.value})}
              >
                <option value="">All Types</option>
                {Object.values(TASK_TYPES).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
                Priority
              </label>
              <select 
                style={styles.select}
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
              >
                <option value="">All Priorities</option>
                {Object.values(PRIORITY_LEVELS).map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
                Created From
              </label>
              <input 
                type="date" 
                style={styles.select}
                value={filters.createdDateFrom}
                onChange={(e) => setFilters({...filters, createdDateFrom: e.target.value})}
              />
            </div>

            <div>
              <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
                Due Date From
              </label>
              <input 
                type="date" 
                style={styles.select}
                value={filters.dueDateFrom}
                onChange={(e) => setFilters({...filters, dueDateFrom: e.target.value})}
              />
            </div>

            <div>
              <button 
                style={{...styles.button, backgroundColor: '#6b7280'}}
                onClick={() => setFilters({
                  taskStatus: '',
                  taskType: '',
                  priority: '',
                  createdDateFrom: '',
                  createdDateTo: '',
                  dueDateFrom: '',
                  dueDateTo: ''
                })}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Task Table */}
        <div style={styles.table}>
          <div style={{overflowX: 'auto'}}>
            <table style={styles.tableElement}>
              <thead>
                <tr>
                  <th 
                    style={styles.th}
                    onClick={() => handleSort('taskSubject')}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      TASK SUBJECT
                      {sortBy === 'taskSubject' && (
                        sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </div>
                  </th>
                  <th style={styles.th}>TASK DESCRIPTION</th>
                  <th 
                    style={styles.th}
                    onClick={() => handleSort('createdDate')}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      CREATED DATE
                      {sortBy === 'createdDate' && (
                        sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </div>
                  </th>
                  <th 
                    style={styles.th}
                    onClick={() => handleSort('dueDate')}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      DUE DATE
                      {sortBy === 'dueDate' && (
                        sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </div>
                  </th>
                  <th style={styles.th}>TASK TYPE</th>
                  <th 
                    style={styles.th}
                    onClick={() => handleSort('priority')}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                      PRIORITY
                      {sortBy === 'priority' && (
                        sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                      )}
                    </div>
                  </th>
                  {activeTab === 'all-tasks' && <th style={styles.th}>STATUS</th>}
                  <th style={styles.th}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map(task => {
                  const isOverdue = isTaskOverdue(task.dueDate);
                  const daysOverdue = calculateDaysOverdue(task.dueDate);
                  
                  return (
                    <tr key={task.id}>
                      <td 
                        style={{
                          ...styles.td, 
                          ...styles.tdWhite, 
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }} 
                        onClick={() => handleTaskClick(task)}
                      >
                        <div>
                          <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            {task.taskSubject}
                            {isOverdue && (
                              <AlertTriangle size={14} style={{color: '#ef4444'}} title={`Overdue by ${daysOverdue} days`} />
                            )}
                          </div>
                          <div style={{fontSize: '12px', color: '#9ca3af', marginTop: '2px'}}>
                            Patient: {task.patientName}
                          </div>
                          {task.parentTaskId && (
                            <div style={{fontSize: '11px', color: '#7c3aed', marginTop: '2px'}}>
                              Related to Task #{task.parentTaskId}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={styles.td}>
                        <div style={{maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                          {task.taskDescription}
                        </div>
                        {task.rejectionReason && (
                          <div style={{fontSize: '11px', color: '#f59e0b', marginTop: '4px', fontStyle: 'italic'}}>
                            Rejection Reason: {task.rejectionReason}
                          </div>
                        )}
                      </td>
                      <td style={styles.td}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <Calendar size={14} style={{color: '#9ca3af'}} />
                          <div>
                            <div>{formatDate(task.createdDate)}</div>
                            <div style={{fontSize: '11px', color: '#9ca3af'}}>
                              by {task.createdByName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                          <Clock size={14} style={{color: isOverdue ? '#ef4444' : '#9ca3af'}} />
                          <div>
                            <div style={{color: isOverdue ? '#ef4444' : 'inherit'}}>
                              {formatDate(task.dueDate)}
                            </div>
                            {isOverdue && (
                              <div style={{fontSize: '11px', color: '#ef4444'}}>
                                {daysOverdue} days overdue
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={{...styles.badge, ...getTaskTypeBadgeStyle(task.taskType)}}>
                          {task.taskType}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={{...styles.badge, ...getPriorityBadgeStyle(task.priority)}}>
                          {task.priority}
                        </span>
                      </td>
                      {activeTab === 'all-tasks' && (
                        <td style={styles.td}>
                          <span style={{...styles.badge, ...getStatusBadgeStyle(task.taskStatus)}}>
                            {task.taskStatus}
                          </span>
                        </td>
                      )}
                      <td style={styles.td}>
                        <div style={styles.actionButtons}>
                          <button 
                            style={{...styles.actionButton, ...styles.actionEdit}}
                            onClick={() => handleViewTask(task)}
                          >
                            View
                          </button>
                          {activeTab === 'my-tasks' && (
                            <>
                              {/* Status-specific actions based on specifications */}
                              {task.taskStatus === TASK_STATUSES.IN_PROGRESS && (
                                <>
                                  <button 
                                    style={{...styles.actionButton, ...styles.actionSuccess}}
                                    onClick={() => handleMarkDone(task)}
                                  >
                                    Mark Done
                                  </button>
                                  <button 
                                    style={{...styles.actionButton, ...styles.actionDelete}}
                                    onClick={() => handleReject(task)}
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              {task.taskStatus === TASK_STATUSES.ESCALATED && (
                                <>
                                  <button 
                                    style={{...styles.actionButton, ...styles.actionSuccess}}
                                    onClick={() => handleMarkDone(task)}
                                  >
                                    Mark Done
                                  </button>
                                  <button 
                                    style={{...styles.actionButton, ...styles.actionDelete}}
                                    onClick={() => handleReject(task)}
                                  >
                                    Reject
                                  </button>
                                  <button 
                                    style={{...styles.actionButton, ...styles.actionWarning}}
                                    onClick={() => handleEscalation(task)}
                                  >
                                    Escalate
                                  </button>
                                </>
                              )}
                              {/* Rejected tasks only have View access as per specs */}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          {filteredTasks.length === 0 && (
            <div style={{
              padding: '40px', 
              textAlign: 'center', 
              color: '#9ca3af'
            }}>
              No tasks found matching your criteria.
            </div>
          )}
        </div>
      </div>
    );
  };

  // Enhanced Task Detail Sidebar with complete task information
  const TaskDetailSidebar = () => (
    <>
      <div style={styles.overlay} onClick={() => setShowSidebar(false)} />
      <div style={styles.sidebar}>
        <div style={{padding: '24px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Task Details
            </h3>
            <button 
              style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer'}}
              onClick={() => setShowSidebar(false)}
            >
              <X size={24} />
            </button>
          </div>

          {selectedTask && (
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div>
                <h4 style={{color: 'white', margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600'}}>
                  {selectedTask.taskSubject}
                </h4>
                <div style={{display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap'}}>
                  <span style={{...styles.badge, ...getStatusBadgeStyle(selectedTask.taskStatus)}}>
                    {selectedTask.taskStatus}
                  </span>
                  <span style={{...styles.badge, ...getPriorityBadgeStyle(selectedTask.priority)}}>
                    {selectedTask.priority} Priority
                  </span>
                  <span style={{...styles.badge, ...getTaskTypeBadgeStyle(selectedTask.taskType)}}>
                    {selectedTask.taskType}
                  </span>
                </div>
              </div>

              <div>
                <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                  Description
                </label>
                <p style={{color: '#d1d5db', margin: 0, lineHeight: '1.5'}}>
                  {selectedTask.taskDescription}
                </p>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '16px'}}>
                <div>
                  <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                    Patient
                  </label>
                  <p style={{color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <User size={16} />
                    {selectedTask.patientName}
                  </p>
                </div>

                <div>
                  <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                    Assigned To
                  </label>
                  <p style={{color: 'white', margin: 0}}>
                    {selectedTask.assignedToName}
                  </p>
                </div>

                <div>
                  <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                    Created Date
                  </label>
                  <p style={{color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Calendar size={16} />
                    {formatDate(selectedTask.createdDate)}
                  </p>
                </div>

                <div>
                  <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                    Due Date
                  </label>
                  <p style={{color: 'white', margin: 0, display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <Clock size={16} />
                    {formatDate(selectedTask.dueDate)}
                    {isTaskOverdue(selectedTask.dueDate) && (
                      <span style={{color: '#ef4444', fontSize: '12px'}}>
                        ({calculateDaysOverdue(selectedTask.dueDate)} days overdue)
                      </span>
                    )}
                  </p>
                </div>

                <div>
                  <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                    Created By
                  </label>
                  <p style={{color: 'white', margin: 0}}>
                    {selectedTask.createdByName}
                  </p>
                </div>

                <div>
                  <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                    Escalation Target
                  </label>
                  <p style={{color: 'white', margin: 0}}>
                    {selectedTask.escalationTargetName}
                  </p>
                </div>

                {selectedTask.escalationTimeMinutes && (
                  <div>
                    <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                      Escalation Time
                    </label>
                    <p style={{color: 'white', margin: 0}}>
                      {Math.floor(selectedTask.escalationTimeMinutes / 60)} hours ({selectedTask.escalationTimeMinutes} minutes)
                    </p>
                  </div>
                )}

                {selectedTask.parentTaskId && (
                  <div>
                    <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                      Parent Task
                    </label>
                    <p style={{color: '#7c3aed', margin: 0}}>
                      Task #{selectedTask.parentTaskId}
                    </p>
                  </div>
                )}

                {selectedTask.rejectionReason && (
                  <div>
                    <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                      Rejection Reason
                    </label>
                    <p style={{color: '#f59e0b', margin: 0, fontStyle: 'italic'}}>
                      {selectedTask.rejectionReason}
                    </p>
                    {selectedTask.rejectedBy && (
                      <p style={{color: '#9ca3af', margin: '4px 0 0 0', fontSize: '12px'}}>
                        Rejected by: {selectedTask.rejectedBy}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action buttons based on task status and user permissions */}
              {(selectedTask.taskStatus === TASK_STATUSES.IN_PROGRESS || selectedTask.taskStatus === TASK_STATUSES.ESCALATED) && 
               selectedTask.assignedToUserId === 'current-user' && (
                <div style={{display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap'}}>
                  <button 
                    style={{...styles.button, backgroundColor: '#10b981'}}
                    onClick={() => handleMarkDone(selectedTask)}
                  >
                    <CheckCircle size={16} />
                    Mark Done
                  </button>
                  <button 
                    style={{...styles.button, backgroundColor: '#dc2626'}}
                    onClick={() => handleReject(selectedTask)}
                  >
                    <AlertTriangle size={16} />
                    Reject
                  </button>
                  {selectedTask.taskStatus === TASK_STATUSES.ESCALATED && (
                    <button 
                      style={{...styles.button, backgroundColor: '#f59e0b'}}
                      onClick={() => handleEscalation(selectedTask)}
                    >
                      <RefreshCw size={16} />
                      Handle Escalation
                    </button>
                  )}
                </div>
              )}

              {/* Rejection Request specific actions */}
              {selectedTask.taskType === TASK_TYPES.REJECTION_REQUEST && 
               selectedTask.assignedToUserId === 'current-user' && (
                <div style={{display: 'flex', gap: '12px', marginTop: '20px', flexWrap: 'wrap'}}>
                  <button 
                    style={{...styles.button, backgroundColor: '#10b981'}}
                    onClick={() => {
                      console.log('Accepting rejection for task:', selectedTask.parentTaskId);
                      // This would change the original task status to Cancelled
                    }}
                  >
                    <CheckCircle size={16} />
                    Accept Rejection
                  </button>
                  <button 
                    style={{...styles.button, backgroundColor: '#2563eb'}}
                    onClick={() => {
                      console.log('Reassigning task:', selectedTask.parentTaskId);
                      // This would open reassignment modal
                    }}
                  >
                    <RefreshCw size={16} />
                    Reassign
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Enhanced Mark Done Modal
  const MarkDoneModal = () => (
    showMarkDoneModal && (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Complete Task
            </h3>
            <button 
              style={{background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer'}}
              onClick={() => setShowMarkDoneModal(false)}
            >
              <X size={24} />
            </button>
          </div>

          {taskToAction && (
            <div style={{marginBottom: '20px', padding: '16px', backgroundColor: '#374151', borderRadius: '8px'}}>
              <h4 style={{color: 'white', margin: '0 0 8px 0', fontSize: '16px'}}>
                {taskToAction.taskSubject}
              </h4>
              <p style={{color: '#d1d5db', margin: 0, fontSize: '14px'}}>
                Patient: {taskToAction.patientName}
              </p>
            </div>
          )}

          <div style={{marginBottom: '20px'}}>
            <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
              Completion Comments (Optional)
            </label>
            <textarea 
              style={{...styles.input, minHeight: '100px', resize: 'vertical'}}
              value={completionComments}
              onChange={(e) => setCompletionComments(e.target.value)}
              placeholder="Enter any comments about task completion..."
            />
          </div>

          <div style={{display: 'flex', gap: '12px'}}>
            <button 
              style={{...styles.button, backgroundColor: '#10b981'}}
              onClick={confirmMarkDone}
            >
              Complete Task
            </button>
            <button 
              style={{...styles.button, backgroundColor: '#6b7280'}}
              onClick={() => setShowMarkDoneModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );

  // Enhanced Reject Modal with escalation warning
  const RejectModal = () => (
    showRejectModal && (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
            <AlertTriangle size={24} style={{color: '#dc2626'}} />
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Reject Task
            </h3>
          </div>

          {taskToAction && (
            <div style={{marginBottom: '20px', padding: '16px', backgroundColor: '#374151', borderRadius: '8px'}}>
              <h4 style={{color: 'white', margin: '0 0 8px 0', fontSize: '16px'}}>
                {taskToAction.taskSubject}
              </h4>
              <p style={{color: '#d1d5db', margin: 0, fontSize: '14px'}}>
                Patient: {taskToAction.patientName}
              </p>
            </div>
          )}

          <div style={{marginBottom: '20px'}}>
            <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
              Please enter the reason for rejection *
            </label>
            <textarea 
              style={{...styles.input, minHeight: '100px', resize: 'vertical'}}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason for rejecting this task..."
            />
          </div>

          {taskToAction && (
            <div style={{
              backgroundColor: '#374151',
              padding: '16px',
              borderRadius: '6px',
              marginBottom: '20px',
              border: '1px solid #dc2626'
            }}>
              <p style={{color: '#fbbf24', margin: 0, fontSize: '14px', fontWeight: '600'}}>
                ⚠️ Warning
              </p>
              <p style={{color: '#d1d5db', margin: '8px 0 0 0', fontSize: '14px'}}>
                The task will be forwarded to <strong>{taskToAction.escalationTargetName}</strong> for review after rejection.
                A new "Rejection Request" task will be created for review.
              </p>
            </div>
          )}

          <div style={{display: 'flex', gap: '12px'}}>
            <button 
              style={{...styles.button, backgroundColor: '#dc2626'}}
              onClick={confirmReject}
            >
              Reject Task
            </button>
            <button 
              style={{...styles.button, backgroundColor: '#6b7280'}}
              onClick={() => setShowRejectModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );

  // New Escalation Handling Modal
  const EscalationModal = () => (
    showEscalationModal && (
      <div style={styles.modal}>
        <div style={{...styles.modalContent, maxWidth: '700px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px'}}>
            <RefreshCw size={24} style={{color: '#f59e0b'}} />
            <h3 style={{color: 'white', margin: 0, fontSize: '18px', fontWeight: '600'}}>
              Handle Escalated Task
            </h3>
          </div>

          {taskToAction && (
            <div style={{marginBottom: '20px', padding: '16px', backgroundColor: '#374151', borderRadius: '8px'}}>
              <h4 style={{color: 'white', margin: '0 0 8px 0', fontSize: '16px'}}>
                {taskToAction.taskSubject}
              </h4>
              <p style={{color: '#d1d5db', margin: 0, fontSize: '14px'}}>
                Patient: {taskToAction.patientName} | Priority: {taskToAction.priority}
              </p>
            </div>
          )}

          <div style={{marginBottom: '20px'}}>
            <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
              Escalation Action *
            </label>
            <select 
              style={styles.select}
              value={escalationAction}
              onChange={(e) => setEscalationAction(e.target.value)}
            >
              <option value="forward">Forward to Different Staff</option>
              <option value="reassign">Reassign to Original Assignee</option>
              <option value="cancel">Cancel Task</option>
            </select>
          </div>

          {escalationAction === 'forward' && (
            <>
              <div style={{marginBottom: '16px'}}>
                <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                  Forward To *
                </label>
                <select 
                  style={styles.select}
                  value={escalationTarget}
                  onChange={(e) => setEscalationTarget(e.target.value)}
                >
                  <option value="">Select Staff Member</option>
                  {mockUsers.map(user => (
                    <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
                  ))}
                </select>
              </div>
              <div style={{marginBottom: '16px'}}>
                <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                  Forwarding Instructions
                </label>
                <textarea 
                  style={{...styles.input, minHeight: '80px', resize: 'vertical'}}
                  value={escalationInstructions}
                  onChange={(e) => setEscalationInstructions(e.target.value)}
                  placeholder="Enter instructions for the assigned staff..."
                />
              </div>
            </>
          )}

          {escalationAction === 'reassign' && (
            <>
              <div style={{marginBottom: '16px'}}>
                <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                  Reassign To (Optional)
                </label>
                <select 
                  style={styles.select}
                  value={reassignmentTarget}
                  onChange={(e) => setReassignmentTarget(e.target.value)}
                >
                  <option value="">Return to Original Assignee</option>
                  {mockUsers.map(user => (
                    <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
                  ))}
                </select>
              </div>
              <div style={{marginBottom: '16px'}}>
                <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                  Additional Instructions/Guidance
                </label>
                <textarea 
                  style={{...styles.input, minHeight: '80px', resize: 'vertical'}}
                  value={reassignmentNotes}
                  onChange={(e) => setReassignmentNotes(e.target.value)}
                  placeholder="Enter additional guidance or instructions..."
                />
              </div>
            </>
          )}

          {escalationAction === 'cancel' && (
            <div style={{marginBottom: '16px'}}>
              <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                Cancellation Reason *
              </label>
              <textarea 
                style={{...styles.input, minHeight: '80px', resize: 'vertical'}}
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                placeholder="Enter reason for task cancellation..."
              />
            </div>
          )}

          <div style={{display: 'flex', gap: '12px'}}>
            <button 
              style={{...styles.button, backgroundColor: '#f59e0b'}}
              onClick={confirmEscalation}
            >
              {escalationAction === 'forward' && 'Forward Task'}
              {escalationAction === 'reassign' && 'Reassign Task'}
              {escalationAction === 'cancel' && 'Cancel Task'}
            </button>
            <button 
              style={{...styles.button, backgroundColor: '#6b7280'}}
              onClick={() => setShowEscalationModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div style={styles.content}>
      <h1 style={styles.pageTitle}>Task Management</h1>

      {/* Enhanced Tab Navigation with counts */}
      <div style={styles.tabContainer}>
        <ul style={styles.tabList}>
          <li>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'my-tasks' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('my-tasks')}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <User size={16} />
                My Tasks
                <span style={{
                  ...styles.badge, 
                  backgroundColor: '#374151', 
                  color: '#d1d5db',
                  marginLeft: '4px'
                }}>
                  {mockTasks.filter(t => t.assignedToUserId === 'current-user' && 
                    ['In Progress', 'Escalated', 'Rejected'].includes(t.taskStatus)).length}
                </span>
              </div>
            </button>
          </li>
          <li>
            <button
              style={{
                ...styles.tab,
                ...(activeTab === 'all-tasks' ? styles.activeTab : {})
              }}
              onClick={() => setActiveTab('all-tasks')}
            >
              <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                <Users size={16} />
                All Tasks
                <span style={{
                  ...styles.badge, 
                  backgroundColor: '#374151', 
                  color: '#d1d5db',
                  marginLeft: '4px'
                }}>
                  {mockTasks.length}
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>

      <TaskList />
      
      {showSidebar && <TaskDetailSidebar />}
      <MarkDoneModal />
      <RejectModal />
      <EscalationModal />
    </div>
  );
};

export default TaskModule;