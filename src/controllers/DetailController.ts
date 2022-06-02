import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import { DetailResponseDto } from "../interfaces/product/DetailResponseDto";
import message from "../modules/responseMessage";
import statusCode from "../modules/statusCode";
import util from "../modules/util";
import DetailService from "../services/DetailService";

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
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
    
} 

/**
 * @route PUT /feed/on-sale
 * @desc Update Sale State
 * @access Public
 */

 const updateStat = async (req: Request,res: Response) => {
    const detailResponseDto: DetailResponseDto = req.body;
    const { productId } = req.params;
    try{
       await DetailService.updateStat(productId, detailResponseDto);
       res.status(statusCode.OK).send(util.success(statusCode.OK, message.UPDATE_STAT_SUCCESS));
    } catch (error) {
        console.log(error);
        res
           .status(statusCode.INTERNAL_SERVER_ERROR)
           .send(util.fail(statusCode.INTERNAL_SERVER_ERROR, message.INTERNAL_SERVER_ERROR));
    }
};

export default{
   getDetail,
   updateStat
}
