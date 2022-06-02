import { IsBoolean, IsInt, IsString, Min } from "class-validator";

export default class CreateProductDTO {
    @IsInt()
    public imageCount: number;
    @IsString()
    public title: string;
    @IsString()
    public category: string;
    @IsInt()
    @Min(0)
    public price: number;
    @IsString()
    public contents: string;
    @IsBoolean()
    public isPriceSuggestion: boolean;


    constructor(imageCount: number, title: string, category: string, price: number, contents: string, isPriceSuggestion: boolean) {
        this.imageCount = imageCount;
        this.title = title;
        this.category = category;
        this.price = price;
        this.contents = contents;
        this.isPriceSuggestion = isPriceSuggestion;
    }
};