console.log("Hello ESP 32!");

document.getElementById("message").textContent = "JS is running!";

const ESP32 = "http://172.20.10.3";

function updateSensor()
{
    fetch(ESP32 + "/bme280")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        document.getElementById("temperature").textContent = data.temperature + " ºC";
        document.getElementById("pressure").textContent = data.pressure + " mmHg";
        document.getElementById("humidity").textContent = data.humidity + " %";

    })
    .catch(error => {
            console.error("BME280 fetch error:", error);
            document.getElementById("message").textContent =
                "Error fetching ESP32";
        }); 
};


function updateLedStatus()
{
    fetch(ESP32 + "/led/status")
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
            fetch(ESP32 + "/led/on")
                .then(() => updateLedStatus());
        });
        
document.getElementById("ledOff").addEventListener("click", function()
        {
            fetch(ESP32 + "/led/off")
                .then(() => updateLedStatus());
        });

updateLedStatus();
updateSensor();
setInterval(updateSensor, 1000);
