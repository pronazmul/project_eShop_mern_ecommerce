// External Modules:
const asyncHandler = require('express-async-handler')
const createHttpError = require('http-errors')

// Internal Modules:
const Order = require('../models/orderModel')

/**
 * @desc   Place an order
 * @Route  POST api/orders
 * @access private
 */
const addNewOrder = asyncHandler(async (req, res, next) => {
  if (req.body.orderItems.length > 0) {
    const order = new Order({ ...req.body, user: req.user.id })
    const createOrder = await order.save()
    res.status(201).json(createOrder)
  } else {
    next(createHttpError(400, 'No Order Items Found'))
  }
})

/**
 * @desc   GET Order By ID
 * @Route  GET api/orders
 * @access private
 */
const getOrderByID = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email avatar'
  )
  if (order) {
    res.status(200).json(order)
  } else {
    next(createHttpError(404, 'No Order Found'))
  }
})

/**
 * @desc   Update Order With Payment
 * @Route  PUT api/orders/:id/pay
 * @access private
 */
const paymentUpdate = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updateOrder = await order.save()
    res.status(200).json(updateOrder)
  } else {
    next(createHttpError(404, 'No Order Found'))
  }
})

/**
 * @desc   Update Order With Delivery
 * @Route  PUT api/orders/:id/deliver
 * @access private/Admin
 */
const deliveryUpdate = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    const updateOrder = await order.save()
    res.status(200).json(updateOrder)
  } else {
    next(createHttpError(404, 'No Order Found'))
  }
})

/**
 * @desc   Get Logged in user all orders
 * @Route  GET api/orders/myorders
 * @access private
 */
const getMyOrders = asyncHandler(async (req, res, next) => {
  console.log(req.user)
  const order = await Order.find({ user: req.user.id })
  if (order) {
    res.status(200).json(order)
  } else {
    next(createHttpError(404, 'No Order Found'))
  }
})

/**
 * @desc   Get All orders
 * @Route  GET api/orders/
 * @access private/Admin
 */
const getAllOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.find({}).populate('user', 'id name')
  if (order) {
    res.status(200).json(order)
  } else {
    next(createHttpError(404, 'No Order Found'))
  }
})

// Module Export:
module.exports = {
  addNewOrder,
  getOrderByID,
  paymentUpdate,
  getMyOrders,
  getAllOrder,
  deliveryUpdate,
}
