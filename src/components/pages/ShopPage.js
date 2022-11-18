import Header from "../header";
import GoodsList from "../goods/goodsList";
import ShopFilters from "../filters/ShopFilters";
import ErrorBoundary from "../errorBoundery/ErrorBoundery";


const ShopPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: "flex"}} className="shop__wrapper">
                <ErrorBoundary>
                    <ShopFilters/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <GoodsList/>    
                </ErrorBoundary>
                
                

            </div>
        
        </>
    )
}
export default ShopPage;