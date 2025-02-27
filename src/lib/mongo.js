import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://powels912:WWN9Fa9C4xP8fVFu@mydb.qx96d.mongodb.net/?retryWrites=true&w=majority&appName=myDb";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let cachedDb = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    cachedDb = client.db("HrnetP14");
    return cachedDb;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}