import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/app/store.js';

import AddOOTD from '../src/components/pages/AddOOTD';
import UserWobbeDrobe from '../src/components/pages/UserWobbedrobe';
import Lookbook from '../src/components/pages/Lookbook';
import LogInSignUpBox from '../src/components/pages/LogInSignUpBox';
import LandingPage from '../src/components/pages/LandingPage';
import Home from '../src/components/pages/Home';
import GetInspired from '../src/components/pages/GetInspired';
import AddToWobbeDrobe from '../src/components/pages/AddToWobbedrobe';
import WobbedrobeItemCard from '../src/components/WobbedrobeItemCard';
import Navbar from '../src/components/Navbar';
import App from '../src/App.js';


describe('React-Redux integration tests', () => {

    describe('Empty state before interactions', () => {
  
      beforeEach(async () => {
        const app = await render(
            <Provider store={store}>
              <App />
            </Provider>);
      });
  
      // TODO: Test the following:
      // 1. The page loads with two buttons ('Add Market' and 'Sync')
      // 2. The page has a 'MegaMarket Loyalty Cards' heading and a 'Markets' heading
      // 3. The totals display starts off at zero, with no Markets rendered
  
    //   test('The page loads with Add Markets and Sync buttons', () => {
    //     const buttons = screen.getAllByRole('button');
    //     expect(buttons.length).toEqual(2);
    //     expect(buttons[0]).toHaveTextContent('Sync');
    //     expect(buttons[1]).toHaveTextContent('Add Market');
    //   });
  
    //   test('The page has the correct headings', () => {
    //     const h1 = screen.getByRole('heading', { level: 1 });
    //     const h4 = screen.getByRole('heading', { level: 4 });
    //     expect(h1).toHaveTextContent('MegaMarket Loyalty Cards');
    //     expect(h4).toHaveTextContent('Markets');
    //   });
  
    //   test('The displays are set to zero and no markets rendered', () => {
    //     expect(screen.getByText('Total Cards:').nextSibling).toHaveTextContent('0');
    //     expect(screen.getByText('Total Markets:').nextSibling).toHaveTextContent('0');
    //   });
  
      it('page renders correctly', () => {
        const { asFragment } = render(
            <Provider store={store}>
              <App />
            </Provider>
        );

        expect(asFragment()).toMatchSNapshot();
      });
    });
});  

// describe('App tests', () => {
//     it('should render Home component when page is HOME', () => {
//         // Set up initial state in Redux store to render the Home page
//         store.dispatch({ type: 'SET_PAGE', payload: 'HOME' });

//         // Render the App component wrapped with Provider and store
//         const { getByTestId } = render(
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         );

//         // Check if the Home component is rendered based on the data-testid attribute
//         const homeComponent = getByTestId('home-component'); // Assuming Home component has a data-testid attribute

//         expect(homeComponent).toBeInTheDocument();
//     });
// });