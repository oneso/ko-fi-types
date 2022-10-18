export interface WebhookRequest {
    data: RequestData;
}

export type RequestData = CommissionData | DonationData | ShopOrderData | SubscriptionData;

export type CommissionData = Data & {
    type: Type.Commission,
}

export type DonationData = Data & {
    type: Type.Donation,
    is_subscription_payment: false,
    is_first_subscription_payment: false,
}

export type SubscriptionData = Data & {
    type: Type.Subscription,
    is_subscription_payment: true,
    tier_name: string;
}

export type ShopOrderData = Data & {
    type: Type.ShopOrder,
    is_subscription_payment: false,
    shop_items: ShopItem[];
}

export type ShopItem = { direct_link_code: string; };

export interface Data {
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
    shop_items: ShopItem[] | null;
    tier_name: string | null;
}

export enum Type {
    Donation = "Donation",
    Subscription = "Subscription",
    Commission = "Commission",
    ShopOrder = "Shop Order"
}

export interface Config<R> {
    endpoint: string;
    onData: Callback<RequestData, R>;
    onCommission: Callback<CommissionData, R>;
    onDonation: Callback<DonationData, R>;
    onShopOrder: Callback<ShopOrderData, R>;
    onSubscription: Callback<SubscriptionData, R>;
    onError: (err: any, req: R) => void | Promise<void>;
    verificationToken: string | false;
}

export type Callback<TData, R> = (data: TData, req: R) => void | null | undefined | Promise<void>;

export const mergeConfig: <R>(config: Partial<Config<R>>) => Config<R> = (config) => ({
    endpoint: 'webhook',
    onData: () => null,
    onCommission: () => null,
    onDonation: () => null,
    onShopOrder: () => null,
    onSubscription: () => null,
    onError: () => null,
    verificationToken: false,
    ...config,
});