
export class CreateAppointmentDto {
  description: string;
  start: string;
  end: string;
  patientName: string;
  practitionerName: string;
  status: string; // 'proposed' | 'pending' | 'booked' | etc.
}
