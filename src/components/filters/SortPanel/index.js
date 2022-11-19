
import { useSelector, useDispatch } from "react-redux";
import { onSortFilteredGoods } from "../../goods/goodsSlice";

const SortPanel = () =>{
    const {filteredGoodsCounter} = useSelector(state => state.goods)
    const dispatch = useDispatch();
    return(
        <div className="container">
            <div className="sortPanel__block">
                <div className="sortPanel__wrapper">
                    <div className="sortPanel__counter">
                        <strong>{filteredGoodsCounter}</strong>  product found
                    </div>
                    <div className="sortPanel__end">
                        <div className="sortPanel__sort">
                            <div className="sortPanel__sort__title">Sort by:</div>
                            <select className="sortPanel__sort__select" onChange={(e) => dispatch(onSortFilteredGoods(e.target.value))} >
                                <option value="nameAZ">Name A-Z</option>
                                <option value="nameZA">Name Z-A</option>
                                <option value="lowPrice">Lowest to  Highest</option>
                                <option value="highPrice">Highest to Lowest</option>

                            </select>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default SortPanel;