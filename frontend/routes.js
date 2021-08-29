
const express = require('express'),
  axios = require('axios'),
  dotenv = require("dotenv").config();

const router = express.Router();

const api = axios.create({
  baseURL: process.env.API_URL,
  timeout: 5000
});


router.post('/session', async (req, res) => {
  try {
    const userData = req.body;
    const response = await api.post('session', userData);
    return res.send(response.data);
  } catch(err) {
    console.log(err);
    return res.status(401).json({
      error: err.response.data,
    });
  }
});

router.post('/user/register', async (req, res) => {
  try {
    const userData = req.body;
    const { data } = await api.post('profile', userData);

    return res.json(data);
  } catch(err) {
    return res.status(500).json({
      error: err.code,
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
      error: err.code,
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
      error: err.code,
    });
  }
});

router.post('/user/expenses', async (req, res) => {
  try {
    const id = req.headers.authorization;
    const expenseData = req.body;

    const { data } = await api.post('expenses', expenseData, {
      headers: {
          Authorization: id
      }
    });

    return res.json(data);
  } catch (err) {
    return res.status(500).json({
      error: err.code,
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
            error: err.request.data.error
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

module.exports = router;
