//router index file
import { Router } from "express";
import { ProductController } from "../controllers";

const router = Router();

router.get("/feed", ProductController.getAllProducts);
router.put("/feed/like/:productId", ProductController.updateLike);

export default router;
