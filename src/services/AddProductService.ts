import { Service }      from "typedi";
import CreateProductDTO from "../dto/add/CreateProductDTO";
import ProductMapper    from "../dto/add/ProductMapper";
import Product          from "../schema/Product";

@Service()
export default class AddProductService {
    constructor() {
    }

    async saveProduct(createProductDTO: CreateProductDTO) {
        const product = new Product(ProductMapper.toProductInfo(createProductDTO))
        await product.save()
        return {id: product._id}
    }
};