import React, { useContext, useState } from "react";
import Filters from "./Filters";
import Gallery from "./Gallery";
import Styles from "./style.module.css";
import { ProductsContext } from "../../contexts/ProductContext";

const Listings = () => {
  const { query, sortType, items, setSortType } = useContext(ProductsContext);

  const [sortVisible, setSortVisible] = useState(false);
  return (
    <div>
      {items.length ? (
        <div>
          <p>
            Home / Clothing / <b>{query}</b>
          </p>

          <div className={Styles.borderBottom}>
            <p>
              <b className={`${Styles.filterHeading} mb-2`}>FILTERS</b>
            </p>
            <div className={Styles.dropdown}>
              <form
                onMouseEnter={() => setSortVisible(true)}
                onClick={() => setSortVisible(false)}
              >
                <p className={Styles.sortBy}>
                  <span>
                    <p>
                      Sort by : <b>{sortType}</b>
                    </p>
                    {sortVisible && (
                      <span>
                        <p
                          className={Styles.dropdownOption}
                          onClick={() => {
                            setSortType("Price High to Low");
                            setSortVisible(false);
                            items.sort((a, b) => {
                              return Number(b.price) - Number(a.price);
                            });
                          }}
                        >
                          <span>
                            Sort by : <b>Price High to Low</b>
                          </span>
                        </p>
                        <p
                          className={Styles.dropdownOption}
                          onClick={() => {
                            setSortType("Price Low to High");
                            setSortVisible(false);
                            items.sort((a, b) => {
                              return Number(a.price) - Number(b.price);
                            });
                          }}
                        >
                          <span>
                            Sort by : <b>Price Low to High</b>
                          </span>
                        </p>
                      </span>
                    )}
                  </span>
                  <img
                    src="https://img.icons8.com/ios/50/000000/expand-arrow--v2.png"
                    alt="downArrow"
                    width="15px"
                    className={Styles.carat}
                  />
                </p>
              </form>
            </div>
          </div>
          <div className={Styles.mainGrid}>
            <Filters />
            <Gallery />
          </div>
        </div>
      ) : (
        "Type something in search box to start searching"
      )}
    </div>
  );
};

export default Listings;
