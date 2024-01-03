import subject from '../client/src/utils/reducers/statusSlice';

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
});