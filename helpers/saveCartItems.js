// const localStorageSimulator = require('../mocks/localStorageSimulator');

const saveCartItems = (cart) => {
  localStorage.setItem('cartItems', cart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
