
import { Link } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { useState, useEffect, useMemo } from "react";
import {IcoLike, IcoAddLike, IcoAddCart, IcoCart } from "../../../resources/icons/iconsSVG";
import {changeShowImg} from '../goodsSlice';
import cartbox from '../../../resources/img/cardboard.jpg'

import "./goodsListItem.scss"

export const SelectCurrencyPrice = (price, counter) => {
    const {goodsCurrency, USDEUR, USDUAH} = useSelector(state => state.goods);

    switch(goodsCurrency) {
        case "USD":
            return price * counter + "$"
        case "EUR":
            return Math.floor(price * USDEUR) * counter + "€"
        case "UAH":
            return  Math.floor(price * USDUAH) * counter + "грн"
        default:
            return
        
    }
};
const GoodsListItem = ({showImg, name, descr, images, img, price, sale, addToCart, changeFavoriteIcon, changeAddIcon, favoriteItemCreated, getGoodsId, favoriteStatus, cartStatus}) => {

    const [added, setAdded] = useState(changeAddIcon);
    // switch (element) {
    //     case 'fire':
    //         elementClassName = 'bg-danger bg-gradient';
    //         break;
    //     case 'water':
    //         elementClassName = 'bg-primary bg-gradient';
    //         break;
    //     case 'wind':
    //         elementClassName = 'bg-success bg-gradient';
    //         break;
    //     case 'earth':
    //         elementClassName = 'bg-secondary bg-gradient';
    //         break;
    //     default:
    //         elementClassName = 'bg-warning bg-gradient';
    // }


    const dispatch = useDispatch();

    const subImageBlock = () => {
        let imgArray = {...images.filter(item => item.id === showImg)}[0]
        return (
            <div className={"goodsListItem__img__block " + imgArray.classes}>
                <img src={imgArray.imageUrl} 
                    className="goodsListItem__img main_img"
                    alt={name}/>
                <div className="goodsListItem__img__list">
                    {images.map(item => (
                        <button key={item.id} onClick={() => dispatch(changeShowImg({goodsId: getGoodsId, imageId: item.id}))} className={item.id === showImg ? "goodsListItem__img__list__item _active" : 'goodsListItem__img__list__item'}>
                            <img src={item.imageUrl} 
                            className="goodsListItem__img" 
                            alt={name}/>
                        </button>
                    ))}

                </div>
            </div>
        )
    }
    const SalePrice = () => {
        let defaultPrice = SelectCurrencyPrice(price, 1);
        
        if(sale > 0){
            return (
                <>
                    <p className="goodsListItem__price_old">{defaultPrice}</p>
                    <span>-</span>
                    <p className="goodsListItem__price_new">{SelectCurrencyPrice(Math.floor(price - (price * (sale / 100))), 1)}</p>
                </>

            )
        } 
        return <p className="goodsListItem__price_new">{defaultPrice}</p>
    }
    console.log('GoodsListItem');
    // const addedFun = () => {
    //     setAdded(null);
    //     setAdded(changeAddIcon);
    //     return added;
    // }
    // const sooome = useEffect(() => changeAddIcon, [])
    // https://static7.depositphotos.com/1056394/786/v/450/depositphotos_7867981-stock-illustration-vector-cardboard-box.jpg
    return (
        <li className="goodsListItem">
            
            {subImageBlock()}

            <div className="goodsListItem__body">
                <div className="goodsListItem__content">
                    <Link to={`/good/${getGoodsId}`} className="goodsListItem__name">{name}</Link>
                    <p className="goodsListItem__text">{descr}</p>
                </div>

                <div className="goodsListItem__price">
                    <SalePrice/>
                </div>
            </div>

                

            
            <div className="goodsListItem__overflow">
                {
                    changeFavoriteIcon ? (
                        <button disabled={favoriteStatus} style={{background: "var(--positive)"}} onClick={favoriteItemCreated} type="button" className="goodsListItem__overflow__btn addLike" aria-label="Close">
                            <IcoLike color="var(--negative)" className="addLike"/>
                        </button>
                    ) : (
                        <button disabled={favoriteStatus} onClick={favoriteItemCreated} type="button" className="goodsListItem__overflow__btn addLike" aria-label="Close">
                            <IcoAddLike className="addLike"/>
                        </button>
                    )
                }

                {/* <button onClick={addToCart} type="button" className="goodsListItem__overflow__btn addCart" aria-label="Close"> */}
                    { changeAddIcon === 0 ? 
                        (
                            <button disabled={cartStatus} style={{background: "none"}} onClick={addToCart} type="button" className="goodsListItem__overflow__btn addCart" aria-label="Close">
                                <IcoAddCart className="addCart"/>
                            </button>
                        ) : (
                        
                            <button disabled={cartStatus} style={{background: "var(--positive)"}} onClick={addToCart} type="button" className="goodsListItem__overflow__btn addCart" aria-label="Close">
                                <IcoCart className="addCart"/>
                                <span className="addCart__counter">{changeAddIcon}</span> 

                            </button>
                        
                        ) 
                    }
                {/* </button> */}
            </div>
            
            {
                sale > 0 ?
                    (
                        <div className="goodsListItem__extra">
                            <div className="goodsListItem__sale">
                                <div className="goodsListItem__sale__value">{sale}%</div>
                                <div className="goodsListItem__sale__title">sale</div>
                            </div>
                        </div>
                    ) : null
                
            }

            
        </li>
    )
}

export default GoodsListItem;