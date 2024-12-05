import React, { useEffect, useState } from "react";
import { BlogCard, Breadcrumb, ServicesShimmer } from "../components";
import { blogService } from "../services/BlogService";

const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTours = async () => {
    const data = await blogService.getAllBlogs();
    setBlog(data);
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      fetchTours();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []); // Remove category or define it if necessary

  return isLoading ? (
    <ServicesShimmer />
  ) : (
    <>
      <Breadcrumb pageName={"Blogs"} />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blog.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
