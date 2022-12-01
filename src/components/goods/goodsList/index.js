
import {useHttp} from '../../../hooks/http.hook';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
// import { createSelector } from '@reduxjs/toolkit';
import Spinner from '../../spinner/Spinner';

import {changeShowImg, showTotalPriceHeader, removeFavoriteItemToData, fetchFavoriteItems, addFavoriteItemToData, addCartItemToData, updateCartItemInData, fetchCartItems, fetchGoods} from '../goodsSlice';
import GoodsListItem from "../goodsListItem";

// import Spinner from '../spinner/Spinner';

import '../goodsListItem/goodsListItem.scss';

const GoodsList = () => {
    
    // const filteredHeroesSelector = createSelector(
    //     (state) => state.filters.activeFilter,
    //     (state) => state.heroes.heroes,
    //     (filter, heroes) => {
    //         if (filter === 'all') {
    //             return heroes;
    //         } else {
    //             return heroes.filter(item => item.element === filter);
    //         }
    //     }
    // );

    const {filterSearchItems, cartLoadingStatus, favoriteLoadingStatus,   filteredGoods, goods, cartItems, favoriteItems, newCartItem, goodsLoadingStatus } = useSelector(state => state.goods);

    const dispatch = useDispatch();
    const {request} = useHttp();

    const selectPrice = '';
    const [cartStatus, setCartStatus] = useState(false);
    const [favoriteStatus, setFavoriteStatus] = useState(false)


    useEffect(() => {
        setCartStatus(cartLoadingStatus === "loading")
        setFavoriteStatus(favoriteLoadingStatus === "loading")
    }, [cartLoadingStatus, favoriteLoadingStatus]);
    useEffect(() => {
        
        dispatch(fetchGoods());
        dispatch(fetchCartItems());
        dispatch(fetchFavoriteItems());

        // dispatch(fetchCurrencyApi(request));
        // dispatch(fetchCurrencyApi());
        // dispatch(addCartItem(cartItems));
        // eslint-disable-next-line
    }, []);

    // const onDelete = useCallback((id) => {
    //     request(`http://localhost:3001/heroes/${id}`, "DELETE")
    //         .then(data => console.log(data, 'Deleted'))
    //         .then(dispatch(heroDeleted(id)))
    //         .catch(err => console.log(err));
    //     // eslint-disable-next-line  
    // }, [request]);

    if (goodsLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (goodsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Error loading</h5>
    }

    const addToCart = (id) => {
        let newCartItem =[ {...goods.filter(item => item.id === id)[0], counter: 1}]
        // dispatch(cartItemCreated(id));
        if(cartItems.filter(item => item.id === id).length === 0){
            dispatch(addCartItemToData(newCartItem[0]))
        } else {
            dispatch(updateCartItemInData({payload: {...newCartItem[0], counter: cartItems.filter(item => item.id === id)[0].counter + 1 }, operation: "add"}))
        }
        // dispatch(showTotalPriceHeader(true));
        // setTimeout(() => {
        //     console.log("after 2s");
        // }, 2000)

    }
    const favoriteItemCreated = (id) => {
        let newFavoriteItem = [{...goods.filter(item => item.id === id)[0], favorite: true}]
        if(favoriteItems.filter(item => item.id === id).length === 0 ){
            
            dispatch(addFavoriteItemToData(newFavoriteItem[0]))

        } else {
            dispatch(removeFavoriteItemToData(id))
        }
    }
    
    function changeFavoriteIcon(id) {

        let someCounter = false
        favoriteItems.filter(item => item.id === id ? someCounter = item.favorite : null)
        return someCounter
    }

    function changeAddIcon(id) {

        let someCounter = 0
        cartItems.filter(item => item.id === id ? someCounter = item.counter : null)
        return someCounter
    }
    function getGoodsId (id) {
        return id
    }
    const renderGoodsList = (arr) => {
        console.log('renderGoodsList');
        console.log(arr, 'arrrrr');

        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">No itemsd</h5>
                </CSSTransition>
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <GoodsListItem 
                        key={id} 
                        favoriteItemCreated={() => favoriteItemCreated(id)} 
                        changeAddIcon={changeAddIcon(id)}
                        changeFavoriteIcon={changeFavoriteIcon(id)} 
                        addToCart={() => addToCart(id)}
                        getGoodsId={getGoodsId(id)}
                        favoriteStatus={favoriteStatus}
                        cartStatus={cartStatus}
                        {...props}/>

                </CSSTransition>
            )
        })
    }

    const elements = renderGoodsList(filteredGoods);
    console.log('GoodsList');

    return (
        
        <TransitionGroup component="ul">
            <div className="container">
                <div className="goodsListItem__wrapper">
                    {elements}

                </div>
                {/* <div className="goodsListItem__pages">
                    <button className="goodsListItem__pages__item">1</button>   
                    <button className="goodsListItem__pages__item">2</button>   
                    <button className="goodsListItem__pages__item">3</button>   
                    <button className="goodsListItem__pages__item">4</button>   

                </div> */}
            </div>

        </TransitionGroup>
    )
}

export default GoodsList;