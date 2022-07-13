const items = document.querySelector('.items');
const cart = document.querySelector('.cart__items');
const btnCartRemove = document.querySelector('.empty-cart');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = async (event) => {
  // aqui eu tentei descontruir o target {target}, passando como parâmetro, mas não sei por que não funcionou. 
  event.target.remove();
};

cart.addEventListener('click', cartItemClickListener);

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addToCart = async (e) => {
  const selectProduct = await e.target.parentNode.firstElementChild.innerText;
   // foi difícil pensar que por conta da depêndencia do produto selecionado, precisamos do await, mas funcionou//
  const product = await fetchItem(selectProduct);
  // console.log(product);
  const { id, title, price } = product;

 const addtoCart = createCartItemElement({ sku: id, name: title, salePrice: price });
 cart.appendChild(addtoCart);
};

items.addEventListener('click', addToCart);

const createProductsList = async () => {
  const products = await fetchProducts('computador');
  const section = document.querySelector('.items');
   products.results.forEach((elem) => {
    const productItem = createProductItemElement({
      sku: elem.id,
      name: elem.title,
      image: elem.thumbnail,
      price: elem.price,
    });  
    section.appendChild(productItem);
  }); 
};

window.onload = async () => { 
 await fetchProducts('computador');
 await createProductsList();
};
