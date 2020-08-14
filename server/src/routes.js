const express = require('express'),
    router = express.Router();

const SessionController = require('./controllers/SessionController'),
    ProfileController = require('./controllers/ProfileController'),
    ExpenseController = require('./controllers/ExpenseController'),
    EmailController = require('./controllers/EmailController');

router.post('/session',  SessionController.create);

router.get('/profile', ProfileController.index);
router.post('/profile', ProfileController.create);
router.put('/profile', ProfileController.update);
router.put('/profile/password', ProfileController.updatePass);
router.delete('/profile', ProfileController.delete);

router.get('/expenses', ExpenseController.index);
router.post('/expenses', ExpenseController.create);
router.put('/expenses/:id', ExpenseController.update);
router.delete('/expenses/:id', ExpenseController.delete);

router.put('/revenue', ProfileController.updateRevenue);

//router.post('/retrieveid', EmailController.index);

module.exports = router;