const router = require('express').Router();

const Product = require('../../models/product.model');


router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        //asi recuperamos todos los productos de la coleccion
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }

});


router.get('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);
        res.json(product);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});



router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        //req.body porque es la respuesta que obtenemos de la promesa
        res.json(newProduct)
    } catch (error) {
        res.json({ fatal: error.message });
    }

})



router.put('/stock', async (req, res) => {
    try {
        const result = await Product.updateMany({
            available: true,
            stock: { $lte: 10 }
        },
            { available: false })
        res.json(result)
    } catch (error) {

    }

})


router.put('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const updatedProduct = await Product.findOneAndUpdate(productId, req.body, { new: true })
        //Tenemos que poner obligatoriamente new: true para que nos aparezca el producto modificado
        res.json(updatedProduct)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})


router.delete('/:productId', async (req, res) => {
    const { productId } = req.params
    try {
        const deleteProduct = await Product.findByIdAndDelete(productId)
        res.json(deleteProduct)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})


router.get('/price/:minPrice', async (req, res) => {
    const { minPrice } = req.params;
    try {
        const products = await Product.find({
            price: { $gte: minPrice },
            available: true
        })
        res.json(products)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})


router.get('/department/:department', async (req, res) => {
    const { department } = req.params;
    try {
        const products = await Product.find({
            department: { $eq: department },
        })
        res.json(products)
    } catch (error) {
        res.json({ fatal: error.message })
    }
})

module.exports = router;