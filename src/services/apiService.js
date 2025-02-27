import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiService = {

    getEmployees: async () => {
        try {
            const response = await apiClient.get('/employees');
            return response.data;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error('Network error');
            }
        }
    },

    addNewEmployee: async (employee) => {
        try {
            const response = await apiClient.post('/employees', employee);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error('Network error');
            }
        }
    },

    updateEmployee: async (employee) => {
        try {
            const response = await apiClient.patch(`/employees/${employee._id}`, employee);
            return response.data;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error('Network error');
            }
        }
    },

    deleteEmployee: async (_id) => {
        try {
            const response = await apiClient.delete('/employees', { data: { _id } });
            return response.data;
        } catch (error) {
            if (error.response) {
                throw error.response.data;
            } else {
                throw new Error('Network error');
            }
        }
    },
};

export { apiService }