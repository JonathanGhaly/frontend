import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
    productId: string;
    name: string;
    image?: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];

    addItem: (item: CartItem) => void;

    removeItem: (productId: string) => void;

    increaseQuantity: (productId: string) => void;

    decreaseQuantity: (productId: string) => void;

    clear: () => void;

    totalItems: () => number;

    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) =>
                set((state) => {
                    const existing = state.items.find(
                        (x) => x.productId === item.productId
                    );

                    if (existing) {
                        return {
                            items: state.items.map((x) =>
                                x.productId === item.productId
                                    ? {
                                          ...x,
                                          quantity:
                                              x.quantity +
                                              item.quantity,
                                      }
                                    : x
                            ),
                        };
                    }

                    return {
                        items: [...state.items, item],
                    };
                }),

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter(
                        (x) => x.productId !== id
                    ),
                })),

            increaseQuantity: (id) =>
                set((state) => ({
                    items: state.items.map((x) =>
                        x.productId === id
                            ? {
                                  ...x,
                                  quantity: x.quantity + 1,
                              }
                            : x
                    ),
                })),

            decreaseQuantity: (id) =>
                set((state) => ({
                    items: state.items
                        .map((x) =>
                            x.productId === id
                                ? {
                                      ...x,
                                      quantity:
                                          x.quantity - 1,
                                  }
                                : x
                        )
                        .filter((x) => x.quantity > 0),
                })),

            clear: () =>
                set({
                    items: [],
                }),

            totalItems: () =>
                get().items.reduce(
                    (sum, item) =>
                        sum + item.quantity,
                    0
                ),

            totalPrice: () =>
                get().items.reduce(
                    (sum, item) =>
                        sum +
                        item.quantity * item.price,
                    0
                ),
        }),
        {
            name: "shopiy-cart",
        }
    )
);
