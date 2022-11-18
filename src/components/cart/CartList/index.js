
import CartListItem from "../CartListItem";
import { useSelector, useDispatch } from "react-redux";
import {fetchCartItems, updateCartItemInData, removeCartItemInData, addCartCounter, removeCartCounter, cartItemDeleted } from "../../goods/goodsSlice";
import { cartsListData } from "../../../data";

import { useEffect } from "react";


const CartList = () => {
    const {cartItems } = useSelector(state => state.goods);
    const dispatch = useDispatch();

    
    useEffect(() => {
        
        dispatch(fetchCartItems());

    }, []);

    function renderCartItems (arr){

        
        if (arr.length === 0) {
            return (
                <>
                    <h5 className="text-center mt-5">Select goods. Cart empty.</h5>
                </>
            )
        }
        return arr.map(({id, ...props}) => {
            const newCartItem = cartItems.filter(item => item.id === id)
            // const {id, ...props} = item;
            // console.log('renderCartItems');
            return (
                <div  key={id} className="cartListItem">

                    <CartListItem  
                        cartItemDeleted={() => dispatch(removeCartItemInData(id))}
                        addCartCounter={() => dispatch(updateCartItemInData({payload: {...newCartItem[0], counter: newCartItem[0].counter + 1 }, operation: "add"}))} 
                        removeCartCounter={() => dispatch(updateCartItemInData({payload: {...newCartItem[0], counter: newCartItem[0].counter - 1 }, operation: "remove"}))} 
                        key={id}  
                        
                        {...props}/>
                </div>
                

            )
        })
    }
    const elements = renderCartItems(cartItems);
    
    
    return (
        <div className="cartList">
            <div key={"what"} className="cartList__wrapper">
                {elements}

            </div>
        </div>
    )
}

export default CartList;