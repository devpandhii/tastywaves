const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderdata', async (req, res) => {
    try {
        const { order_data, order_date, email } = req.body;

        const ordersWithDate = order_data.map(item => ({ ...item, order_date }));

        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            await Order.create({ email, order_data: ordersWithDate });
        } else {
            existingOrder.order_data.push(...ordersWithDate);
            await existingOrder.save();
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error processing order:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

router.post('/myorderdata', async (req, res) => {
    try {
        let myData = await Order.findOne({ email: req.body.email});
        res.json({orderData: myData.order_data}); // Adjusted here to return myData.order_data
    } catch(error){
        console.error("Error processing MyOrder:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = router;
