import UserInfo from "../UserInfo";

export interface ProductCreateDto {
  user: UserInfo;
  title: string;
  category: string;
  price: number;
  contents: string;
  view: number;
  isPriceSuggestion: boolean;
  isLiked: boolean;
  onSale: number;
  createAt: Date;
}
