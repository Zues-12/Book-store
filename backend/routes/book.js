const router = require("express").Router();
const Book = require("../models/book");
const multer = require('multer');
const { authenticateToken } = require("./userAuth");
const User = require("../models/user");
const path = require('path');



// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/uploads/'); // Directory where images will be saved
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });




//create book -- admin
router.post("/add-book", authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const basename = path.basename(req.file.path)

    const existingBook = await Book.findOne({ title: req.body.title, author: req.body.author });

    if (existingBook) {
      return res.status(420).json({
        message: "Book already exists! You can change the quantity by editing the already existing book."
      });
    }

    const book = new Book({
      image: basename, // Path to the uploaded image
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
      category: req.body.category,
      qty: req.body.qty,

    });
    await book.save();
    return res.json({
      status: "Success",
      message: "Book added successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//update book --admin
router.put("/update-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndUpdate(bookid, {
      url: req.body.url,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      desc: req.body.desc,
      language: req.body.language,
      category: req.body.category,
      qty: req.body.qty,

    });

    return res.json({
      status: "Success",
      message: "Book Updated successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//delete book --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
  try {
    const { bookid } = req.headers;
    await Book.findByIdAndDelete(bookid);
    return res.json({
      status: "Success",
      message: "Book deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get all books
router.get("/get-all-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get recently added books
router.get("/get-recent-books", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 }).limit(4);
    return res.json({
      status: "Success",
      data: books,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});


//get books by same author
router.get("/get-books-by-author", async (req, res) => {

  try {
    const { bookid } = req.headers;
    const book = await Book.findById(bookid);
    const author = book.author;
    const books = await Book.find({ author, _id: { $ne: bookid } }).sort({ createdAt: -1 }).limit(8);
    return res.json({
      status: "Got books by same author successfully",
      data: books,
    });
  }
  catch (error) {
    res.status(500).json({ message: "An error occured" });
  }
});


//how many users has an item in a cart
router.get("/cart-item-count", async (req, res) => {
  try {
    const bookid = req.header("bookid");



    // Count the occurrences of the book in all user carts
    const users = await User.find({ cart: bookid }).select("cart");
    const count = users.reduce((acc, user) => {
      return acc + user.cart.filter(item => item.toString() === bookid).length;
    }, 0);

    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//get books from same category
router.get("/get-book-by-category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const book = await Book.find({ category }).sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
  
});


//search bar
router.get("/search/:key", async (req, res) => {
  try {
    let key = req.params.key;
    let regex = new RegExp(key, "i"); // Create case-insensitive regular expression
    let book = await Book.find({
      "$or": [
        {"title": { $regex: regex }},
        {"author": { $regex: regex }},
      ]
    }).sort({ createdAt: -1 }).limit(6);

    return res.send(book);
  }
  catch (error) {
    return res.status.json({ message: "An error occured" });
  }
});




module.exports = router;
