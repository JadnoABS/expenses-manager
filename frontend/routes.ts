import { Router } from 'express';
import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';

const router = Router();

const api = axios.create({
    baseURL: "http://localhost:3333",
    timeout: 5000
});

interface Profile {
    name: string,
    email: string,
    password: string,
    revenue: number,
}

interface Expense {
    title: string,
    description: string,
    value: number
}

router.post('/session', async (req, res) => {
    try {
        const userData: Profile = req.body;
        const response = await api.post('session', userData);
        console.log(response);
        return res.send(response.data);
    } catch(err) {
        return res.status(401).json({
            error: err.response.data
        });
    }
});

router.post('/user/register', async (req, res) => {
    try {
        const userData: Profile = req.body;
        const { data } = await api.post('profile', userData);
        return data;
    } catch(err) {
        return res.status(500).json({
            error: 'Server request error!'
        })}
});

router.get('/user/profile', async (req, res) => {
    try {
        const id = req.headers.authorization;
        const { data } = await api.get('profile', {
            headers: {
                Authorization: id
            }
        });
        return res.json(data);
    } catch(err) {
        return res.status(500).json({
            error: 'Server request error!'
        });
    }
});

router.get('/user/expenses', async (req, res) => {
    try {
        const id = req.headers.authorization;
        const { data } = await api.get('expenses', {
            headers: {
                Authorization: id,
            }
        });
        return res.json(data);
    } catch(err) {
        return res.status(500).json({
            error: 'Server request error!'
        });
    }
});

router.post('/user/expenses', async (req, res) => {
    try {
        const id = req.headers.authorization;
        const expenseData: Expense = req.body;

        const { data } = await api.post('expenses', expenseData, {
            headers: {
                Authorization: id
            }
        });

        return res.json(data);
    } catch (err) {
        return res.status(500).json({
            error: 'Server request error!'
        });
    }
});

router.put('/user/profile', async (req, res) => {
    const {name, email} = req.body;
    const id = req.headers.authorization;
    
    try{
        const { data } = await api.put('profile', {name, email}, {
            headers: {
                Authorization: id,
            },
        });

        return res.json(data);
    } catch(err) {
        return res.status(500).json({
            error: 'Server request error!'
        });
    }
});

router.put('/user/changepass', async (req, res) => {
    const { password, newPassword } = req.body;
    const id = req.headers.authorization;

    try {
        const { data } = await api.put('profile/password', { password, newPassword }, {
            headers: {
                Authorization: id,
            },
        });

        return res.json(data);
    } catch(err) {
        return res.status(500).json({
            error: 'Server request error!'
        });
    }
})

router.delete('/user/expenses/:id', async (req, res) => {
    try {
        const id = req.params.id,
            user_id = req.headers.authorization;

        const { data } = await api.delete(`expenses/${id}`, {
            headers: {
                Authorization: user_id,
            },
        });

        return res.json(data);
    } catch (err) {
        return res.status(500).json({
            error: 'Server request error!'
        });
    }
});

router.put('/revenue', async (req, res) => {
    try {
        const revenue = req.body.revenue;
        const id = req.headers.authorization;

        const response = await api.put('revenue', {revenue}, {
            headers: {
                Authorization: id,
            },
        });

        return res.json(response.data);
    } catch(err) {
        return res.status(500).json({
            error: 'Server request error!'
        });
    }
});

export default router;