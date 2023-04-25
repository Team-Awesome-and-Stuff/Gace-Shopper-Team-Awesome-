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
            {products ? (
                products.map((product) => (
                    <div className="products" key={product.id}>
                        <NavLink to={`/products/${product.id}`}>
                            <p>{product.name}</p>
                            <img src={product.imageUrl}></img>
                            <p>{product.price}</p>
                        </NavLink>
                    </div>
                ))
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    )
}

export default Products
