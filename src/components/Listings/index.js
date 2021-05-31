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
        <div>
          <h1>Not myntra</h1>
          <p>
            Following is my attempt at myntra challenge by goComet. Challenge
            consisted of creating a product portal where user can search for
            items, filter the results, sort the results and store them in a
            virtual bag. Other portions of challenge included implenting
            responsive architecture to support cross device support.
          </p>
          <h2>Instructrions</h2>
          <p>
            Type in the search box to anything you desire, the search results
            are generated using fakerit api, no query would matter. The filters
            and sorting mechanisms however would work completely fine. Filtering
            and sorting of elements are calculated based on randomly fetched
            data using a hastable to store frequent keywords, price ranges and
            categories are however constants. Sorting is achieved by
            Array.sort() over the JSON array.
          </p>
          <h2>Tech Stack</h2>
          <ul>
            <li>React</li>
            <li>Pure CSS</li>
            <li>React Gallery image slider</li>
            <li>Fakerit api</li>
          </ul>
          <h2>Things I could've been better at</h2>
          <ul>
            <li>
              I overestimated my momentum, submitting this 7 hours post deadline
            </li>
            <li>
              Would've been better if fonts, logos and other assets were
              implemented
            </li>
            <li>Mobile interface design could be much more neat</li>
          </ul>
          <h2>Time taken ~22 hours</h2>
          <p>
            I worked in three different phases to complete the challenge. They
            are:{" "}
          </p>
          <ul>
            <li>Saturday, 29 May, 6pm - 12pm</li>
            <li>Sunday, 30 May, 12:30pm - 10pm</li>
            <li>Monday, 31 May, 12am - 6:27am</li>
          </ul>
          Signed <br />
          <br />
          <b>Samarth Sharma</b>
          <br />
          6:27am, 5/31/2021
        </div>
      )}
    </div>
  );
};

export default Listings;
