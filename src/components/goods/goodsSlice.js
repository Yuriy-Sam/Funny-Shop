import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { goodsData, cartsListData, favoriteData, getCartsListData } from "../../data";
import { SelectCurrencyPrice } from "./goodsListItem";



const initialState = {

    userName: "",
    urlJson: "https://funny-shop-api.onrender.com",
    // urlJson: "http://localhost:3004",

    goods: [],
    goodsLoadingStatus: 'idle',
    goodsCurrency: 'USD',
    goodsSingle: {},

    categoryListItems: [],

    currency: 1,
    currencies: 'EUR,UAH',
    source: 'USD',
    USDEUR: 1.015675,
    USDUAH: 36.757991,
    


    cartItems: cartsListData,

    // cartItems: [],
    cartCounter: 0,
    newCartItem: [],
    totalPrice: 0,

    favoriteItems: [],
    favoriteCounter: 0,
    favorite: false,

    filteredGoods: [],
    filterMinPrice: 0,
    filterMaxPrice: 1000,
    filterMaxInputPrice: 0,
    filterPriceLabels: [0, 250, 500, 750, 1000],
    filterSearchText: '',
    filterSearchItems: [],

}



// export const fetchCurrencyApi = createAsyncThunk(
//     'currency/fetchCurrencyApi',
//     async () => {
//         const {request} = useHttp();
//         return await request(`https://api.apilayer.com/exchangerates_data/latest?symbols=${initialState.currencies}&base=${initialState.source}&currencies=&apikey=Gwvoh7ovUvSp1BR3CamXzBG6GUzdmrnz`);
//     }
// );

// export const fetchCurrencyApi = createAsyncThunk(
//     'currency/fetchCurrencyApi',
//     async () => {
//         const {request} = useHttp();
//         return await request(`https://api.apilayer.com/currency_data/live?source=${initialState.source}&currencies=${initialState.currencies}&apikey=Gwvoh7ovUvSp1BR3CamXzBG6GUzdmrnz`);
//     }
// );

export const fetchGoods = createAsyncThunk(
    'goods/fetchGoods',
    async () => {
        const {request} = useHttp();
        return await request( `${initialState.urlJson}/goods`);

    }
);

export const fetchCategories = createAsyncThunk(
    'goods/fetchCategories',
    async () => {
        const {request} = useHttp();
        return await request(`${initialState.urlJson}/categories`);

    }
);
export const fetchCartItems = createAsyncThunk(
    'goods/fetchCartItems',
    async () => {
        const {request} = useHttp();
        return await request(`${initialState.urlJson}/cartItems`);

    }
);
export const fetchFavoriteItems = createAsyncThunk(
    'goods/fetchFavoriteItems',
    async () => {
        const {request} = useHttp();
        return await request(`${initialState.urlJson}/favoriteItems`);

    }
);

export const addFavoriteItemToData = createAsyncThunk(
    'goods/addFavoriteItemToData',
    async (state) => {
        const {request} = useHttp();
        return await request(`${initialState.urlJson}/favoriteItems`, "POST", JSON.stringify(state), {'Content-Type': 'application/json'} )

    }
);

export const removeFavoriteItemToData = createAsyncThunk(
    'goods/removeFavoriteItemToData',
    async (state) => {
        const {request} = useHttp();
        return await request(`${initialState.urlJson}/favoriteItems/${state}`, "DELETE" )

    }
);

export const addCartItemToData = createAsyncThunk(
    'goods/addCartItemToData',
    async (state) => {
        const {request} = useHttp();
        return await request(`${initialState.urlJson}/cartItems`, "POST", JSON.stringify(state), {'Content-Type': 'application/json'} )

    }
);

export const updateCartItemInData = createAsyncThunk(
    'goods/updateCartItemInData',
    async (state) => {
        const {request} = useHttp();
        console.log(state, "updateCartItemInData");
        return await request(`${initialState.urlJson}/cartItems/${state.payload.id}`, "PUT", JSON.stringify(state.payload), {'Content-Type': 'application/json'} )

    }
);
export const removeCartItemInData = createAsyncThunk(
    'goods/removeCartItemInData',
    async (state) => {
        const {request} = useHttp();
        console.log(state, 'state removeCart');
        return await request(`${initialState.urlJson}/cartItems/${state}`, "DELETE" )

    }
);


const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        changeName: (state, action) => {
            state.userName = action.payload;
        },
        selectCurrency: (state, action) => {
            state.goodsCurrency = action.payload;
            console.log(state.goodsCurrency);
        },
        getSingleGoods: (state, action) => {
            state.goodsSingle = {...state.goods.filter(item => item.id === action.payload ? item : null)[0]}
            console.log(state.goodsSingle, 'goodsSingle');
        },
        onfilteredGoods: (state, action) => {
            state.filterMinPrice = action.payload.minPrice
            state.filterMaxPrice = action.payload.maxPrice
            state.filterSearchText = action.payload.searchText

            let categoriesItems = []
            categoriesItems = action.payload.categoriesItems
            console.log(categoriesItems, "categoriesItems");
            if(state.goods.length > 0){
                state.filteredGoods = state.goods.filter(item => {
                    let salePrice = item.sale > 0 ? Math.floor(item.price - (item.price * (item.sale / 100))) : item.price
                    function CurentyPrice (price) {

                    
                        switch(state.goodsCurrency) {
                            case "USD":
                                return price;
                            case "EUR":
                                return Math.floor(price * state.USDEUR);
                            case "UAH":
                                return Math.floor(price * state.USDUAH);
                            default:
                                return price
                        }
                    } 
                    let saleCurentyPrice = CurentyPrice(salePrice);
                    let categoriesHave = true
                    if(categoriesItems.length > 0){
                        categoriesHave = item.category.some(categories => categoriesItems.includes(categories))

                    } else {
                        categoriesHave = true
                    }

                    console.log(categoriesHave);
                    if(categoriesHave){
                        if(saleCurentyPrice > state.filterMinPrice && saleCurentyPrice <= state.filterMaxPrice){
                            if(state.filterSearchText === ''){
                                return item
        
                            } else {
                                return item.name.toLowerCase().includes(state.filterSearchText)
                            }
                            
                        } else {
                            return
                        }
                    } else {
                        return
                    }
                })
            }

            console.log(state.filteredGoods, 'filteredGoods');
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoods.pending, state => {state.goodsLoadingStatus = 'loading'})
            .addCase(fetchGoods.fulfilled, (state, action) => {
                state.goodsLoadingStatus = 'idle';
                state.goods = action.payload;
                state.filteredGoods = state.goods
                console.log(state.goods);
                state.filterMaxInputPrice = Math.max(...state.goods.map(item => item.price))
                console.log(state.filterMaxInputPrice, "state.filterMaxPrice");
            })
            .addCase(fetchGoods.rejected, state => {
                state.goodsLoadingStatus = 'error';
                console.log('errorr');
            })
            // .addCase(fetchCartItems.pending, state => {})
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload;
                state.totalPrice = 0
                state.cartCounter = 0
                state.cartItems.map(item => {
                    state.cartCounter += item.counter; 
                    
                    state.totalPrice +=  item.sale > 0 ? Math.floor(+item.price  - (+item.price  * (item.sale / 100))) * item.counter : +item.price * item.counter;
                    console.log(state.totalPrice, 'state.totalPrice fetchCartItems');
                })
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categoryListItems = action.payload;
                console.log(state.categoryListItems, "state.categoryListItems");
            })
            .addCase(fetchFavoriteItems.fulfilled, (state, action) => {
                state.favoriteItems = action.payload;
                state.favoriteCounter = state.favoriteItems.length
            })
            .addCase(addCartItemToData.fulfilled, (state, action) => {
                console.log(state, 'state, fulfilled');
                console.log(action.payload.id, 'action, fulfilled')
                state.cartItems = [...state.cartItems, action.payload];
                state.totalPrice +=  action.payload.sale > 0 ? Math.floor(+action.payload.price  - (+action.payload.price  * (action.payload.sale / 100))) : +action.payload.price;
                console.log(state.totalPrice, 'state.totalPrice addCartItemToData');

                state.cartCounter += 1; 
    
            })
            .addCase(updateCartItemInData.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.map(item => {
                    
                    if(item.id === action.payload.id) {
                        if(action.meta.arg.operation === "add"){
                            state.totalPrice +=  item.sale > 0 ? Math.floor(+item.price  - (+item.price  * (item.sale / 100))) : +item.price; 
                            state.cartCounter += 1; 
                            return {...item, counter: item.counter + 1}

                        } 
                        if(action.meta.arg.operation === "remove"){
                            state.totalPrice = state.totalPrice - (item.sale > 0 ? Math.floor(+item.price  - (+item.price  * (item.sale / 100))) : +item.price); 
                            state.cartCounter = state.cartCounter - 1; 
                            return {...item, counter: item.counter - 1}
                        }
                    } else {
                        return item
                    }

                })
    
                
                
                
                console.log("updateCartItemInData");
            })
            .addCase(addFavoriteItemToData.fulfilled, (state, action) => {
                state.favoriteItems = [...state.favoriteItems, action.payload]

                state.favoriteCounter = state.favoriteItems.length

    
            })
            .addCase(removeFavoriteItemToData.fulfilled, (state, action) => {
                state.favoriteItems = state.favoriteItems.filter(item => item.id !== action.meta.arg)

                state.favoriteCounter = state.favoriteItems.length

    
            })
            .addCase(removeCartItemInData.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter( item => {
                    if(item.id == action.meta.arg){
                        console.log(item, 'removeCartItem')
                        state.totalPrice = state.totalPrice - (item.sale > 0 ? Math.floor(+item.price  - (+item.price  * (item.sale / 100))) * item.counter : +item.price * item.counter)
                        console.log(state.totalPrice, 'state.totalPrice removeCartItemInData');
                        state.cartCounter =  state.cartCounter - item.counter
    
                    } else{
                        return item
                    }
                    
                });
    
            })



            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = goodsSlice;

export default reducer;
export const {
    changeName,
    selectCurrency,
    onfilteredGoods,
    getSingleGoods,

} = actions;