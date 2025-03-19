import { Router } from "express";
import ProductManager from "../dao/productManager.js";

const router = Router();
const products = new ProductManager();


router.get("/", async (req, res) => {

    const limit = parseInt(req.params.limit) || 10;

    try {
   
        const productos = await products.getProducts(limit);

       
        res.render("realTimeProducts", {
            css: 'styles.css',      
            style: 'nav.css',       
            styles: 'products.css', 
            products: productos     
        });
    } catch (error) {
    
        console.log(error);
    }
});

export default router;