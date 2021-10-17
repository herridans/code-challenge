import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Row,
    Col,
    InputGroup,
    FormControl,
    Alert,
    Button,
    Card,
    Spinner
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ProductModal from './ProductModal';
import ProductForm from './ProductForm';

function App(){

    const [product, setProduct] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchString, setSearchString] = useState("");
    const [showProductModal, setShowProductModal] = useState(false);
    const [modalAction, setModalAction] = useState(null);

    useEffect(() => {
        // console.log(product);
    }, [product]);

    useEffect(() => {
    }, [isLoading]);

    useEffect(() => {
        if(showAlert)
        {
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
    }, [showAlert]);

    async function getProduct()
    {
        try
        {
            if(searchString !== "")
            {
                setIsLoading(true);

                const result = await axios({
                    method: "GET",
                    url: `http://localhost:8000/api/product/${searchString}`
                });

                setProduct(result.data);
            }

            else
            {
                setShowAlert(true);
            }
        }

        catch(err)
        {
            console.log(err);
            if(err.response.data.message)
            {
                window.alert(err.response.data.message);
            }
            setProduct(null);
        }

        finally
        {
            setIsLoading(false);
        }
    }

    async function deleteProduct()
    {
        try
        {
            let response = await axios({
                method: "DELETE",
                url: `http://localhost:8000/api/product/${product.data.id}`
            });

            window.alert("Product deleted");
            setProduct(null);
        }

        catch(err)
        {
            console.log(err);
            if(err.response.data.message)
            {
                window.alert(err.response.data.message);
            }
            setProduct(null);
        }
    }

    return (
        <Container fluid style={{
            position: "absolute",
            left: 0,
            top: 0,
            backgroundColor: "lightblue"
        }}>
            <Alert show={showAlert} onClose={() => {
                setShowAlert(false);
            }} dismissible variant="warning" style={{
                position: "absolute",
                right: "10px",
                bottom: "10px",
                paddingBottom: "0px"
            }}>
                <p>Please enter a valid product id</p>
            </Alert>
            <Container maxWidth="lg" style={{
                marginBottom: "20px"
            }}>
                <h1 style={{
                    marginTop: "20px"
                }}>Product database</h1>
                <Button onClick={() => {
                    window.open("http://localhost:8000/graphiql", "_blank");
                }}>Open Graphiql</Button>
                <Row style={{
                    marginTop: "20px"
                }}>
                    <Col sm={12}>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faSearch} style={{
                                    marginLeft: "5px",
                                    marginRight: "5px",
                                    fontSize: "18px"
                                }}/>
                            </InputGroup.Text>
                            <FormControl style={{
                                height: "50px",
                                fontSize: "25px"
                            }} placeholder={"Product id"} value={searchString} onChange={(e) => {
                                setSearchString(e.target.value);
                            }} onKeyPress={async (e) => {
                                if(e.key === "Enter")
                                {
                                    await getProduct();
                                }
                            }} disabled={isLoading}/>
                            <Button style={{
                                fontSize: "20px"
                            }} onClick={async () => {
                                await getProduct();
                            }} disabled={isLoading}>
                                {
                                    isLoading ? (
                                        <Spinner animation="border" />
                                    ) : ("Search")
                                }
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "20px"
                }}>
                    <Col>
                        <Card>
                            <Card.Header>
                                <h3>Product Detail</h3>
                            </Card.Header>
                            <Card.Body>
                                {
                                    isLoading ? (
                                        <div style={{
                                            textAlign: "center"
                                        }}>   
                                            <Spinner animation="border" />
                                        </div>
                                    ) : (
                                        <ProductForm product={product}/>
                                    )
                                }
                                <div style={{
                                    marginTop: "30px"
                                }}>
                                    <Button variant="success" style={{
                                        marginRight: "5px"
                                    }} onClick={() => {
                                        setModalAction("add");
                                        setShowProductModal(true);
                                    }}>
                                        <FontAwesomeIcon icon={faPlus} /> Add product
                                    </Button>
                                    {
                                        product && (
                                            <Button variant="secondary" style={{
                                                margin: "0px 5px"
                                            }} onClick={() => {
                                                setModalAction("edit");
                                                setShowProductModal(true);
                                            }}>
                                                <FontAwesomeIcon icon={faEdit} /> Edit product
                                            </Button>
                                        )
                                    }
                                    {
                                        product && (
                                            <Button variant="danger" style={{
                                                margin: "0px 5px"
                                            }} onClick={async () => {
                                                await deleteProduct();
                                            }}>
                                                <FontAwesomeIcon icon={faTrash} /> Delete product
                                            </Button>
                                        )
                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <ProductModal product={product} showModal={showProductModal} action={modalAction} onClose={() => {
                    setShowProductModal(false);
                }}/>
            </Container>
        </Container>
    )
}

export default App;