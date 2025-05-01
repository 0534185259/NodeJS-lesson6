import express from 'express';
import fs from 'fs/promises'; 
const router = express.Router();

const readUsersFromFile = async () => {
    
        const data = await fs.readFile('users.json', 'utf-8');
        return JSON.parse(data);
}

const writeUsersToFile = async (users) => {
  
      await fs.writeFile('users.json', JSON.stringify(users, null, 2));

}

router.post('/register', async (req, res) => {
    const { username, password } = req.body; 

    const users = await readUsersFromFile();
    
    const user = users.find(user => user.nameUser === username); 
    if (user) {
        return res.status(400).send({ message: 'User already exists' });
    }

    const newUser = { username, password };
    users.push(newUser);
    await writeUsersToFile(users);

    res.status(201).send({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;  

    const users = await readUsersFromFile();

    const user = users.find(user => user.nameUser === username && user.password === password); 
    
    if (user) {
        res.send({ message: 'User logged in successfully' });
    } else {
        res.status(401).send({ message: 'Invalid username or password' });
    }
});

export default router;
