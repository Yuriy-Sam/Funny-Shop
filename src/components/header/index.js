import { selectCurrency } from "../goods/goodsSlice";
import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import { IcoLike, IcoCart, IcoShop } from "../../resources/icons/iconsSVG";
import { SelectCurrencyPrice } from "../goods/goodsListItem";
import useTimeout from "../../hooks/useTimeout";

import Select from 'react-select';
import "./header.scss";



const Header = () => {
    
    const dispatch = useDispatch();
    const {totalPriceHeader, totalPrice, goodsCurrency, cartCounter, favoriteCounter, userName} = useSelector(state => state.goods);
    // const [showTotal, setShowTotal] = useState(false);
    let showTotal = false
    // useEffect(() => {
    //     
    // }, [totalPriceHeader])
    // const onshowTotal = () => {
    //     setShowTotal(true);
    // useTimeout(() => setShowTotal(true), 1000)
        
    // }

    // useEffect(() => {
    //     showTotal = true
    //     const timeout = setTimeout(() => {
    //         showTotal = false
    //     }, 1000);
    //     return () => clearTimeout(timeout);
    // }, [totalPriceHeader]);


    const options = [
        { value: 'USD', label: 'USD' },
        { value: 'EUR', label: 'EUR' },
        { value: 'UAH', label: 'UAH' },
    ];
    const selectedCurrency = () => {
        switch(goodsCurrency) {
            case "USD":
                return options[0]
            case "EUR":
                return options[1]
            case "UAH":
                return options[2]
            default:
                return options[0]
        }
    }

      



    return(
        <header className="header">
            <div className="header__wrapper">
                <Link to="/" className="header__logo">Funny Shop</Link>
                <div className="header__list">
                    <Link to="/shop" className="header__list__item header__icons">
                        <IcoShop className="shop" />
                    </Link>
                    {/* <Link to="/about" className="header__list__item">About</Link>
                    <Link to="/contact" className="header__list__item">Contact</Link>
 */}
                </div>
                <div className="header__end">
                    <Select
                        className="react-select-container"
                        classNamePrefix="react-select"
                        defaultValue={selectedCurrency}
                        isSearchable={false}
                        onChange={data => dispatch(selectCurrency(data.value))}
                        options={options}
                    />
                    <Link to="/favorite" className="header__icons">
                        <IcoLike className="like" />
                        {
                            favoriteCounter > 0 ? <span className="header__icons__counter">{favoriteCounter}</span> : null
                        }
                        
                    </Link>
                    <Link to="/cart" className="header__icons">
                        <IcoCart className="cart"/>
                        {
                            cartCounter > 0 ? <span className="header__icons__counter">{cartCounter}</span> : null
                        }
                        {/* {
                            showTotal ? (
                                <div className="header__cart__total">
                                    <div className="header__cart__total__title">Total price</div>
                                    <div className="header__cart__total__value">{SelectCurrencyPrice(totalPrice, 1)}</div>
                                </div>
                            ) : null
                        } */}


                    </Link>
                    <div className="header__profile">Welcome, {userName.length > 0 ? userName : "User"}!</div>
                </div>

            </div>

           

        </header>
    )
}

export default Header;