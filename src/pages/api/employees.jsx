import NextCors from 'nextjs-cors';
import { connectToDatabase } from "../../lib/mongo";
import { ObjectId } from "mongodb";

async function handler(req, res) {
    // Run the cors middleware
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: ['http://localhost:5173', 'http://localhost:5173/employees-table'],// Remplacez par l'URL de votre frontend
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    // Connectez-vous à la base de données
    const db = await connectToDatabase();
    if (!db) {
        res.status(500).json({ error: "Failed to connect to database" });
        return;
    }

    switch (req.method) {
        case 'GET':
            await getEmployees(db, req, res);
            break;
        case 'POST':
            await createEmployee(db, req, res);
            break;
        case 'DELETE':
            await deleteEmployee(db, req, res);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

async function getEmployees(db, req, res) {
    const employees = await db.collection("employees").find({}).toArray();
    res.status(200).json(employees);
}

async function createEmployee(db, req, res) {
    const newEmployee = req.body;
    const result = await db.collection("employees").insertOne(newEmployee);
    res.status(201).json({ _id: result.insertedId, ...newEmployee });
}


async function deleteEmployee(db, req, res) {
    const { _id } = req.body; // L'ID est maintenant dans le corps de la requête
    if (!_id) {
        res.status(400).json({ error: "Employee ID is required" });
        return;
    }

    try {
        const result = await db.collection("employees").deleteOne({ _id: new ObjectId(_id) });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: `Employee with id ${_id} not found` });
            return;
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({ error: "Failed to delete employee" });
    }
}

export default handler;
