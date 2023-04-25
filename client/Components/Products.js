import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchProducts } from '../slices/ProductsSlice'

const Products = () => {
    const dispatch = useDispatch()
    const products = useSelector((state) => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <div className="product-container">
            <div class="row">
                {products ? (
                    products.map((product) => (
                        <div class="column">
                            <div className="products" key={product.id}>
                                <NavLink to={`/products/${product.id}`}>
                                    <img src={product.imageUrl}></img>
                                    <p class="productNames">{product.name}</p>
                                    <p class="price">${product.price}</p>
                                </NavLink>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    )
}

export default Products
