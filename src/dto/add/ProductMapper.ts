import ProductInfo      from "../../interfaces/product/ProductInfo";
import ImageDataSource  from "../../utils/ImageDataSource";
import CreateProductDTO from "./CreateProductDTO";

export default class ProductMapper {
    static toProductInfo(createProductDTO: CreateProductDTO): ProductInfo {
        return <ProductInfo>{
            images: ImageDataSource.getShuffledImages(createProductDTO.imageCount ?? 0),
            user: {},
            category: createProductDTO.category,
            contents: createProductDTO.contents,
            isPriceSuggestion: createProductDTO.isPriceSuggestion,
            price: createProductDTO.price,
            title: createProductDTO.title,
        }
    }
};