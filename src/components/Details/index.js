import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../contexts/ProductContext";
import axios from "axios";
import Styles from "./style.module.css";
import { useHistory } from "react-router-dom";

const Details = () => {
  let history = useHistory();
  const [product, setProduct] = useState([]);
  const [size, setSize] = useState(0);

  const { searchTerm } = useContext(ProductsContext);
  useEffect(() => {
    const getProduct = async () => {
      let res = await axios.get(`https://fakerapi.it/api/v1/products`, {
        params: {
          _quantity: 1,
        },
      });
      setProduct(res.data.data);
    };
    getProduct();
  }, []);

  const pickSize = (e) => {
    setSize(e.target.value);
    let ele = document.querySelectorAll("#sizeBtn");
    for (let i = 0; i < ele.length; i++) {
      ele[i].style.color = "#000";
      ele[i].style.border = "1px solid #cacaca";
    }

    e.target.style.color = "#ff3e6c";
    e.target.style.border = "1px solid #ff3e6c";
    setSize(e.target.value);
  };

  const addtoBag = () => {
    if (size === 0) document.querySelector("#sizeErr").style.display = "block";
    else {
      let cartItems = JSON.parse(localStorage.getItem("myCart"));
      localStorage.setItem(
        "myCart",
        JSON.stringify([...cartItems, { name: product[0].name, size }])
      );
      history.push("/");
    }
  };

  return (
    product.length && (
      <div>
        <p>
          Home / Clothing /{" "}
          <b>{`${searchTerm} > ${product[0].description.slice(0, 5)}`}</b>
        </p>

        <div className={Styles.productGrid}>
          <div className={Styles.imageGrid}>
            {product[0].images.map((item) => {
              return (
                <div>
                  <img
                    className={Styles.productImage}
                    src={item.url}
                    alt={item.title}
                    key={item.url}
                    onClick={() =>
                      (document.getElementById("myModal").style.display =
                        "block")
                    }
                  />
                </div>
              );
            })}
          </div>
          <div>
            <h1 className={Styles.productName}>
              {product[0].description.slice(0, 5)}
            </h1>
            <span>{product[0].description.slice(5, 30)}</span>
            <h2>₹{product[0].price}</h2>
            <span>Inclusive of all taxes</span>
            <div className={Styles.sizeGroup}>
              SELECT SIZE
              <span>{"Size Chart >"}</span>
            </div>
            <div className={Styles.sizes}>
              <button value="38" onClick={(e) => pickSize(e)} id="sizeBtn">
                38
              </button>
              <button value="39" onClick={(e) => pickSize(e)} id="sizeBtn">
                39
              </button>
              <button value="40" onClick={(e) => pickSize(e)} id="sizeBtn">
                40
              </button>
              <button value="42" onClick={(e) => pickSize(e)} id="sizeBtn">
                42
              </button>
              <button value="44" onClick={(e) => pickSize(e)} id="sizeBtn">
                44
              </button>
            </div>
            <div className={Styles.cartOptions}>
              <button className={Styles.addToBag} onClick={() => addtoBag()}>
                <span id="jumpToCart">
                  <img
                    src="https://img.icons8.com/small/16/000000/shopping-bag.png"
                    alt="bag"
                    width="20px"
                  />
                  ADD TO BAG
                </span>
              </button>
              <button className={Styles.wishlist}>
                <span>
                  <img
                    src="https://img.icons8.com/small/16/000000/like.png"
                    alt="bag"
                    width="20px"
                  />
                  WISHLIST
                </span>
              </button>
            </div>
            <p className={Styles.sizeWarning} id="sizeErr">
              You must select a size first!
            </p>
          </div>
        </div>
        <div id="myModal" className={Styles.modal}>
          <span
            className={Styles.close}
            onClick={() =>
              (document.getElementById("myModal").style.display = "none")
            }
          >
            &times;
          </span>
          <img
            className={Styles.modalContent}
            src={product[0].images[0].url}
            alt="modal image"
          />
        </div>
      </div>
    )
  );
};

export default Details;
