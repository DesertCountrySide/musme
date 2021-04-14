const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys"); 
const ordersURL = `https://app.ecwid.com/api/v3/${keys.storeId}/orders?token=${keys.ecwidApiSecret}`;
const productsURL = `https://app.ecwid.com/api/v3/${keys.storeId}/products?token=${keys.ecwidApiSecret}`;
const categoryURL = `https://app.ecwid.com/api/v3/${keys.storeId}/categories?token=${keys.ecwidApiSecret}&productIds=true&parent=60789679`;
const subscriptionCategoryId = 60789679;
const monthlysubscriptionProductId = 244216912;
const annualsubscriptionProductId = 244222503;

// @route GET api/ecwid/orders
// @desc Register user
// @access Public
router.post("/orders", (req, res) => {
    //Authorization Check starts
    var token = "";
    var bearerToken = req.headers.authorization;
    if(bearerToken){
        token = bearerToken.split(" ")[1]
    }
    jwt.verify(token, keys.secretOrKey, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Unauthorized Access' });
    });
    //Authorization Check Ends
    const email = req.body.email
    try{
        fetch(ordersURL).then(response => {
            response.json().then(response1 => {
                var orders = response1
                var authObj = {};
                for(var x in orders.items){
                    if(orders.items[x].email == email){
                        authObj = orders.items[x];
                    }
                }
                if(authObj != undefined && authObj.paymentStatus == "PAID" && authObj.items[0].categoryId == subscriptionCategoryId) {
                    const currDate = new Date();
                    const diffDays = Math.ceil(Math.abs(currDate - authObj.createDate) / (1000 * 60 * 60 * 24));
                    if((authObj.items[0].productId == annualsubscriptionProductId && diffDays > 365) || (authObj.items[0].productId == monthlysubscriptionProductId && diffDays > 30)){
                        res.json({"isSubscribed": false, "expired": true})
                    } else {
                        res.json({"isSubscribed": true, "expired": false})
                    }
                } else {
                    res.json({"isSubscribed": false, "expired": "N/A"})
                }
            })
        });
    } catch (err) {
        console.log(err)
    }
});

// @route GET api/ecwid/products
// @desc Login user and return JWT token
// @access Public
router.get("/products", (req, res) => {
    //Authorization Check starts
    var token = "";
    var bearerToken = req.headers.authorization;
    if(bearerToken){
        token = bearerToken.split(" ")[1]
    }
    jwt.verify(token, keys.secretOrKey, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Unauthorized Access' });
    });
    //Authorization Check Ends
    try{
        fetch(categoryURL).then(response => {
            response.json().then(response1 => {
                var category = response1
                var productIds = [];
                for(var x in category.items){
                    productIds = productIds.concat(category.items[x].productIds)
                }
                var productList = [...new Set(productIds)].join()
                fetch(productsURL+"&productId="+productList).then(response2 =>
                    response2.json().then(response3 => {
                        res.json(response3.items)
                    })
                )
            })
        });
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;

                