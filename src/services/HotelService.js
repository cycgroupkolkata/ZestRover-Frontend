import axios from "axios";

class HotelService{
    constructor(){
        this.utilUrl=import.meta.env.VITE_HOTEL_UTIL
        this.hotelUrl=import.meta.env.VITE_HOTEL_URL
    }

    async generateSignature(){
        try {
            const uri=`${this.utilUrl}/Utils/Signature`
            const response=await axios.post(uri);
            const data=await response.data;
            return data;
        } catch (error) {
            console.error(error)
        }
    }

}

const hotelService=new HotelService();

export {hotelService}