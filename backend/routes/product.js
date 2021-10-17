import express from "express";
import Joi from "joi";
import validateRequest from "../configs/validate-request.js";
import productServices from "../services/product.js";

let productRouter = express.Router();

productRouter.get("/:id", getProduct);
productRouter.post("/:id", editProductSchema, editProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.post("/", addProductSchema, addProduct);
productRouter.get("/", getProducts);
//For deleting multiple products
//productRouter.delete("/", deleteProductsSchema, deleteProducts);

function addProductSchema(req, res, next){
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().allow(null, ''),
        image: Joi.string().allow(null, ''),
        tags: Joi.array().items(Joi.string())
    });

    validateRequest(req, next, schema);
}

function editProductSchema(req, res, next){
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string(),
        image: Joi.string().allow(null, ''),
        tags: Joi.array().items(Joi.string())
    });

    validateRequest(req, next, schema);
}

function deleteProductsSchema(req, res, next){
    const schema = Joi.object({
        id: Joi.array().items(Joi.string()).required()
    });

    validateRequest(req, next, schema);
}

function getProducts(req, res, next){
    productServices.getProducts()
        .then(products => res.json(products))
        .catch(next);
}

function getProduct(req, res, next){
    productServices.getProduct(req.params.id)
        .then(product => res.json({data: product}))
        .catch(next);
}

function addProduct(req, res, next){
    productServices.addProduct(req.body)
        .then(product => {
            res.status(201).json([product])
        })
        .catch(next);
}

function editProduct(req, res, next){
    productServices.editProduct(req.params.id, req.body)
        .then(product => res.json({data: product}))
        .catch(next);
}

function deleteProducts(req, res, next){
    productServices.deleteProducts(req.body.id)
        .then(products => {
            let response = [];

            req.body.id.forEach(id => {
                response.push({id: id});
            });

            res.json({data: response})
        })
        .catch(next);
}

function deleteProduct(req, res, next){
    productServices.deleteProduct(req.params.id)
        .then(product => res.json({data: [product.id]}))
        .catch(next);
}

export default productRouter;