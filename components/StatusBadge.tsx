import React from 'react';
import { AppointmentStatus } from '../types';

interface StatusBadgeProps {
  status: AppointmentStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colorClass = 'bg-gray-100 text-gray-800';
  
  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {label}
    </span>
  );
};

export default StatusBadge;