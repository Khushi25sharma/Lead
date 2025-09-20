import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LeadFormData, LeadStatus, LeadSource } from '../types/lead';
import { STATUS_OPTIONS, SOURCE_OPTIONS } from '../constants/lead';

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  initialData?: Partial<LeadFormData>;
  isLoading?: boolean;
}

// yup validatin schema 
import type { InferType } from 'yup';

const leadSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
  status: yup.string().oneOf([...STATUS_OPTIONS] as const).required('Status is required'),
  source: yup.string().oneOf([...SOURCE_OPTIONS] as const).required('Source is required'),
  assignedTo: yup.string().required('Assigned to is required'),
}).required();

type LeadFormValues = InferType<typeof leadSchema>;

// reusable input/select wrapper
interface InputFieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children?: React.ReactNode;
  className?: string;
  type?: string;
}

const InputField = React.forwardRef<
  HTMLInputElement,
  InputFieldProps & React.InputHTMLAttributes<HTMLInputElement>
>(({ label, id, error, required = false, className = '', type = 'text', ...props }, ref) => (
  <div className={className}>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      type={type}
      ref={ref}
      className={`mt-1 block w-full rounded-sm border ${
        error ? 'border-red-500' : 'border-gray-300'
      } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
));

// Select field component with forwardRef
interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, required = false, children, className = '', ...props }, ref) => (
    <div className={className}>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={props.id}
        ref={ref}
        className={`mt-1 block w-full rounded-sm border ${
          error ? 'border-red-500' : 'border-gray-300'
        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2`}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);

// Add display name for better debugging
SelectField.displayName = 'SelectField';

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, initialData, isLoading = false }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormValues>({
    resolver: yupResolver(leadSchema as any),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      status: 'New' as LeadStatus,
      source: 'Website' as LeadSource,
      assignedTo: '',
      ...initialData,
    },
  });

  // form reset condition
  useEffect(() => {
    reset({
      name: '',
      email: '',
      phone: '',
      status: 'New',
      source: 'Website',
      assignedTo: '',
      ...initialData,
    });
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <InputField
            label="Name"
            id="name"
            error={errors.name?.message}
            required
            {...field}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <InputField
            label="Email"
            id="email"
            error={errors.email?.message}
            required
            type="email"
            {...field}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <InputField
            label="Phone"
            id="phone"
            error={errors.phone?.message}
            required
            type="tel"
            {...field}
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <SelectField
            label="Status"
            id="status"
            error={errors.status?.message}
            required
            {...field}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </SelectField>
        )}
      />

      <Controller
        name="source"
        control={control}
        render={({ field }) => (
          <SelectField
            label="Source"
            id="source"
            error={errors.source?.message}
            required
            {...field}
          >
            {SOURCE_OPTIONS.map((source) => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </SelectField>
        )}
      />

      <Controller
        name="assignedTo"
        control={control}
        render={({ field }) => (
          <InputField
            label="Assigned To"
            id="assignedTo"
            error={errors.assignedTo?.message}
            required
            {...field}
          />
        )}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex justify-center rounded-sm border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-sm border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
