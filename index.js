import dotenv from "dotenv";
import readline from "readline";
import { Client, Databases } from "appwrite";

dotenv.config();
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.PROJECT_ID);

const databases = new Databases(client);

let id = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// LIST DOCUMENTS
async function listDocuments() {
  try {
    const documents = await databases.listDocuments(
      process.env.DATABASE_ID,
      process.env.COLLECTION_ID
    );
    return documents.total;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

//   CREATE
async function createDocument(name) {
  const id = await listDocuments();
  const newId = id + 1;
  const promise = databases.createDocument(
    process.env.DATABASE_ID,
    process.env.COLLECTION_ID,
    { Name: name }
  );

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );
}
//   READ
async function getDocument(id) {
  const promise = await databases.getDocument(
    process.env.DATABASE_ID,
    process.env.COLLECTION_ID,
    id
  );

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );
}

// UPDATE
async function updateDocument(id, name) {
  const promise = await databases.updateDocument(
    process.env.DATABASE_ID,
    process.env.COLLECTION_ID,
    id,
    { Name: name }
  );

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );
}

// DELETE
async function deleteDocument(id) {
  const promise = await databases.deleteDocument(
    process.env.DATABASE_ID,
    process.env.COLLECTION_ID,
    id
  );

  promise.then(
    function (response) {
      console.log(response); // Success
    },
    function (error) {
      console.log(error); // Failure
    }
  );
}

console.log("--CRUD APPLICATION USING APPWRITE--");
console.log("SELECT OPERATION");
console.log("1.CREATE\n2.READ\n3.UPDATE\n4.DELETE\n5.Exit");
rl.question("Enter your choice:", (choice) => {
  switch (choice) {
    case "1":
      rl.question("Enter Name:", (name) => {
        createDocument(name);
      });
      break;
    case "2":
      rl.question("Enter ID:", (id) => {
        getDocument(id);
      });
      break;
    case "3":
      rl.question("Enter ID: \n Enter Name: ", (id, name) => {
        updateDocument(id, name);
      });
      break;
    case "4":
      rl.question("Enter ID: ", (id) => {
        deleteDocument(id);
      });
    case "5":
      process.exit(0);
    default:
      console.log("Invalid Entry");
      rl.close(); // Close the readline interface if an invalid entry is made
      break;
  }
});
