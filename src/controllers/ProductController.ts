import express, { Request, Response } from "express";
import statusCode from "../modules/statusCode";
import message from "../modules/responseMessage";
import util from "../modules/util";
import { ProductService } from "../services";
import { ProductUpdateDto } from "../interfaces/product/ProductUpdateDto";
/**
 *  @route GET /feed
 *  @desc Get All products
 *  @access Public
 */
const getProduct = async (req: Request, res: Response) => {
  try {
    const data = await ProductService.getProduct();
    if (!data) {
      return res
        .status(statusCode.NOT_FOUND)
        .send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }
    return res
      .status(statusCode.OK)
      .send(util.success(statusCode.OK, message.GET_ALL_PRODUCTS_SUCCESS, data));
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

/**
 *  @route PUT /feed/product/:productId
 *  @desc Update product's like
 *  @access Public
 */
const updateLike = async (req: Request, res: Response) => {
  const productUpdateDto: ProductUpdateDto = req.body;
  const { productId } = req.params;
  try {
    await ProductService.updateLike(productId, productUpdateDto);
    res.status(statusCode.NO_CONTENT).send();
  } catch (error) {
    console.log(error);
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
  }
};

export default {
  getProduct,
  updateLike,
};
