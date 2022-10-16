export interface KoFiRequest {
    data: Request | DonationRequest | SubscriptionRequest | ShopOrderRequest;
}

export type DonationRequest = Request & {
    type: Type.Donation,
    is_subscription_payment: false,
    is_first_subscription_payment: false,
}

export type SubscriptionRequest = Request & {
    type: Type.Subscription,
    is_subscription_payment: true,
    tier_name: string;
}

export type ShopOrderRequest = Request & {
    type: Type.ShopOrder,
    is_subscription_payment: false,
    shop_items: ShopItem[];
}

export type ShopItem = { direct_link_code: string; };

export interface Request {
    message_id: string;
    timestamp: string;
    type: Type;
    is_public: boolean;
    from_name: string;
    message: string;
    amount: string;
    url: string;
    email: string;
    currency: string;
    is_subscription_payment: boolean;
    is_first_subscription_payment: boolean;
    kofi_transaction_id: string;
    verification_token: string;
    shop_items: null;
    tier_name: null;
}

export enum Type {
    Donation = "Donation",
    Subscription = "Subscription",
    Commission = "Commission",
    ShopOrder = "Shop Order"

}