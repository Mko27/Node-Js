const classMethod = require('./class-methods/ProductCategory')

module.exports = (sequelize, DataTypes) => {
    const ProductCategory = sequelize.define("ProductCategory", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
        },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }  
    },
    {
        tableName: 'productCategory',
        timesStamp: false
    });
  
    return  classMethod(ProductCategory, sequelize)
  }