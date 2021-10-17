import Product from "../../model/product.js";
import productServices from "../../services/product.js";

let resolver = {
    getProducts: async() => {
        try
        {
            const products = await productServices.getProducts();

            return products;
        }

        catch(err)
        {
            throw err;
        }
    },
    getProduct: async({id}) => {
        try
        {
            const product = await productServices.getProduct(id);
            return product;
        }

        catch(err)
        {
            throw err;
        }
    },
    addProduct: async({input}) => {
        try
        {
            const product = await productServices.addProduct(input)
            return product;
        }

        catch(err)
        {
            throw err;
        }
    },
    addProducts: async({inputs}) => {
        try
        {
            const products = await productServices.addProducts(inputs)
            console.log(products);
            return products;
        }

        catch(err)
        {
            throw err;
        }
    },
    editProduct: async({input}) => {
        try
        {
            const products = await productServices.editProduct(input);
            return products;
        }

        catch(err)
        {
            throw err;
        }
    },
    deleteProduct: async({id}) => {
        try
        {
            const product = await productServices.deleteProduct(id);
            return product;
        }

        catch(err)
        {
            throw err;
        }
    },
    deleteProducts: async({ids}) => {
        try
        {
            const products = await productServices.deleteProducts(ids)
            return products;
        }

        catch(err)
        {
            throw err;
        }
    }
}

export default resolver;