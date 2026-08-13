console.log("Hello ESP 32!");


const message = document.getElementById("message");
const modeAuto = document.getElementById("modeAuto");
const modeManual = document.getElementById("modeManual");

if (message) {
document.getElementById("message").textContent = "JS is running!";
}

const ESP32 = "http://192.168.1.10";

const ledOn = document.getElementById("ledOn");
const ledOff = document.getElementById("ledOff");
const ledStatus = document.getElementById("ledStatus");

function updateSensor()
{
    fetch(ESP32 + "/bme280")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        document.getElementById("temperature").textContent = data.temperature;
        document.getElementById("unit-temperature").textContent = "ºC";
        document.getElementById("humidity").textContent = data.humidity;
        document.getElementById("unit-humidity").textContent = "%";
        document.getElementById("pressure").textContent = data.pressure;
        document.getElementById("unit-pressure").textContent = "mmHg";

    })
    .catch(error => {
            console.error("BME280 fetch error:", error);
            if (message) {
            document.getElementById("message").textContent =
                "Error fetching ESP32";
            }
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

if (ledOn) {
        ledOn.addEventListener("click", function()
        {
            fetch(ESP32 + "/led/on")
                .then(() => updateLedStatus());
        });
    }
       
if (ledOff) {
        ledOff.addEventListener("click", function()
        {
            fetch(ESP32 + "/led/off")
                .then(() => updateLedStatus());
        });
    }

function updateModeStatus()
{
    fetch(ESP32 + "/mode/status")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            if (data.MODE)
                {
                    document.getElementById("modeStatus").textContent = "AUTO";
                } 
                else
                    {
                        document.getElementById("modeStatus").textContent = "MANUAL";
                    }
                });

};

if (modeAuto) {
        modeAuto.addEventListener("click", function()
        {
            fetch(ESP32 + "/mode/auto")
                .then(() => updateModeStatus());
        });

    }

if (modeManual) {
        modeManual.addEventListener("click", function()
        {
            fetch(ESP32 + "/mode/manual")
                .then(() => updateModeStatus());
        });

    }

updateLedStatus();
updateSensor();
updateModeStatus();
setInterval(updateSensor, 1000);
