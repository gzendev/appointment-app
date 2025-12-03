
export interface AppointmentParticipant {
  actor: {
    display: string;
  };
  status: string;
}

export interface Appointment {
  resourceType: 'Appointment';
  id: string;
  status: string;
  description: string;
  start: string;
  end: string;
  created: string;
  participant: AppointmentParticipant[];
}
