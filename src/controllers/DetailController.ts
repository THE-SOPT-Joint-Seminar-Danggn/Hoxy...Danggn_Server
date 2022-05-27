import express, { Request, Response } from "express";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";

/**
 * @route GET /product/:productId
 * @desc Get Product Detail By Product Id
 * @access Public
 */
const getDetail = async (req: Request, res: Response) => {
    const { productId } = req.params;

    try{
        const data = await DetailService.getDetail(productId);
        if (!data){
            res.status(statusCode.NOT_FOUND).send(util.fail(statusCode.NOT_FOUND, message.NOT_FOUND));
        }

        res.status(statusCode.OK).send(util.success(statusCode.OK, message.READ_PRODUCT_SUCCESS, data));
    } catch (error){
        console.log(error);
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR));
    }
    
} 

export default{
    getDetail
}