import React from "react";
import Cardschema from "./Cardschema";
function Pagination(props) {
  const { blogs } = props;
  const dark = "dark-text my-5";
  return (
    <div className="row" style={{ marginTop: "7%" }}>
      {/* <Carousel/> */}
      <h3 className={dark}>Here are some blogs from BlogPost...</h3>

      {blogs &&
        blogs.map((blog) => {
          return (
            <Cardschema
              key={blog._id}
              title={blog.title}
              data={blog.data}
              author={blog.author}
            />
          );
        })}
    </div>
  );
}

export default Pagination;
