
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

enum Stat {
    A=0,
    B=1,
    C=2
}

const statMap= {
    0: "판매중",
    1: "예약중",
    2: "거래완료"
}

const updateStat = async (productId: string, detailresponseDto: DetailResponseDto) => {
    try{
        const detail = await Product.findById(productId, detailresponseDto);
        detail.onSale = statMap[Stat.B];
        await detail.save();
    } catch (error) {
        console.log(error);
        throw error;
    }
}; 

export default{
    getDetail,
    updateStat
}