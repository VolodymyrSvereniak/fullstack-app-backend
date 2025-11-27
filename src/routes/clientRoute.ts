import express from "express";
import * as clientController from "../controllers/clientController.js";

const router = express.Router();

router.get("/clients/search", clientController.searchClients);

router.get("/clients", clientController.getClients);
router.post("/clients", clientController.createClient);
router.put("/clients/:id", clientController.updateClient);
router.patch("/clients/:id", clientController.updateClientStatus);
router.delete("/clients/:id", clientController.deleteClient);

export default router;
