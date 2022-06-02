import UserInfo from "../UserInfo";

export default interface ProductInfo {
  images: string[],
  user: UserInfo;
  title: string;
  category: string;
  price: number;
  contents: string;
  view: number;
  isPriceSuggestion: boolean;
  isLiked: boolean;
  onSale: string;
  createAt: Date;
}
