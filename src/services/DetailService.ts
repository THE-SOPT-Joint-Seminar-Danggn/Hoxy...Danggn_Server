
import { DetailResponseDto } from "../interface/detail/DetailResponseDto";
import Product               from "../schema/Product";

const getDetail = async(productId: string): Promise<DetailResponseDto | null> => {
    try{
        const detail = await Product.findById(productId);
        if (!detail) return null;

        return detail;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default{
    getDetail
}