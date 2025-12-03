
import { Appointment, CreateAppointmentDto } from '../types';

const API_URL = 'http://localhost:3001/appointments';

class AppointmentService {
  
  // GET /appointments
  async getAppointments(): Promise<Appointment[]> {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("API Connection Error. Ensure Backend is running on port 3001.", error);
      throw error;
    }
  }

  // POST /appointments
  async createAppointment(dto: CreateAppointmentDto): Promise<Appointment> {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    if (!response.ok) throw new Error('Failed to create appointment');
    return await response.json();
  }

  // PUT /appointments/:id
  async updateAppointment(id: string, dto: CreateAppointmentDto): Promise<Appointment> {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dto),
      });
      if (!response.ok) throw new Error('Failed to update appointment');
      return await response.json();
  }

  // DELETE /appointments/:id
  async deleteAppointment(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete appointment');
    return;
  }
}

export const appointmentService = new AppointmentService();
