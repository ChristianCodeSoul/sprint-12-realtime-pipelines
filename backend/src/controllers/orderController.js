const Order = require("../models/Order");
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.product", "title price")
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
        });
    }
};
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email")
            .populate("items.product", "title price");
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid order ID",
        });
    }
};
const createOrder = async (req, res) => {
    try {
        const { user, items, totalAmount } = req.body;
        if (!user || !items || items.length === 0 || totalAmount === undefined) {
            return res.status(400).json({
                success: false,
                message: "User, items and total Amount are required",
            });
        }
        const order = await Order.create({
            user,
            items,
            totalAmount,
        });
        const populatedOrder = await order.populate([
            { path: "user", select: "name email" },
            { path: "items.product", select: "title price" },
        ]);

        const io = req.app.get("io");

        io.to("admins").emit("new-order", {
            message: "New Order Received",
            order: populatedOrder,
        });

        res.status(201).json({
            success: true,
            data: populatedOrder,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create order",
        });
    }
};
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("user", "name email")
            .populate("items.product", "title price");
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to update order",
        });
    }
};
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to delete order",
        });
    }
};
module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};