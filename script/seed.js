'use strict'
const User = require('../server/db/models/User')
const db = require('../server/db/db')

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
    // const Products = await Promise.all([
    //     Product.create({
    //         name: 'crank chop',
    //         price: 10.99,
    //         quantity: 20,
    //         imageUrl:
    //             'https://jeffersonvalleymall.com/images/default-source/store-logos/store-logos/as-seen-on-tv.tmb-t-400x400.png?sfvrsn=f8ff2078_7',
    //     }),
    //     Product.create({
    //         name: 'flex shot',
    //         price: 7.99,
    //         quantity: 50,
    //         imageUrl:
    //             'https://jeffersonvalleymall.com/images/default-source/store-logos/store-logos/as-seen-on-tv.tmb-t-400x400.png?sfvrsn=f8ff2078_7',
    //     }),
    // ])

    //Creating Orders
    // const Orders = await Promise.all([
    //     Order.create({
    //         fulfilled: false,
    //         userId: 1,
    //     }),
    //     Order.create({
    //         fulfilled: false,
    //         userId: 2,
    //     }),
    // ])

    console.log(`seeded ${Users.length} users`)
    // console.log(`seeded ${Products.length} products`)
    // console.log(`seeded ${Orders.length} orders`)
    console.log(`seeded successfully`)
    return {
        users: Users,
        // products: Products,
        // orders: Orders,
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
