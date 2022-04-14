import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../card/BlogCard";
import { Button } from "@mui/material";
import "./main.css";

export default function Main() {
  const [xml, setXml] = useState([{}]);
  const [showBlog, setShowBlog] = useState(false);
  const [blogTitles, setBlogTitles] = useState([]);
  const [blogLink, setBlogLink] = useState([]);
  const [blogCreator, setBlogCreator] = useState([]);
  const [blogContent, setBlogContent] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    await axios.get("http://localhost:8080/blogs").then((res) => {
      let parser = new DOMParser();
      let xmlDom = parser.parseFromString(res.data, "text/xml");
      const itemArray = xmlDom.getElementsByTagName("item");

      setXml(itemArray);
    });
  };

  // populate array with fetched data
  const populateArrays = () => {
    // iterating through an array to collect needed data from html collection
    Array.from(xml)?.forEach(function (element) {
      var title = element.getElementsByTagName("title")[0].innerHTML;
      var link = element.getElementsByTagName("link")[0].innerHTML;
      var creator = element.getElementsByTagName("dc:creator")[0].textContent;
      var content =
        element.getElementsByTagName("content:encoded")[0].textContent;

      // removing special characters from description and trimming it
      content = content.replace(/(<([^>]+)>)|(&#[0-9])/g, "");
      content = `${content.substring(0, 250)}...`;
      const description = content.split("p>", 2);

      // updating state values
      setBlogTitles((value) => [...value, title]);
      setBlogLink((oldValues) => [...oldValues, link]);
      setBlogCreator((oldValues) => [...oldValues, creator]);
      setBlogContent((oldValues) => [...oldValues, description]);
      console.log(title);
      console.log(blogTitles.length);
    });
  };

  // click handle for the Show button
  function handleRendering() {
    console.log(blogTitles);
    if (xml.length > 0) {
      populateArrays();
      setShowBlog(!showBlog);
    } else {
      fetch();
    }
  }

  return (
    <div>
      {!showBlog && (
        <Button
          variant='contained'
          style={{
            zIndex: "2",
            margin: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            minWidth: "10%",
          }}
          onClick={handleRendering}
        >
          fetch
        </Button>
      )}
      {showBlog && (
        <div className='container'>
          {blogTitles.map((element, i) => (
            <div className='card'>
              <BlogCard
                key={i}
                title={blogTitles[i]}
                link={blogLink[i]}
                creator={blogCreator[i]}
                content={blogContent[i]}
              ></BlogCard>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
