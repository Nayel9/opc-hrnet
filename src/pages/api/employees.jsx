import { connectToDatabase } from '../../lib/mongo';

const getEmployees = async (req, res) => {
  if (req.method === 'GET') {
    const db = await connectToDatabase();
    if (!db) {
      res.status(500).json({ error: 'Failed to connect to database' });
      return;
    }
    const employees = await db.collection('employees').find({}).toArray();
    res.status(200).json(employees);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}

const createEmployee = async (req, res) => {
  if (req.method === 'POST') {
    const db = await connectToDatabase();
    if (!db) {
      res.status(500).json({ error: 'Failed to connect to database' });
      return;
    }
    const newEmployee = req.body;
    const result = await db.collection('employees').insertOne(newEmployee);
    res.status(201).json({ _id: result.insertedId, ...newEmployee });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}

const updateEmployee = async (req, res) => {
  if (req.method === 'PATCH') {
    const db = await connectToDatabase();
    if (!db) {
      res.status(500).json({ error: 'Failed to connect to database' });
      return;
    }
    const { id } = req.query;
    const updatedEmployee = req.body;
    const result = await db.collection('employees').updateOne({ _id: id }, { $set: updatedEmployee });
    if (result.modifiedCount === 0) {
      res.status(404).json({ error: `Employee with id ${id} not found` });
      return;
    }
    res.status(200).json({ _id: id, ...updatedEmployee });
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}

const deleteEmployee = async (req, res) => {
  if (req.method === 'DELETE') {
    const db = await connectToDatabase();
    if (!db) {
      res.status(500).json({ error: 'Failed to connect to database' });
      return;
    }
    const { id } = req.query;
    const result = await db.collection('employees').deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: `Employee with id ${id} not found` });
      return;
    }
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}

async function handler (req, res){
  switch (req.method) {
    case 'GET':
      await getEmployees(req, res);
      break;
    case 'POST':
      await createEmployee(req, res);
      break;
    case 'PATCH':
      await updateEmployee(req, res);
      break;
    case 'DELETE':
      await deleteEmployee(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).end(`Méthode ${req.method} non autorisée`);
      break;
  }
}

export default handler;