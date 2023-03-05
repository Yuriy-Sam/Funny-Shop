import { useState } from "react";
import { useSelector } from "react-redux";

import { SelectCurrencyPrice } from "../../goods/goodsListItem";

const CartListItem = ({
  name,
  descr,
  images,
  price,
  sale,
  counter,
  removeCartCounter,
  addCartCounter,
  cartItemDeleted,
  cartStatus,
}) => {
  const SalePrice = () => {
    let defaultPrice = SelectCurrencyPrice(price, counter);

    if (sale > 0) {
      return (
        <div className="cartListItem__end">
          <div className="cartListItem__end__title">Total price</div>

          <div className="cartListItem__price">
            {SelectCurrencyPrice(
              Math.floor(price - price * (sale / 100)),
              counter
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="cartListItem__end">
          <div className="cartListItem__end__title">Total price</div>

          <div className="cartListItem__price">{defaultPrice}</div>
        </div>
      );
    }
  };

  // const stopRemoveChar = () => {
  //     if(counter === 0){
  //         return "disabled"

  //     } else {
  //         return null

  //     }
  // }
  // const [disabledClass, setDisabledClass] = useState('')

  // const onDisabled = (value) => {
  //     removeCartCounter

  //     if(value){
  //         setDisabledClass(" _disabled")
  //     } else{
  //         setDisabledClass("")

  //     }
  // }

  return (
    <>
      {" "}
      <div className="cartListItem__img">
        <img
          src={
            process.env.REACT_APP_SERVER_URL + "/images/" + images[0].imageUrl
          }
          alt={name}
        />
      </div>
      <div className="cartListItem__body">
        <div className="cartListItem__content">
          <h2 className="cartListItem__title">{name}</h2>
          <p className="cartListItem__text">{descr}</p>
        </div>

        <div className="cartListItem__nav">
          <button
            onClick={removeCartCounter}
            className="cartListItem__plus"
            disabled={cartStatus || counter === 0 ? true : false}
          >
            <span>-</span>
          </button>
          <div className="cartListItem__counter">{counter}</div>
          {/* <input type="number" defaultValue={counter} onChange={(e) => counter = e.target.value } onCha /> */}
          <button
            disabled={cartStatus}
            onClick={addCartCounter}
            className="cartListItem__plus"
          >
            <span>+</span>
          </button>
        </div>
        <SalePrice />
      </div>
      <button
        disabled={cartStatus}
        onClick={cartItemDeleted}
        className="cartListItem__close"
      >
        X
      </button>
    </>
  );
};

export default CartListItem;
