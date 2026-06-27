export interface CouponResult {
    valid: boolean;

    discount: number;
}

export const validateCoupon = async (
    code: string
) => {
    void code;

    return {
        valid: false,
        discount: 0,
    } satisfies CouponResult;
};
