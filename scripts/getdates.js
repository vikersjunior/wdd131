// Get the current year and display it in the footer
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Get the last modified date and display it in the footer
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;