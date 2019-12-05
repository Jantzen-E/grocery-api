const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const databaseName = 'grocery-db';
const collectionName = 'products';

const mongoDbUrl = process.env.MONGODB_URL;
// const mongoDbUrl = 'gdfgdfgdfgfgd';
const settings = {
    useUnifiedTopology: true
};
console.log('mongoDbUrl: ' + mongoDbUrl);

let database;

const Connect = function() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoDbUrl, settings, function(err, client) {
            if(err) {
                reject(err);
            }
            else {
                console.log('SUCCESSFULLY CONNECTED TO DATABASE!');
                database = client.db(databaseName);
                resolve();
            }
        });
    });
};



const Insert = function(product) {
    return new Promise((resolve, reject) => {
        const productCollection = database.collection('products');
        productCollection.insertOne(product, function(err, res) {
            if(err) {
                reject(err);
            }
            else {
                console.log('successfully inserted a new document');
                resolve(res);
            }
        });
    });
};

const Find = function(product) {

    let productQuery = {};

    if(product) {
        productQuery = product;
    }

    return new Promise((resolve, reject) => {
        const productCollection = database.collection('products');
        productCollection.find(productQuery).toArray(function(err, res) {
            if(err) {
                reject(err);
            }
            else {
                console.log('successfully found products');
                resolve(res);
            }
        });
    });
};
 

const Update = function(product, newProduct) {
    return new Promise((resolve, reject) => {
        const productCollection = database.collection('products');
        productCollection.updateOne(product, newProduct, function(err, res) {
            if(err) {
                reject(err);
            }
            else {
                console.log('successfully updated products');
                resolve(res);
            }
        });
    });
};


const Remove = function(product) {
    return new Promise((resolve, reject) => {
        const productCollection = database.collection('products');
        productCollection.deleteOne(product, function(err, res) {
            if(err) {
                reject(err);
            }
            else {
                console.log('successfully removed a product');
                resolve(res);
            }
        });
    });
};

module.exports = { Connect, Insert, Find, Update, Remove };


// const promise = Connect();

// promise
//     .then(() => {
//         console.log('success connecting to server.  Promise finished successfully');

    //     const product = {
    //         name: 'gun oil',
    //         price: 9.99
    //     };

    //     Remove(product)
    //         .then((res) => {
    //             console.log('successfully deleted a document');           *********************************************deleteOne
    //             // console.log(res);
    //         })
    //         .catch((err) => {

    //         });
    // })
    // .catch((err) => {
    //     console.log('promise finished with an error');
    // });
















    //     const product = {
    //         name: 'car oil',
    //         price: 9.99
    //     };
       
       
    //     const newProduct = { $set: {name: "gun oil"}};



    //     Update(product, newProduct)
    //         .then((res) => {
    //             console.log('successfully updated a document'); ****************************************************************************updateOne
    //             // console.log(res);
    //         })
    //         .catch((err) => {

    //         });
    // })
    // .catch((err) => {
    //     console.log('promise finished with an error');
    // });















    //     const product = {
    //         name: 'car oil',
    //         price: 9.99
    //     };

    //     Find()
    //         .then((res) => {
    //             console.log('successfully inserted a document'); ***************************************************************find
    //             console.log(res);
    //         })
    //         .catch((err) => {

    //         });
    // })
    // .catch((err) => {
    //     console.log('promise finished with an error');
    // });
















    //     const product = {
    //         name: 'car oil',
    //         price: 9.99
    //     };

    //     Insert(product)
    //         .then((res) => {
    //             console.log('successfully inserted a document'); *********************************************************************insert
    //         })
    //         .catch((err) => {

    //         });
    // })
    // .catch((err) => {
    //     console.log('promise finished with an error');
    // });



















// MongoClient.connect(mongoDbUrl, settings, function(err, client) {
//     if(err) {
//         console.log('ERROR: ' + err);
//     }
//     else {
//         database = client.db(databaseName);
//         const productCollection = database.collection('products'); ********************************************* before we wrapped everything in a promise

//         productCollection.find().toArray(function(err, docs) {
//             if(err) {
//                 console.log('ERROR: ' + err);
//             }
//             else {
//                 docs.forEach((d) => {
//                     console.log(d);
//                 });
//             }
//         });
        
//         console.log('SUCCESSFULLY CONNECTED TO DATABASE!');
//     }
// });