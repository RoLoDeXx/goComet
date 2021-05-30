import React, { useContext, useState } from "react";
import Styles from "./style.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { ProductsContext } from "../../contexts/ProductContext";
import { useHistory } from "react-router-dom";

const Card = ({ product }) => {
  const { filterObj } = useContext(ProductsContext);
  const [hover, setHover] = useState(false);
  const [viewSimilar, setViewSimilar] = useState(false);
  let history = useHistory();

  const viewDetails = () => {
    history.push("/details");
  };

  const renderImages = product.images.map((item) => {
    return (
      <div
        onClick={() => {
          viewDetails();
        }}
      >
        <img className={Styles.productImage} src={item.url} alt={item.title} />
      </div>
    );
  });
  return (
    filterObj.cat.some((r) => product.categories.includes(r)) &&
    filterObj.tags.some((r) => product.tags.includes(r)) && (
      <div
        className={Styles.card}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Carousel
          showIndicators={hover}
          autoPlay={hover}
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          infiniteLoop={true}
          interval={750}
          stopOnHover={false}
        >
          {renderImages}
        </Carousel>

        {hover && (
          <div className={Styles.hoverCard}>
            <button
              onMouseEnter={() => setViewSimilar(true)}
              onMouseLeave={() => setViewSimilar(false)}
            >
              <img
                src="https://img.icons8.com/offices/16/000000/red-yellow-cards.png"
                alt="content"
              />
              {viewSimilar && <span>View more</span>}
            </button>
            <div>
              <span>
                <img
                  src="https://img.icons8.com/small/16/000000/like.png"
                  alt="heart"
                />
                &nbsp;<b>WISHLIST</b>
              </span>
            </div>
          </div>
        )}
        <div
          className={Styles.cardBody}
          onClick={() => {
            viewDetails();
          }}
        >
          <b>{product.name.slice(0, 10)}</b>
          <p>{product.description.slice(0, 20)}</p>
          <p>
            <b>₹{product.price}</b>
          </p>
        </div>
      </div>
    )
  );
};

export default Card;
