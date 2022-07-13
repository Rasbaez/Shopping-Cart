const ol = document.querySelector('.cart__items');

const cartItemClickListener = async ({ target }) => {
    target.remove();
    saveCartItems(ol.innerHTML);
};

const removeItemCart = () => {
  const cartItems = document.querySelectorAll('.cart__item');
  cartItems.forEach((cartItem) => cartItem.addEventListener('click', cartItemClickListener));
};

// 💭 segundo as dicas do Rafa no Slack, a função removeItemCart é responsável por eliminar os items do carrinho após o recarregamento da página, pois quando éla é a recarregada se perde a função AddEventLisnner, então é nececário criar uma função a parte para remover aopós o recarregamento!

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
  saveCartItems(ol.innerHTML);
};

// 👀cartItem é responsável por criar o elemento para ser adicionado ao carrinho

const getItemId = ({ target }) => {
  const itemId = target.parentElement.firstChild.innerText;
  cartItem(itemId);
};
// 👀getItemId responsável por pegar o ID do item quando clicado

const selectedProduct = () => {
  const btnCart = document.querySelectorAll('.item__add');
  btnCart.forEach((btn) => { 
    btn.addEventListener('click', getItemId);
  }); 
};

// 👀selectedProduct é responsável por selecionarmos o item desejado ao carrinho percorremos todos os itens com forEach e adicionamos o listnner ao botão

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

// createProductsList é responsável por renderizar os produtos na téla solicitando os dados da API!!
window.onload = async () => {
  await fetchProducts('computador');
  await createProductsList();
  selectedProduct();
  ol.innerHTML = getSavedCartItems();
  // 👀não entendi por que devemos chamar com ol.innerHTML, uma amiga me disse e funcionou.
  removeItemCart();  
};
