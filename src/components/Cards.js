import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useCart, useDispatch } from './ContextReducer';

const Cards = (props) => {
  
  let data = useCart();
  // let navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();
  let options = props.options;
  const priceOptions = Object.keys(options);
  let foodItem = props.foodItem; // Corrected the prop name here
  const dispatch = useDispatch();

  // const handleAddtoCart = async () => {
    
  //   let finalPrice = qty * parseInt(options[size]);

  //   console.log(data);
    

  //   let food = data.find(item => item.id === foodItem._id);
  //   console.log(food);

  //   if (food) {
  //     if (food.size === size) {
  //       await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
  //       console.log(food.size);
  //       console.log(size);
  //       return;
  //     } else {
  //       await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
  //       return;
  //     }
  //   } else {
  //     await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size });
  //     return;
  //   }
  // };

  const handleAddtoCart = async () => {
    console.log("qty: ", qty)
    let food=1;
    let userEmail = localStorage.getItem("userEmail");
    console.log(userEmail);
    
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        item.qty=qty;
        item.price=qty*options[size];
        break;
      }
    }
    
    console.log(new Date())
    console.log(data)
    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }
    

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })
    console.log(food)

    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);


  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div className="card mt-3" style={{ width: "19rem", maxHeight: "360px" }}>
        <img
          src={foodItem.img} // Corrected the access to img property
          alt="..."
          className="card-img-top"
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{foodItem.name}</h5>
          <div className="container w-100">
            <div>
              <select className="h-25 btn-success text-default rounded fs-5" onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-50 btn-success text-default rounded fs-5" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
            </div>
            <div className="d-inline fs-5">Total Price ₹{qty * parseInt(options[size])}/-</div>
          </div>
          <hr></hr>
          <button className="ms-2 btn btn-success justify-center" onClick={handleAddtoCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
