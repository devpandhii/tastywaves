import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cards from "../components/Cards";
// import Carousel from "../components/Carousel";

const Home = () => {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/displaydata", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      console.log(response.food_items, response.food_category);
      setFoodItem(response.food_items); // assuming these are arrays of items
      setFoodCat(response.food_category);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <Navbar />
      <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{objectFit:"contain !important"}}
        >

          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{zIndex:"10"}}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{
                    setSearch(e.target.value)
                  }}
                />
                
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">
                  Search
                </button> */}
              </div>
              </div>
                <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100" alt="..." style={{filter: "brightness(30%)"}}/>
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?momos" className="d-block w-100" alt="..." style={{filter: "brightness(30%)"}}/>
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100" alt="..." style={{filter: "brightness(30%)"}}/>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      <div className="container">
        {foodCat.map((data) => (
          <div key={data._id} className="row mb-3">
            <div className="fs-3 m-3">
              {data.CategoryName}
              <hr />
              <div className="row">
                {foodItem.filter(item => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search)))
                .map(filterItem => (
                  <div key={filterItem._id} className="col-12 col-md-6 col-lg-3">
                    <Cards 
                      foodName={filterItem.name} // Access name property of each item
                      options={filterItem.options[0]} // Access options property of each item
                      imgsrc={filterItem.img} // Access img property of each item
                      foodDiscription = {filterItem.d}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
