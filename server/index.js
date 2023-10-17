const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const fs = require('fs');

require("dotenv").config();

const app = express();
const port = 3000;

// Middleware for file uploads
app.use(fileUpload());

// Serve static files (optional)
app.use(express.static(path.join(__dirname, "uploads")));

// Allow CORS for all routes
app.use(cors());

/* ImageKit SDK initialization */
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

app.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  // The uploaded file will be available as req.files.<input_field_name>
  const uploadedFile = req.files.file;

  if (!uploadedFile) {
    return res.status(400).json({ message: "Invalid 'file' key sent" });
  }

  const uploadDir = path.join(__dirname, "uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // Move the file to the desired directory
  const uploadPath = path.join(uploadDir, uploadedFile.name);

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err });
    }

    res.json({ message: "File uploaded successfully" });
  });
});

app.get("/auth", async (req, res) => {
  res.send(imagekit.getAuthenticationParameters());
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
