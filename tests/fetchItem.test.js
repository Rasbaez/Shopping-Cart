require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('Testing fetchItem function', () => {
  // implemente seus testes aqui

  it('fetchItem should be a function', () => {
    expect(typeof(fetchItem)).toBe('function');
  });
   
  it('If fetchItem called with arg "MLB1615760527" fetch function need be called one time',   () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
    });

    it('Testing if function "fetchItem" with arg "MLB1615760527" fettch called with this endPoint "https://api.mercadolibre.com/items/MLB1615760527" ', () => {
      expect(fetchItem('MLB1615760527')).toEqual(fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador'));
    })

    it('Testing if "fetchItem" called with arg "MLB1615760527" is Equal to "item" Object', async () => {
      expect(await fetchItem('MLB1615760527')).toEqual(item);
    })

    it('When fetchItem called without params, need return a error msg "You must provide an url"', async () => {
      expect.assertions(1);
    
      try {
        await fetchItem();
      } catch (error) {
        expect(error).toEqual(new Error('You must provide an url'));
      }
    });
   
   
});
