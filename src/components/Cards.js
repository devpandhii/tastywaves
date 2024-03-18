import React from 'react';

const Cards = (props) => {

  let options = props.options;
  let priceOptions = Object.keys(options);

  return (
    <div>
      <div className="card mt-3" style={{ width: "20rem", maxHeight: "500px" }}>
        <img
          src={props.imgsrc}
          alt="Chilli Paneer"
          className="card-img-top"
          style={{ height: "120px", objectFit: "fill"}}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <p className="card-text">{props.foodDiscription}</p>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <select className="m-2 h-100 bg-success rounded">
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded">
                {priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })}
              </select>
            </div>
            <div className="d-inline h-100 fs-5">Total Price:</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
