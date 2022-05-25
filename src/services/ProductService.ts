import mongoose from "mongoose";
import Product from "../schema/Product";
import { ProductResponseDto } from "../interfaces/product/ProductResponseDto";
import { ProductUpdateDto } from "../interfaces/product/ProductUpdateDto";

const getProduct = async (): Promise<ProductResponseDto[] | null> => {
  try {
    const products = await Product.find({});

    if (products.length === 0) {
      return null;
    }
    return products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateLike = async (productId: string, productUpdateDto: ProductUpdateDto) => {
  try {
    const data = await Product.findById(productId, productUpdateDto);
    data.isLiked = !data.isLiked;
    await data.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getProduct,
  updateLike,
};
