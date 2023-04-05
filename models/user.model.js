
const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    active: Boolean,
    cart: [{ type: Schema.Types.ObjectId, ref: 'product' }]
    //en cart almacenamos una relacion con otro modelo
    //la prropiedad cart que tiene cada uno de los usuarios es un array que va relacionado con los id del producto 
}, {
    timestamps: true
})


//timestamp nos crea la fecha de creacion del documento y la fecha en la que se va actualizando


module.exports = model('user', userSchema);