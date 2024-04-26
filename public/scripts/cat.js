function fetchCatImage() {
    const apiKey = 'live_2tu4IzWBMf4RuOXOqO22RqkBl7L7KMuNdXhysjaiXHo1Zdyq2KcHWlDe37x1vbk9'; 
    const image = document.getElementById("cat-image");
    fetch(`https://api.thecatapi.com/v1/images/search?api_key=${apiKey}`)
        .then(resp => resp.json())
        .then(json => image.src = json[0].url)
        .catch(error => {
            console.error('Error fetching cat image:', error);
            
        });
}

function btnClick() {
    const button = document.getElementById("new-cats-btn");
    button.addEventListener("click", fetchCatImage);
}

document.addEventListener("DOMContentLoaded", () => {
    fetchCatImage();
    btnClick();
});