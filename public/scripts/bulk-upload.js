document.querySelector('.bulkUploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/bulk-upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to upload JSON files');
        }
        console.log('JSON files uploaded successfully');
        // Optionally, redirect the user or display a success message
    })
    .catch(error => {
        console.error(error);
        // Optionally, display an error message to the user
    });
});
