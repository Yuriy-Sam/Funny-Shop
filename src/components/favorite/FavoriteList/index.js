

import { useEffect } from "react";
import FavoriteListItem from "../FavoriteListItem";
import { useSelector, useDispatch } from "react-redux";
import {addCartItemToData, updateCartItemInData, removeFavoriteItemToData, fetchFavoriteItems, favoriteItemCreated, cartItemCreated,  addCartCounter, removeCartCounter, cartItemDeleted } from "../../goods/goodsSlice";



const FavoriteList = () => {
    const {favoriteItems, goods, cartItems } = useSelector(state => state.goods);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFavoriteItems())
    }, [])

    const addToCart = (id) => {
        let newCartItem =[ {...goods.filter(item => item.id === id)[0], counter: 1}]
        // dispatch(cartItemCreated(id));
        if(cartItems.filter(item => item.id === id).length === 0){
            dispatch(addCartItemToData(newCartItem[0]))
        } else {
            dispatch(updateCartItemInData({payload: {...newCartItem[0], counter: cartItems.filter(item => item.id === id)[0].counter + 1 }, operation: "add"}))
        }


    }
    function renderFavoriteItems (arr){
        if (arr.length === 0) {
            return (
                <>
                    <h5 className="text-center mt-5">Like goods. Favorite list is empty.</h5>
                </>
            )
        }
        return arr.map(({id, ...props}) => {
            // const {id, ...props} = item;
            // console.log('renderCartItems');
            return (
                <div  key={id} className="favoriteListItem">

                    <FavoriteListItem  
                        key={id}
                        removeFavoriteItemToData={() => dispatch(removeFavoriteItemToData(id))} 
                        addToCart={() => addToCart(id)} 
                        {...props}/>
                </div>
                

            )
        })
    }
    const elements = renderFavoriteItems(favoriteItems);
    
    
    return (
        <div className="favoriteList">
            <div key={"what"} className="favoriteList__wrapper">
                {elements}

            </div>
        </div>
    )
}

export default FavoriteList