const { Category, Product } = require('../models');

async function checkCategory(id) {
    try {
        const category = await Category.findByPk(id);
            if(!category) {
                throw new Error("category does not exist");
            }
        return category;
    } catch (error) {
        console.log(error);
        throw Error(error);
    }
}

async function getCategories(req, res) {
    try {
        const categories = await Category.findAll({
            include: Product
        });
        return res.json(categories);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

async function getCategoryByID(req, res) {
    try {
        await checkCategory(req.params.id)
        const category = await Category.findByPk(req.params.id, {
            include: Product
        });
        return res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(500).send("category had a problem being found");
    }
}

async function postCategory(req, res) {
    try {
        const category = await Category.create({
            category_name: req.body.category_name
        });
        return res.json(category.toJSON());
    } catch (error) {
        console.log(error);
        return res.status(500).send("category had a problem being created");
    }
}

async function updateCategory(req, res) {
    try {
        let category = await checkCategory(req.params.id)
        category = await category.update({
            category_name: req.body.category_name
        });
        console.log("updated category");
        category = await Category.findByPk(req.params.id, {
            include: Product
        });
        return res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(500).send("category had a problem being updated");
    }
}

async function deleteCategory(req, res) {
    try {
        const category = await checkCategory(req.params.id)
        await category.destroy();
        console.log("deleted category");
        // console.log(category);
        return res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(500).send("category had a problem being deleted");
    }
}

module.exports = {
    getCategories,
    getCategoryByID,
    postCategory,
    updateCategory,
    deleteCategory
}