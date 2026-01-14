import apiClient from '@/utils/axios'

export const roleService = {
    // Get all roles with pagination
    async getRoles(params = {}) {
        const response = await apiClient.get('/roles', { params });
        return response.data;
    },

    // Get single role
    async getRole(id) {
        const response = await apiClient.get(`/roles/${id}`);
        return response.data;
    },

    // Create new role
    async createRole(data) {
        const response = await apiClient.post('/roles', data);
        return response.data;
    },

    // Update role
    async updateRole(id, data) {
        const response = await apiClient.put(`/roles/${id}`, data);
        return response.data;
    },

    // Delete role
    async deleteRole(id) {
        const response = await apiClient.delete(`/roles/${id}`);
        return response.data;
    },

    // Get all roles for dropdown
    async getAllRoles() {
        const response = await apiClient.get('/roles/all');
        return response.data;
    },

    // Get permission structure
    async getPermissions() {
        const response = await apiClient.get('/roles/permissions');
        return response.data;
    },
};
