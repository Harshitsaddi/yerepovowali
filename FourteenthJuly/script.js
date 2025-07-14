const express = require('express');
const app = express();
const taskRoutes = require('./routes/tasks');

app.use(express.json());
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
    res.send('Todo App Backend is Running ✅');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
