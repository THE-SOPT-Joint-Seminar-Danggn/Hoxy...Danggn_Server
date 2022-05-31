import { Router } from "express";
import { body } from "express-validator/check";
import DetailController from "../controllers/DetailController";

const router: Router = Router();

router.get('/:productId', DetailController.getDetail);

export default router;