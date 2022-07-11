require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const item = require('../mocks/item');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it('fetchProducts should be a function', () => {
    expect(typeof(fetchProducts)).toBe('function');
  })

  it('Test if fetch function is called one time', () => {
    fetchProducts('computador')
    expect(fetch).toHaveBeenCalled()
    }) 

 it('Testing return of function "fetchProducts" called fetch one times with arg "computador"', () => {
   expect(fetchProducts('computador')).toEqual(fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador'));
 })


 it('testing if function fetchProducts must be return an object Equal "computadorSearch"', async () => {
  expect( await fetchProducts('computador')).toEqual(computadorSearch);
})

it('When fetchProducts called without params, need return an error msg "You must provide an url"', async () => {
  expect.assertions(1);

  try {
    await fetchProducts();
  } catch (error) {
    expect(error).toEqual(new Error('You must provide an url'));
  }
});

});
