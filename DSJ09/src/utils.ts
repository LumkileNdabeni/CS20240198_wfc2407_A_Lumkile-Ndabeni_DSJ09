// utils.ts

import { LoyaltyUser } from './enums';
import { Review } from './interfaces';

const reviewTotalDisplay = document.querySelector('#reviews') as HTMLElement;
const returningUserDisplay = document.querySelector('#returning-user') as HTMLElement;
const userNameDisplay = document.querySelector('#user') as HTMLElement;

export function showReviewTotal(value: number, reviewer: string, isLoyalty: LoyaltyUser) {
    const iconDisplay = isLoyalty === LoyaltyUser.GOLD_USER ? '⭐' : '';
    reviewTotalDisplay.innerHTML = `${value} review${makeMultiple(value)} | last reviewed by ${reviewer} ${iconDisplay}`;
}

export function populateUser(isReturning: boolean, userName: string) {
    if (isReturning) {
        returningUserDisplay.innerHTML = 'back';
    }
    userNameDisplay.innerHTML = userName;
}

export function showDetails(value: boolean | Permissions, element: HTMLDivElement, price: number) {
    if (value) {
        const priceDisplay = document.createElement('div');
        priceDisplay.innerHTML = `${price}/night`;
        element.appendChild(priceDisplay);
    }
}

export function makeMultiple(value: number): string {
    return (value > 1 || value === 0) ? 's' : '';
}

export function getTopTwoReviews(reviews: Review[]): Review[] {
    const sortedReviews = [...reviews].sort((a, b) => b.stars - a.stars);
    return sortedReviews.slice(0, 2);
}
