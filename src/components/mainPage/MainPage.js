import React from 'react';
import { Link, } from "react-router-dom";
import { changeName } from '../goods/goodsSlice';
import { useDispatch } from 'react-redux';
import './mainPage.scss';

const MainPage = ({switchTheme}) => {
  const dispatch = useDispatch();
  return (
    <div className="mainPage">
      <h1 className='title_very_big'>Welcome to <span>Funny Shop</span></h1>
      <h2 className='title_small'>Here you can buy all what you want</h2>
      <div className="mainPage_form">
        <label>Your name?</label>

        <input type="text" placeholder='King' onChange={(e) => dispatch(changeName(e.target.value))} />

      </div>
      <p className="mainPage__theme__title">Please select theme:</p>
      <div className="mainPage__theme__group">
        {/* <button className="mainPage__theme__btn" style={{backgroundColor: 'white'}} onClick={() => switchTheme('light')} ></button>
        <button className="mainPage__theme__btn" style={{backgroundColor: 'black'}} onClick={() => switchTheme('dark')} ></button> */}
        <button className="mainPage__theme__btn" style={{backgroundColor: 'blue'}} onClick={() => switchTheme('blue')} ></button>
        <button className="mainPage__theme__btn" style={{backgroundColor: 'red'}} onClick={() => switchTheme('red')} ></button>
        <button className="mainPage__theme__btn" style={{backgroundColor: 'green'}} onClick={() => switchTheme('green')} ></button>


      </div>
      
      <Link to="shop" className="btn btn_mainPage"  style={{backgroundColor: 'var(--accent)'}}> Let's go</Link>

    </div>

  );
}

export default MainPage;
