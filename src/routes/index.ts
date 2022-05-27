//router index file
import { Router }           from 'express';
import AddProductController from "../controllers/AddProductController";
import CreateProductDTO     from "../dto/add/CreateProductDTO";
import { validateBody }     from "../middlewares/ValidateBody";


const router = Router();

const addProductController = new AddProductController();
router.post('/feed', validateBody(CreateProductDTO), addProductController.postSaveProduct)

export default router;