function updateQuantity(item, change) {
    const quantityElement = document.getElementById(`${item}Quantity`);
    let currentQuantity = parseInt(quantityElement.value);
    currentQuantity = Math.max(0, currentQuantity + change);
    quantityElement.value = currentQuantity;

    updateSelectedItems(item, currentQuantity);
    updateTotalAmount();
}

function updateSelectedItems(item, quantity) {
    const selectedItemsList = document.getElementById('selectedItemsList');
    const itemElement = document.querySelector(`[data-item="${item}"]`);
    const itemName = itemElement.querySelector('label').innerText;
    const itemPrice = parseFloat(itemElement.getAttribute('data-price'));
    const existingItem = document.querySelector(`#selectedItemsList li[data-item="${item}"]`);

    if (quantity > 0) {
        if (existingItem) {
            existingItem.innerHTML = `${itemName} x ${quantity} - $${(itemPrice * quantity).toFixed(2)} 
                                <span class="item-price">($${itemPrice.toFixed(2)} each)</span>`;
        } else {
            const li = document.createElement('li');
            li.setAttribute('data-item', item);
            li.innerHTML = `${itemName} x ${quantity} - $${(itemPrice * quantity).toFixed(2)} 
                        <span class="item-price">($${itemPrice.toFixed(2)} each)</span>`;
            selectedItemsList.appendChild(li);
        }
    } else {
        if (existingItem) {
            existingItem.remove();
        }
    }
}

function updateTotalAmount() {
    const selectedItems = document.querySelectorAll('#selectedItemsList li');
    let totalAmount = 0;

    selectedItems.forEach(item => {
        const itemPrice = parseFloat(document.querySelector(`[data-item="${item.getAttribute('data-item')}"]`).getAttribute('data-price'));
        const quantity = parseInt(item.innerText.split('x')[1]);
        totalAmount += itemPrice * quantity;
    });

    document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
}

function placeOrder() {
    const selectedItems = document.querySelectorAll('#selectedItemsList li');

    if (selectedItems.length > 0) {
        const orderDetails = Array.from(selectedItems).map(item => item.innerText).join('\n');

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
                Swal.fire('Order Placed!', 'Your order has been successfully placed.', 'success');
                // Reset the order details and total amount after placing the order
                selectedItems.forEach(item => item.remove());
                document.getElementById('totalAmount').innerText = '0.00';
                resetInputBoxes();
            }
        });
    } else {
        Swal.fire('Empty Order', 'Please add items to your order before placing it.', 'info');
    }
}
function resetInputBoxes() {
// Reset all quantity input boxes to 0
const quantityInputs = document.querySelectorAll('.quantity input');
quantityInputs.forEach(input => {
    input.value = '0';
});
}