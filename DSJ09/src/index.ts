// Number Types mini-challenge 10 10.2
// Write a function that will only accept numbers and attend to 
// all TypeScript weakness flags.
// : number

// index.ts

import { showReviewTotal, populateUser, showDetails, getTopTwoReviews, makeMultiple } from './utils';
import { Permissions, LoyaltyUser } from './enums';
import { Review, Property } from './interfaces';
import MainProperty from './classes';
import './index.css';

const propertyContainer = document.querySelector('.properties') as HTMLElement;
const reviewContainer = document.querySelector('.reviews') as HTMLElement;
const container = document.querySelector('.container') as HTMLElement;
const button = document.getElementById('get-reviews-button') as HTMLButtonElement;
const footer = document.querySelector('.footer') as HTMLElement;

let isLoggedIn: boolean;

// Reviews
const reviews: Review[] = [
    {
        name: 'Sheila',
        stars: 5,
        loyaltyUser: LoyaltyUser.GOLD_USER,
        date: '01-04-2021'
    },
    {
        name: 'Andrzej',
        stars: 3,
        loyaltyUser: LoyaltyUser.BRONZE_USER,
        date: '28-03-2021'
    },
    {
        name: 'Omar',
        stars: 4,
        loyaltyUser: LoyaltyUser.SILVER_USER,
        date: '27-03-2021',
    },
];

const you = {
    firstName: 'Bobby',
    lastName: 'Brown',
    permissions: Permissions.ADMIN,
    isReturning: true,
    age: 35,
    stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow']
};

// Array of Properties
const properties: Property[] = [
    {
        image: '/images/colombia-property.jpg',
        title: 'Colombian Shack',
        price: 45,
        location: {
            firstLine: 'shack 37',
            city: 'Bogota',
            code: 45632,
            country: 'Colombia'
        },
        contact: [+112343823978921, 'marywinkle@gmail.com'],
        isAvailable: true  
    },
    {
        image: '/images/poland-property.jpg',
        title: 'Polish Cottage',
        price: 30,
        location: {
            firstLine: 'no 23',
            city: 'Gdansk',
            code: 343903,
            country: 'Poland'
        },
        contact: [+1298239028490830, 'garydavis@hotmail.com'],
        isAvailable: false 
    },
    {
        image: '/images/london-property.jpg',
        title: 'London Flat',
        price: 25,
        location: {
            firstLine: 'flat 15',
            city: 'London',
            code: 'SW4 5XW',
            country: 'United Kingdom',
        },
        contact: [+34829374892553, 'andyluger@aol.com'],
        isAvailable: true
    },
    {
        image: '/images/malaysian-hotel.jpeg',
        title: 'Malia Hotel',
        price: 35,
        location: {
            firstLine: 'Room 4',
            city: 'Malia',
            code: 45334,
            country: 'Malaysia'
        },
        contact: [+60349822083, 'lee34@gmail.com'],
        isAvailable: false
    }
];

// Functions
showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser);
populateUser(you.isReturning, you.firstName);

// Add the properties
const fragment = document.createDocumentFragment();

for (let i = 0; i < properties.length; i++) {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = properties[i]?.title || 'Default Title';
    const imageSrc = properties[i]?.image || 'default-image.jpg';
    const price = properties[i]?.price || 0;

    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    card.appendChild(titleElement);

    const image = document.createElement('img');
    image.setAttribute('src', imageSrc);
    card.appendChild(image);

    const hasPermissions = you.permissions ? true : false; // Adjust logic based on your permissions structure
    showDetails(hasPermissions, card, price);

    fragment.appendChild(card);
}

propertyContainer.appendChild(fragment);


let count = 0;
function addReviews(array: Review[]): void {
    if (!count) {
        count++;
        const topTwo = getTopTwoReviews(array);
        for (let i = 0; i < topTwo.length; i++) {
            const card = document.createElement('div');
            card.classList.add('review-card');
            card.innerHTML = topTwo[i].stars + ' stars from ' + topTwo[i].name;
            reviewContainer.appendChild(card);
        }
        container.removeChild(button);
    }
}

button.addEventListener('click', () => addReviews(reviews));

let currentLocation: [string, string, number] = ['London', '11.03', 17];
footer.innerHTML = `${currentLocation.join(' ')}°`;

let yourMainProperty = new MainProperty(
    '/images/italian-property.jpg', 
    'Italian House',
    [{
        name: 'Olive',
        stars: 5,
        loyaltyUser: LoyaltyUser.GOLD_USER,
        date: '12-04-2021'
    }]
);

const mainImageContainer = document.querySelector('.main-image') as HTMLElement;
const image = document.createElement('img');
image.setAttribute('src', yourMainProperty.src);
mainImageContainer.appendChild(image);
