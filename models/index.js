// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// order does matter

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Product.hasMany(ProductTag, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});
ProductTag.belongsTo(Product, {
  foreignKey: 'product_id',
});
Tag.hasMany(ProductTag, {
  foreignKey: 'tag_id',
  onDelete: 'CASCADE',
})
ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id',
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: ProductTag });
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
