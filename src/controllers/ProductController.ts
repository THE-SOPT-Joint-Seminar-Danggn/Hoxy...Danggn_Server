import { NextFunction, Request, Response } from "express";
import { ProductUpdateDto }                from "../interfaces/product/ProductUpdateDto";
import message                             from "../modules/responseMessage";
import statusCode                          from "../modules/statusCode";
import util                                from "../modules/util";
import { ProductService }                  from "../services";

/**
 *  @route GET /feed
 *  @desc Get All products
 *  @access Public
 */
const getAllProducts = async (req: Request, res: Response) => {
    try {
        const data = await ProductService.getAllProducts();
        if (!data) {
            return res
                .status(statusCode.NOT_FOUND)
                .send({});
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

const getAllProductsWithPagging = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const query = request.query;
        const page = query.page;
        const limit = query.limit;
        // @ts-ignore
        const data = await ProductService.getAllProductsWithPagging(page, limit);
        return response.status(statusCode.OK)
            .send(util.success(statusCode.OK, message.GET_ALL_PRODUCTS_SUCCESS, data))
    } catch (error) {
        console.log(error);
        next(error)
    }
}

/**
 *  @route PUT /feed/product/:productId
 *  @desc Update product's like
 *  @access Public
 */
const updateLike = async (req: Request, res: Response) => {
    const productUpdateDto: ProductUpdateDto = req.body;
    const {productId} = req.params;
    try {
        await ProductService.updateLike(productId, productUpdateDto);
        res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_LIKE_SUCCESS));
    } catch (error) {
        console.log(error);
        res
            .status(statusCode.INTERNAL_SERVER_ERROR)
            .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};

export default {
    getAllProducts,
    updateLike,
    getAllProductsWithPagging
};
