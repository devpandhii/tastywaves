const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    await data.splice({ Order_date: req.body.order_date });

    let eId = await Order.findOne({ email: req.body.email });
    console.log(eId);

    if(eId === null){
        try {
            await Order.create({
                email: req.body.email,
                order_data: data,
            }).then((order) => {
                res.json({ success: True });
            });
        } catch (error) {
            console.log(error);
            res.send("Server Error", error.message);
        }
    }
    else{
        try {
            await Order.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } }, { new: true, useFindAndModify: false }).then(() => {
                res.status(200).json({ success: true });
            })  
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
})

module.exports = router;