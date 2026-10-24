// export async function getAllProducts(){
//     try {
//     const products = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=50')
//     .then((res)=>      
//       res.json()
//      )
//     return products
//     } catch (error) {
//         throw error("something went wrong")
        
//     }    
// }

export async function getAllProducts(){
    try {
        const products= await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=50')
        .then((res)=>res.json())
        return products
    } catch (error) {
        throw error("something went wrong")
    }
}