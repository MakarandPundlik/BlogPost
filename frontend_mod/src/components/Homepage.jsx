import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tablerow from './Tablerow';
import Cardschema from './Cardschema';
import Loading from './Loading';
const API_URL = "http://localhost:2020"
function Homepage(props) {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(async () => {
    await axios.get(`${API_URL}/api/getblogs`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((res) => {
        var blogs = [];
        setLoading(true);
        res.data.result.forEach(element => {
          element.blogArray.forEach((b) => {
            // console.log(b);
            blogs.push(b);
          })
        });
        setBlogs(blogs);
      })
      .catch((err) => {
        console.log(err)

      })
  }, []);

  useEffect(() => {
    setLoading(false);
    //console.log(blogs)
  }, [blogs]);
  return (
    loading ? <Loading /> :
      (
        blogs.length > 0 ? <div>
          <h3 className="text-secondary m-5">Here are some blogs from BlogPost...</h3>
          <div className="row">
            {

              blogs &&
              blogs.map((blog) => {
                return (

                  <Cardschema key={blog._id}
                    title={blog.title}
                    data={blog.data}
                    author={blog.author}
                  />
                )

              })

            }
          </div>
        </div>

          : <h3 className="text-secondary m-5 text-center">We dont have any blogs right now,want to add one?</h3>
      )
  );

}

export default Homepage;