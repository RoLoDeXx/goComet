import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../contexts/ProductContext";
import Styles from "./style.module.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const onOpenModal = () => {
    let cart = JSON.parse(localStorage.getItem("myCart"));
    setCartItems(cart);
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);

  const { searchTerm, setSearchTerm, getImages } = useContext(ProductsContext);

  return (
    <header className="container-fluid">
      <Modal open={open} onClose={onCloseModal} center>
        <h2>My Cart</h2>
        <hr />
        <div className={Styles.cartBody}>
          {cartItems.length ? (
            <table>
              <tr>
                <th>Name</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
              {cartItems.map((item) => {
                return (
                  <tr>
                    <td>{item.name}</td>
                    <td width="80px">{item.size}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          let ele = cartItems.filter(
                            (pro) => pro.name !== item.name
                          );
                          setCartItems(ele);
                          localStorage.setItem("myCart", JSON.stringify(ele));
                        }}
                        className={Styles.removeItem}
                      >
                        Remove Item
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          ) : (
            <p>oh no, it appears that your cart is empty!</p>
          )}
        </div>
      </Modal>

      <div className={Styles.headerDiv}>
        <img
          className={Styles.logo}
          src={`https://assets.myntassets.com/assets/images/retaillabs/2021/1/27/819f16d8-f335-4ed2-a681-e7feb7f6e3d91611739436334-2fda2506-f500-42a0-959f-edecbc74a9f81544508066218-myntra_logo.png`}
          alt="logo"
        />
        <nav className={Styles.navLinks}>
          <Link to="/">Men</Link>
          <Link to="/">Women</Link>
          <Link to="/">Kds</Link>
          <Link to="/">{`home & living`}</Link>
          <Link to="/">Beauty</Link>
        </nav>
      </div>
      <div className={Styles.profileActions}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getImages();
          }}
        >
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            className={Styles.searchBox}
            value={searchTerm}
            type="text"
            placeholder="Search for products, brands and more"
          />
        </form>
        <div>
          <img
            src="https://img.icons8.com/ios/16/000000/user--v1.png"
            alt="user"
          />
          <p>Profile</p>
        </div>
        <div>
          <img
            src="https://img.icons8.com/small/16/000000/like.png"
            alt="heart"
          />
          <p>Wishlist</p>
        </div>
        <div onClick={() => onOpenModal()}>
          <img
            src="https://img.icons8.com/small/16/000000/shopping-bag.png"
            alt="bag"
          />
          <p>Bag</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
