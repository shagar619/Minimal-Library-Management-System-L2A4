
import { FileType2 } from "lucide-react";
import { BlogData } from "../Data/BlogData";

const Blogs = () => {

return (
     <div className="w-11/12 md:w-10/12 mx-auto px-4">
          <h2 className="text-5xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">
               Explore Engaging Library Blogs, Reading Tips 
          </h2>
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {BlogData.map((blog) => (
          <div key={blog.id} className="shadow-md hover:shadow-lg transition-all duration-300 group">
               <figure>
               <img src={blog.image} alt={blog.title} className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-md" />
               </figure>
          <div>
               <h3 className="text-xl font-bold mt-3 ml-2">{blog.title}</h3>
               <h3 className="inline-flex items-center text-sm font-semibold my-1 ml-2"><FileType2 />: {blog.genre}</h3>
               <p className="ml-3 text-sm font-medium text-gray-600 mb-2">
               ✍️ {blog.author} • 🗓️ {blog.date}
               </p>
               <p className="mx-3 text-base font-normal text-gray-700 text-justify">
               {blog.content.slice(0, 100)}..<span className="underline">See more</span>
               </p>
          <div className="card-actions justify-end mt-3">
               {/* <button className="btn btn-sm btn-primary">Read More</button> */}
          </div>
          </div>
          </div>
     ))}
     </div>
</div>
);
};

export default Blogs;