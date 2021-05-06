import React from "react";
import NewsBar from "./NewsBar";

const News = (props) => {
  return (
    <>
      {props.data.map((item,index) => {
        return (
            <>
            <ul/>
          <NewsBar
            title={item.Tittle}
            content={item.Content}
            picture={item.Picture}
          />
          </>
        );
      })}
    </>
  );
};

export default News;
