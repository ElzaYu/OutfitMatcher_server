require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const accessoriesRouter = require("./routes/accessories.js");
const topsRouter = require("./routes/tops.js");
const bottomsRouter = require("./routes/bottoms.js");
const shoesRouter = require("./routes/shoes.js");
const favouriteOutfitRouter = require("./routes/favourite_outfits.js");

const PORT = process.env.PORT || 8081;
const CLIENT_URL = process.env.CLIENT_URL;

app.use("/image", express.static("./public/images"));

app.use(cors());
app.use(express.json());

app.use("/matcher/accessories", accessoriesRouter);
app.use("/matcher/tops", topsRouter);
app.use("/matcher/bottoms", bottomsRouter);
app.use("/matcher/shoes", shoesRouter);
app.use("/favouriteoutfit", favouriteOutfitRouter);

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
  const image = req.file.filename;
  const sql = "UPDATE tops SET top_image = ?";
  db.query(sql, [image], (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "Success" });
  });
  // if (!req.file) {
  //   return res.status(400).json({ message: "No file uploaded" });
  // }
  // const imagePath = path.join(__dirname, "public/images", req.file.filename);
  // return res
  //   .status(200)
  //   .json({ message: "File uploaded successfully", imagePath });
});

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
