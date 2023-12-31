const { Tag, Product } = require('../models');

async function checkTag(id) {
    try {
        const tag = await Tag.findByPk(id);
            if(!tag) {
                throw new Error("tag does not exist");
            }
        return tag;
    } catch (error) {
        console.log(error);
        throw Error(error);
    }
}

async function getTags(req, res) {
    try {
        const tag = await Tag.findAll({
            include: Product
        });
        return res.json(tag);
    } catch (error) {
        console.log(error);
        return res.status(500);
    }
}

async function getTagByID(req, res) {
    try {
        await checkTag(req.params.id)
        const tag = await Tag.findByPk(req.params.id, {
            include: Product
        });
        return res.json(tag);
    } catch (error) {
        console.log(error);
        return res.status(500).send("tag had a problem being found");
    }
}

async function postTag(req, res) {
    try {
        const tag = await Tag.create({
            tag_name: req.body.tag_name
        });
        return res.json(tag.toJSON());
    } catch (error) {
        console.log(error);
        return res.status(500).send("tag had a problem being created");
    }
}

async function updateTag(req, res) {
    try {
        let tag = await checkTag(req.params.id)
        tag = await tag.update({
            tag_name: req.body.tag_name
        });
        console.log("updated tag");
        tag = await Tag.findByPk(req.params.id, {
            include: Product
        });
        return res.json(tag);
    } catch (error) {
        console.log(error);
        return res.status(500).send("tag had a problem being updated");
    }
}

async function deleteTag(req, res) {
    try {
        const tag = await checkTag(req.params.id)
        await tag.destroy();
        console.log("deleted tag");
        // console.log(tag);
        return res.json(tag);
    } catch (error) {
        console.log(error);
        return res.status(500).send("tag had a problem being deleted");
    }
}

module.exports = {
    getTags,
    getTagByID,
    postTag,
    updateTag,
    deleteTag
}