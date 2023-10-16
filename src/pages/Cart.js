import "./Cart.css";
import logo from "../assets/images/logo-img.png";
import github_logo from "../assets/images/github-icon.png";
import search_logo from "../assets/images/search-icon.png";
import item from "../assets/images/order-check-item-img.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

function Cart() {
  // const [item, setItem] = useState("");
  const [cartItemLists, setCartItemLists] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // const query = window.location.search;
    // const param = new URLSearchParams(query); 
    // setItem(param.get("search-item"));

    const userIdInput = JSON.parse(sessionStorage.getItem("userData"))[0].userid;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3001/cart?userid=${userIdInput}`);
    xhr.setRequestHeader("content-type", "application-json");
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const items = JSON.parse(xhr.response);

        setCartItemLists(items);
      }
    };
  }, []);

  // console.log("cartItemLists.find : ", cartItemLists);

  const calculateTotalPrice = () => {
    let result = cartItemLists.reduce((acc, cur, index) => {
      return acc + cur.price;
    }, 0);

    return result;
  }

  return (
    <div class="cart">
      <div class="wrapper">
        {/* <Header /> */}
        <div class="main">
          <div class="container-2">
            <div class="title">
              <div class="title-msg">장바구니</div>
            </div>
            <div class="row">
              <div class="cart-col">
                <ul>
                {cartItemLists.map((cartItem, index) => {
                  console.log(cartItem);
                  // setTotalPrice(prev => prev + cartItem.price);
                  
                  return (
                    <li key={index} id={index} class="cart-item">
                      <input type="checkbox" class="check-box" />
                      <img class="cart-item-img" src={cartItem.img} />
                      <div class="cart-item-info">
                        <div class="cart-item-name">{cartItem.name}</div>
                        <div class="text-wrapper-2">수량 : {cartItem.quantity}</div>
                        <div class="text-wrapper-2">{cartItem.price}원</div>
                      </div>
                    </li>
                  );
                })}
                </ul>
                <div class="cart-item-totalprice">
                  <div class="order-check-item">합계 금액 : {calculateTotalPrice()}원</div>
                </div>
              </div>
              <div class="cart-button">
                <div class="button-delete">
                  <div class="text-wrapper-3">삭제하기</div>
                </div>
                <div class="button-buy">
                  <div class="text-wrapper-3">구매하기</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Cart;
