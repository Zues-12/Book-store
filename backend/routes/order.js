const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    const outOfStockBooks = []; // Array to store IDs of out-of-stock books


    for (const orderData of order) {
      const bookId = orderData._id;
      const book = await Book.findById(bookId);
      if (book.qty < 1) {
        outOfStockBooks.push(bookId); // Add book ID to out-of-stock list
        await User.findByIdAndUpdate(id, {
          $pull: { cart: orderData._id },
        });}
    }
    if (outOfStockBooks.length > 0) {
      const outOfStockBookNames = await Promise.all(
        outOfStockBooks.map(async (bookId) => {
          const book = await Book.findById(bookId);
          return book.title; 
        })
      );
      const formattedOutOfStockList = outOfStockBookNames.join(", ");
      return res.status(421).json({
        message: `Order cannot be placed. The following books are out of stock: ${formattedOutOfStockList}`,
      });
    }



    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();
      //saving Order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });
      //decrement Qty
      await Book.findByIdAndUpdate(orderData._id, {
        $inc: { qty: -1, }
      })
      //clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get order history of particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });

    const ordersData = userData.orders.reverse();
    return res.json({
      status: "Success",
      data: ordersData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get-all-orders ---admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//update order --admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.json({
      status: "Success",
      message: "Status Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});
module.exports = router;
