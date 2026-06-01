const categoryService = require('../services/categoryService');

async function create(req, res) {
    try {
        const category = await categoryService.createCategory(req.body);

        return res.status(201).json(category);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

async function index(req, res) {
    try {
        const categories = await categoryService.listCategories();

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

async function show(req, res) {
    try {
        const category = await categoryService.getCategoryById(req.params.id);

        return res.status(200).json(category);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);

        return res.status(200).json(category);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

async function remove(req, res) {
    try {
        const category = await categoryService.deleteCategory(req.params.id);

        return res.status(200).json(category);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = {
    create,
    index,
    show,
    update,
    remove,
};