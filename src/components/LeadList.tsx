import React from 'react';
import { Lead, LeadStatus } from '../types/lead';
import { format } from 'date-fns';
import { STATUS_COLORS } from '../constants/lead';
import { PencilIcon, TrashIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';


interface LeadListProps {
  leads: Lead[];
  filters: {
    status: string;
    search: string;
  };
  onFilterChange: (filters: { status?: string; search?: string }) => void;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  isLoading?: boolean;
}

const LeadList: React.FC<LeadListProps> = ({
  leads,
  filters,
  onFilterChange,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ status: e.target.value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-md shadow">
      {/* filters */}
      <div className="p-4 border-b border-gray-500 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="w-full md:w-1/3 relative">
          <input
            id="search"
            type="text"
            placeholder="Search by name..."
            value={filters.search}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-800 bg-gray-500 rounded-sm leading-5 placeholder-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="w-full md:w-1/4">
          <select
            id="status-filter"
            value={filters.status}
            onChange={handleStatusFilterChange}
            className="block w-full pl-3 pr-10 py-2 border border-gray-800 bg-gray-500 text-white rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">All Statuses</option>
            {Object.keys(STATUS_COLORS).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Loading leads...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="p-8 text-center text-gray-600 dark:text-gray-300">No leads found</div>
      ) : (
        <>
          {/* Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {['Name', 'Contact', 'Status', 'Source', 'Assigned To', 'Last Updated'].map((title) => (
                    <th
                      key={title}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-gray-200">{lead.email}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        <PhoneIcon className="h-4 w-4 mr-1" />
                        {lead.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${STATUS_COLORS[lead.status as LeadStatus] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                          }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {lead.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {lead.assignedTo || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {format(new Date(lead.updatedAt), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        <button
                          onClick={() => onEdit(lead)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          aria-label="Edit lead"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => onDelete(lead)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          aria-label="Delete lead"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden text-white space-y-4 p-4">
            {leads.map((lead) => (
              <div key={lead._id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{lead.name}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <EnvelopeIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {lead.email}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <PhoneIcon className="flex-shrink-0 mr-1.5 h-4 w-4" />
                      {lead.phone}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(lead)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                      aria-label="Edit lead"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(lead)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      aria-label="Delete lead"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Status:</span>{' '}
                      <span className="font-medium">{lead.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Source:</span>{' '}
                      <span className="font-medium">{lead.source}</span>
                    </div>
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Last updated:</span>{' '}
                    <span className="font-medium">{format(new Date(lead.updatedAt), 'MMM d, yyyy')}</span>
                  </div>
                  {lead.assignedTo && (
                    <div className="mt-1 text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Assigned to:</span>{' '}
                      <span className="font-medium">{lead.assignedTo}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LeadList;
