import { Router } from "express";
import ProductManager from "../dao/productManager.js";

const router = Router();

const Productos = new ProductManager()

router.get("/", async(req, res) => {
    const limit = parseInt(req.params.limit) || 10
    try {
        const productos = await Productos.getProducts(limit)
        res.render('home',{
            products: productos,
            css: 'styles.css',
            style: 'nav.css',
            styles:'products.css'
        })
    } catch (error) {
        console.log(error)
    }
});



export default router