import {
  GET_CART_ITEMS,
  DELETE_CART_ITEM,
  INCREASE_QUANTITY,
  DECREMENT_QTY,
} from "../actions/types";

const initialState = {
  cartItems: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS:
      let arr = action.payload === undefined ? [] : action.payload;
      let result = arr.reduce((cartAcc, product) => {
        cartAcc.push({
          ...product,
          // quantity: parseInt(product.quantity) + 1,
          sum: parseInt(product.price) * parseInt(product.quantity),
        });
        return cartAcc;
      }, []);

      console.log(result);
      return {
        ...state,
        cartItems: result,
      };
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case INCREASE_QUANTITY:
      // console.log("Hello" + action.productId)
      if (
        state.cartItems.findIndex(
          (product) => product.id === action.productId
        ) !== -1
      ) {
        const cartItems = state.cartItems.reduce((cartAcc, product) => {
          if (product.id === action.productId) {
            // console.log('price: '+product.mrp+'Qty: '+product.quantity)
            cartAcc.push({
              ...product,
              quantity: parseInt(product.quantity) + 1,
              sum: parseInt(product.price) * (parseInt(product.quantity) + 1),
            }); // Decrement qty
          } else {
            cartAcc.push(product);
          }

          return cartAcc;
        }, []);

        return { ...state, cartItems };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...action.product,
            quantity: action.quantity,
            sum: action.product.mrp * action.quantity,
          },
        ],
      };
    case DECREMENT_QTY:
      // console.log("Hello" + action.productId)
      if (
        state.cartItems.findIndex(
          (product) => product.id === action.productId
        ) !== -1
      ) {
        const cartItems = state.cartItems.reduce((cartAcc, product) => {
          if (product.id === action.productId && product.quantity > 1) {
            // console.log('price: '+product.mrp+'Qty: '+product.quantity)
            cartAcc.push({
              ...product,
              quantity: parseInt(product.quantity) - 1,
              sum: parseInt(product.price) * (parseInt(product.quantity) - 1),
            }); // Decrement qty
          } else {
            cartAcc.push(product);
          }

          return cartAcc;
        }, []);

        return { ...state, cartItems };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...action.product,
            quantity: action.quantity,
            sum: action.product.mrp * action.quantity,
          },
        ],
      };
    default:
      return state;
  }
}
