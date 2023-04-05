const router = require('express').Router();
const bcrypt = require('bcryptjs');


const User = require('../../models/user.model');
const { createToken } = require('../../helpers/utils');
const { checkToken } = require('../../helpers/middlewears');



router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({ fatal: error.message });
    }

});


router.get('/buy/:productId', checkToken, async (req, res) => {
    const { productId } = req.params;
    req.user.cart.push(productId)
    //con esto añadimos el producto pero no se queda en la base de datos
    await req.user.save();
    //el save es para que se quede el producto elegido guardado en la base de datos, en mySQL esto es diferente
    console.log(productId, req.user._id);
    res.json({ success: 'Producto agregado' });
})
//PASAMOS A TRAVES DEL CHECKTOKEN PARA QUE SE NOS LOGEE EL USUARIO, SINO NO FUNCIONA. DENTRO TENEMOS LOS DATOS DEL USUARIO LOGADO. REQ.USER


router.get('/cart', checkToken, (req, res) => {
    res.json(req.user.cart)
})

router.post('/register', async (req, res) => {

    req.body.password = bcrypt.hashSync(req.body.password, 8);

    try {
        const newUser = await User.create(req.body);
        res.json(newUser)
    } catch (error) {
        res.json({ fatal: error.message });
    }
})


router.post('/login', async (req, res) => {

    //Comprobamos si el email esta registrado
    const user = await User.findOne({ email: req.body.email });

    if (!user) {                    //ojo, mySQl devuelve un array, pero mongo devuelve un objeto
        return res.json({ Error: 'Error en usuario y/o contraseña' });

    }
    const iguales = bcrypt.compareSync(req.body.password, user.password)
    if (!iguales) {
        return res.json({ Error: 'Error en usuario y/o contraseña' });
    }
    res.json({
        success: "Login correcto!!😋",
        token: createToken(user)
    });
});


module.exports = router;