import axiosInstance from "../../utilis/axios";

export const getCartsByUser = async() => {
    try {
        const res = await axiosInstance.get('/carts/user/1')

        const { data } = res

        const aggregatedQuantities = {};

        data.forEach(cart => {
            cart.products.forEach(product => {
                const productId = product.productId;
                const quantity = product.quantity;

                aggregatedQuantities[productId] = aggregatedQuantities[productId] ? aggregatedQuantities[productId] + quantity : quantity
            });
        });

        let getProductsWithcarts = Object.keys(aggregatedQuantities).map(productId => ({
            productId: parseInt(productId),
            quantity: aggregatedQuantities[productId]
        }))

        const getProductsWithcartsPromise = getProductsWithcarts.map(async(product) => {
            const res = await axiosInstance.get(`/products/${product.productId}`)
            
            const { data } = res
            const { category, description, id, price, rating, title, image} = data
            return {
                quantityInCart: product.quantity,
                category,
                description,
                id,
                price,
                rating,
                title,
                image
            }
        })

        getProductsWithcarts =await Promise.all(getProductsWithcartsPromise)

        return {getProductsWithcarts, totalCart: getProductsWithcarts.length}
    } catch (error) {
        return error
    }
}

export const totalCartItems = async() => {
    try {
        const res = await getCartsByUser()

        return res.length
    } catch (error) {
        return error
    }
}