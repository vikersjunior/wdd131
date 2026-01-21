// Static weather values matching the HTML content
const temperature = 18; // in Celsius
const windSpeed = 8; // in km/h

// Function to calculate wind chill factor
function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

// Update footer with current year
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Update footer with last modified date
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Calculate and display wind chill
function displayWindChill() {
    const windChillElement = document.getElementById('windchill');
    
    // Check if conditions are met for viable wind chill calculation
    // Metric: temp <= 10°C and wind > 4.8 km/h
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `${windChill.toFixed(1)}°C`;
    } else {
        windChillElement.textContent = 'N/A';
    }
}

// Run wind chill calculation when page loads
displayWindChill();