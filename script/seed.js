'use strict'
// const User = require('../server/db/models/User')
// const Product = require('../server/db/models/Product')
// const Cart = require('../server/db/models/Cart')
// const Order = require('../server/db/models/Order')
// const db = require('../server/db/db')

const { User, Product, Cart, Order, db } = require('../server/db/index')


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
    await db.sync({ force: true }) // clears db and matches models to tables
    console.log('db synced!')

    // Creating Users
    const Users = await Promise.all([
        User.create({
            password: '123',
            email: 'cody@example.com',
            isAdmin: false,
        }),
        User.create({
            password: '123',
            email: 'murphy@example.com',
            isAdmin: false,
        }),
        User.create({
            password: '456',
            email: 'tstratton@gmail.com',
            isAdmin: true,
        }),
    ])

    // Creating Products
    const Products = await Promise.all([
        Product.create({
            name: 'crank chop',
            price: 10.99,
            description: 'I love to chop my crank',
            imageUrl:
                'https://cdn.asotvinc.com/pimg/1C4B4EACFD5144CC8B9BC03E542A1867.jpg',
        }),
        Product.create({
            name: 'flex shot',
            price: 7.99,
            description: 'I love to flex my shot',
            imageUrl:
                'https://cdn.asotvinc.com/pimg/DF4AF0B7C981477EA1B2C2014CC4A8B1.jpg',
        }),
        Product.create({
            name: 'Huggle Hoodie',
            price: 12.99,
            description: 'I love to huggle my hoodie',
            imageUrl:
            'https://cdn.asotvinc.com/pimg/B80D4D5DFFA3470C91EDE9A939812050.jpg',
        }),
        Product.create({
            name: 'pillow pad',
            price: 19.95,
            description: 'I love to pad my pillow',
            imageUrl: 'https://cdn.asotvinc.com/pimg/1A0E2BDF29A24A0390A909C1A43E1831.jpg',
        }),


    ])

    const Orders = await Promise.all([
        Order.create({
            userId: 1,
            orderId: 1,
            cartId: 1,
        }),
        Order.create({
            userId: 2,
            orderId: 2,
            cartId: 2,
        }),
    ])

    // Creating Orders
    const Carts = await Promise.all([
        Cart.create({
            productId: 1,
            quantity: 1,
            orderId: 1,
        }),
        Cart.create({
            productId: 2,
            quantity: 2,
            orderId: 2,
        }),
    ])

    console.log(`seeded ${Users.length} users`)
    console.log(`seeded ${Products.length} products`)
    console.log(`seeded ${Orders.length} orders`)
    console.log(`seeded ${Carts.length} carts`)
    console.log(`seeded successfully`)
    return {
        users: Users,
        products: Products,
        orders: Orders,
        carts: Carts,
    }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
    console.log('seeding...')
    try {
        await seed()
    } catch (err) {
        console.error(err)
        process.exitCode = 1
    } finally {
        console.log('closing db connection')
        await db.close()
        console.log('db connection closed')
    }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
    runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
