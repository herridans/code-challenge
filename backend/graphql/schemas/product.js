import gql from "graphql";

let productSchema = gql.buildSchema(`
    scalar Date

    type Product {
        id: String!
        createdAt: Date!
        updatedAt: Date!
        name: String!
        price: Float!
        description: String
        image: String
        tags: [String]
    }

    type DeletedProduct{
        id: String!
    }

    input ProductInput {
        id: String!
        createdAt: Date!
        updatedAt: Date!
        name: String!
        price: Float!
        description: String
        image: String
        tags: [String]
    }

    type Query {
        getProducts: [Product]
        getProduct(id: String): Product
    }

    type Mutation {
        addProduct(input: ProductInput): Product
        addProducts(inputs: [ProductInput]): Product
        editProduct(input: ProductInput): Product
        deleteProduct(id: String): DeletedProduct
        deleteProducts(ids: [String]): [DeletedProduct]
    }
`);

export default productSchema;