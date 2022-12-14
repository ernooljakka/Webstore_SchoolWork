//const { get } = require("mongoose");


const addToCart = productId => {
  // TODO 9.2
  // use addProductToCart(), available already from /public/js/utils.js
  // call updateProductAmount(productId) from this file
  addProductToCart(productId);
  updateProductAmount(productId);
};

const decreaseCount = productId => {
  // TODO 9.2
  // Decrease the amount of products in the cart, /public/js/utils.js provides decreaseProductCount()
  // Remove product from cart if amount is 0,  /public/js/utils.js provides removeElement = (containerId, elementId
  decreaseProductCount(productId);
  const count = getProductCountFromCart(productId);
  if (count === 0) {
    removeElement("cart-container", productId);
  }
};

const updateProductAmount = productId => {
  // TODO 9.2
  // - read the amount of products in the cart, /public/js/utils.js provides getProductCountFromCart(productId)
  // - change the amount of products shown in the right element's innerText
  const count = getProductCountFromCart(productId);
  const container = document.getElementById("amount-${productId}");
  container.innerHTML = count + 1;
};

const placeOrder = async() => {
  // TODO 9.2
  // Get all products from the cart, /public/js/utils.js provides getAllProductsFromCart()
  // show the user a notification: /public/js/utils.js provides createNotification = (message, containerId, isSuccess = true)
  // for each of the products in the cart remove them, /public/js/utils.js provides removeElement(containerId, elementId)
  const products = getAllProductsFromCart();
  createNotification("Successfully created an order!", "place-order-button", isSuccess = true);
  products.forEach(product => {
    removeElement("cart-container", product.Id);
  });
};

(async() => {
  // TODO 9.2
  // - get the 'cart-container' element
  // - use getJSON(url) to get the available products
  // - get all products from cart
  // - get the 'cart-item-template' template
  // - for each item in the cart
  //    * copy the item information to the template
  //    * hint: add the product's ID to the created element's as its ID to 
  //        enable editing ith 
  //    * remember to add event listeners for cart-minus-plus-button
  //        cart-minus-plus-button elements. querySelectorAll() can be used 
  //        to select all elements with each of those classes, then its 
  //        just up to finding the right index.  querySelectorAll() can be 
  //        used on the clone of "product in the cart" template to get its two
  //        elements with the "cart-minus-plus-button" class. Of the resulting
  //        element array, one item could be given the ID of 
  //        `plus-${product_id`, and other `minus-${product_id}`. At the same
  //        time we can attach the event listeners to these elements. Something 
  //        like the following will likely work:
  //          clone.querySelector('button').id = `add-to-cart-${prodouctId}`;
  //          clone.querySelector('button').addEventListener('click', () => addToCart(productId, productName));
  //
  // - in the end remember to append the modified cart item to the cart 
  let container = document.getElementById("cart-container");
  let availableItems = await getJSON("/api/products");
  let allProducts = getAllProductsFromCart();
  let itemTemplate = document.getElementById("cart-item-template");

  const addOne = (event) => {
    const neededId = event.target.id.split("-")[1];
    const newAmount = addProductToCart(neededId);





    document.getElementById("amount-" + neededId).innerText = newAmount + "x";
  }

  const removeOne = (event) => {
    const neededId = event.target.id.split("-")[1];
    const newAmount = decreaseProductCount(neededId);
    document.getElementById("amount-" + neededId).innerText = newAmount + "x";
    if (newAmount === 0) {
      event.target.parentElement.id = "idForNow"
      removeElement("cart-container", "idForNow");
    }
    
  }

  const handlePlaceOrder = () => {
    document.getElementById("cart-container").innerHTML = "";
    sessionStorage.clear();
  }


  for (const index in allProducts) {
    let oneProduct = availableItems.find(item => {
      return allProducts[index].id === item._id;
    })

    clone = itemTemplate.content.cloneNode(true);

    clone.querySelector("h3").innerText = oneProduct.name;
    clone.querySelector("h3").id = "name-" + oneProduct._id;
    let productInfo = clone.querySelectorAll("p");
    productInfo[0].innerText = oneProduct.price
    productInfo[0].id = "price-" + oneProduct._id;
    productInfo[1].innerText = allProducts[index].amount+"x";
    productInfo[1].id = "amount-" + oneProduct._id;

    const plusMinus = clone.querySelectorAll("button");
    plusMinus[0].id = "plus-" + oneProduct._id;
    plusMinus[1].id = "minus-" + oneProduct._id;

    plusMinus[0].addEventListener("click", addOne);
    plusMinus[1].addEventListener("click", removeOne);


    container.appendChild(clone);
  }

  const placeOrderNow = document.getElementById("place-order-button");
  placeOrderNow.addEventListener("click", handlePlaceOrder);
})();