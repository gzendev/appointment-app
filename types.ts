// Status Enum
export enum AppointmentStatus {
  Proposed = 'proposed',
  Pending = 'pending',
  Booked = 'booked',
  Arrived = 'arrived',
  Fulfilled = 'fulfilled',
  Cancelled = 'cancelled',
  Noshow = 'noshow',
  EnteredInError = 'entered-in-error',
  CheckedIn = 'checked-in',
  Waitlist = 'waitlist'
}

// Participant
export interface AppointmentParticipant {
  actor?: {
    reference?: string;
    display: string;
  };
  required?: 'required' | 'optional' | 'information-only';
  status: 'accepted' | 'declined' | 'tentative' | 'needs-action';
}

// Appointment
export interface Appointment {
  resourceType: 'Appointment';
  id: string;
  status: AppointmentStatus;
  description?: string;
  start: string;
  end: string;
  created?: string;
  participant?: AppointmentParticipant[];
  comment?: string;
}

export interface CreateAppointmentDto {
  description: string;
  start: string;
  end: string;
  patientName: string;
  practitionerName: string;
  status: AppointmentStatus;
}