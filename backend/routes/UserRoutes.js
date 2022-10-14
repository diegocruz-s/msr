const router = require('express').Router();

// Controller
const UserController = require('../controllers/UserController');
const checkToken = require('../helpers/checkToken');
const imageUpload = require('../helpers/imageUpload');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/:id', checkToken, UserController.getUserById);
router.get('/', checkToken, UserController.getUserToken);
router.put('/', checkToken, imageUpload.single('image'), UserController.update);

router.get('/', (req,res)=>{
    res.send('Ok router user');
})

module.exports = router;


