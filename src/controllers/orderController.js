import {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
  } from "../models/order.js";
  
  export const fetchOrders = async (req, res) => {
    try {
      const data = await getAllOrders();
      res.status(200).json({
        data,
        message: "Orders fetched successfully",
        error: null,
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Failed to fetch orders",
        error: error.message,
      });
    }
  };
  
  export const fetchOrderById = async (req, res) => {
    try {
      const data = await getOrderById(req.params.id);
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
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Failed to fetch order",
        error: error.message,
      });
    }
  };
  
  export const createNewOrder = async (req, res) => {
    try {
      const data = await createOrder(req.body);
      res.status(201).json({
        data,
        message: "Order created successfully",
        error: null,
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Failed to create order",
        error: error.message,
      });
    }
  };
  
  export const updateExistingOrder = async (req, res) => {
    try {
      const data = await updateOrder(req.params.id, req.body);
      res.status(200).json({
        data,
        message: "Order updated successfully",
        error: null,
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Failed to update order",
        error: error.message,
      });
    }
  };
  
  export const deleteExistingOrder = async (req, res) => {
    try {
      await deleteOrder(req.params.id);
      res.status(200).json({
        data: null,
        message: "Order deleted successfully",
        error: null,
      });
    } catch (error) {
      res.status(500).json({
        data: null,
        message: "Failed to delete order",
        error: error.message,
      });
    }
  };
  