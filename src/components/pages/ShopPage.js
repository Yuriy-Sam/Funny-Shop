import Header from "../header";
import GoodsList from "../goods/goodsList";
import ShopFilters from "../filters/ShopFilters";
import SortPanel from "../filters/SortPanel";
import ErrorBoundary from "../errorBoundery/ErrorBoundery";


const ShopPage = () => {
    return (
        <>
            <Header/>
            <div style={{display: "flex"}} className="shop__wrapper">
                <ErrorBoundary>
                    <ShopFilters/>
                </ErrorBoundary>
                <div style={{width: "100%" }} className="">
                    <ErrorBoundary>
                        <SortPanel/>    
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <GoodsList/>    
                    </ErrorBoundary>
                </div>

                
                

            </div>
        
        </>
    )
}
export default ShopPage;