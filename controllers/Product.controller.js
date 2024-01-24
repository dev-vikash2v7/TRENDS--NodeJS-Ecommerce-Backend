import Product from "../models/Product.model.js";
import UserModel from "../models/User.model.js";

const createNewProduct = async (req, res) => {
  try {

    for (let index = 0; index < req.body.length; index++) {
     
    const {
      name,
      rating,
      reviewCount,
      price,
      originalPrice,
      stock,
      delivery,
      images,
      colors,
      sizes
    } = req.body[index];



    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!price) {
      return res.status(400).json({
        message: "Price is required",
      });
    }
    if (!originalPrice) {
      return res.status(400).json({
        message: "originalPrice is required",
      });
    }

    let newProduct = new Product({
      name,
      rating,
      reviewCount,
      price,
      originalPrice,
      stock,
      delivery,
      images,
      colors,
      sizes
    });

    newProduct = await newProduct.save();

  }
    res.status(201).json({
      message: 'PRODUCT_CREATED',
    });
  } catch (err) {
    res.status(500).json({
      message: 'INTERNAL_SERVER_ERROR',
    });
  }
};




const getAllProducts = async (req, res) => {

  try {
   
    const products = await Product.find() ;
   
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({
      message: 'INTERNAL_SERVER_ERROR',
    });
  }
};




const getUserCartProducts = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await UserModel.findById(userId);

    res.status(200).json( {cartProducts : user?.cartProducts } );

  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'INTERNAL_SERVER_ERROR',
    });
  }
};


const addToUserCart = async (req, res) => {
  try {

    const { userId } = req.query;
    const  cartProdcuts  = req.body;


    const user = await UserModel.findByIdAndUpdate(
       userId,
      {
        cartProducts : cartProdcuts  
      },
      { new: true }
    );

    user.save()


    if (!user) {
            return res.status(404).json({
              message: 'USER_NOT_FOUND',
            });
          }
      
    res.status(200).json({
      cartProducts : user['cartProducts'],
            message: 'CART_ADDED',
          });


  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'INTERNAL_SERVER_ERROR',
    });
  }
};


export {
  createNewProduct,
  getAllProducts,
  getUserCartProducts,
  addToUserCart,
};
