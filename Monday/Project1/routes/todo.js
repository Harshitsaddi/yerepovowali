router.delete('/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    todos = todos.filter((t) => t.id !== todoId);
    res.json({ message: "Deleted" });
});

const router = Router();

module.exports = router;
