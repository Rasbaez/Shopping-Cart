const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Testing saveCartItems function ', () => {
  // implemente seus testes aqui
  it('When function "saveCartItems" is called with arg "<ol><li>Item</li></ol>", the methood "localStorage.setItem()" is called too!',   () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('When function "saveCartItems" is called with arg "<ol><li>Item</li></ol>", the methood "localStorage.setItem()" need called with args "("cartItems", "param")"',   () => {
      saveCartItems('element');
      expect(localStorage.setItem).toHaveBeenLastCalledWith('cartItems', 'element');
      }); 


});
