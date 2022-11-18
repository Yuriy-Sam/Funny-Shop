
import { SelectCurrencyPrice } from "../../goods/goodsListItem";
import { IcoAddCart } from "../../../resources/icons/iconsSVG";

const FavoriteListItem = ({name, descr, img, price, sale, removeFavoriteItemToData, addToCart, counter}) => {



    const SalePrice = () => {
        let defaultPrice = SelectCurrencyPrice(price, 1);

        if(sale > 0){
            return( 
                <div className="favoriteListItem__end">
                    <div className="favoriteListItem__end__title">Price</div>
                    <div className="favoriteListItem__price_old">{defaultPrice}</div>
                    <div className="favoriteListItem__price">{SelectCurrencyPrice(Math.floor(price - (price * (sale / 100))), 1)}</div>

                </div>
            )
        } else {
            return (
                <div className="favoriteListItem__end">
                    <div className="favoriteListItem__end__title">Price</div>

                    <div className="favoriteListItem__price">{defaultPrice}</div>

                </div>
                
            )
        }
        
       
    }

    // const stopRemoveChar = () => {
    //     if(counter === 0){
    //         return "disabled"
        
    //     } else {
    //         return null

    //     }
    // }

    return (
        <>  
            <div className="favoriteListItem__img">
                <img src={img} alt={name} />

            </div>
            <div className="favoriteListItem__body">
                <div className="favoriteListItem__content">
                    <h2 className="favoriteListItem__title">{name}</h2>
                    <p className="favoriteListItem__text">{descr}</p>
                </div>
                <SalePrice/>

                <div className="favoriteListItem__nav">
                    <button style={{background: "var(--negative)"}} onClick={removeFavoriteItemToData} className="favoriteListItem__btn">X</button>
                    <button style={{background: "var(--positive)"}} onClick={addToCart} className="favoriteListItem__btn"><IcoAddCart className="favoriteListItem__addCart" /></button>

                </div>

            

            </div>


        </>
    )
}

export default FavoriteListItem;