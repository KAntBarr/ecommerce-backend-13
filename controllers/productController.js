const { Product, Category, Tag, ProductTag } = require('../models');

async function checkProduct(id) {
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            throw new Error("product does not exist");
        }
        return product;
    } catch (error) {
        console.log(error);
        throw Error(error);
    }
}

async function getProducts(req, res) {
    try {
        const product = await Product.findAll({
            include: [
                Category,
                Tag
            ]
        });
        return res.json(product);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

async function getProductByID(req, res) {
    try {
        await checkProduct(req.params.id)
        const product = await Product.findByPk(req.params.id, {
            include: [
                Category,
                Tag
            ]
        });
        return res.json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).send("product had an error being found");
    }
}

async function postProduct(req, res) {
    /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
    try {
        const product = await Product.create({
            product_name: req.body.product_name,
            price: req.body.price,
            stock: req.body.stock,
            tagIds: req.body.tagIds
        });

        const response = {
            newProduct: product,
            newProductTags: []
        }

        if (req.body.tagIds.length) {
            const productTagIdArr = req.body.tagIds.map((tag_id) => {
                return {
                    product_id: product.id,
                    tag_id,
                };
            });
            await ProductTag.bulkCreate(productTagIdArr);
            response.newProductTags = productTagIdArr
            res.status(200).json(response);
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Product and/or product tags had an error being created");
    }
}

async function updateProduct(req, res) {
    // update product data

    try {
        console.log(req.body);
        let product = await checkProduct(req.params.id);
        console.log("product check:", product);
        await product.update({
            product_name: req.body.product_name,
            price: req.body.price,
            stock: req.body.stock,
            tagIds: req.body.tagIds
        });

        product = await checkProduct(req.params.id);

        console.log(product);

        if (req.body.tagIds && req.body.tagIds.length) {

            const productTags = await ProductTag.findAll({
                where: { product_id: req.params.id }
            });

            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });

            // figure out which ones to remove
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            await ProductTag.destroy({ where: { id: productTagsToRemove } });
            await ProductTag.bulkCreate(newProductTags);
        }

        console.log(product);

        product = await Product.findByPk(req.params.id, {
            include: [
                Category,
                Tag
            ]
        });

        return res.json(product);
    } catch (error) {
        console.log(error);
        res.status(400).send("Product had an error updating");
    }



    // Product.update({
    //     product_name: req.body.product_name,
    //     price: req.body.price,
    //     stock: req.body.stock,
    //     tagIds: req.body.tagIds
    // }, {
    //     where: {
    //         id: req.params.id,
    //     },
    // })
    //     .then((product) => {
    //     if (req.body.tagIds && req.body.tagIds.length) {

    //         ProductTag.findAll({
    //             where: { product_id: req.params.id }
    //         }).then((productTags) => {
    //             // create filtered list of new tag_ids
    //             const productTagIds = productTags.map(({ tag_id }) => tag_id);
    //             const newProductTags = req.body.tagIds
    //                 .filter((tag_id) => !productTagIds.includes(tag_id))
    //                 .map((tag_id) => {
    //                     return {
    //                         product_id: req.params.id,
    //                         tag_id,
    //                     };
    //                 });

    //             // figure out which ones to remove
    //             const productTagsToRemove = productTags
    //                 .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
    //                 .map(({ id }) => id);
    //             // run both actions
    //             return Promise.all([
    //                 ProductTag.destroy({ where: { id: productTagsToRemove } }),
    //                 ProductTag.bulkCreate(newProductTags),
    //             ]);
    //         });
    //     }

    //     return res.json(product);
    // })
    //         .catch ((err) => {
    //     // console.log(err);
    //     res.status(400).json(err);
    // });
}

async function deleteProduct(req, res) {
    try {
        const product = await checkProduct(req.params.id)
        await ProductTag.destroy({ where: { id: [req.params.id] } });
        await product.destroy();
        console.log("deleted product");
        // console.log(product);
        return res.json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).send("product had a problem being deleted");
    }
}


module.exports = {
    getProducts,
    getProductByID,
    postProduct,
    updateProduct,
    deleteProduct,

}