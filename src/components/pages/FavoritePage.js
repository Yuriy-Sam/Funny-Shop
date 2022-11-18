
import Header from "../header"
import ErrorBoundary from "../errorBoundery/ErrorBoundery"

import FavoriteList from "../favorite/FavoriteList"

import '../favorite/favorite.scss'

const CartPage = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <h1 className="title__cartPage">Favorite goods</h1>
                <ErrorBoundary>
                    <FavoriteList/>
                </ErrorBoundary>
                

            </div>

        
        </>
    )

}

export default CartPage;