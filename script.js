// const items = document.querySelector('.items');
const ol = document.querySelector('.cart__items');
const btnCartRemove = document.querySelector('.empty-cart');

const cartItemClickListener = async (event) => {
  // aqui eu tentei descontruir o target {target}, passando como parâmetro, mas não sei por que não funcionou.
  event.target.remove();
};
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const cartItem = async (elemId) => {
  const selectProduct = await fetchItem(elemId);
  const { id, title, price } = selectProduct;
  const itemObj = {
    sku: id,
    name: title,
    salePrice: price,
  };
  const li = createCartItemElement(itemObj);
  ol.appendChild(li);
 console.log(ol);
};

const getItemId = ({ target }) => {
  const itemId = target.parentElement.firstChild.innerText;
  cartItem(itemId);
};

const selectedProduct = () => {
  const btnCart = document.querySelectorAll('.item__add');
  btnCart.forEach((btn) => { 
    btn.addEventListener('click', getItemId);
  }); 
};

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

const createProductsList = async () => {
  const products = await fetchProducts('computador');
  const section = document.querySelector('.items');
  const { results } = products;
  results.forEach((elem) => {
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
  selectedProduct();
};
