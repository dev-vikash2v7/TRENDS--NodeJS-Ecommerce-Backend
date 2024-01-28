import CartItemModel from "../models/CartItem.model.js";


const getUserCartProducts = async (req, res) => {
  try {
    const { userId } = req.query;

    const cart = await CartItemModel.findOne({ userId });
    res.json( {products : cart?.products ||  [] });

  } catch (err) {
    res.status(500).json({
      message: 'INTERNAL_SERVER_ERROR',
    });
  }
};


const addToUserCart = async (req, res) => {
  try {


    const {userId  } = req.query;
    const { product } = req.body;

    // Check if the user's cart exists, if not, create a new one
    let cart = await CartItemModel.findOne({ userId });

    if (!cart) {
      cart = new CartItemModel({ userId, products: [] });
    }

    // Check if the item is already in the cart
    const existingItem = cart.products.find(item => item.id === product.id);

    if (existingItem) {
      // If the item exists, update the quantity
      existingItem.quantity += product.quantity;
    } else {
      // If the item does not exist, add it to the cart
      cart.products.push(  product );
    }

    // Save the updated cart
    await cart.save();

    res.json(cart);

  } catch (err) {
    console.log('error ' , err)

    res.status(500).json({
      message: 'INTERNAL_SERVER_ERROR : '  + err.message,
      error : err.message
    });
  }
};


export {

  getUserCartProducts,
  addToUserCart,
};
