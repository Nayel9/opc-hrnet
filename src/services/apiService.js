import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const apiService = {

getEmployees: async () => {
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await apiClient.get('/employees');
                resolve(response.data);
            } catch (error) {
                if (error.response) {
                    reject(error.response.data);
                } else {
                    reject(new Error('Network error'));
                }
            }
        }, 500);
    });
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