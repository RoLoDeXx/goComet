import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Listings from "./Listings";
import Details from "./Details";
import Header from "./common/Header";
import axios from "axios";
import history from "../history";
import { ProductsContext } from "../contexts/ProductContext";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("Default");
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [filterObj, setFilterObj] = useState({
    cat: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    tags: [],
  });
  const getImages = async (minprice = 0, maxprice = 50000) => {
    let res = await axios.get(`https://fakerapi.it/api/v1/products`, {
      params: {
        _quantity: 20,
        _price_min: minprice,
        _price_max: maxprice,
      },
    });
    setItems(res.data.data);
    setQuery(searchTerm);
  };

  return (
    <div>
      <Router history={history}>
        <ProductsContext.Provider
          value={{
            searchTerm,
            sortType,
            items,
            query,
            filterObj,
            setSearchTerm,
            getImages,
            setFilterObj,
            setSortType,
          }}
        >
          <Header />
          <div className="container mt-4">
            <Route exact path="/">
              <Listings />
            </Route>
            <Route path="/details">
              <Details />
            </Route>
          </div>
        </ProductsContext.Provider>
      </Router>
    </div>
  );
};

export default App;
