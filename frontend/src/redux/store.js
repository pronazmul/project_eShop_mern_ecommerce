import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducers'
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productTopReducer,
  productUpdateReducer,
} from './reducers/productReducers'
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userProfileUpdateReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productReviewCreate: productCreateReviewReducer,
  productUpdate: productUpdateReducer,
  ProductTopRated: productTopReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
})

const cartItemFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : ''

const initialState = {
  cart: {
    cartItems: cartItemFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
}

// const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
