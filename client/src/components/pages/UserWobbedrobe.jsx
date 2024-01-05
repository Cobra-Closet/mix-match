import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WobbedrobeItemCard from '../WobbedrobeItemCard';
import { element } from 'prop-types';


// useSelector obtains the user object from state which contains the user's information + their wardrobe as we see on the console log when we sign in
export default function UserWobbeDrobe() {
  const user = useSelector((state) => state.status.user);
  console.log(user.wardrobe);
  const page = useSelector((state) => state.status.page);
  // tracks which category of items the user wants to view. state will change with what the user selects
  const [selection, setSelection] = useState('all');
  if (page === 'VIEW_WOBBEDROBE')
    return (
      <div className='wobbedrobe'>
        <div className='itemType-buttons'>
          <button onClick={() => setSelection('top')}>Tops</button>
          <button onClick={() => setSelection('bottom')}>Bottoms</button>
          <button onClick={() => setSelection('overall')}>Overalls</button>
          <button onClick={() => setSelection('shoes')}>Shoes</button>
          <button onClick={() => setSelection('all')}>All</button>
        </div>
        {/* if selection is not all, this component will filter through the wardrobe array to show only the items in that category */}
        {selection !== 'all' && (
          <div className='card-container'>
            {[...user.wardrobe[selection]]
              .sort((a, b) => {
                return a[`${selection}_id`] - b[`${selection}_id`];
              })
              .map((item) => (
                <WobbedrobeItemCard
                  itemType={selection}
                  item={item}
                  key={`${selection}_${item[`${selection}_id`]}`}
                />
              ))}
          </div>
        )}
        {/* if selection is all, it will render all items in wardrobe */}
        {selection === 'all' && (
          <div className='card-container'>
            {[
              ...Object.keys(user.wardrobe).map((key) =>
                user.wardrobe[key].map((item) => (
                  <WobbedrobeItemCard itemType={key} item={item} />
                ))
              ),
            ]}
          </div>
        )}
      </div>
    );
}
