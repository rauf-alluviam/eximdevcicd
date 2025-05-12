import express from "express";
import Elock from "../../../model/srcc/Directory_Management/Elock.mjs";
import { authenticateJWT } from "../../../auth/auth.mjs";

const router = express.Router();

// Create a new Elock
router.post("/api/elock/create-elock",authenticateJWT,  async (req, res) => {
  try {
    const { FAssetID, FAgentGUID, AssetGUID, ElockCode } = req.body;
    const newElock = new Elock({ FAssetID, FAgentGUID, AssetGUID, ElockCode });
    await newElock.save();
    res
      .status(201)
      .json({ message: "Elock created successfully", data: newElock });
  } catch (error) {
    console.error("Error creating Elock:", error);
    res.status(500).json({ message: "Error creating Elock", error });
  }
});

// Read all Elocks
router.get("/api/elock/get-elocks",authenticateJWT,  async (req, res) => {
  try {
    const elocks = await Elock.find();
    res
      .status(200)
      .json({ message: "Elocks fetched successfully", data: elocks });
  } catch (error) {
    console.error("Error fetching Elocks:", error);
    res.status(500).json({ message: "Error fetching Elocks", error });
  }
});

// Read a single Elock by ID
router.get("/api/elock/get-elock/:id",authenticateJWT, async (req, res) => {
  try {
    const { id } = req.params;
    const elock = await Elock.findById(id);
    if (!elock) {
      return res.status(404).json({ message: "Elock not found" });
    }
    res
      .status(200)
      .json({ message: "Elock fetched successfully", data: elock });
  } catch (error) {
    console.error("Error fetching Elock:", error);
    res.status(500).json({ message: "Error fetching Elock", error });
  }
});

// Update an Elock
router.put("/api/elock/update-elock/:id",authenticateJWT,  async (req, res) => {
  try {
    const { id } = req.params;
    const { FAssetID, FAgentGUID, AssetGUID, ElockCode } = req.body;
    const updatedElock = await Elock.findByIdAndUpdate(
      id,
      { FAssetID, FAgentGUID, AssetGUID, ElockCode },
      { new: true }
    );
    if (!updatedElock) {
      return res.status(404).json({ message: "Elock not found" });
    }
    res
      .status(200)
      .json({ message: "Elock updated successfully", data: updatedElock });
  } catch (error) {
    console.error("Error updating Elock:", error);
    res.status(500).json({ message: "Error updating Elock", error });
  }
});

// Delete an Elock
router.delete("/api/elock/delete-elock/:id",authenticateJWT,  async (req, res) => {
  try {
    const { id } = req.params;
    const deletedElock = await Elock.findByIdAndDelete(id);
    if (!deletedElock) {
      return res.status(404).json({ message: "Elock not found" });
    }
    res
      .status(200)
      .json({ message: "Elock deleted successfully", data: deletedElock });
  } catch (error) {
    console.error("Error deleting Elock:", error);
    res.status(500).json({ message: "Error deleting Elock", error });
  }
});

export default router;
