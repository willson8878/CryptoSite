import React from "react";
import NewsBar from "./NewsBar";

const News = (props) => {
  return (
    <>
      {props.data.map((item) => {
        return (
            <div key={item.key}>
            <ul/>
          <NewsBar
            title={item.Tittle}
            content={item.Content}
            picture={item.Picture}
          />
          </div>
        );
      })}
    </>
  );
};

export default News;
