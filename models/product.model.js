
//Aqui es donde empiezo a crear el esquema de mongus
//Schema en mayuscula porque es una clase

const { model, Schema } = require('mongoose')
// const mongoose = require('mongoose')
// const Schema = mongoose.Schema


const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    departmet: String,
    available: Boolean,
    stock: Number
})

//Ponemos String con mayuscula porque es un tipo de mongoose


module.exports = model('product', productSchema);
