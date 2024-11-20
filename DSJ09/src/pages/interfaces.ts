import { LoyaltyUser } from '../pages/enums'

export default interface Review {
    name: string; 
    stars: number; 
    loyaltyUser: LoyaltyUser; 
    date: string;   
}