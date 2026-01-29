// Footer - Current Year
const currentYearSpan = document.getElementById('currentyear');
const currentYear = new Date().getFullYear();
currentYearSpan.textContent = currentYear;

// Footer - Last Modified Date
const lastModifiedParagraph = document.getElementById('lastModified');
const lastModifiedDate = document.lastModified;
lastModifiedParagraph.textContent = `Last Modification: ${lastModifiedDate}`;

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');

    // Toggle hamburger icon between ☰ and ✕
    if (nav.classList.contains('open')) {
        hamburger.textContent = '✕';
        hamburger.setAttribute('aria-label', 'Close menu');
        hamburger.setAttribute('aria-expanded', 'true');
    } else {
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-label', 'Toggle menu');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
        "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382273,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
    },
    {
        templeName: "St. George Utah",
        location: "St. George, Utah, United States",
        dedicated: "1877, April, 6",
        area: 110000,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/st.-george-utah-temple/st.-george-utah-temple-40435-main.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 40000,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
    },
    {
        templeName: "San Antonio Texas",
        location: "San Antonio, Texas, United States",
        dedicated: "2005, May, 22",
        area: 16800,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/san-antonio-texas-temple/san-antonio-texas-temple-55647-main.jpg"
    },
    {
        templeName: "Newport Beach California",
        location: "Newport Beach, California, United States",
        dedicated: "2005, August, 28",
        area: 17800,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/newport-beach-california-temple/newport-beach-california-temple-46818-main.jpg"
    },
    {
        templeName: "Barranquilla Colombia",
        location: "Barranquilla, Colombia",
        dedicated: "2018, December, 9",
        area: 25349,
        imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/barranquilla-colombia-temple/barranquilla-colombia-temple-1846-main.jpg"
    }
];

const templeGrid = document.getElementById('temple-grid');
const pageHeading = document.querySelector('main h1');
const navLinks = document.querySelectorAll('nav a');
const initialActiveLink = document.querySelector('nav a.active');

if (initialActiveLink) {
    initialActiveLink.setAttribute('aria-current', 'page');
}

const getDedicatedYear = (temple) => {
    const yearText = temple.dedicated.split(',')[0];
    return Number.parseInt(yearText, 10);
};

const createDetail = (label, value) => {
    const detail = document.createElement('p');
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('label');
    labelSpan.textContent = `${label}:`;
    detail.append(labelSpan, ` ${value}`);
    return detail;
};

const displayTemples = (templeList) => {
    templeGrid.innerHTML = '';

    templeList.forEach((temple) => {
        const card = document.createElement('figure');
        card.classList.add('temple-card');

        const image = document.createElement('img');
        image.src = temple.imageUrl;
        image.alt = `${temple.templeName} Temple`;
        image.loading = 'lazy';

        const caption = document.createElement('figcaption');
        const name = document.createElement('h3');
        name.textContent = temple.templeName;

        caption.append(
            name,
            createDetail('Location', temple.location),
            createDetail('Dedicated', temple.dedicated),
            createDetail('Area', `${temple.area.toLocaleString()} sq ft`)
        );

        card.append(image, caption);
        templeGrid.append(card);
    });
};

const setActiveLink = (activeLink) => {
    navLinks.forEach((link) => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
    });
    activeLink.classList.add('active');
    activeLink.setAttribute('aria-current', 'page');
};

const closeMobileNav = () => {
    if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-label', 'Toggle menu');
        hamburger.setAttribute('aria-expanded', 'false');
    }
};

const applyFilter = (filterName) => {
    let filtered = temples;
    let headingText = 'Home';

    switch (filterName) {
        case 'old':
            filtered = temples.filter((temple) => getDedicatedYear(temple) < 1900);
            headingText = 'Old';
            break;
        case 'new':
            filtered = temples.filter((temple) => getDedicatedYear(temple) > 2000);
            headingText = 'New';
            break;
        case 'large':
            filtered = temples.filter((temple) => temple.area > 90000);
            headingText = 'Large';
            break;
        case 'small':
            filtered = temples.filter((temple) => temple.area < 10000);
            headingText = 'Small';
            break;
        default:
            filtered = temples;
            headingText = 'Home';
            break;
    }

    pageHeading.textContent = headingText;
    displayTemples(filtered);
};

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const filterName = link.dataset.filter || 'home';
        setActiveLink(link);
        applyFilter(filterName);
        closeMobileNav();
    });
});

displayTemples(temples);
