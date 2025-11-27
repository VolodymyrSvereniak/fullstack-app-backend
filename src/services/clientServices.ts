import { query } from "../db.js";

interface Client {
  name: string;
  email: string;
  job: string;
  rate: number;
  is_active: boolean;
}

export const getClients = async () => {
  const clients = await query({
    sql: "SELECT * FROM public.clients_tb ORDER BY id ASC",
  });
  return clients.rows;
};

export const createClient = async (client: Client) => {
  const { name, email, job, rate, is_active } = client;

  const clients = await query({
    sql: "INSERT INTO clients_tb (name, email, job, rate, is_active) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    params: [name, email, job, rate, is_active],
  });
  return clients.rows[0];
};

export const updateClient = async (id: number, client: Client) => {
  const { name, email, job, rate, is_active } = client;
  const clients = await query({
    sql: "UPDATE clients_tb SET name = $1, email = $2, job = $3, rate = $4, is_active = $5 WHERE id = $6 RETURNING *",
    params: [name, email, job, rate, is_active, id],
  });
  return clients.rows[0];
};

export const updateClientStatus = async (id: number, is_active: boolean) => {
  const clients = await query({
    sql: "UPDATE clients_tb SET is_active = $1 WHERE id = $2 RETURNING is_active",
    params: [is_active, id]
  });
  return clients.rows[0];
};

export const deleteClient = async (id: number) => {
  const clients = await query({
    sql: "DELETE FROM clients_tb WHERE id = $1 RETURNING *",
    params: [id],
  });
  return clients.rows[0];
};

export const searchClientsByName = async (name: string) => {
  const clients = await query({
    sql: "SELECT * FROM public.clients_tb WHERE name ILIKE $1 ORDER BY id ASC",
    params: [`%${name}%`],
  });
  return clients.rows;
};
