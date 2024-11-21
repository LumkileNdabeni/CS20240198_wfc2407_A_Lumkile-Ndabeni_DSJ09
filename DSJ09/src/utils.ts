import { LoyaltyUser, Permissions } from './enums';
import { Review } from './interfaces';

const reviewTotalDisplay = document.querySelector('#reviews') as HTMLElement | null;
const returningUserDisplay = document.querySelector('#returning-user') as HTMLElement | null;
const userNameDisplay = document.querySelector('#user') as HTMLElement | null;

export function showReviewTotal(value: number, reviewer: string, isLoyalty: LoyaltyUser): void {
    if (!reviewTotalDisplay) {
        console.error('Review display element not found');
        return;
    }

    const iconDisplay = isLoyalty === LoyaltyUser.GOLD_USER ? '⭐' : '';
    reviewTotalDisplay.innerHTML = `${value} review${makeMultiple(value)} | last reviewed by ${reviewer} ${iconDisplay}`;
}

export function populateUser(isReturning: boolean, userName: string): void {
    if (isReturning && returningUserDisplay) {
        returningUserDisplay.innerHTML = 'back';
    }
    if (userNameDisplay) {
        userNameDisplay.innerHTML = userName;
    } else {
        console.error('User name display element not found');
    }
}

export function showDetails(
    value: boolean | Permissions,
    element: HTMLDivElement,
    price: number
): void {
    const hasPermissions = typeof value === 'boolean' ? value : value === Permissions.ADMIN;
    if (hasPermissions) {
        const priceDisplay = document.createElement('div');
        priceDisplay.innerHTML = `${price}/night`;
        element.appendChild(priceDisplay);
    }
}

export function makeMultiple(value: number): string {
    return value !== 1 ? 's' : '';
}

export function getTopTwoReviews(reviews: Review[]): Review[] {
    return [...reviews]
        .sort((a, b) => b.stars - a.stars)
        .slice(0, 2);
}
