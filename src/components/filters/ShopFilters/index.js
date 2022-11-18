import MultiRangeSlider from "multi-range-slider-react";
import { useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import { onfilteredGoods, fetchCategories} from "../../goods/goodsSlice"; 
import { SelectCurrencyPrice } from "../../goods/goodsListItem";
import '../filters.scss'

// function HandleInput(e) {
//     const dispach = useDispatch();
//     useEffect(() => {
//         dispach(onfilteredGoods({minPrice: e.minValue, maxPrice: e.maxValue}))

//     }, [])
//     return
//     // set_minValue(e.minValue);
//     // set_maxValue(e.maxValue);
// }

const ShopFilters = () => {
    const {filterMinPrice, filterMaxInputPrice, categoryListItems, filterPriceLabels} = useSelector(state => state.goods);

    const dispatch = useDispatch();
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(filterMaxInputPrice)
    const [searchText, setSearchText] = useState('')
    const [categoriesItems, setCategoriesItems] = useState([])
    useEffect(() => {
        dispatch(onfilteredGoods({minPrice, maxPrice, searchText, categoriesItems}))
        console.log('ShopFilters');
        console.log(minPrice, 'minPrice');
        console.log(maxPrice, 'maxPrice');
        dispatch(fetchCategories());
        // eslint-disable-next-line
    }, []);

    // const sssom = () => {  setSomeArray([filterPriceLabels.map(item => {
    //     console.log('someArray')
    //     return SelectCurrencyPrice(item, 1) + ', '
    // })])}
    // const sadas = sssom();
    // useEffect(() => {
    // //     setSomeArray([])
    //     setMaxPrice(filterMaxInputPrice)
    // }, [filterMaxInputPrice]);
    // setSomeArray(filterPriceLabels.map(item => {
    //     SelectCurrencyPrice(item, 1)
    // }))
    const categoryChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setCategoriesItems(state =>  [...state, value]);
        } else {
            categoriesItems.length > 0 ? 
            setCategoriesItems(categoriesItems.filter((e) => e !== value)) : setCategoriesItems([]);
        }
        console.log(categoriesItems);
    }

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(onfilteredGoods({minPrice, maxPrice, searchText, categoriesItems}))
    }

    function getCategoryList (arr){
        return arr.map(item => {
            return (
                <li key={item.name} className="shopFilters__category__item">
                    <label htmlFor={item.name}>{item.value}</label> 
                    <label className="shopFilters__category__switch">
                        <input type="checkbox" id={item.name} name={item.name} value={item.name} onChange={(e) => categoryChange(e)}/>
                        <span className="shopFilters__category__slider"></span>
                    </label>
                </li>
            )
        })
    }
    const categoryItems = getCategoryList(categoryListItems)
    return (
        <form onSubmit={(e) => submitForm(e)} action="#" className="shopFilters__block">
            <h2 className="title_small _dark">Filters</h2>
            <div className="title_shopFilters">Search:</div>
            <input className="shopFilters__search__input " 
            type="text"
            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
            placeholder="Some text" />
            <div className=" title_shopFilters">Price: {minPrice + SelectCurrencyPrice(1, 1).replace(/[0-9]/g, '')} - {maxPrice + SelectCurrencyPrice(1, 1).replace(/[0-9]/g, '')}</div>
            <MultiRangeSlider 
                max={SelectCurrencyPrice(filterMaxInputPrice, 1).replace(/[^0-9,\s]/g,"")}
                minValue={filterMinPrice}
                maxValue={SelectCurrencyPrice(filterMaxInputPrice, 1).replace(/[^0-9,\s]/g,"")}
                labels={filterPriceLabels}
                style={{display: "block" ,border: 'none', boxShadow: 'none', padding: '15px 10px'}}
                label='false'
                ruler='false'
                name="rangeSlider"
                barLeftColor='white'
                barInnerColor='var(--positive)'
                barRightColor='white'
                thumbLeftColor='var(--negative)'
                thumbRightColor='var(--negative)'
                onChange={(e) => {
                    // setTimeout( () => {
                        setMinPrice(e.minValue);
                        setMaxPrice(e.maxValue);
                    // }, 200)
                    // clearTimeout();
                }}
            />
            <div className="title_shopFilters">Categories</div>
            <ul className="shopFilters__category__list">
                {categoryItems}
            </ul>
            <button type="submit" className="shopFilters__btn__submit" >confirm</button>
            {/* <button type="submit" className="shopFilters__confirm">confirm</button> */}
        </form>


        
    )
}


export default ShopFilters;