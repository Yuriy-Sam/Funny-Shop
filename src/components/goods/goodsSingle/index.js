
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSingleGoods,  } from "../goodsSlice";
import { useSelector, useDispatch } from "react-redux";
import './goodsSingle.scss'

const GoodsSingle = () => {
    const dispatch = useDispatch();
    let {goodId} = useParams();
    const {goodsSingle} = useSelector(state => state.goods)
    useEffect(() => {
        console.log('useEffect');
        dispatch(getSingleGoods(goodId));
    }, [goodId])
    const {name, descr, img, price, sale,} = goodsSingle;
    return (
        <>
            <div className="conteiner">
                <div className="singleGoods__block">
                    <div className="singleGoods__wrapper">
                        <div className="singleGoods__img">
                            <img src={img} alt={name} />

                        </div>
                        <div className="singleGoods__content">
                            <h1 className="singleGoods__title">{name}</h1>
                            <div className="singleGoods__descr">{descr}</div>
                            <div className="singleGoods__price">{price}</div>
                            <div className="singleGoods__sale">{sale}</div>
                        </div>
                    </div>
                </div>
                
            </div>
            


        </>

    )
}

export default GoodsSingle;