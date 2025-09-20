import React, { useState, useEffect } from 'react';

import LeadList from '@/components/LeadList';
import LeadModal from '@/components/leadModal';
import { Lead, LeadFormData } from '@/types/lead';
import axios from 'axios';

const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  // const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [filters, setFilters] = useState({ status: '', search: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isLoading, setIsLoading] = useState(false);
 
  // ✅ Pagination state
 const [page, setPage] = useState(1);
 const [limit] = useState(10);
 const [totalPages, setTotalPages] = useState(1); 

  // Fetch leads from API
  // const fetchLeads = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get('/api/v1/leads', { withCredentials: true });
  //     console.log('res', res.data.data.length);

  //     setLeads(res.data.data);
  //   } catch (err) {
  //     console.error('Error fetching leads:', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Fetch leads from API with filters + pagination
  const fetchLeads = async (page = 1, limit = 10) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      if (filters.status) params.append('status', filters.status);
      if (filters.search) params.append('search', filters.search);

      const res = await axios.get(`/api/v1/leads?${params.toString()}`, {
        withCredentials: true,
      });

      setLeads(res.data.data || []);
      setTotalPages(res.data.pages || 1);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setIsLoading(false);
    }
  };


  // Re-fetch whenever filters or page change
  useEffect(() => {
    fetchLeads();
  }, [filters, page, limit]);





  // useEffect(() => {
  //   fetchLeads();
  // }, []);

  // Filter leads whenever search/status changes
  // useEffect(() => {
  //   let result = leads;

  //   if (filters.status) {
  //     result = result.filter((lead) => lead.status === filters.status);
  //   }

  //   if (filters.search) {
  //     const query = filters.search.toLowerCase();
  //     result = result.filter((lead) => lead.name.toLowerCase().includes(query));
  //   }

  //   setFilteredLeads(result);
  // }, [filters, leads]);

  const handleFilterChange = (newFilters: { status?: string; search?: string }) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1); // reset to first page when filters change
  };

  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, search: query }));
    setPage(1); // reset to first page when search changes
  };

  const handleEdit = (lead: Lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const handleDelete = async (lead: Lead) => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/v1/leads/${lead._id}`, { withCredentials: true });
      fetchLeads();
    } catch (err) {
      console.error('Error deleting lead:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (data: LeadFormData) => {
    setIsLoading(true);
    try {
      if (editingLead) {
        // update existing lead

        await axios.put(`/api/v1/leads/${editingLead._id}`, data, { withCredentials: true });
      } else {
        // create new lead
        await axios.post('/api/v1/leads', data, { withCredentials: true });
      }
      setIsModalOpen(false);
      setEditingLead(null);
      fetchLeads();
    } catch (err) {
      console.error('Error saving lead:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">


      <div className="flex-1 flex flex-col overflow-hidden">


        <main className="flex-1 overflow-x-hidden overflow-y-auto p-1 md:p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Leads</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Lead
            </button>
          </div>

          <LeadList
            // leads={filteredLeads}
            leads={leads}
            filters={filters}
            onFilterChange={handleFilterChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />


 {/* Pagination Controls */}
 <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-gray-700 dark:text-gray-200">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

















          <LeadModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setEditingLead(null);
            }}
            onSave={handleSave}
            initialData={editingLead}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
};

export default LeadsPage;