export const schema=`
type User{
    id:ID
    name:String
    email:String
    phone:String
}

type Product{
    id:ID
    title:String
    body:String
}

type Query{
    getAllUser:[User]
    getSingleUser(id:ID):User
    
    getAllProduct:[Product]
    getSingleProduct(id:ID):Product
}

type Mutation{
    createUser(id:ID,name:String,email:String, phone:String):[User]
    deleteUser(id:ID):[User]
    updateUser(id:ID,name:String,email:String, phone:String):[User]

    createProduct(id:ID,title:String,body:String):[Product]
    deleteProduct(id:ID):[Product]
    updateProduct(id:ID,title:String,body:String):[Product]
}
`