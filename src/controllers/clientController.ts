import { Request, Response } from "express";
import * as clientService from "../services/clientServices.js";

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await clientService.getClients();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = req.body;

    const newClient = await clientService.createClient(client);
    res.status(200).json(newClient);
  } catch (error) {
    console.error("Error adding client", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const client = req.body;
    const updatedClient = await clientService.updateClient(id, client);

    if (!updatedClient) {
      res.status(404).json({ message: "Client not found" });
      return;
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error updating client", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateClientStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const { is_active } = req.body;
    const updatedClient = await clientService.updateClientStatus(id, is_active)

    if (!updatedClient) {
      res.status(404).json({ message: "Client not found"});
    }
    
    res.status(200).json(updatedClient);
  } catch (error) {
    console.error("Error updating client status", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedClient = await clientService.deleteClient(id);
    if (!deletedClient) {
      res.status(404).json({ message: "Client not found" });
      return;
    }
    res.status(200).json(deletedClient);
  } catch (error) {
    console.error("Error deleting client", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchClients = async (req: Request, res: Response) => {
  try {
    const name = req.query.q;
    const clients = await clientService.searchClientsByName(name as string);
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error searching clients", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
