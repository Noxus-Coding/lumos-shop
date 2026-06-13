const productService = require('../services/productService');

async function create(req, res) {

    try {
        const product = await productService.createProduct(req.body);

        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating product', error: error.message });
    }  
}

async function index(req, res) {
    try {
        const products = await productService.listProducts(req.query);
        
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
}

async function show(req, res) {

    try {
        const product = await productService.getProductById(req.params.id);

        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
}

async function listProducts({ categoryId } = {}) {
    const where = {};

    if (categoryId) {
        where.categoryId = Number(categoryId);
    }

    const products = await prisma.product.findMany({
        where,
        include: {
            category: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return products;
}

async function update(req, res) {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        return res.json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating product', error: error.message });
    }
}

async function remove(req, res) {
    try {
        const result = await productService.deleteProduct(req.params.id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
}

module.exports = {
    create,
    index,
    show,
    listProducts,
    update,
    remove
}