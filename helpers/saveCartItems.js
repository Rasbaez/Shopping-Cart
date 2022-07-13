const localStorageSimulator = require('../mocks/localStorageSimulator');

const saveCartItems = (element) => localStorage.setItem('cartItems', element);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
