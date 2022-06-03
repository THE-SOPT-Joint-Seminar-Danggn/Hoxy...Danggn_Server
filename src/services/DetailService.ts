import { DetailResponseDto } from "../interface/detail/DetailResponseDto";
import Product from "../schema/Product";

function timeForToday(date: Date) {
  const ONE_HOUR_UNIT = 60;
  const ONE_DAY_UNIT = 24;
  const ONE_YEAR_UNIT = 365;
  const MILLI_SECOND = 1000;

  const today = new Date();
  const timeValue = date;

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / MILLI_SECOND / ONE_HOUR_UNIT
  );
  if (betweenTime < 1) return "방금 전";
  if (betweenTime < ONE_HOUR_UNIT) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < ONE_DAY_UNIT) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < ONE_YEAR_UNIT) {
    return `${betweenTimeDay}일 전`;
  }

  return `${Math.floor(betweenTimeDay / ONE_YEAR_UNIT)}년 전`;
}

const getDetail = async (productId: string): Promise<DetailResponseDto | null> => {
  try {
    const detail = await Product.findById(productId);
    if (!detail) return null;
    const result = {
      id: detail.id,
      image: detail.images,
      user: detail.user,
      onSale: detail.onSale,
      title: detail.title,
      category: detail.category,
      createdAt: timeForToday(detail.createAt),
      content: detail.content,
      view: detail.view,
      price: detail.price,
      isPriceSuggestion: detail.isPriceSuggestion,
      isLiked: detail.isLiked,
    };
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

enum Stat {
  A = 0,
  B = 1,
  C = 2,
}

const statMap = {
  0: "판매중",
  1: "예약중",
  2: "거래완료",
};

const updateStat = async (productId: string, detailresponseDto: DetailResponseDto) => {
  try {
    const detail = await Product.findById(productId, detailresponseDto);
    detail.onSale = statMap[Stat.B];
    await detail.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  getDetail,
  updateStat,
};
