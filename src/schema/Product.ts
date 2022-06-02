import mongoose    from "mongoose";
import ProductInfo from "../interfaces/product/ProductInfo";


const UserSchema = new mongoose.Schema(
    {
        profile: {
            type: String,
            default: "https://scontent-ssn1-1.xx.fbcdn.net/v/t39.30808-6/274554211_7058140590927107_9076750575401386959_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=yRBiAOFUvO8AX998_s6&_nc_ht=scontent-ssn1-1.xx&oh=00_AT-g67pKCk_7v55g66vWHn6dJw7DcJn_OSTnOiR_Xl0dxA&oe=6291C318"
        },
        name: {
            type: String,
            default: "30th-sopt"
        },
        region: {
            type: String,
            default: "개봉동"
        }
    }
)

const Product = new mongoose.Schema(
    {
        images: [{
            type: String,
            required: true,
        }],
        user: {
            type: UserSchema,
            default: {}
        },
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        contents: {
            type: String,
            required: true
        },
        view: {
            type: Number,
            default: 0
        },
        isPriceSuggestion: {
            type: Boolean,
            required: true
        },
        isLiked: {
            type: Boolean,
            default: false
        },
        onSale: {
            type: Number,
            default: 0
        },
        createAt: {
            type: Date,
            default: Date.now
        }
    }
);

export default mongoose.model<ProductInfo & mongoose.Document>("Product", Product)