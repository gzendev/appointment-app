
import React, { useEffect, useState } from 'react';
import { Appointment, AppointmentStatus, CreateAppointmentDto } from '../types';

interface AppointmentFormProps {
  onSubmit: (data: CreateAppointmentDto) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  initialData?: Appointment | null;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, onCancel, isSubmitting, initialData }) => {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState<CreateAppointmentDto>({
    description: '',
    start: '',
    end: '',
    patientName: '',
    practitionerName: '',
    status: AppointmentStatus.Proposed,
  });

  useEffect(() => {
    if (initialData) {
      const toLocalISO = (isoString: string) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        const offset = date.getTimezoneOffset() * 60000;
        const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
        return localISOTime;
      };

      const practitioner = initialData.participant?.[0];
      const patient = initialData.participant?.[1];

      setFormData({
        description: initialData.description || '',
        start: toLocalISO(initialData.start),
        end: toLocalISO(initialData.end),
        practitionerName: practitioner?.actor?.display || '',
        patientName: patient?.actor?.display || '',
        status: initialData.status,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">
          {isEditMode ? 'Edit Appointment' : 'New Appointment'}
        </h2>
        <p className="text-sm text-gray-500">
          {isEditMode ? 'Update existing Appointment' : 'Create a new Appointment'}
        </p>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reason / Description</label>
          <input
            type="text"
            name="description"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
            placeholder="e.g. Annual Physical, Cardiology Follow-up"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input
              type="datetime-local"
              name="start"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              value={formData.start}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input
              type="datetime-local"
              name="end"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
              value={formData.end}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Practitioner Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <i className="fas fa-user-md"></i>
              </span>
              <input
                type="text"
                name="practitionerName"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="Dr. Name"
                value={formData.practitionerName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                name="patientName"
                required
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                placeholder="Patient Name"
                value={formData.patientName}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white"
            value={formData.status}
            onChange={handleChange}
          >
            {Object.values(AppointmentStatus).map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 flex items-center gap-2"
        >
          {isSubmitting && <i className="fas fa-spinner fa-spin"></i>}
          {isEditMode ? 'Save' : 'Create Appointment'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;
