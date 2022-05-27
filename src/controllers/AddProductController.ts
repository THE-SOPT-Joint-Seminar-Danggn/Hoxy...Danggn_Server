import { plainToClass, plainToInstance }   from "class-transformer";
import { validate }                        from "class-validator";
import { NextFunction, Request, Response } from "express";
import { Container }                       from "typedi";
import CreateProductDTO                    from "../dto/add/CreateProductDTO";
import message                             from "../modules/responseMessage";
import StatusCode                          from "../modules/statusCode";
import statusCode                          from "../modules/statusCode";
import AddProductService                   from "../services/AddProductService";
import ResponseWrapper                     from "../utils/ResponseWrapper";

const addProductService = Container.get(AddProductService)
export default class AddProductController {

    async postSaveProduct(request: Request, response: Response, next: NextFunction) {
        const createProductDTO: CreateProductDTO = request.body;
        try {
            const productResponseData = await addProductService.saveProduct(createProductDTO);
            const saveProductResponse = ResponseWrapper.successOf(StatusCode.CREATED, message.CREATED_PRODUCT, productResponseData)
            return response.status(statusCode.CREATED)
                .send(saveProductResponse)

        } catch (error) {
            console.log(error);
            next(error)
        }
    }
};