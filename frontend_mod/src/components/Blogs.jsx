import React, { useState, useEffect } from "react";
import axios from "axios";
import Tablerow from "./Tablerow";

import Loading from "./Loading";
import Carousel from "./Carousel";
import Pagination from "./Pagination";
import PaginationNav from "./PaginationNav";
const API_URL = "http://localhost:2020";
function Blogs(props) {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const [currentpage, setCurrentpage] = useState(1);
  const [postsperpage, setPostsperpage] = useState(8);

  //pagination function
  const paginate = (pageNumber) => {
    if (pageNumber === -1) setCurrentpage(currentpage - 1);
    else if (pageNumber === 0) setCurrentpage(currentpage + 1);
    else setCurrentpage(pageNumber);

    // if(currentpage<1)
    // setCurrentpage(1);
    //  if(currentpage>Math.ceil(blogs.length/postsperpage)-1)
    // setCurrentpage(Math.ceil(blogs.length/postsperpage));
    //console.log(currentpage);
  };
  useEffect(async () => {
    await axios
      .get(`${API_URL}/api/getblogs`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        var blogs = [];
        setLoading(true);
        res.data.result.forEach((element) => {
          element.blogArray.forEach((b) => {
            // console.log(b);
            blogs.push(b);
          });
        });
        setBlogs(blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setLoading(false);
    //console.log(blogs)

    
  }, [blogs]);

  //classes for heading
  const dark = "dark-text my-5";

  //get current posts
  const indexOfLastPost = currentpage * postsperpage;
  const indexOfFirstPost = indexOfLastPost - postsperpage;
  const currentPost = blogs.slice(indexOfFirstPost, indexOfLastPost);
  return loading ? (
    <Loading />
  ) : (
    <div  >
      <Pagination blogs={currentPost} />
    <div className="d-flex my-3" style={{
     
      justifyContent: "center",
      alignItems: "center"
    }}>
      <PaginationNav
        totalposts={blogs.length}
        postsperpage={postsperpage}
        paginate={paginate}
      />
      </div>
    </div>
  );
}

export default Blogs;
