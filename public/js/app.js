const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    getWeatherInfo(location);
});

const getWeatherInfo = (location) => {
    // console.log('Loading...');
    message1.textContent = 'Loading...';
    message2.textContent = '';
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then(data => {
            if (data.error) {
                // return console.log(data.error);
                return message1.textContent = data.error;
            }

            // console.log(data.location);
            // console.log(data.forcast);
            message1.textContent = data.location;
            message2.textContent = data.forcast;
            
        });
    });
}