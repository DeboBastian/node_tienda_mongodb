const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
//Nos traemos el modelo user para la estructura de mongoDB

const checkToken = async (req, res, next) => {
    // Comprobar si el TOKEN viene incluido en la cabecera Authorization
    if (!req.headers['authorization']) {
        return res.json({ fatal: 'Debes incluir la cabecera de Authorization' });
    }

    const token = req.headers['authorization'];

    // Comprobar si el TOKEN es correcto
    // Si el token está mal, verify lanza una excepción
    let obj;
    try {
        obj = jwt.verify(token, 'clave ultra secretisima');
    } catch (error) {
        return res.json({ fatal: 'El token es incorrecto!!!' });
    }

    //mongoose lo que nos devuelve va directamente en el req.user
    req.user = await User.findById(obj.user_id).populate('cart');
    //con populate en vez de traernos solo el id, nos trae todas las propiedades de cart


    next();
}

const checkAdmin = (req, res, next) => {
    // Si ejecuto un código que va después de la ejecución del método checkToken, tengo disponible la variable req.user
    // OBJETIVO: Si el usuario logado es admin, llamamos a next. Si no, respondemos con error
    if (req.user.role !== 'admin') {
        return res.json({ fatal: 'Debes ser ADMIN' });
    }
    next();
}

module.exports = {
    checkToken, checkAdmin
}