let cart = [];

    function addToCart(item, price) {
        const customization = getCustomizationOptions(item);

        if (customization !== '') {
            const customizedItem = {
                name: `${item} (${customization})`,
                price: price + calculateCustomizationPrice(customization),
                customization: customization
            };

            cart.push(customizedItem);
        } else {
            // No customization selected, add the base product to the cart
            const baseItem = {
                name: item,
                price: price,
                customization: ''
            };

            cart.push(baseItem);
        }

        updateCart();
    }

    function getCustomizationOptions(item) {
        const extraCheese = document.getElementById(`${item} Cheese`).checked;
        const extraPatty = document.getElementById(`${item} Patty`).checked;
        const extraOnion = document.getElementById(`${item} Onion`).checked;

        let customization = '';

        if (extraCheese) {
            customization += 'Extra Cheese, ';
        }
        if (extraPatty) {
            customization += 'Extra Patty, ';
        }
        if (extraOnion) {
            customization += 'Extra Onion, ';
        }

        return customization.trim();
    }

    function calculateCustomizationPrice(customization) {
        // Charge $2.00 for each selected customization
        return (customization.split(',').length - 1) * 2.00;
    }

    function updateCart() {
        const selectedItemsList = document.getElementById('selectedItemsList');
        selectedItemsList.innerHTML = '';

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)}`;
            selectedItemsList.appendChild(li);
        });

        updateTotalAmount();
    }

    function updateTotalAmount() {
        const totalAmountElement = document.getElementById('totalAmount');
        const totalAmount = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
        totalAmountElement.innerText = `Total: $${totalAmount}`;
    }

    function confirmOrder() {
        Swal.fire({
            title: 'Confirm Order',
                    icon:'question',
                    text: 'Are you sure to place order?',
                    showCancelButton: true,
                    confirmButtonText: 'Place Order',
                    cancelButtonText: 'Cancel',
                    confirmButtonColor: '#28a745',
                    cancelButtonColor: '#dc3545'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Order Placed',
                    text: 'Your order has been placed successfully!',
                    icon: 'success'
                });

                resetCart();
            }
        });
    }

    function resetCart() {
        cart = [];
        updateCart();
    }