export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const contain = state.cart.findIndex((item) => {
        return item._id == action.payload._id;
      });
      if (contain === -1) {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }],
        };
      } else {
        return state;
      }
    case "REM_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };
    default:
      return state;
  }
};
