import mongoose from "mongoose";
import Product from "../schema/Product";
import { ProductResponseDto } from "../interfaces/product/ProductResponseDto";
import { ProductUpdateDto } from "../interfaces/product/ProductUpdateDto";

function timeForToday(value: string) {
  const ONE_HOUR_UNIT = 60;
  const ONE_DAY_UNIT = 24;
  const ONE_YEAR_UNIT = 365;
  const MILLI_SECOND = 1000;

  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / MILLI_SECOND / ONE_HOUR_UNIT
  );
  if (betweenTime < 1) return "방금 전";
  if (betweenTime < ONE_HOUR_UNIT) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < ONE_DAY_UNIT) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < ONE_YEAR_UNIT) {
    return `${betweenTimeDay}일 전`;
  }

  return `${Math.floor(betweenTimeDay / ONE_YEAR_UNIT)}년 전`;
}

const getAllProducts = async (): Promise<ProductResponseDto[] | null> => {
  try {
    const products = await Product.find({}).populate("user");
    const data = await Promise.all(
      products.map(async (product: any) => {
        const result = {
          id: product.id,
          title: product.title,
          region: product.user.region,
          image: product.image,
          price: product.price,
          createdAt: timeForToday(product.createAt),
        };
        return result;
      })
    );
    return data;
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
  getAllProducts,
  updateLike,
};
