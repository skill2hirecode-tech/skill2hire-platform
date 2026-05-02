import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Jobs API
export const jobsApi = {
  getAll: async (params?: { page?: number; limit?: number; jobType?: string; experienceLevel?: string; location?: string; search?: string }) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },
  getBySlug: async (slug: string) => {
    const response = await api.get(`/jobs/slug/${slug}`);
    return response.data;
  },
};

// Courses API
export const coursesApi = {
  getAll: async (params?: { page?: number; limit?: number; level?: string; category?: string; search?: string }) => {
    const response = await api.get('/courses', { params });
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
  getBySlug: async (slug: string) => {
    const response = await api.get(`/courses/slug/${slug}`);
    return response.data;
  },
  enroll: async (id: string, data: any) => {
    const response = await api.post(`/courses/${id}/enroll`, data);
    return response.data;
  },
};

// Leads API
export const leadsApi = {
  contact: async (data: any) => {
    const response = await api.post('/leads/contact', data);
    return response.data;
  },
  newsletter: async (email: string) => {
    const response = await api.post('/leads/newsletter', { email });
    return response.data;
  },
};

export default api;
