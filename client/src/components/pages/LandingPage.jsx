// page 4
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goToPage } from '../../utils/reducers/statusSlice';
import Navbar from '../Navbar';
import '../../styles/LandingPage.scss'
import cobrasnake from '../../images/cobra_snake_landing.svg';
import photo1 from '../../images/mukukoh-landingpage.jpg';
import photo2 from '../../images/thom-landingpage.jpg';
import photo3 from '../../images/serafima-landingpage.jpg'

export default function LandingPage() {
  const user = useSelector((state) => state.status.user);
  const page = useSelector((state) => state.status.page);
  const dispatch = useDispatch();

    return (
      <div className="landingpage">
        <div className="landingpage-logo">
          <img src={ cobrasnake } className="cobrasnake-logo" alt="Cobra-Snake-Logo" />
        </div>
        <div className="landingpage-photos">
          <img src={ photo1 } className="photo1" alt="Wobbedrobe Photo" />
          <img src={ photo2 } className="photo2" alt="Wobbedrobe Photo" />
          <img src={ photo3 } className="photo3" alt="Wobbedrobe Photo" />
        </div>
        <div className="landingpage-signin">
            <button onClick={() => dispatch(goToPage('LOGIN'))}>Sign In</button>
        </div>
      </div>
  );
};