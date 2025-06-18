// All constants and mock data in one file
export const PATIENT_STATUSES = {
  NEW_PATIENT: 'New Patient',
  ACTIVE: 'Active',
  PENDING_INSURANCE: 'Pending Insurance',
  TREATMENT_PLANNING: 'Treatment Planning',
  IN_TREATMENT: 'In Treatment',
  COMPLETED: 'Completed',
  INACTIVE: 'Inactive',
  TRANSFERRED: 'Transferred'
};

export const INSURANCE_STATUSES = {
  VERIFIED: 'Verified',
  PENDING: 'Pending',
  FAILED: 'Failed',
  EXPIRED: 'Expired'
};

export const APPOINTMENT_STATUSES = {
  SCHEDULED: 'Scheduled',
  CONFIRMED: 'Confirmed',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
  NO_SHOW: 'No Show'
};

export const NOTE_TYPES = {
  SOAP: 'SOAP Notes',
  PROGRESS: 'Progress Notes',
  HP: 'H&P',
  DISCHARGE: 'Discharge Summary',
  OPERATIVE: 'Operative Notes',
  MAR: 'MAR Notes',
  CONSULTATION: 'Consultation Notes',
  CARE_COORDINATION: 'Care Coordination'
};

export const USER_ROLES = {
  INTAKE_TEAM: 'Intake Team',
  SCHEDULING_TEAM: 'Scheduling Team',
  PROVIDER_POC: 'Provider POC',
  PROVIDER: 'Provider',
  RCM_STAFF: 'RCM Staff',
  SUPERVISOR: 'Supervisor'
};

// Mock Patients Data
export const mockPatients = [
  {
    id: 1,
    firstName: 'Sarah',
    lastName: 'Johnson',
    fullName: 'Sarah Elizabeth Johnson',
    preferredName: 'Sarah',
    dateOfBirth: '1985-03-15',
    age: 39,
    gender: 'Female',
    maritalStatus: 'Married',
    pronouns: 'She/Her',
    phone: '(555) 123-4567',
    secondaryPhone: null,
    email: 'sarah.johnson@email.com',
    preferredContact: 'Phone',
    registrationDate: '2025-05-28',
    status: PATIENT_STATUSES.ACTIVE,
    address: {
      home: '123 Main Street, Albany, NY 12345',
      mailing: 'Same as home address'
    },
    emergencyContact: {
      name: 'John Johnson',
      relationship: 'Spouse',
      phone: '(555) 123-4568',
      email: 'john.johnson@email.com'
    },
    insurance: {
      primary: {
        company: 'Blue Cross Blue Shield',
        policyHolder: 'Sarah Johnson',
        policyHolderRelationship: 'Self',
        memberId: 'BCBS123456789',
        effectiveDate: '2025-01-01',
        terminationDate: null,
        verificationStatus: INSURANCE_STATUSES.VERIFIED,
        lastVerified: '2025-05-28',
        verificationNotes: 'Verified with customer service'
      },
      secondary: null
    },
    assignedStaff: ['Dr. Sarah Wilson', 'Emily Rodriguez']
  },
  {
    id: 2,
    firstName: 'Michael',
    lastName: 'Rodriguez',
    fullName: 'Michael Anthony Rodriguez',
    preferredName: 'Mike',
    dateOfBirth: '1978-07-22',
    age: 46,
    gender: 'Male',
    maritalStatus: 'Single',
    pronouns: 'He/Him',
    phone: '(555) 987-6543',
    secondaryPhone: null,
    email: 'm.rodriguez@email.com',
    preferredContact: 'Email',
    registrationDate: '2025-05-25',
    status: PATIENT_STATUSES.TREATMENT_PLANNING,
    address: {
      home: '456 Oak Avenue, Albany, NY 12346',
      mailing: 'Same as home address'
    },
    emergencyContact: {
      name: 'Maria Rodriguez',
      relationship: 'Sister',
      phone: '(555) 987-6544',
      email: 'maria.rodriguez@email.com'
    },
    insurance: {
      primary: {
        company: 'Aetna',
        policyHolder: 'Michael Rodriguez',
        policyHolderRelationship: 'Self',
        memberId: 'AET987654321',
        effectiveDate: '2025-01-01',
        terminationDate: null,
        verificationStatus: INSURANCE_STATUSES.PENDING,
        lastVerified: null,
        verificationNotes: null
      },
      secondary: null
    },
    assignedStaff: ['Dr. Michael Chen']
  },
  {
    id: 3,
    firstName: 'Emma',
    lastName: 'Thompson',
    fullName: 'Emma Claire Thompson',
    preferredName: 'Emma',
    dateOfBirth: '1992-11-08',
    age: 32,
    gender: 'Female',
    maritalStatus: 'Single',
    pronouns: 'She/Her',
    phone: '(555) 456-7890',
    secondaryPhone: null,
    email: 'emma.t@email.com',
    preferredContact: 'Portal',
    registrationDate: '2025-05-20',
    status: PATIENT_STATUSES.PENDING_INSURANCE,
    address: {
      home: '789 Pine Street, Albany, NY 12347',
      mailing: 'Same as home address'
    },
    emergencyContact: {
      name: 'Robert Thompson',
      relationship: 'Father',
      phone: '(555) 456-7891',
      email: 'robert.thompson@email.com'
    },
    insurance: {
      primary: {
        company: 'Cigna',
        policyHolder: 'Emma Thompson',
        policyHolderRelationship: 'Self',
        memberId: 'CIG456789123',
        effectiveDate: '2025-01-01',
        terminationDate: null,
        verificationStatus: INSURANCE_STATUSES.FAILED,
        lastVerified: '2025-05-21',
        verificationNotes: 'Policy not found - need updated information'
      },
      secondary: null
    },
    assignedStaff: ['Emily Rodriguez']
  },
  {
    id: 4,
    firstName: 'David',
    lastName: 'Chen',
    fullName: 'David Wei Chen',
    preferredName: 'David',
    dateOfBirth: '1980-04-12',
    age: 44,
    gender: 'Male',
    maritalStatus: 'Married',
    pronouns: 'He/Him',
    phone: '(555) 321-0987',
    secondaryPhone: '(555) 321-0988',
    email: 'david.chen@email.com',
    preferredContact: 'Email',
    registrationDate: '2025-05-15',
    status: PATIENT_STATUSES.IN_TREATMENT,
    address: {
      home: '321 Elm Street, Albany, NY 12348',
      mailing: 'Same as home address'
    },
    emergencyContact: {
      name: 'Lisa Chen',
      relationship: 'Spouse',
      phone: '(555) 321-0989',
      email: 'lisa.chen@email.com'
    },
    insurance: {
      primary: {
        company: 'UnitedHealth',
        policyHolder: 'David Chen',
        policyHolderRelationship: 'Self',
        memberId: 'UH987654321',
        effectiveDate: '2025-01-01',
        terminationDate: null,
        verificationStatus: INSURANCE_STATUSES.VERIFIED,
        lastVerified: '2025-05-16',
        verificationNotes: 'Active coverage confirmed'
      },
      secondary: null
    },
    assignedStaff: ['Dr. Sarah Wilson', 'Dr. Michael Chen']
  },
  {
    id: 5,
    firstName: 'Lisa',
    lastName: 'Anderson',
    fullName: 'Lisa Marie Anderson',
    preferredName: 'Lisa',
    dateOfBirth: '1987-09-03',
    age: 37,
    gender: 'Female',
    maritalStatus: 'Divorced',
    pronouns: 'She/Her',
    phone: '(555) 654-3210',
    secondaryPhone: null,
    email: 'lisa.anderson@email.com',
    preferredContact: 'Phone',
    registrationDate: '2025-05-10',
    status: PATIENT_STATUSES.COMPLETED,
    address: {
      home: '654 Maple Drive, Albany, NY 12349',
      mailing: 'Same as home address'
    },
    emergencyContact: {
      name: 'Jennifer Anderson',
      relationship: 'Sister',
      phone: '(555) 654-3211',
      email: 'jennifer.anderson@email.com'
    },
    insurance: {
      primary: {
        company: 'Humana',
        policyHolder: 'Lisa Anderson',
        policyHolderRelationship: 'Self',
        memberId: 'HUM123456789',
        effectiveDate: '2025-01-01',
        terminationDate: null,
        verificationStatus: INSURANCE_STATUSES.VERIFIED,
        lastVerified: '2025-05-11',
        verificationNotes: 'Coverage verified successfully'
      },
      secondary: null
    },
    assignedStaff: ['Dr. Maria Rodriguez']
  }
];

// Mock Appointments Data
export const mockAppointments = [
  {
    id: 1,
    patientId: 1,
    providerId: 1,
    providerName: 'Dr. Sarah Wilson',
    date: '2025-06-20',
    time: '10:00 AM',
    type: 'Follow-up',
    status: APPOINTMENT_STATUSES.SCHEDULED,
    duration: 60,
    notes: 'Regular follow-up appointment for medication review'
  },
  {
    id: 2,
    patientId: 1,
    providerId: 1,
    providerName: 'Dr. Sarah Wilson',
    date: '2025-05-15',
    time: '2:00 PM',
    type: 'Initial Consultation',
    status: APPOINTMENT_STATUSES.COMPLETED,
    duration: 90,
    notes: 'Initial assessment completed, treatment plan established'
  },
  {
    id: 3,
    patientId: 2,
    providerId: 2,
    providerName: 'Dr. Michael Chen',
    date: '2025-06-18',
    time: '9:30 AM',
    type: 'Therapy Session',
    status: APPOINTMENT_STATUSES.SCHEDULED,
    duration: 50,
    notes: 'CBT session - week 4'
  },
  {
    id: 4,
    patientId: 4,
    providerId: 1,
    providerName: 'Dr. Sarah Wilson',
    date: '2025-06-19',
    time: '11:00 AM',
    type: 'Medication Management',
    status: APPOINTMENT_STATUSES.CONFIRMED,
    duration: 45,
    notes: 'Medication adjustment and side effects review'
  }
];

// Mock Treatment Plans
export const mockTreatmentPlans = [
  {
    id: 1,
    patientId: 1,
    name: 'Spravato Treatment Plan',
    providerPOC: 'Emily White',
    startDate: '2024-03-01',
    status: 'Active',
    currentStage: 'Provider Evaluation',
    stages: [
      { id: 1, name: 'Registration', status: 'completed', completedDate: '2024-03-01' },
      { id: 2, name: 'Insurance Verification', status: 'completed', completedDate: '2024-03-05' },
      { id: 3, name: 'Initial Forms', status: 'completed', completedDate: '2024-03-10' },
      { id: 4, name: 'Provider Evaluation', status: 'active', completedDate: null },
      { id: 5, name: 'Treatment Delivery', status: 'pending', completedDate: null }
    ]
  },
  {
    id: 2,
    patientId: 4,
    name: 'Cognitive Behavioral Therapy Program',
    providerPOC: 'Dr. Michael Chen',
    startDate: '2025-05-20',
    status: 'Active',
    currentStage: 'Treatment Delivery',
    stages: [
      { id: 1, name: 'Registration', status: 'completed', completedDate: '2025-05-20' },
      { id: 2, name: 'Insurance Verification', status: 'completed', completedDate: '2025-05-21' },
      { id: 3, name: 'Initial Assessment', status: 'completed', completedDate: '2025-05-25' },
      { id: 4, name: 'Treatment Planning', status: 'completed', completedDate: '2025-05-30' },
      { id: 5, name: 'Treatment Delivery', status: 'active', completedDate: null }
    ]
  }
];

// Mock Staff Data
export const mockStaff = [
  { id: 1, name: 'Dr. Sarah Wilson', role: 'Provider', specialty: 'Psychiatry' },
  { id: 2, name: 'Dr. Michael Chen', role: 'Provider', specialty: 'Psychology' },
  { id: 3, name: 'Emily Rodriguez', role: 'Intake Team', department: 'Patient Services' },
  { id: 4, name: 'James Thompson', role: 'Scheduling Team', department: 'Operations' },
  { id: 5, name: 'Emily White', role: 'Provider POC', specialty: 'Care Coordination' },
  { id: 6, name: 'Dr. Maria Rodriguez', role: 'Provider', specialty: 'Clinical Psychology' }
];

// Mock Authorization Data
export const mockAuthorizations = [
  {
    id: 1,
    patientId: 1,
    authDate: '2024-02-10',
    expiryDate: '2024-08-10',
    status: 'Active',
    authBy: 'Smith',
    serviceType: 'Mental Health Treatment',
    authNumber: 'AUTH123456'
  },
  {
    id: 2,
    patientId: 1,
    authDate: '2023-12-01',
    expiryDate: '2024-06-01',
    status: 'Expired',
    authBy: 'Johnson',
    serviceType: 'Psychiatric Evaluation',
    authNumber: 'AUTH789012'
  },
  {
    id: 3,
    patientId: 4,
    authDate: '2025-05-15',
    expiryDate: '2025-11-15',
    status: 'Active',
    authBy: 'Wilson',
    serviceType: 'Therapy Sessions',
    authNumber: 'AUTH345678'
  }
];

// Mock Patient Forms
export const mockPatientForms = [
  {
    id: 1,
    patientId: 1,
    name: 'Patient Intake Form',
    type: 'Intake Form',
    assignedDate: '2025-05-28',
    completedDate: '2025-05-29',
    status: 'Completed',
    assignedBy: 'Emily Rodriguez',
    formSet: 'New Patient Package'
  },
  {
    id: 2,
    patientId: 1,
    name: 'HIPAA Consent Form',
    type: 'Administrative/Legal',
    assignedDate: '2025-05-28',
    completedDate: '2025-05-29',
    status: 'Completed',
    assignedBy: 'Emily Rodriguez',
    formSet: 'New Patient Package'
  },
  {
    id: 3,
    patientId: 1,
    name: 'Insurance Verification Form',
    type: 'Administrative/Legal',
    assignedDate: '2025-05-28',
    completedDate: null,
    status: 'In Progress',
    assignedBy: 'James Thompson',
    formSet: null
  },
  {
    id: 4,
    patientId: 1,
    name: 'PHQ-9 Depression Screening',
    type: 'Clinical Assessment',
    assignedDate: '2025-06-01',
    completedDate: null,
    status: 'Pending',
    assignedBy: 'Dr. Sarah Wilson',
    formSet: 'Mental Health Assessment Package'
  },
  {
    id: 5,
    patientId: 1,
    name: 'GAD-7 Anxiety Assessment',
    type: 'Clinical Assessment',
    assignedDate: '2025-06-01',
    completedDate: null,
    status: 'Overdue',
    assignedBy: 'Dr. Sarah Wilson',
    formSet: 'Mental Health Assessment Package'
  },
  {
    id: 6,
    patientId: 2,
    name: 'Patient Intake Form',
    type: 'Intake Form',
    assignedDate: '2025-05-25',
    completedDate: '2025-05-26',
    status: 'Completed',
    assignedBy: 'Emily Rodriguez',
    formSet: 'New Patient Package'
  },
  {
    id: 7,
    patientId: 4,
    name: 'Beck Depression Inventory',
    type: 'Clinical Assessment',
    assignedDate: '2025-05-16',
    completedDate: '2025-05-18',
    status: 'Completed',
    assignedBy: 'Dr. Michael Chen',
    formSet: 'Psychology Assessment Package'
  }
];

// Mock Clinical Notes
export const mockClinicalNotes = [
  {
    id: 1,
    patientId: 1,
    type: NOTE_TYPES.SOAP,
    title: 'Initial Assessment SOAP Note',
    content: `SUBJECTIVE:
Patient is a 39-year-old female presenting with chief complaint of "feeling overwhelmed and anxious" for the past 3 months. Reports difficulty sleeping, decreased appetite, and feelings of hopelessness. Denies suicidal ideation. Family history significant for depression (mother). Currently not on any psychiatric medications.

OBJECTIVE:
Vital signs: BP 120/80, HR 88, Temp 98.6°F
Mental Status: Alert and oriented x3. Appearance appropriate. Speech normal rate and rhythm. Mood anxious, affect congruent. Thought process linear and goal-directed. No delusions or hallucinations reported. Insight fair, judgment intact.

ASSESSMENT:
1. Major Depressive Disorder, moderate severity (F33.1)
2. Generalized Anxiety Disorder (F41.1)

PLAN:
1. Initiate sertraline 50mg daily
2. Referral to therapy (CBT preferred)
3. Follow-up in 2 weeks to assess medication response
4. Patient education provided regarding medication side effects
5. Crisis safety plan discussed`,
    author: 'Dr. Sarah Wilson',
    authorRole: 'Psychiatrist',
    date: '2025-05-29',
    time: '10:30 AM',
    visibility: 'internal',
    lastModified: '2025-05-29'
  },
  {
    id: 2,
    patientId: 1,
    type: NOTE_TYPES.PROGRESS,
    title: 'Treatment Progress Update - Week 2',
    content: `Patient returns for 2-week follow-up after initiating sertraline 50mg daily. Reports improved sleep quality and slight improvement in mood. No significant side effects noted. Appetite returning to baseline. Started CBT sessions with therapist.

Current symptoms:
- Anxiety levels decreased from 8/10 to 6/10
- Sleep improved from 3-4 hours to 6-7 hours nightly
- Mood episodes less frequent

Plan:
- Continue sertraline 50mg daily for 2 more weeks
- Continue weekly CBT sessions
- Next follow-up in 2 weeks
- Consider dose adjustment if plateau in improvement`,
    author: 'Dr. Sarah Wilson',
    authorRole: 'Psychiatrist',
    date: '2025-06-15',
    time: '2:15 PM',
    visibility: 'shared',
    lastModified: '2025-06-15'
  },
  {
    id: 3,
    patientId: 4,
    type: NOTE_TYPES.HP,
    title: 'History and Physical Examination',
    content: `HISTORY OF PRESENT ILLNESS:
Mr. Chen is a 44-year-old married male with history of anxiety presenting with increased stress and panic symptoms over the past month following work-related pressures.

PAST MEDICAL HISTORY:
- Anxiety disorder (diagnosed 2020)
- Hypertension (controlled)
- No previous psychiatric hospitalizations

MEDICATIONS:
- Lisinopril 10mg daily
- Lorazepam 0.5mg PRN (rarely used)

PHYSICAL EXAMINATION:
General: Well-appearing male, mild anxiety noted
Cardiovascular: RRR, no murmurs
Neurological: CN II-XII intact, no focal deficits`,
    author: 'Dr. Michael Chen',
    authorRole: 'Psychologist',
    date: '2025-05-16',
    time: '9:45 AM',
    visibility: 'internal',
    lastModified: '2025-05-16'
  }
];

// Mock Communications
export const mockCommunications = [
  {
    id: 1,
    patientId: 1,
    type: 'message',
    sender: 'Dr. Sarah Wilson',
    senderRole: 'Provider',
    recipient: 'Sarah Johnson',
    subject: 'Medication Instructions',
    content: 'Please remember to take your medication with food to minimize stomach upset. Let me know if you experience any side effects.',
    date: '2025-06-10',
    time: '2:30 PM',
    status: 'read'
  },
  {
    id: 2,
    patientId: 1,
    type: 'message',
    sender: 'Sarah Johnson',
    senderRole: 'Patient',
    recipient: 'Dr. Sarah Wilson',
    subject: 'Re: Medication Instructions',
    content: 'Thank you for the reminder. I have been taking it with breakfast and feel much better.',
    date: '2025-06-11',
    time: '8:15 AM',
    status: 'read'
  }
];

// Utility function to get patient data by ID
export const getPatientById = (id) => mockPatients.find(patient => patient.id === id);
export const getAppointmentsByPatientId = (patientId) => mockAppointments.filter(apt => apt.patientId === patientId);
export const getTreatmentPlansByPatientId = (patientId) => mockTreatmentPlans.filter(tp => tp.patientId === patientId);
export const getAuthorizationsByPatientId = (patientId) => mockAuthorizations.filter(auth => auth.patientId === patientId);
export const getFormsByPatientId = (patientId) => mockPatientForms.filter(form => form.patientId === patientId);
export const getNotesByPatientId = (patientId) => mockClinicalNotes.filter(note => note.patientId === patientId);
export const getCommunicationsByPatientId = (patientId) => mockCommunications.filter(comm => comm.patientId === patientId);