import { create } from "zustand";
export const useStore = create((set) => ({
  //cart

  cart: {
    pizzas: [],
  },

  // add pizza in cart

  addPizza: (data) =>
    set((state) => ({
      cart: {
        pizzas: [...state.cart.pizzas, data],
      },
    })),

  // remove pizza

  // removeFromCart: (index) => {
  //   const { pizzas } = get().cart;
  //   pizzas.splice(index, 1);
  //   set({ cart: { pizzas: pizzas } });
  // },
  // }));

  removeFromCart: (index) =>
    set((state) => ({
      cart: {
        pizzas: state.cart.pizzas.filter((_, i) => i != index),
      },
    })),
  resetCart: () =>
    set(() => ({
      cart: {
        pizzas: [],
      },
    })),
}));
