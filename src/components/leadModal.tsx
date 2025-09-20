import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import LeadForm from './LeadForm';
import { Lead, LeadFormData } from '../types/lead';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: LeadFormData) => void;
  initialData?: Lead | null;
  isLoading?: boolean;
}

const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<LeadFormData | undefined>();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        status: initialData.status,
        source: initialData.source,
        assignedTo: initialData.assignedTo,
      });
    } else {
      setFormData(undefined);
    }
  }, [initialData]);

  const handleSubmit = (data: LeadFormData) => {
    onSave(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Lead' : 'Create Lead'}
    >
      <LeadForm
        onSubmit={handleSubmit}
        initialData={formData}
        isLoading={isLoading}
      />
    </Modal>
  );
};

export default LeadModal;
