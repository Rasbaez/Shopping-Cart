const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Testing getSavedCartItems function', () => {

   it('When you call "getSavedCartItems", Methood "localStorage.getItem" need called too.', () => {
   getSavedCartItems();
   expect(localStorage.getItem).toHaveBeenCalled();
   });

   it('When you call "getSavedCartItems", Methood "localStorage.getItem" need called with arg "cartItems".',   () => {
    getSavedCartItems('element');
    expect(localStorage.getItem).toHaveBeenLastCalledWith('cartItems');
    }); 

});
