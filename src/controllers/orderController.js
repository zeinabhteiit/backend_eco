import Order from "../models/order.js";

export const fetchOrders = (req, res) => {
  Order.getAllOrders()
    .then((data) => {
      res.status(200).json({
        data,
        message: "Orders fetched successfully",
        error: null,
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: null,
        message: "Failed to fetch orders",
        error: error.message,
      });
    });
};

export const fetchOrderById = (req, res) => {
  Order.getOrderById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          data: null,
          message: "Order not found",
          error: null,
        });
      }
      res.status(200).json({
        data,
        message: "Order fetched successfully",
        error: null,
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: null,
        message: "Failed to fetch order",
        error: error.message,
      });
    });
};

export const createNewOrder = (req, res) => {
  Order.createOrder(req.body)
    .then((data) => {
      res.status(201).json({
        data,
        message: "Order created successfully",
        error: null,
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: null,
        message: "Failed to create order",
        error: error.message,
      });
    });
};

export const updateExistingOrder = (req, res) => {
  Order.updateOrder(req.params.id, req.body)
    .then((data) => {
      res.status(200).json({
        data,
        message: "Order updated successfully",
        error: null,
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: null,
        message: "Failed to update order",
        error: error.message,
      });
    });
};

export const deleteExistingOrder = (req, res) => {
  Order.deleteOrder(req.params.id)
    .then(() => {
      res.status(200).json({
        data: null,
        message: "Order deleted successfully",
        error: null,
      });
    })
    .catch((error) => {
      res.status(500).json({
        data: null,
        message: "Failed to delete order",
        error: error.message,
      });
    });
};

