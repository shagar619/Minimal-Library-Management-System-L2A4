
import { BlogData } from "../Data/BlogData";

const Blogs = () => {

return (
     <div className="w-11/12 md:w-10/12 mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600">
          Explore Engaging Library Blogs, Reading Tips 
          </h2>

     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BlogData.map((blog) => (
          <div key={blog.id} className="card bg-base-100 shadow-md border">
               <figure>
               <img src={blog.image} alt={blog.title} className="h-48 w-full object-cover" />
               </figure>
          <div className="card-body">
               <h3 className="card-title">{blog.title}</h3>
               <p className="text-sm text-gray-500 mb-2">
               ✍️ {blog.author} • 🗓️ {blog.date}
               </p>
               <p className="text-gray-700 text-justify">
               {blog.content.slice(0, 100)}...
               </p>
          <div className="card-actions justify-end mt-3">
               <button className="btn btn-sm btn-primary">Read More</button>
          </div>
          </div>
          </div>
     ))}
     </div>
</div>
);
};

export default Blogs;