import subject, { goToPage, userLogin, userLogout } from '../src/utils/reducers/statusSlice';

describe('statusReducer', () => {
    let state;

    beforeEach(() => {
        state = {
            page: 'LANDING_PAGE',
            user: null,
        };
    });

    describe('default state', () => {
        it('should return a default state when given an undefined input', () => {
          expect(subject(undefined, { type: undefined })).toEqual(state);
        });
      });

    describe('unrecognized action types', () => {
     it('should return the original without any duplication', () => {
      const action = { type: '999' };
      expect(subject(state, action)).toBe(state);
    });
  });
  
  describe('goToPage', () => {
    it ('should update the page state', () => {
      const nextPage = 'HOME';
      const newState = subject(state, goToPage(nextPage));
      expect(newState.page).toEqual(nextPage);
    });

    it ('should not update state for invalid payload', () => {
      const invalidPage = 777;
      const newState = subject(state, goToPage(invalidPage));
      // state should remain unchanged
      expect(newState.page).toEqual('LANDING_PAGE');
    });
  });

  describe('userLogin', () => {
    it ('should update the user state on login', () => {
      const user = 'eunice';
      const newState = subject(state, userLogin(user));
      expect(newState.user).toEqual(user);
    });
  });

  describe('userLogout', () => {
    it ('should clear the user state on logout', () => {
      // first log the user in
      state = subject(state, userLogin({ user: 'eunice' }));

      // log out the user
      const newState = subject(state, userLogout());
      expect(newState.user).toBeNull();
    })
  })
});