import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../contexts/ProductContext";
import Styles from "./style.module.css";

const Filters = () => {
  const [tags, setTags] = useState([]);

  const { items, filterObj, setFilterObj, getImages } =
    useContext(ProductsContext);
  useEffect(() => {
    let stash = {};
    for (let { tags } of items) {
      for (let i of tags) {
        if (stash[i] === undefined) stash[i] = 1;
        else stash[i] += 1;
      }
    }

    setTags([...Object.keys(stash).filter((tag) => stash[tag] > 2)]);
    setFilterObj({
      ...filterObj,
      tags: [...Object.keys(stash).filter((tag) => stash[tag] > 2)],
    });
  }, [items]);

  let categories = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div>
      <div className={Styles.filterHeaders}>
        <b>Categories</b>
        <form
          onChange={() => {
            let ele = Array.from(document.querySelectorAll(".catBox"))
              .filter((idx) => idx.checked)
              .map((item) => parseInt(item.value));
            if (ele.length === 0)
              setFilterObj({ ...filterObj, cat: [1, 2, 3, 4, 5, 6, 7, 8, 9] });
            else setFilterObj({ ...filterObj, cat: ele });
          }}
        >
          <div className="mt-1">
            {categories.map((cat) => (
              <div>
                <input
                  type="checkbox"
                  className="catBox"
                  value={cat}
                  key={cat}
                />
                <span className={Styles.checkboxLabel}>{cat}</span>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className={Styles.filterHeaders}>
        <b>Tags</b>
        <form
          onChange={async () => {
            let ele = Array.from(document.querySelectorAll(".tagBox"))
              .filter((idx) => idx.checked)
              .map((item) => item.value);
            console.log(ele);
            if (ele.length !== 0) setFilterObj({ ...filterObj, tags: ele });
            else setFilterObj({ ...filterObj, tags: tags });
          }}
        >
          <div className="mt-1">
            {tags.map((tag) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    className="tagBox"
                    value={tag}
                    key={tag}
                    name="tags"
                  />
                  <span className={Styles.checkboxLabel}>{tag}</span>
                </div>
              );
            })}
          </div>
        </form>
        {/* LABEL HERE GENERATE USING HASTABLE */}
      </div>
      <div className={Styles.filterHeaders}>
        <b>Price</b>
        <form
          onChange={() => {
            let ele = Array.from(document.querySelectorAll(".priceBox"))
              .filter((idx) => idx.checked)
              .map((item) => item.value);
            ele = ele[0].split("-");
            getImages(parseInt(ele[0]), parseInt(ele[1]));
          }}
        >
          <div>
            <input
              type="radio"
              className="priceBox"
              name="priceBox"
              value="10001-50000"
            />
            <label className={Styles.checkboxLabel}>10000 + </label>
          </div>
          <div>
            <input
              type="radio"
              className="priceBox"
              name="priceBox"
              value="5001-10000"
            />
            <label className={Styles.checkboxLabel}>5001-10000</label>
          </div>
          <div>
            <input
              type="radio"
              className="priceBox"
              name="priceBox"
              value="1001-5000"
            />
            <label className={Styles.checkboxLabel}>1001-5000</label>
          </div>
          <div>
            <input
              type="radio"
              className="priceBox"
              name="priceBox"
              value="0-1000"
            />
            <label className={Styles.checkboxLabel}>0-1000</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filters;
