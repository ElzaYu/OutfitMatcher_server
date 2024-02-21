require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// const warehouses = require("./routes/warehouses.js");
// const inventories = require("./routes/inventories.js");

const app = express();
const PORT = process.env.PORT || 8081;
// const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors());
app.use(express.json());

// app.use("/api/warehouses", warehouses);
// app.use("/api/inventories", inventories);

// Setup Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// app.post(`/upload`, upload.single("image"), (req, res) => {
//   console.log("Request received");
//   console.log(req.file);
//   res.send("Upload successful"); // Add this line
// });

// Route for handling file upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imagePath = path.join(__dirname, "public/images", req.file.filename);
  // You can do further processing here, e.g., save the file path to a database
  return res
    .status(200)
    .json({ message: "File uploaded successfully", imagePath });
});

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
