import React from "react";
import {
    Container,
    Row,
    Col,
    Button
} from "react-bootstrap";

function ProductForm({ product }){

    return (
        <>
            {
                product && (
                    <Container>
                        <Row style={{
                            marginTop: "-10px"
                        }}>
                            <Col>
                                <div style={{
                                    color: "grey"
                                }}>Created at : {new Date(product.data.createdAt).toTimeString()}</div>
                                <div style={{
                                    color: "grey"
                                }}>Updated at : {new Date(product.data.updatedAt).toTimeString()}</div>
                            </Col>
                        </Row>
                        {
                            product.data.image && (
                                <Row style={{
                                    marginTop: '20px'
                                }}>
                                    <Col sm={4}>
                                        <img src={product.data.image} height={180} alt={"Product image"} />
                                    </Col>
                                </Row>
                            )
                        }
                        <Row style={{
                            marginTop: '10px'
                        }}>
                            <Col sm={2}>
                                <div style={{
                                    fontWeight: "bold"
                                }}>ID</div>
                            </Col>
                            <Col sm={8}>
                                <div>{product.data.id}</div>
                            </Col>
                        </Row>
                        <Row style={{
                            marginTop: "10px"
                        }}>
                            <Col sm={2}>
                                <div style={{
                                    fontWeight: "bold"
                                }}>Name</div>
                            </Col>
                            <Col sm={8}>
                                <div>{product.data.name}</div>
                            </Col>
                        </Row>
                        <Row style={{
                            marginTop: "10px"
                        }}>
                            <Col sm={2}>
                                <div style={{
                                    fontWeight: "bold"
                                }}>Price</div>
                            </Col>
                            <Col sm={8}>
                                <div>$ {product.data.price}</div>
                            </Col>
                        </Row>
                        <Row style={{
                            marginTop: "10px"
                        }}>
                            <Col sm={2}>
                                <div style={{
                                    fontWeight: "bold"
                                }}>Description</div>
                            </Col>
                            <Col sm={8}>
                                <div>{product.data.description}</div>
                            </Col>
                        </Row>
                        <Row style={{
                            marginTop: "10px"
                        }}>
                            <Col sm={2}>
                                <div style={{
                                    fontWeight: "bold"
                                }}>Tags</div>
                            </Col>
                            <Col sm={8}>
                                <ul style={{
                                    padding: "0",
                                    listStyleType: "none"
                                }}>
                                    {
                                        product.data.tags && product.data.tags.map((tag, index) => (
                                            <li style={{
                                                marginTop: index === 0 ? "0px" : "5px"
                                            }}>
                                                <Button variant="outline-dark" style={{
                                                    borderRadius: "20px",
                                                    fontSize: "12px",
                                                    padding: "2px 0.5rem"
                                                }}>{tag}</Button>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        </>
    )
}

export default ProductForm;