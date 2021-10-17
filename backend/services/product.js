import Product from "../model/product.js";

let productServices = {
    getProducts,
    getProduct,
    addProduct,
    addProducts,
    editProduct,
    deleteProduct,
    deleteProducts
}

async function getProducts(){
    try
    {
        const products = await Product.find();

        return products;
    }

    catch(err)
    {
        throw err;
    }
}

async function getProduct(productId){
    try
    {
        const product = await Product.findOne({id: productId});

        if(!product)
        {
            throw "Product not found";
        }

        return product;
    }

    catch(err)
    {
        throw err;
    }
}

async function addProduct(productData){
    try
    {
        let product = await Product.findOne({id: productData.id});

        if(product)
        {
            throw `Product with id "${productData.id}" exists`
        }

        else
        {
            const now = new Date();

            let data = {...productData};
            data.createdAt = now.toISOString();
            data.updatedAt = now.toISOString();

            product = await Product.create(data);
            delete product._id;

            return product
        }
    }

    catch(err)
    {
        throw err;
    }
}

async function addProducts(newProducts){
    try
    {
        if(!newProducts[0])
        {
            throw "New product data must be put into an array"
        }

        else
        {
            let ids = [];

            newProducts.forEach(product => {
                ids.push(product.id);
            });

            let existingProducts = await Product.find({id: {$in: ids}});
            let existed = [];

            existingProducts.forEach(product => {
                existed.push(product.id);
            });

            let filtered = newProducts.filter(product => existed.indexOf(product.id) < 0);

            filtered.forEach(product => {
                if(!product.id)
                {
                    throw "id is required"
                }

                else if(!product.createdAt)
                {
                    throw "createdAt is required"
                }

                else if(!product.updatedAt)
                {
                    throw "updatedAt is required"
                }

                else if(!product.name)
                {
                    throw "name is required"
                }

                else if(!product.price)
                {
                    throw "price is required"
                }
            });

            let products = await Product.insertMany(filtered);

            return products;
        }
    }

    catch(err)
    {
        throw err;
    }
}

async function editProduct(oldId, productData){
    try
    {
        console.log(productData);
        const now = new Date();
        
        let newData = {...productData};
        newData.updatedAt = now.toISOString();

        let product = await Product.findOneAndUpdate({id: oldId}, newData);

        if(!product)
        {
            throw "Product not found";
        }

        product = await Product.findOne({id: productData.id ? productData.id : product.id});

        delete product._id;

        console.log(product);

        return product;
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteProducts(productIds)
{
    try
    {
        let products = await Product.deleteMany({id: {$in: productIds}});

        let response = [];

        productIds.forEach(id => {
            response.push({id: id});
        })

        return response;
    }

    catch(err)
    {
        throw err;
    }
}

async function deleteProduct(productId){
    try
    {
        let product = await Product.findOne({id: productId});

        if(!product)
        {
            throw "Product not found";
        }

        product = await Product.deleteOne({id: productId});

        return {id: productId};
    }

    catch(err)
    {
        throw err;
    }
}

export default productServices;