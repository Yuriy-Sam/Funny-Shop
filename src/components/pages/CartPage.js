import CartList from "../cart/CartList"
import CartTotal from "../cart/CartTotal"
import Header from "../header"
import ErrorBoundary from "../errorBoundery/ErrorBoundery"

import '../cart/cart.scss'

const CartPage = () => {
    return (
        <>
                                   
            <Header/>
            <div className="container">
                <h2 className="title__cartPage">Cart LIst</h2>

                <div className="cartPage__wrapper">
                    <ErrorBoundary>
                        <CartList/>
                    </ErrorBoundary>
                   
                    <ErrorBoundary>
                        <CartTotal/> 
                    </ErrorBoundary>
                    

                </div>
            </div>

        
        </>
    )

}

export default CartPage;