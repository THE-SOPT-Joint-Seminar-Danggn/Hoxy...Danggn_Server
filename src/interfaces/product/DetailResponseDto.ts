import ProductInfo from "./ProductInfo";


export interface DetailResponseDto {
    onSale: ProductInfo[],
    title: ProductInfo[],
    category: ProductInfo[],
    createAt: ProductInfo[],
    contents: ProductInfo[],
    view: ProductInfo[],
    price: ProductInfo[],
    isPriceSuggestion: ProductInfo[],
    isLiked: ProductInfo[]
} 
