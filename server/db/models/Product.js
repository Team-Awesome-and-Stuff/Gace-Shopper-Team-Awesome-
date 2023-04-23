const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue:
            'https://jeffersonvalleymall.com/images/default-source/store-logos/store-logos/as-seen-on-tv.tmb-t-400x400.png?sfvrsn=f8ff2078_7',
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    orderId:{
        type: Sequelize.INTEGER,
    }
})

//instance methods

// Product.prototype.updateProduct = async function (updates) {
//     Object.keys(updates).forEach((prop) => {
//         this[prop] = updates[prop]
//     })
//     await this.save()
//     return this
// }

module.exports = Product
