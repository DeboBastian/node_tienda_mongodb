
const router = require('express').Router();

const { checkToken } = require('../helpers/middlewears');

router.use('/products', checkToken, require('./api/products')); //cuando atravesamos el token tenmos disponible req.user
router.use('/users', require('./api/users'));

module.exports = router;