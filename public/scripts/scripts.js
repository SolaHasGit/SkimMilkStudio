document.querySelector('.add-product').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    fetch('/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formObject)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      console.log('Product added successfully');
    })
    .catch(err => {
      console.error(err);
    });
});
  

document.querySelector('.delete-product').addEventListener('submit', function(event){
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the product ID from the form
    const formData = new FormData(event.target);
    const productId = formData.get('id');

    // Send a DELETE request to the server
    fetch(`/delete-product/${productId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete product');
        }
        console.log('Product deleted successfully');
        // Optionally, reset the form or update the UI
    })
    .catch(error => {
        console.error(error);
        // Optionally, handle errors
    });
});

