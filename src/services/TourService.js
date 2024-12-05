import axios from "axios";

class TourService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }

  async getBySlug(slug) {
    try {
      const uri = `${this.baseUrl}/api/v1/tours/slug/${slug}`;
      const response = await axios.get(uri);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
      const data = await error.response.data;
      return data;
    }
  }
  async getAllRecentTours() {
    try {
      const uri = `${this.baseUrl}/api/v1/tours/all-tours?isRecent=true`;
      const response = await axios.get(uri);
      const data = await response.data;
      return data;
    } catch (err) {
      const data = await err.response.data;
      return data;
    }
  }
  
  async getAllTours() {
    try {
      const uri = `${this.baseUrl}/api/v1/tours/all-tours`;
      const response = await axios.get(uri);
      const data = await response.data;
      return data;
    } catch (err) {
      const data = await err.response.data;
      return data;
    }
  }
  
  async getAllToursByCategory(category) {
    try {
      const uri = `${this.baseUrl}/api/v1/tours/category/${category }`;
      const response = await axios.get(uri);
      const data = await response.data;
      return data;
    } catch (err) {
      const data = await err.response.data;
      return data;
    }
  }
}

const tourService = new TourService();

export { tourService };
