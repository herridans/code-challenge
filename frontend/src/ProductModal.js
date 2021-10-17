import React, { useState, useEffect } from "react";
import {
    Modal,
    Row,
    Col,
    FormControl,
    Button,
    InputGroup
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useFilePicker } from "use-file-picker";
import axios from "axios";

function ProductModal({ product, showModal, action, onClose }){
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        if(product && action === "edit")
        {
            setId(product.data.id);
            setName(product.data.name);
            setPrice(product.data.price);

            if(product.data.description)
            {
                setDescription(product.data.description);
            }

            if(product.data.image)
            {
                setImage(product.data.image);
            }

            if(product.data.tags)
            {
                setTags(product.data.tags);
            }
        }
    }, [product, action]);

    function closeModal(){
        setId("");
        setName("");
        setPrice(0);
        setDescription("");
        setImage("");
        setTags([]);
        onClose();
    }

    async function postProduct()
    {
        try
        {
            if(id === "")
            {
                window.alert("Please enter the product id");
            }

            else if(id.indexOf(" ") > -1)
            {
                window.alert("Please remove spaces from the id");
            }
            
            else if(name === "")
            {
                window.alert("Please enter the product name");
            }

            else if(id !== "" && name !== "")
            {
                let data = {
                    id: id,
                    name: name,
                    price: price,
                    image: image,
                    description: description,
                    tags: tags
                };

                if(action === "add")
                {
                    let response = await axios({
                        method: "POST",
                        url: `http://localhost:8000/api/product`,
                        data: data
                    });

                    window.alert("Product successfully added");
                    closeModal();
                }

                else
                {
                    data.oldId = product.data.id;
                    let response = await axios({
                        method: "POST",
                        url: `http://localhost:8000/api/product/${id}`,
                        data: data
                    });

                    window.alert("Product successfully edited");
                    closeModal();
                }
            }
        }

        catch(err)
        {
            console.log(err.response);
            if(err.response.data.message)
            {
                window.alert(err.response.data.message);
            }
        }
    }

    return (
        <Modal show={showModal} onHide={() => {
            closeModal();
        }}>
            <Modal.Header closeButton>
                {
                    action === "add" && (
                        <h2>Add product</h2>
                    )
                }
                {
                    action === "edit" && (
                        <h2>Edit product</h2>
                    )
                }
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={3}>
                        <div style={{
                            fontWeight: "bold",
                            marginTop: "7px"
                        }}>ID</div>
                    </Col>
                    <Col sm={8}>
                        <FormControl value={id} placeholder="Product id" onChange={(e) => {
                            setId(e.target.value);
                        }} />
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "10px"
                }}>
                    <Col sm={3}>
                        <div style={{
                            fontWeight: "bold",
                            marginTop: "7px"
                        }}>Name</div>
                    </Col>
                    <Col sm={8}>
                        <FormControl value={name} placeholder="Product name" onChange={(e) => {
                            setName(e.target.value);
                        }} />
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "10px"
                }}>
                    <Col sm={3}>
                        <div style={{
                            fontWeight: "bold",
                            marginTop: "7px"
                        }}>Price</div>
                    </Col>
                    <Col sm={8}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" placeholder="Product price" value={price} onChange={(e) => {
                                setPrice(Math.max(0, e.target.value));
                            }} />
                        </InputGroup>
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "10px"
                }}>
                    <Col sm={3}>
                        <div style={{
                            fontWeight: "bold",
                            marginTop: "7px"
                        }}>Description</div>
                    </Col>
                    <Col sm={8}>
                        <FormControl value={description} placeholder="Product description" onChange={(e) => {
                            setDescription(e.target.value);
                        }} />
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "10px"
                }}>
                    <Col sm={3}>
                        <div style={{
                            fontWeight: "bold",
                            marginTop: "7px"
                        }}>Image</div>
                    </Col>
                    <Col sm={8}>
                        <FormControl value={image} placeholder="Product image link" onChange={(e) => {
                            setImage(e.target.value);
                        }} />
                    </Col>
                </Row>
                <Row style={{
                    marginTop: "10px"
                }}>
                    <Col sm={3}>
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
                                tags.map((tag, index) => {
                                    return (
                                        <li style={{
                                            marginTop: index === 0 ? "0px" : "5px"
                                        }}>
                                            <Button variant="outline-dark" style={{
                                                borderRadius: "20px",
                                                fontSize: "12px",
                                                padding: "2px 0.5rem"
                                            }} onClick={() => {
                                                setTags(tags.filter(currentTag => currentTag !== tag));
                                            }}>{tag}</Button>
                                        </li>
                                    )
                                })
                            }
                            <li style={{
                                marginTop: tags.length > 0 ? "5px" : "0px"
                            }}>
                                <Button variant="outline-primary" style={{
                                    borderRadius: "20px",
                                    fontSize: "12px",
                                    padding: "2px 0.5rem"
                                }} onClick={() => {
                                    let input = window.prompt("Tag name");
                                    if(input && input !== "")
                                    {
                                        if(tags.indexOf(input) > -1)
                                        {
                                            window.alert("Tag already exists")
                                        }

                                        else
                                        {
                                            setTags(tags => [...tags, input]);
                                        }
                                    }

                                    else if(input && input === "")
                                    {
                                        window.alert("Tag cannot be empty");
                                    }
                                }}>
                                    <FontAwesomeIcon icon={faPlus} /> Add tag
                                </Button>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <div>
                    <FontAwesomeIcon icon={faInfoCircle} /> Click on the tag to remove it
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={async () => {
                    await postProduct();
                }}>
                    {
                        action === "add" && (
                            "Add product"
                        )
                    }
                    {
                        action === "edit" && (
                            "Edit product"
                        )
                    }
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductModal;