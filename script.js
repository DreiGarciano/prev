function changeContent(contentId) {
    var content = document.getElementById(contentId).innerHTML;
    var mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = content;
    
    // Call the function to set up event listeners for the buttons again
    setupAddToCartButtons();
}

document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart-button');

    let cart = [];

    // Event delegation: attach event listener to a parent element
    document.addEventListener('click', function(event) {
        const button = event.target.closest('.btn-container');
        const removeButton = event.target.closest('.remove-button');
        
        if (button) {
            console.log('Button clicked!');
            const product = button.parentElement;
            console.log('Product:', product);
            const productName = product.querySelector('p:nth-of-type(1)').textContent.trim();
            console.log('Product Name:', productName);
            const productPriceText = product.querySelector('p:nth-of-type(2)').textContent.trim();
            console.log('Product Price Text:', productPriceText);
            const productPrice = parseFloat(productPriceText.split('Php ')[1]);
            console.log('Product Price:', productPrice);

            addToCart(productName, productPrice);
        } else if (removeButton) {
            const itemName = removeButton.dataset.name;
            removeFromCart(itemName);
        } else if (event.target === clearCartButton) {
            clearCart();
        } else if (event.target.classList.contains('sidebar-button')) { // Check if the clicked element has the class 'sidebar-button'
            const contentId = event.target.dataset.contentId; // Get the contentId from the data attribute
            changeContent(contentId); // Call changeContent with the appropriate contentId
        }
    });
// addtocart function
    function addToCart(name, price) {
        const existingItemIndex = cart.findIndex(item => item.name === name);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        renderCart();
    }
// addtocart rendering
    function removeFromCart(name) {
        const itemIndex = cart.findIndex(item => item.name === name);

        if (itemIndex !== -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
        }

        renderCart();
    }

    function updateQuantity(name, newQuantity) {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = newQuantity;
        }
        renderCart();
    }

    function clearCart() {
        cart = [];
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = '';
        let total = 0;
    
        cart.forEach(item => {
            const listItem = document.createElement('li');
    
            // Create a container div to hold the item details and the number scroller
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('item-container');
    
            // Paragraph to display item details
            const itemDetails = document.createElement('p');
            itemDetails.textContent = `${item.name} - Php ${(item.price * item.quantity).toFixed(2)}`;
            itemContainer.appendChild(itemDetails);
    
            // Create a number scroller input element
            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = item.quantity;
            quantityInput.min = '1'; // Set minimum quantity to 1
            quantityInput.classList.add('quantity-input');
            itemContainer.appendChild(quantityInput);
    
            // Create a remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            removeButton.dataset.name = item.name;
            itemContainer.appendChild(removeButton);
    
            // Add event listener to handle remove button click
            removeButton.addEventListener('click', function() {
                removeFromCart(item.name);
            });
    
            // Add event listener to handle quantity changes
            quantityInput.addEventListener('change', function() {
                const newQuantity = parseInt(this.value);
                updateQuantity(item.name, newQuantity);
            });
    
            // Append the container div to the list item
            listItem.appendChild(itemContainer);
    
            cartItems.appendChild(listItem);
            total += item.price * item.quantity;
        });
    
        cartTotal.textContent = total.toFixed(2);
    }
    
});

// Function to show the popup box
function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Function to hide the popup box
function hidePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Add event listener to the button to open poopup
document.getElementById('popupButton').addEventListener('click', showPopup);

// Add event listener to the close button
document.getElementById('closeButton').addEventListener('click', hidePopup);
