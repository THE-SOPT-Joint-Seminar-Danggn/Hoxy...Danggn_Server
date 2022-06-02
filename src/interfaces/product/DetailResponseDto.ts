import ProductInfo from "./ProductInfo";

export interface DetailResponseDto {
    onSale: string,
    title: string,
    category: string,
    createAt: Date,
    contents: string,
    view: number,
    price: number,
    isPriceSuggestion: boolean,
    isLiked: boolean
} 
