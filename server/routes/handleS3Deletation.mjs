import express from "express";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const router = express.Router();
const s3 = new S3Client({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: () =>
    Promise.resolve({
      accessKeyId: process.env.REACT_APP_ACCESS_KEY || "",
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY || "",
    }),
});
router.post("/api/delete-s3-file", async (req, res) => {
  const rawKey = req.body.key;
  if (!rawKey) {
    return res.status(400).json({ message: "Missing file key" });
  }

  const key = decodeURIComponent(rawKey);

  if (
    !process.env.REACT_APP_ACCESS_KEY ||
    !process.env.REACT_APP_SECRET_ACCESS_KEY
  ) {
    throw new Error("Missing AWS credentials in environment variables.");
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: key,
  });

  try {
    console.log("Deleting key:", key); // Confirm this matches your actual S3 object key
    await s3.send(command);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.error("S3 deletion error:", err);
    res.status(500).json({ message: "Error deleting file from S3" });
  }
});

export default router;
