console.log("Hello ESP 32!");

document.getElementById("message").textContent = "JS is running!";

// fetch("/message")
//     .then(response => response.text())
//     .then(message => {
//         console.log(message);

//         document.getElementById("message").textContent = message;
// });

// fetch("/temperature")
//     .then(response => response.json())
//     .then(data => {
//         console.log("Temperature: ", data.temperature);

//         document.getElementById("message").textContent = "Temperature: " + data.temperature + "ºC";
// });

function updateSensor()
{
    fetch("/bme280")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        document.getElementById("temperature").textContent = data.temperature + " ºC";
        document.getElementById("pressure").textContent = data.pressure + " mmHg";
        document.getElementById("humidity").textContent = data.humidity + " %";

    })
};


function updateLedStatus()
{
    fetch("/led/status")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
        if (data.LED)
            {
                document.getElementById("ledStatus").textContent = "ON";
            } 
            else
                {
                    document.getElementById("ledStatus").textContent = "OFF";
                }
            });
};

document.getElementById("ledOn").addEventListener("click", function()
        {
            fetch("/led/on")
                .then(() => updateLedStatus());
        });
        
document.getElementById("ledOff").addEventListener("click", function()
        {
            fetch("/led/off")
                .then(() => updateLedStatus());
        });

updateLedStatus();
updateSensor();
setInterval(updateSensor, 1000);
