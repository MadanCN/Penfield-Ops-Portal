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
  AlertTriangle
} from 'lucide-react';

// Mock Data
const mockTasks = [
  {
    id: 1,
    taskSubject: 'Patient Intake Review',
    taskDescription: 'Review new patient intake forms and medical history for John Smith',
    createdDate: '2024-06-20',
    dueDate: '2024-06-22',
    taskType: 'Treatment Plan',
    taskStatus: 'In-progress',
    patientId: 1,
    patientName: 'John Smith',
    assignedTo: 'current-user',
    createdBy: 'Dr. Sarah Wilson',
    escalator: 'Dr. Michael Chen',
    priority: 'High'
  },
  {
    id: 2,
    taskSubject: 'Insurance Verification',
    taskDescription: 'Verify insurance details for Sarah Johnson and update records',
    createdDate: '2024-06-19',
    dueDate: '2024-06-21',
    taskType: 'Administrative',
    taskStatus: 'In-progress',
    patientId: 2,
    patientName: 'Sarah Johnson',
    assignedTo: 'current-user',
    createdBy: 'Lisa Rodriguez',
    escalator: 'Dr. Sarah Wilson',
    priority: 'Medium'
  },
  {
    id: 3,
    taskSubject: 'Treatment Plan Approval',
    taskDescription: 'Review and approve Spravato treatment plan for Michael Brown',
    createdDate: '2024-06-18',
    dueDate: '2024-06-20',
    taskType: 'Treatment Plan',
    taskStatus: 'Completed',
    patientId: 3,
    patientName: 'Michael Brown',
    assignedTo: 'other-user',
    createdBy: 'Dr. Michael Chen',
    escalator: 'Dr. Sarah Wilson',
    priority: 'High'
  },
  {
    id: 4,
    taskSubject: 'Appointment Scheduling',
    taskDescription: 'Schedule follow-up appointment for Emma Davis',
    createdDate: '2024-06-17',
    dueDate: '2024-06-19',
    taskType: 'Administrative',
    taskStatus: 'Rejected',
    patientId: 4,
    patientName: 'Emma Davis',
    assignedTo: 'other-user',
    createdBy: 'Lisa Rodriguez',
    escalator: 'Dr. Sarah Wilson',
    priority: 'Low'
  }
];

const TASK_STATUSES = {
  IN_PROGRESS: 'In-progress',
  COMPLETED: 'Completed',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled'
};

const TASK_TYPES = {
  TREATMENT_PLAN: 'Treatment Plan',
  ADMINISTRATIVE: 'Administrative',
  CLINICAL: 'Clinical',
  INSURANCE: 'Insurance'
};

const TaskModule = () => {
  const [activeTab, setActiveTab] = useState('my-tasks');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedTask, setSelectedTask] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMarkDoneModal, setShowMarkDoneModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [taskToAction, setTaskToAction] = useState(null);
  const [completionComments, setCompletionComments] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');

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
      maxWidth: '500px',
      width: '90%'
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
      default:
        return styles.badgeBlue;
    }
  };

  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case 'High':
        return styles.badgeRed;
      case 'Medium':
        return styles.badgeYellow;
      case 'Low':
        return styles.badgeGreen;
      default:
        return styles.badgeGray;
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
      setSortOrder('asc');
    }
  };

  const getSortedAndFilteredTasks = () => {
    let filtered = mockTasks.filter(task => {
      // Tab filtering
      if (activeTab === 'my-tasks' && task.assignedTo !== 'current-user') {
        return false;
      }
      
      // Search filtering
      const matchesSearch = !searchTerm || 
        task.taskSubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.patientName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filtering
      const matchesStatus = !statusFilter || task.taskStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
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

  const handleTaskClick = (task) => {
    console.log('Redirecting to patient record:', task.patientId);
    // In a real app, this would navigate to the patient record
  };

  // Task List Component
  const TaskList = () => {
    const filteredTasks = getSortedAndFilteredTasks();

    return (
      <div>
        {/* Search and Filters */}
        <div style={{...styles.card, marginBottom: '24px'}}>
          <div style={{display: 'flex', gap: '16px', alignItems: 'end', flexWrap: 'wrap'}}>
            <div style={styles.searchWrapper}>
              <Search style={styles.searchIcon} size={16} />
              <input 
                type="text" 
                placeholder="Search tasks..." 
                style={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {activeTab === 'all-tasks' && (
              <div style={{minWidth: '150px'}}>
                <label style={{color: '#d1d5db', fontSize: '12px', marginBottom: '4px', display: 'block'}}>
                  Task Status
                </label>
                <select 
                  style={styles.select}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  {Object.values(TASK_STATUSES).map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Task Table */}
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
                  {activeTab === 'all-tasks' && <th style={styles.th}>STATUS</th>}
                  <th style={styles.th}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map(task => (
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
                        <div>{task.taskSubject}</div>
                        <div style={{fontSize: '12px', color: '#9ca3af', marginTop: '2px'}}>
                          Patient: {task.patientName}
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                        {task.taskDescription}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Calendar size={14} style={{color: '#9ca3af'}} />
                        {formatDate(task.createdDate)}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <Clock size={14} style={{color: '#9ca3af'}} />
                        {formatDate(task.dueDate)}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={{...styles.badge, ...styles.badgePurple}}>
                        {task.taskType}
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
                        {activeTab === 'my-tasks' && task.taskStatus === TASK_STATUSES.IN_PROGRESS && (
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
                      </div>
                    </td>
                  </tr>
                ))}
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

  // Task Detail Sidebar
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
                <div style={{display: 'flex', gap: '8px', marginBottom: '12px'}}>
                  <span style={{...styles.badge, ...getStatusBadgeStyle(selectedTask.taskStatus)}}>
                    {selectedTask.taskStatus}
                  </span>
                  <span style={{...styles.badge, ...getPriorityBadgeStyle(selectedTask.priority)}}>
                    {selectedTask.priority} Priority
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
                    Task Type
                  </label>
                  <p style={{color: 'white', margin: 0}}>
                    {selectedTask.taskType}
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
                  </p>
                </div>

                <div>
                  <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                    Created By
                  </label>
                  <p style={{color: 'white', margin: 0}}>
                    {selectedTask.createdBy}
                  </p>
                </div>

                <div>
                  <label style={{color: '#d1d5db', fontSize: '14px', fontWeight: '500', marginBottom: '6px', display: 'block'}}>
                    Escalator
                  </label>
                  <p style={{color: 'white', margin: 0}}>
                    {selectedTask.escalator}
                  </p>
                </div>
              </div>

              {selectedTask.taskStatus === TASK_STATUSES.IN_PROGRESS && selectedTask.assignedTo === 'current-user' && (
                <div style={{display: 'flex', gap: '12px', marginTop: '20px'}}>
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
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );

  // Mark Done Modal
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

  // Reject Modal
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
                The task will be forwarded to <strong>{taskToAction.escalator}</strong> for review after rejection.
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

  return (
    <div style={styles.content}>
      <h1 style={styles.pageTitle}>Task Management</h1>

      {/* Tab Navigation */}
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
              My Tasks
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
              All Tasks
            </button>
          </li>
        </ul>
      </div>

      <TaskList />
      
      {showSidebar && <TaskDetailSidebar />}
      <MarkDoneModal />
      <RejectModal />
    </div>
  );
};

export default TaskModule;