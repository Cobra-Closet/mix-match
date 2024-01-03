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
    })
  })
});