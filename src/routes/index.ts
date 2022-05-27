//router index file
import { Router }           from 'express';
import AddProductController from "../controllers/AddProductController";
import CreateProductDTO     from "../dto/add/CreateProductDTO";
import { validateBody }     from "../middlewares/ValidateBody";
import { ProductController } from "../controllers";

const router = Router();

const addProductController = new AddProductController();
router.post('/feed', validateBody(CreateProductDTO), addProductController.postSaveProduct)
router.get("/feed", ProductController.getAllProducts);
router.get("/feed_page", ProductController.getAllProductsWithPagging);
router.put("/feed/like/:productId", ProductController.updateLike);

export default router;
