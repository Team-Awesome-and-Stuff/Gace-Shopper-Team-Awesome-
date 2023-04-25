import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleProduct } from '../slices/SingleProductSlice'

function Product() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const product = useSelector((state) => state.singleProduct)

    useEffect(
        () => {
            dispatch(fetchSingleProduct(id))
        },
        [dispatch],
        id
    )

    const productToCart = (productId) => {
        dispatch(addProductToCart({ userId, productId }))
    }

    return (
        <div id="Product" className="column">
            <div id="productInfo" className="row">
                <div className="row">
                    <div class="columnSingleProduct">
                        <h1 class="productName">{product.name}</h1>
                        <img src={product.imageUrl} />
                    </div>
                    <div class="columnSingleProductDesc">
                        <h3>${product.price}</h3>
                        <h4>{product.description}</h4>
                        <button
                            onClick={() => {
                                productToCart(product.Id)
                            }}
                        >
                            Add product to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
