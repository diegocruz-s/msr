const router = require('express').Router();

// Controller 
const PubliController = require('../controllers/PubliController');
const checkToken = require('../helpers/checkToken');
const imageUpload = require('../helpers/imageUpload');

router.get('/', PubliController.getAllPublis);
router.post('/create', checkToken, imageUpload.single('image'), PubliController.create);
router.get('/mypublis', checkToken, PubliController.getPubliUser);
router.get('/count/mypublis', checkToken, PubliController.countPublis);
router.get('/search', checkToken, PubliController.search);
router.get('/publisUser/:id', checkToken,  PubliController.getPubliUserId);
router.get('/:id', checkToken,  PubliController.getPubliId);
router.delete('/:id', checkToken, PubliController.delete);
router.put('/:id', checkToken, PubliController.update);
router.put('/like/:id', checkToken, PubliController.likePubli);
router.put('/comment/:id', checkToken, PubliController.commentPubli);

router.get('/', (req,res)=>{
    res.send('Ok router publi'); 
})

module.exports = router; 