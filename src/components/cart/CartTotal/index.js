import { useSelector } from "react-redux";
import { SelectCurrencyPrice } from "../../goods/goodsListItem";

const CartTotal = () => {

    const {cartItems, totalPrice } = useSelector(state => state.goods);
    const renderTotalPrice = SelectCurrencyPrice(totalPrice, 1);

    const renderTotalList = (arr) => {
        return arr.map(item => {
            return <div key={item.id} className="cartTotal__list__item">{item.counter} X {item.name}</div>

        })
    }
    const elements = renderTotalList(cartItems)
    return(
        <div className="cartTotal">
            <div className="cartTotal__block">
                <div className="cartTotal__content">
                    <h2 className="cartTotal__title">Total list</h2>
                    <div className="cartTotal__list">
                        {elements}

                    </div>
                    <div className="cartTotal__end">
                        <div className="cartTotal__end__title">Total:</div>
                        <div className="cartTotal__end__price">{renderTotalPrice}</div>
                    </div>
                    <button className="cartTotal__btn_buy">Buy now</button>

                </div>
            </div>

        </div>
    )
}

export default CartTotal;