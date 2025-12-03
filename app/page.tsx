'use client';

import { useEffect, useState } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import AppointmentForm from '../components/AppointmentForm';
import { appointmentService } from '../services/appointmentService';
import { Appointment, CreateAppointmentDto } from '../types';

export default function Home() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await appointmentService.getAppointments();
      const sorted = data.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
      setAppointments(sorted);
    } catch (error) {
      console.error("Failed to fetch appointments", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (data: CreateAppointmentDto) => {
    setLoading(true);
    try {
      if (editingAppointment) {
        await appointmentService.updateAppointment(editingAppointment.id, data);
      } else {
        await appointmentService.createAppointment(data);
      }
      
      await fetchAppointments();
      setView('list');
      setEditingAppointment(null);
    } catch (error) {
      console.error("Failed to save appointment", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setEditingAppointment(null);
    setView('form');
  };

  const handleEditClick = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setView('form');
  };

  const handleDeleteClick = async (id: string) => {
    setLoading(true);
    try {
      await appointmentService.deleteAppointment(id);
      await fetchAppointments();
    } catch (error) {
      console.error("Failed to delete appointment", error);
      alert("Failed to delete appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setView('list');
    setEditingAppointment(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-end">
          <div className="flex items-center gap-3">
            {view === 'list' && (
              <button
                onClick={handleCreateClick}
                className="bg-primary hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
              >
                <i className="fas fa-plus"></i>
                <span className="hidden sm:inline">New Appointment</span>
              </button>
            )}
            {view === 'form' && (
              <button
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Back to List
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {view === 'list' ? (
          <>
            <div className="mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
                <p className="text-gray-500 text-sm mt-1">Manage patient schedules and practitioner availability.</p>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <i className="fas fa-circle-notch fa-spin text-4xl mb-3 text-primary"></i>
                <p>Loading records...</p>
              </div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <i className="far fa-calendar text-2xl text-gray-400"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900">No appointments</h3>
                <p className="text-gray-500 mt-1 mb-6">Get started by creating a new appointment.</p>
                <button
                  onClick={handleCreateClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Create Appointment
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {appointments.map((apt) => (
                  <AppointmentCard 
                    key={apt.id} 
                    appointment={apt} 
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
             <AppointmentForm 
               key={editingAppointment ? editingAppointment.id : 'new'}
               onSubmit={handleFormSubmit} 
               onCancel={handleCancel} 
               isSubmitting={loading}
               initialData={editingAppointment}
             />
          </div>
        )}
      </main>
    </div>
  );
}