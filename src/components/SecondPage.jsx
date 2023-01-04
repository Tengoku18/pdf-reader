import React, { createContext, useState, useContext } from "react";
import DrawingCanvas from "./DrawingCanvas";
import ViewPDF from "./ViewPDF";
import { urlContext } from "../App";

export const ButtonContext = createContext(null);

const SecondPage = () => {
  const { url } = useContext(urlContext);

  const realUrl = () => {
    if (url === 0) {
      return "https://arxiv.org/pdf/2212.08011.pdf";
    } else if (url === 1) {
      return "/samplepdf2.pdf";
    } else if (url === 2) {
      return " /samplepdf3.pdf";
    }
  };

  const [annotation, setAnnotation] = useState([]);

  const [permission, setPermission] = useState({ granted: false, type: "" });

  return (
    <ButtonContext.Provider
      value={{ annotation, setAnnotation, permission, setPermission }}
    >
      <div className="flex justify-around  ">
        <div className="flex flex-col w-96 h-screen py-20 ">
          <div className="h-1/2">
            <h1 className="text-xl font-semibold">Labels </h1>
            <hr className="bg-black w-1/2 my-0.5" />
            <div className="py-5">
              <button
                className="py-1 bg-indigo-600  hover:bg-indigo-700 text-white px-2 rounded-md mr-2 text-md"
                onClick={() => {
                  setPermission((preState) => ({
                    ...preState,
                    granted: true,
                    type: "Title",
                  }));
                }}
              >
                Title
              </button>
              <button
                className="py-1 bg-indigo-600 hover:bg-indigo-700 text-white px-2 rounded-md text-md"
                onClick={() => {
                  setPermission((preState) => ({
                    ...preState,
                    granted: true,
                    type: "Author",
                  }));
                }}
              >
                Author
              </button>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold">Boxes </h1>
            <hr className="bg-black my-0.5 w-1/2" />

            {annotation &&
              annotation.map((item, index) => {
                return (
                  <div key={index} className="flex my-1">
                    <p>X-cordinate : {item.x} </p>
                    <p className="mx-2">Y-cordinate : {item.y} </p>
                    <button className="px-2 py-1 rounded-md text-sm text-white bg-indigo-600">
                      {item.type}{" "}
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="relative    ">
          <DrawingCanvas />
          <div className="absolute top-0 left-0 -z-10 ">
            <ViewPDF url={realUrl()} />
          </div>
        </div>
      </div>
    </ButtonContext.Provider>
  );
};

export default SecondPage;
