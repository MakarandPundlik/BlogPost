import axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import Loading from "./Loading";
const API_URL = "http://localhost:2020";
function Report(props) {
  const [blogs, setBlogs] = useState([]);
  let total = 0;
  useEffect(async () => {
    if (!localStorage.getItem("accesstoken")) props.history.push("/login");

    await axios
      .post(
        `${API_URL}/api/getreport`,
        {
          accesstoken: localStorage.getItem("accesstoken"),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        const blogArray = res.data.blogArray;
        //console.log(blogArray);
        setBlogs(blogArray);
        // console.log(blogs)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [blogs, total]);

  return (
    <div className="mx-4" style={{ marginTop: "10%", color: "#4bcbeb" }}>
      {blogs.length > 0 ? (
        <table className="table">
          <thead>
            <tr className="bg-light">
              <th scope="col">
                <h4>Sr No.</h4>
              </th>
              <th scope="col">
                <h4>Title</h4>
              </th>
              <th scope="col">
                <h4>Date</h4>
              </th>
              <th scope="col">
                <h4>Views</h4>
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => {
              total += parseInt(blog.views);
              return (
                <tr
                  className={index % 2 == 0 ? "bg-info" : "bg-light"}
                  key={index + 1}
                >
                  <th scope="row">
                    <h5>{index + 1}</h5>
                  </th>
                  <td>
                    <h5>{blog.title}</h5>
                  </td>
                  <td>
                    <h5>{blog.date ? blog.date : "N/A"}</h5>
                  </td>
                  <td>
                    <h5>{blog.views}</h5>
                  </td>
                </tr>
              );
            })}
            <tr className={blogs.length%2==0?"bg-info":"bg-light"}>
              <th scope="row">
                <h5>Total</h5>
              </th>
              <td>
                    <h5>{blogs.length}</h5>
                  </td>
                  <td>
                    <h5>-</h5>
                  </td>
                  <td>
                    <h5>{total}</h5>
                  </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <h3 className="text-center">You Haven't Written Any Blogs Yet</h3>
      )}
    </div>
  );
}

export default Report;
