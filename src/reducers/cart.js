import {DECREMENT_QTY, DELETE_CART_ITEM, GET_CART_ITEMS, INCREASE_QUANTITY,} from "../actions/types";
import {quantity} from "../actions/cartAction";

const initialState = {
    medItems: [],
    testItems: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CART_ITEMS:
            let meds = action.payload.med.med_list === undefined ? [] : action.payload.med.med_list;
            let medItems = meds.reduce((cartAcc, product) => {
                cartAcc.push({
                    ...product,
                    // quantity: parseInt(product.quantity) + 1,
                    sum: parseInt(product.price) * parseInt(product.quantity),
                });
                return cartAcc;
            }, []);

            let tests = action.payload.test.test_list === undefined ? [] : action.payload.test.test_list;
            let testItems = tests.reduce((cartAcc, product) => {
                cartAcc.push({
                    ...product,
                    // quantity: parseInt(product.quantity) + 1,
                    sum: parseInt(product.price) * parseInt(product.quantity),
                });
                return cartAcc;
            }, []);
            return {
                ...state,
                medItems,
                testItems,
            };
        case DELETE_CART_ITEM:
            return {
                ...state,
                medItems: state.medItems.filter((item) => item.id !== action.payload),
                testItems: state.testItems.filter((item) => item.id !== action.payload),
            };
        case INCREASE_QUANTITY:
           // console.log("Hello" + action.productId)
            if (state.medItems.findIndex((product) => product.id === action.productId) !== -1) {
                const medItems = state.medItems.reduce((cartAcc, product) => {
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

                return {...state, medItems: medItems};
            }
            if (state.testItems.findIndex((product) => product.id === action.productId) !== -1) {
                const testItems = state.testItems.reduce((cartAcc, product) => {
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

                return {...state, testItems: testItems};
            }
                return {
                ...state,
                    medItems: [
                        ...state.medItems,{
                            ...action.product,
                            quantity: action.quantity,
                            sum: action.product.mrp * action.quantity,
                        }
                    ],
                    testItems: [
                        ...state.testItems,{
                            ...action.product,
                            quantity: action.quantity,
                            sum: action.product.mrp * action.quantity,
                        }
                    ],

                };

        case DECREMENT_QTY:
            // console.log("Hello" + action.productId)
            if (state.medItems.findIndex((product) => product.id === action.productId) !== -1) {
                const medItems = state.medItems.reduce((cartAcc, product) => {
                    if (product.id === action.productId) {
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

                return {...state, medItems: medItems};
            }
            if (state.testItems.findIndex((product) => product.id === action.productId) !== -1) {
                const testItems = state.testItems.reduce((cartAcc, product) => {
                    if (product.id === action.productId) {
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

                return {...state, testItems: testItems};
            }
            return {
                ...state,
                medItems: [
                    ...state.medItems,{
                        ...action.product,
                        quantity: action.quantity,
                        sum: action.product.mrp * action.quantity,
                    }
                ],
                testItems: [
                    ...state.testItems,{
                        ...action.product,
                        quantity: action.quantity,
                        sum: action.product.mrp * action.quantity,
                    }
                ],

            };
        default:
            return state;
    }
}
