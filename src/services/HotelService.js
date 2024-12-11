import axios from "axios";

class HotelService {
  constructor() {
    this.utilUrl = import.meta.env.VITE_HOTEL_UTIL;
    this.hotelUrl = import.meta.env.VITE_HOTEL_URL;
  }

  async generateSignature() {
    const payload = {
      MerchantID: import.meta.env.VITE_MerchantID,
      ApiKey: import.meta.env.VITE_ApiKey,
      ClientID: import.meta.env.VITE_ClientID,
      Password: import.meta.env.VITE_Password,
      AgentCode: "",
      BrowserKey: import.meta.env.VITE_BrowserKey,
      Key: import.meta.env.VITE_Key,
    };
    try {
      const uri = `${this.utilUrl}/Utils/Signature`;
      const response = await axios.post(uri, payload);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async initHotels({ location, dates, adults, children, rooms, jwtToken }) {
    const coordinates = location.coordinates;

    const payload = {
      geoCode: {
        lat: `${coordinates.lat}`,
        long: `${coordinates.long}`,
      },
      locationId: `${location.id}`,
      currency: "INR",
      culture: "en-US",
      checkIn: `${this.formatDate(dates.startDate)}`, // Assuming formatDate converts to "MM/DD/YYYY"
      checkOut: `${this.formatDate(dates.endDate)}`,
      rooms: [
        {
          adults: `${adults}`,
          children: `${children}`,
          childAges: [], // Assuming no child ages provided
        },
      ],
      agentCode: "", // Replace with actual agent code
      destinationCountryCode: location.country || "IN",
      nationality: "IN",
      countryOfResidence: "IN",
      channelId: "b2bIndiaDeals",
      affiliateRegion: "B2B_India",
      segmentId: "TigerSPL",
      companyId: "1",
      gstPercentage: 18,
      tdsPercentage: 5,
    };
    console.log(payload)

    try {
      const uri = `${this.hotelUrl}/api/hotels/search/init`;
      const response = await axios.post(uri, payload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async hotelContent({searchId,limit,offset=-1,filterData=false,authToken}){
    try {
      const uri=`${this.hotelUrl}/api/hotels/search/result/${searchId}/content?limit=${limit}&offset=${offset}&filterdata=${filterData}`;

      const response=await axios.get(uri,{headers:{
        Authorization: `Bearer ${authToken}`
      }})

      const data=await response.data;
      return data;
    } catch (error) {
      console.error(error)
    }
  }

  async hotelRate({searchId,authToken}){
    try {
      const uri=`${this.hotelUrl}/api/hotels/search/result/${searchId}/rate`;

      const response=await axios.get(uri,{
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })

      const data=await response.data;
      return data;
    } catch (error) {
      console.error(error)
    }
  }

  async moreRoomContent({searchId,HotelId,jwt}){
    try {
      const uri=`${this.hotelUrl}/api/hotels/${searchId}/${HotelId}/content`
      const response=await axios.get(uri,{
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      const data=await response.data;
      return data;
    } catch (error) {
      console.error(error)
    }
  }

  async moreRooms({searchId,hotelId,jwt}){
    try{
      const uri=`${this.hotelUrl}/api/hotels/search/result/${searchId}/${hotelId}/rooms`
      const response=await axios.get(uri,{
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
      const data=await response.data;
      return data;
    }catch(error){
      console.error(error)
    }
  }


  formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(d.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  }
}

const hotelService = new HotelService();

export { hotelService };
