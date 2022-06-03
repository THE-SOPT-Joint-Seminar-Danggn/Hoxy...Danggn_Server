
import { DetailResponseDto } from "../interface/detail/DetailResponseDto";
import ProductInfo from "../interfaces/product/ProductInfo";
import Product from "../schema/Product";

const getDetail = async (productId: string): Promise<DetailResponseDto | null> => {
    try {
        const detail = await Product.findById(productId);
        if (!detail) return null;

        // @ts-ignore
        return detail;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

enum Stat {
    A = 0,
    B = 1,
    C = 2
}

const statMap = {
    0: "판매중",
    1: "예약중",
    2: "거래완료"
}

const SALE_STATUS = {
    ON_SALE: "0",
    ON_RESERVATION: "1",
    ON_COMPLETION: "2"
}

const updateStat = async (productId: string, detailresponseDto: DetailResponseDto) => {
    try {
        const detail = await Product.findById(productId, detailresponseDto);
        // @ts-ignore
        detail.onSale = statMap[Stat.B];
        // @ts-ignore
        await detail.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateProductSaleState = async (productId: string, saleStatus: string): Promise<ProductInfo | null> => {
    try {
        if (!Object.values(SALE_STATUS).includes(saleStatus)) {
            return null;
        }
        const detail = await Product.findByIdAndUpdate(
            productId,
            { onSale: Object.values(SALE_STATUS).find(element => element === saleStatus) }
        ).exec();
        return detail
    } catch (error) {
        throw error;
    }
}

export default {
    getDetail,
    updateStat,
    updateProductSaleState
}