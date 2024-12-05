import React, { useEffect, useState } from "react";
import { Shimmer } from "react-shimmer";
import { tourService } from "../services/TourService";
import { SlCalender } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { blogService } from "../services/BlogService";


const RecentSideBlog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const navigate=useNavigate()

  const fetchRecentPost = async () => {
    setIsLoading(true);
    const data = await blogService.getAllBlogs();
    console.log(data);
    setRecentPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRecentPost();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options); // Format to "October 3, 2024"
  };

  return isLoading ? (
    <div>
      {[...Array(7)].map((_, index) => (
        <div key={index} className="mb-4 flex items-center">
          <Shimmer
            width={50}
            height={50}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div className="w-1/2">
            <Shimmer width="100%" height={20} className="mb-2" />
            <Shimmer width="60%" height={15} />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="bg-white p-4 lg:p-6 rounded-lg shadow-lg ">
      <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
      {recentPosts.map((post, index) => (
        <div
        onClick={()=>navigate(`/blogs/${post.slug}`)}
          key={index}
          className="mb-4 flex items-center cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-lg"
        >
          <img
            // src="https://placehold.co/50x50"
            src={`${import.meta.env.VITE_BLOG_IMAGE_URL}${post.imgUrl}`}
            alt={post.title}
            className="w-24 h-16 rounded-md mr-4"
          />
          <div>
            <p className="font-semibold">{post.title}</p>
            <p className="text-gray-500 text-sm flex flex-row">
              <SlCalender className="mr-2"/> {formatDate(post.postedDate)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentSideBlog;
