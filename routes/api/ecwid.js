const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys"); 
const { json } = require("body-parser");
const batchURL = `https://app.ecwid.com/api/v3/${keys.storeId}/batch?token=${keys.ecwidApiSecret}`;
const ordersURL = `https://app.ecwid.com/api/v3/${keys.storeId}/orders?token=${keys.ecwidApiSecret}`;//&offset=100
const productsURL = `https://app.ecwid.com/api/v3/${keys.storeId}/products?token=${keys.ecwidApiSecret}&enabled=true`;
const categoryURL = `https://app.ecwid.com/api/v3/${keys.storeId}/categories?token=${keys.ecwidApiSecret}&productIds=true&parent=60789679`;
const subscriptionCategoryId = 60789679;
const monthlysubscriptionProductId = 244216912;
const annualsubscriptionProductId = 244222503;
let counter = 3;
let j = 1



// @route GET api/ecwid/orders
// @desc Register user
// @access Public
// /orders
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
    
    // var token = "";
    // var bearerToken = req.headers.authorization;
    // if(bearerToken){
    //     token = bearerToken.split(" ")[1]
    // }
    // jwt.verify(token, keys.secretOrKey, (err, decoded) => {
    //     if (err) return res.status(500).send({ auth: false, message: 'Unauthorized Access' });
    // }); 
    //Authorization Check Ends
    try{
        //for(let x = 0; x < counter; x++) {ß
            

            fetch(categoryURL).then(response => {
                response.json().then(response1 => {

                    var category = response1
                    var productIds = [];
                    for(var x in category.items){
                        productIds = productIds.concat(category.items[x].productIds)
                    }
                    //console.log("fetching")
                    //every product get puts in productIDs 
                    //productIds = [...new Set(productIds)]
                    productIdsSet = [...new Set(productIds)]
                    //first 100 products get seperated
                    var count = Math.ceil(productIdsSet.length / 100)
                    //console.log(productIdsSet.length)
                    //
                    let mainArray = []
                    let first = 0
                    let second = 99
                    //var mainArray = new Array()
                    
                    productIds1 = productIdsSet.slice(first,second)

                    
                     //productIds2 = productIdsSet.slice(300,399)
                    //productIds3 = productIdsSet.slice(200,299)
                    //console.log(productIds2)

                    //productIds = productIds.slice(first, second)
                    
                    var productList = productIds1.join()

                    //console.log(productList)
                    //var productList2 = productIds2.join()
                    //var productList3 = productIds3.join()

                    var jsonArr = []
                    for(let i = 0; i<count;i++){
                        fetch(productsURL+"&productId="+productList).then(response2 =>
                            response2.json().then(response3 => {
                                //res.json(response3.items)
                                //mainArray.push(response3.items)     //object items get pushed to array
                                jsonArr.push(...(response3.items))
                                //console.log(jsonArr.length)
                                
                                //i== count - 1
                                if(j == count){
                                    //convert array to json 
                                    //var jsonArr = JSON.parse(JSON.stringify(mainArray))
                                    //var jsonArr = Object.assign({}, mainArray)
                                    //console.log(jsonArr.length)
                                    //var jsonArr = [...mainArray[0], ...mainArray[1], ...mainArray[2]]
                                    res.json(jsonArr)   //returns []
                                }
                                j+=1
                                
                            })
                            
                        )
                        productIdsSet = [...new Set(productIds)]
                        first += 100
                        second += 100
                        //console.log(productIds)
                        productIds1 = productIdsSet.slice(first,second) 
                        productList = productIds1.join()
                        
                        
                    }

                    //mainArray.push(response3.items);
                    // var productList2 = productIds.join()
                    // fetch(productsURL+"&productId="+productList2).then(response2 =>
                    //     response2.json().then(response3 => {
                    //         res.json(response3.items)
                    //     })
                    // )

                    // var productList3 = productIds.join()
                    // fetch(productsURL+"&productId="+productList3).then(response2 =>
                    //     response2.json().then(response3 => {
                    //         res.json(response3.items)
                    //     })
                    // )
                })
            });
        //} 
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;

                