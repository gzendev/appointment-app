
import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid'; // Requires: npm install uuid @types/uuid
import { Appointment } from './appointment.interface';
import { CreateAppointmentDto } from './create-appointment.dto';

@Injectable()
export class AppService {
  // In-memory storage for demonstration
  private appointments: Appointment[] = [];

  constructor() {
    this.appointments.push({
      resourceType: 'Appointment',
      id: 'seed-1',
      status: 'booked',
      description: 'Initial Consultation',
      start: new Date().toISOString(),
      end: new Date(Date.now() + 30 * 60000).toISOString(),
      created: new Date().toISOString(),
      participant: [
        { actor: { display: 'Dr. House' }, status: 'accepted' },
        { actor: { display: 'Gregory' }, status: 'accepted' },
      ],
    });
  }

  findAll(): Appointment[] {
    return this.appointments;
  }

  create(createAppointmentDto: CreateAppointmentDto): Appointment {
    const newAppointment: Appointment = {
      resourceType: 'Appointment',
      id: uuidv4(),
      status: createAppointmentDto.status,
      description: createAppointmentDto.description,
      start: createAppointmentDto.start,
      end: createAppointmentDto.end,
      created: new Date().toISOString(),
      participant: [
        { actor: { display: createAppointmentDto.practitionerName }, status: 'accepted' },
        { actor: { display: createAppointmentDto.patientName }, status: 'accepted' },
      ],
    };
    
    console.log(JSON.stringify(newAppointment));

    this.appointments.push(newAppointment);
    return newAppointment;
  }

  delete(id: string): void {
    const index = this.appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    this.appointments.splice(index, 1);
  }

  update(id: string, createAppointmentDto: CreateAppointmentDto): Appointment {
    const index = this.appointments.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    const updatedAppointment: Appointment = {
      ...this.appointments[index],
      status: createAppointmentDto.status,
      description: createAppointmentDto.description,
      start: createAppointmentDto.start,
      end: createAppointmentDto.end,
      participant: [
        { actor: { display: createAppointmentDto.practitionerName }, status: 'accepted' },
        { actor: { display: createAppointmentDto.patientName }, status: 'accepted' },
      ],
    };

    this.appointments[index] = updatedAppointment;
    return updatedAppointment;
  }
}