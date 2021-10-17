import request from "supertest";
import mongoose from "mongoose";
import server from "../server.js";
import Product from "../model/product.js";


let sampleProduct = {
    id: "1",
    name: "Test product 1",
    price: 1.5,
    description: "Test description",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&w=1000&q=80",
    tags: ["Food"]
};

let updatedProduct = {
    id: "1",
    name: "Test product zxc",
    price: 2.1,
    description: "desc",
    image: "https://image.freepik.com/free-photo/delicious-vietnamese-food-including-pho-ga-noodles-spring-rolls-white-table_181624-34062.jpg",
    tags: ["Foods"]
};

beforeEach((done) => {
    mongoose.connect("mongodb+srv://herridans:hn5gh2mi0Chv4FfA@cluster0.ubbjz.mongodb.net/testDb?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => done());
});

afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done())
    });
});

test("Get product by id", async() => {
    let now = new Date();

    const product = await Product.create({...sampleProduct, createdAt: now.toISOString(), updatedAt: now.toISOString()});

    await request(server).get(`/api/product/${sampleProduct.id}`)
    .expect(200)
    .then((response) => {
        expect(response.body.data.id).toBe(product.id);
        expect(response.body.data.name).toBe(product.name);
        expect(response.body.data.price).toBe(product.price);
        expect(response.body.data.description).toBe(product.description);
        expect(response.body.data.tags).toStrictEqual(product.tags);
    })
});

test("Add product", async() => {
    await request(server).post("/api/product")
    .send(sampleProduct)
    .set('Accept', 'application/json')
    .expect(201)
    .then((response) => {
        expect(response.body[0].id).toBe(sampleProduct.id);
        expect(response.body[0].name).toBe(sampleProduct.name);
        expect(response.body[0].price).toBe(sampleProduct.price);
        expect(response.body[0].description).toBe(sampleProduct.description);
        expect(response.body[0].image).toBe(sampleProduct.image);
        expect(response.body[0].tags).toStrictEqual(sampleProduct.tags);
    })
});

test("Edit product by id", async() => {
    let now = new Date();

    const product = await Product.create({...sampleProduct, createdAt: now.toISOString(), updatedAt: now.toISOString()});
    
    await request(server).post(`/api/product/${product.id}`)
    .send(updatedProduct)
    .set('Accept', 'application/json')
    .expect(200)
    .then((response) => {
        expect(response.body.data.id).toBe(updatedProduct.id);
        expect(response.body.data.name).toBe(updatedProduct.name);
        expect(response.body.data.price).toBe(updatedProduct.price);
        expect(response.body.data.description).toBe(updatedProduct.description);
        expect(response.body.data.image).toBe(updatedProduct.image);
        expect(response.body.data.tags).toStrictEqual(updatedProduct.tags);
    })
});

test("Delete product by id", async() => {
    let now = new Date();

    const product = await Product.create({...sampleProduct, createdAt: now.toISOString(), updatedAt: now.toISOString()});

    await request(server).delete(`/api/product/${product.id}`)
    .expect(200)
});