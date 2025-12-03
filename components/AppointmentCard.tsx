
import React from 'react';
import { Appointment } from '../types';
import StatusBadge from './StatusBadge';

interface AppointmentCardProps {
  appointment: Appointment;
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onEdit, onDelete }) => {
  const startDate = new Date(appointment.start);
  const endDate = new Date(appointment.end);

  const formattedDate = startDate.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = `${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const practitioner = appointment.participant?.[0];
  const patient = appointment.participant?.[1];

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent clicks if any
    if (window.confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) {
      onDelete(appointment.id);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(appointment);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {appointment.description || 'No Description'}
          </h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <i className="far fa-calendar-alt w-4 text-center"></i>
            {formattedDate}
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <i className="far fa-clock w-4 text-center"></i>
            {formattedTime}
          </p>
        </div>
      
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleEditClick}
            className="p-2 text-gray-400 hover:text-primary hover:bg-teal-50 rounded-full transition-colors"
            title="Edit"
            aria-label="Edit appointment"
          >
            <i className="fas fa-pen"></i>
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            title="Delete"
            aria-label="Delete appointment"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
          <div className="ml-1">
            <StatusBadge status={appointment.status} />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-3 mt-2 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Practitioner</p>
          <p className="text-sm font-medium text-gray-700 flex items-center gap-2 mt-1">
            <i className="fas fa-user-md text-primary opacity-75"></i>
            {practitioner?.actor?.display || 'Unassigned'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">Patient</p>
          <p className="text-sm font-medium text-gray-700 flex items-center gap-2 mt-1">
            <i className="fas fa-user text-secondary opacity-75"></i>
            {patient?.actor?.display || 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
