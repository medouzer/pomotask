const router = require('express').Router();
const { param } = require('express-validator');
const validation = require('../handlers/validation');
const tokenHandler = require('../handlers/tokenHandler');
const pomodoroController = require('../controllers/pomodoro');

router.post('/', tokenHandler.verifyToken, pomodoroController.create);

router.get('/', tokenHandler.verifyToken, pomodoroController.getAll);

router.put('/updatestatus/:id', tokenHandler.verifyToken, pomodoroController.updatestatus);

router.put('/update/:id', tokenHandler.verifyToken, pomodoroController.update);

module.exports = router;
