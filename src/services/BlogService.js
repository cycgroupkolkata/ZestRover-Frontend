import axios from "axios";

class BlogService{
    constructor(){
        this.baseUrl=import.meta.env.VITE_API_URL
    }

    async getAllBlogs(){
        try {
            const uri=`${this.baseUrl}/api/v1/blogs/all-blogs`
            const response=await axios.get(uri);
            const data=await response.data;
            return data;
        } catch (error) {
            const data=await error.response.data;
            return data;
        }
    }

    async getBySlug(slug){
        try {
            const uri=`${this.baseUrl}/api/v1/blogs/slug/${slug}`
            const response=await axios.get(uri);
            const data=await response.data;
            return data;
        } catch (error) {
            const data=await error.response.data;
            return data;
        }
    }
}


const blogService=new BlogService();

export {blogService}