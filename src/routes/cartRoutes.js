import express from 'express';
import CartManager from '../dao/cartManager.js';

const router = express.Router();
const carts = new CartManager();


router.get('/', async (req, res) => {
    const limit = parseInt(req.params.limit) || 10; 
    try {
        
        const Carts = await carts.getCarts(limit);
        
        res.status(200).json(Carts);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});


router.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    try {
        
        const Carts = await carts.getCartsById(Number(cid));
        
        res.status(200).json(Carts);
    } catch (error) {
       
        res.status(500).json({ error: error.message });
    }
});


router.post('/', async (req, res) => {
    try {
        
        const CartNew = await carts.createCart();
        
        res.status(201).json(CartNew);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});


router.post('/:cid/products/:pid', async (req, res) => {
    const { pid, cid } = req.params;
    const { quantity } = req.body;  

    try {
     
        const newProduct = await carts.addProductCart(Number(cid), Number(pid), quantity);
      
        res.status(200).json(newProduct);
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

export default router;
