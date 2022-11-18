
import useLocalStorage from 'use-local-storage'
import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";
import { lazy, Suspense } from 'react';

import MainPage from '../mainPage/MainPage';
import ShopPage from '../pages/ShopPage';
import CartPage from '../pages/CartPage';
import FavoritePage from '../pages/FavoritePage'
import SingleGoodsPage from '../pages/SingleGoodsPage';
import DesignMainPage from '../mainPage/DesignMainPage';

import './app.scss';
const Page404 = lazy(() => import('../pages/404'));





function App() {
	const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
	const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'blue' : 'blue');

	const switchTheme = (themeName) => {
		setTheme(themeName);
	}

	return (
		

		<div className="App" data-theme={theme}>
			{/* <a href="#" style={{transition: "all 1s" ,zIndex: 10, borderRadius: "50%" ,position: "fixed", bottom: 10, right: 20, width: 100, height: 100, background: "red" }} >Go top</a> */}

			<BrowserRouter>
				<Routes>
					<Route path="/" element={
						<MainPage switchTheme={switchTheme} />
					} />
					<Route path="shop" element={
						<ShopPage/>
					}/>
					<Route path="cart" element={<CartPage/>}/>
					<Route path="favorite" element={<FavoritePage/>}/>
					<Route path="good/:goodId" element={<SingleGoodsPage/>}/>
					<Route path="design" element={<DesignMainPage/>}/>
					<Route path="*" element={<Page404 />}/>
				</Routes>

			</BrowserRouter>
		</div>

	);
}

export default App;
