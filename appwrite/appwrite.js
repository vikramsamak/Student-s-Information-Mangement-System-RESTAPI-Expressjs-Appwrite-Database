import dotenv from "dotenv";
import { Client, Databases } from "appwrite";
dotenv.config();

const client = new Client();

client
  .setEndpoint(process.env.ENDPOINT)
  .setProject(process.env.PROJECT_ID);

export const databases = new Databases(client);




