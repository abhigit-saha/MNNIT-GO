import mongoose from 'mongoose'

const couponSchema= new mongoose.Schema({
    userId:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    couponCode: 
    { type: String, required: true, unique: true

    },
    redeemed: 
    { type: Boolean, default: false 

    },
    expirationDate: 
    { type: Date, default: null 

    }
})

const Coupon=mongoose.model("Coupon",couponSchema);

export default Coupon;