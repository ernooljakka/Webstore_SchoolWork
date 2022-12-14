const addToCart = (productId, productName) => {
  // TODO 9.2
  // you can use addProductToCart(), available already from /public/js/utils.js
  // for showing a notification of the product's creation, /public/js/utils.js  includes createNotification() function
  addProductToCart(productId);

  createNotification("Added " + productName + " to cart!", "notifications-container");
};

const handleButtonClick = (event) => {
  const productId = event.target.id.split('-')[3];
  const productName = event.target.parentElement.querySelector("h3").innerText;
  addToCart(productId, productName);
}

(async() => {
  //TODO 9.2 
  // - get the 'products-container' element from the /products.html
  // - get the 'product-template' element from the /products.html
  // - save the response from await getJSON(url) to get all the products. getJSON(url) is available to this script in products.html, as "js/utils.js" script has been added to products.html before this script file 
  // - then, loop throug the products in the response, and for each of the products:
  //    * clone the template
  //    * add product information to the template clone
  //    * remember to add an event listener for the button's 'click' event, and call addToCart() in the event listener's callback
  // - remember to add the products to the the page

  const products_container = document.getElementById("products-container");
  const product_template = document.getElementById("product-template");

  const products = await getJSON('/api/products');
  for (const index in products) {
    const product = products[index];

    let clone = product_template.content.cloneNode(true);
    clone.querySelector("h3").innerText = product.name;
    clone.querySelector("h3").id = "name-" + product._id
    let productInfo = clone.querySelectorAll("p");
    productInfo[0].innerText = product.description;
    productInfo[0].id = "description-" + product._id;
    productInfo[1].innerText = product.price;
    productInfo[1].id = "price-" + product._id;
    clone.querySelector('button').id = 'add-to-cart-' + product._id;

    clone.querySelector('button').addEventListener('click', handleButtonClick);

    products_container.appendChild(clone);
  }

    
})();