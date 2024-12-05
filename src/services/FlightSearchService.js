import axios from "axios";
import { flightCredentials } from "../utils/Credentials";

class FlightSearchService {
  constructor() {
    this.utilUrl = import.meta.env.VITE_UTILS_URL;
    this.flightUrl = import.meta.env.VITE_FLIGHT_URL;
  }

  async generateSignature() {
    const uri = `${this.utilUrl}/Utils/Signature`;
    try {
      const payload = {
        MerchantID: flightCredentials.MerchantID,
        ApiKey: flightCredentials.ApiKey,
        ClientID: flightCredentials.ClientID,
        Password: flightCredentials.Password,
        AgentCode: flightCredentials.AgentCode,
        BrowserKey: flightCredentials.BrowserKey,
      };
      const response = await axios.post(uri, payload);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async initializeSearch({
    adl,
    child,
    infants,
    cabin = "E",
    clientId,
    fromCode,
    toCode,
    depDate,
    jwttoken,
    airlines="",
    refundable,
    isDirect
  }) {
    try {
      const uri = `${this.flightUrl}/flights/ExpressSearch`;
      const payload = {
        ADT: adl,
        CHD: child,
        INF: infants,
        Cabin: cabin,
        Source: "CF",
        Mode: "AS",
        ClientID: clientId,
        TUI: "",
        FareType: "ON",
        Trips: [
          {
            From: fromCode,
            To: toCode,
            OnwardDate: depDate,
            TUI: "",
          },
        ],
        Parameters: {
          Airlines: airlines,
          GroupType: "",
          Refundable: refundable?'Y':'N',
          IsDirect: isDirect,
          IsStudentFare: false,
          IsNearbyAirport: false,
        },
      };

      const response = await axios.post(uri, payload, {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async searchFlights({ clientId, tui, jwtToken }) {
    try {
      const uri = `${this.flightUrl}/flights/GetExpSearch`;
      const payload = {
        ClientID: clientId,
        TUI: tui,
      };
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

  async flightSmartPitcher({
    Amount,
    Index,
    orderId=1,
    tui,
    clientId,
    Mode = "SS",
    Options = "A",
    Source = "SF",
    TripType = "ON",
    jwtToken
  }) {
    const resdata = {
      Trips: [{ Amount: Amount, Index: Index, OrderID: orderId, TUI: tui }],
      ClientID: clientId,
      Mode: Mode,
      Options: Options,
      Source: Source,
      TripType: TripType,
    };
    try{
      const uri=`${this.flightUrl}/flights/SmartPricer`;
      const response=await axios.post(uri,resdata,{
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      const data=await response.data;
      return data;
    }catch(error){
      console.error(error)
    }
  }

  async flightGetsPricer({tui,clientId,jwtToken}){
    try{
      const requestData={
        "TUI": tui,
        "ClientID": clientId
      }
      const uri=`${this.flightUrl}/flights/GetSPricer`
      const response=await axios.post(uri,requestData,{
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })
      const data=await response.data;
      return data;
    }catch(error){
      console.error(error)
    }
  }

}

const flightSearchService = new FlightSearchService();

export { flightSearchService };
