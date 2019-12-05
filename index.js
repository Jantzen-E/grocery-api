const express = require('express');
const bodyParser = require('body-parser');
const uuidv4 = require('uuid/v4');
const fs = require('fs');
const DAL = require('./dataAccessLayer');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const cors = require('cors');
 
app.use(bodyParser.json());

DAL.Connect();

// const mongodbUsername = process.env.MONGODB_USERNAME;
// console.log('mongodbUsername: ' + mongodbUsername);

// const products = require('./products.json');
 
//Get all products endpoint
app.get('/api/products', cors(), async function(req, res) {
    // const result = Object.values(products);
    const result = await DAL.Find();

    res.send(result);
});

//Get 1 product by ID endpoint.
app.get('/api/products/:id', cors(), async function(req, res) {
    const id = req.params.id;
    
    const product = {
        _id: ObjectId(id)
    };

    const result = await DAL.Find(product);

    if (result) {
        res.send(result);
    }
    else {
        res.send('No product with ID: ' + id + ' found!');
    }
});

app.delete('/api/products/:id', cors(), async function(req, res) {
    const id = req.params.id;
    const product = {
        _id: ObjectId(id)
    };
    const result = await DAL.Remove(product);
    
    // delete products[id];

    res.send(result);
});

app.put('/api/products/:id', cors(), async function(req, res) {
    const id = req.params.id;
    const product = {
        _id: ObjectId(id)
    };
    const newProduct = req.body;
    const updatedProduct = { $set: newProduct};
    const result = await DAL.Update(product, updatedProduct);
        res.send(result);
    // const product = products[id];

//     if(product) {
//         if(newProduct.name && newProduct.price > 0) {
//             product.name = newProduct.name;
//             product.price = newProduct.price;

//             const json = JSON.stringify(products);
//             fs.writeFile('./products.json', json, () => {});
//             res.send();
//         }
//         else {
//             res.send('New product is missing required parameters!');
//         }
//     }  
//     else {
//         res.send('No product with ID: ' + id + ' found!');
//     }
});
    

app.post('/api/products', cors(), async function(req, res) {
    const product = req.body;
    
    if (product.name && product.price > 0) {
        const result = await DAL.Insert(product);

        res.send('Success');
    }
    else {
        res.send('Fail');
    }
});

app.listen(port, 
 () => console.log(`Example app listening on port ${port}!`)
);