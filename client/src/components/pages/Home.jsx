//Page 1 of Euny's Mockup
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goToPage } from '../../utils/reducers/statusSlice';
import '../../styles/Home.scss'


export default function Home() {
  const user = useSelector((state) => state.status.user);
  const shuffledOutfitImages = user.outfit
    .map((outfit) => outfit.image_url)
    .sort(() => 0.5 - Math.random());
  console.log('this is shuffleOutfitImages', shuffledOutfitImages);
  const dispatch = useDispatch();
  return (

    <div className='home-page'>
      <div className="home-container">
        <div className="home-welcome">
          <h1>Welcome back to your Wobbedrobe, {user.username}!</h1>
        </div>
      </div>
      {shuffledOutfitImages.length >= 3 && (
        <p>Here are some of your fabulous outfits.</p>
      )}
      {shuffledOutfitImages.length >= 3 && (
        <div className='landingpage'>
          <div className='landingpage-photos'>
            <img
              src={shuffledOutfitImages[0]}
              className='photo1'
              alt='Wobbedrobe Photo'
            />
            <img
              src={shuffledOutfitImages[1]}
              className='photo2'
              alt='Wobbedrobe Photo'
            />
            <img
              src={shuffledOutfitImages[2]}
              className='photo3'
              alt='Wobbedrobe Photo'
            />
          </div>
        </div>
      )}
      {shuffledOutfitImages.length < 3 && (
        <div className='new-user'>
          <p>
            We're excited to help you organize and style your wardrobe. It seems
            you haven't created at least 3 outfits yet. Let's get your fashion
            journey started!
          </p>
          <button onClick={() => dispatch(goToPage('ADD_TO_WOBBEDROBE'))}>
            Add clothes to your wobbedrobe!
          </button>
          <button onClick={() => dispatch(goToPage('ADD_TO_OOTD'))}>
            Upload an image of your outfits using with clothes in your
            wobbedrobe!
          </button>
          <button onClick={() => dispatch(goToPage('GET_INSPIRED'))}>
            Get inspired by a randomly generated outfit with an Ai image
          </button>
        </div>
      )}
    </div>
  );
}