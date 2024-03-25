import React from 'react';
import { useCart, useDispatch } from "../components/ContextReducer.js";
// import trash from "../assets/trash.svg";
import { FaTrash } from 'react-icons/fa';
// import { header } from 'express-validator';



export default function Cart() {
    let data = useCart();
    let dispatch = useDispatch();
    if (data.length === 0) {
        return (
            <div style={{ color: "white", display: "flex", justifyContent: "center" }}>
                <h1>Your Cart is Empty</h1>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        console.log(userEmail);
        console.log(JSON.stringify({
            order_data: data,
            order_date: new Date().toDateString(),
            email: userEmail,
        }));

        let response = await fetch(
            "http://localhost:5000/api/orderdata", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order_data: data,
                order_date: new Date().toDateString(),
                email: userEmail,
            })
        });

        console.log("i'm here", response);
        console.log(data);
        if (response.status === 200) {
            dispatch({ type: "DROP" });
            alert("Your Order has been placed");
        }

    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div style={{ marginBottom: "20px" }}>
            <div className='container m-auto mt-5 table-responsive table-responsive-m table-responsive-md'>
                <table className='table'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody style={{ color: "white" }}>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn p-0"
                                        style={{ color: 'white' }}
                                        onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2' style={{ color: "white" }}>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>
        </div>
    );

}