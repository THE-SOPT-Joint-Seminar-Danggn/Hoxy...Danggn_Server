export default interface ProductInfo{
    user: UserInfo,
    title: string,
    category: string,
    price: number,
    contents: string,
    view: number,
    isPriceSuggestion: boolean,
    isLiked: boolean,
    onSale: number,
    createAt: Date
}

interface UserInfo {
    profile: string,
    name: string,
    region: string
}