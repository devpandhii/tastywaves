import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrders() {
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        fetchMyOrder();
    }, []);

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        console.log(userEmail);
        try {
            const response = await fetch("http://localhost:5000/api/myorderdata", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail
                })
            });
            if (response.ok) {
                const data = await response.json();
                setOrderData(data.orderData); // Modify this line to access data.orderData
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.length > 0 ?
                        orderData.map((item, index) => (
                            <div key={index}>
                                <div className='m-auto mt-5'>
                                    {item.order_date}
                                    <hr />
                                </div>
                                <div className='col-12 col-md-6 col-lg-3' key={index}>
                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                        <img src={item.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                <span className='m-1'>{item.qty}</span>
                                                <span className='m-1'>{item.size}</span>
                                                <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                    ₹{item.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) :
                        <div>No orders found</div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}
