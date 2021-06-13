const express = require('express');
const ProductData = require('./src/model/ProductData');
const cors = require('cors');
const jwt = require('jsonwebtoken')
var bodyparser = require('body-parser');
var app = new express();
app.use(cors());
app.use(bodyparser.json());
app.get('/products',function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    ProductData.find()
        .then(function(products){
            res.send(products);
        });
});

app.post('/insert', verifyToken, function(req,res){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log(req.body);
    var product = {
        productId : req.body.product.productId,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageURL : req.body.product.imageURL
    }
    var item = new ProductData(product);
    item.save();
});

username='admin';
password='1234';

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token=req.headers.authorization.split('')[1]
    if(token=='null'){
        return res.status(401).send("Unauthorized access");
    }
    let payload=jwt.verify(token,'secretKey')
    console.log(payload)
    if(!payload){
        return res.status(401).send('Unauthorized access');
    }
    res.userId=payload.subject;
    next();
}

app.post('/login',function(req,res){
    // res.header('Access-Control-Allow-Origin','*');
    // res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log(req.body);
    let user = req.body;
    // console.log(user);
    if(username!=user.email){
        res.status(401).send('Invalid Username');
    }
    else{
        if(user.password!=password){
            res.status(401).send('Invalid Password');
        }
        else{
            let payload={subject:username+password}
            let token=jwt.sign(payload,'secretKey')
            res.status(200).send({token})
        }
    }
})

app.listen(3000, function(){
    console.log('Listening at port 3000');
});