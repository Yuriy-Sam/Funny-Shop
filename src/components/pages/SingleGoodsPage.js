import Header from "../header"
import ErrorBoundary from "../errorBoundery/ErrorBoundery"
import GoodsSingle from "../goods/goodsSingle"
import '../favorite/favorite.scss'

const SingleGoodsPage = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <ErrorBoundary>
                    <GoodsSingle/>
                </ErrorBoundary>
                

            </div>

        
        </>
    )

}

export default SingleGoodsPage;