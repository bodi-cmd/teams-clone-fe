import React, { useRef, useState } from "react";
import RequestHelper from "./RequestHelper";

const req = RequestHelper("http://localhost:8080");

const RequestHelperTest = () => {
  const getButtonHandler = () => {
    const header = {
        auth:"1"
    }
    req.GET("/post/7", header, (data, error) => {
      if (error) {
        console.log(error);
        if (error.handleable) {
          //means that the error is thrown by the backend, not by the fetch method
          console.log(error.message);
        }
      } else {
        console.log(data);
      }
    });
  };

  const inputRef = useRef(null);
  const [image, setimage] = useState([]);
  const postformdataButtonHandler = () => {
    const newPostBody = {
      title: "titlu test",
      price: "143",
      description: "descriere de  minim 10 caractere parca",
      expiresAt: "2022-08-10T10:16:10.924961900Z",
      category: "SELL",
      images: [...image],
    };
    const header = {
        auth:"1"
    }
    req.formDataPOST("/post", header, newPostBody, (data, error) => {
      if (error) {
        console.log(error);
        if (error.handleable) {
          //means that the error is thrown by the backend, not by the fetch method
          console.log(error.message);
        }
      } else {
        console.log(data);
      }
    });
  };

  const postButtonHandler = () => {
    const body = {
      content: "Acesta este un comentariu adaugat din RequestHelperTest.js",
    };
    const header = {
        auth:"1"
    }
    req.PUT("/comment/save/60",header, body, (data,error)=>{
        if (error) {
            console.log(error);
            if (error.handleable) {
              //means that the error is thrown by the backend, not by the fetch method
              console.log(error.message);
            }
          } else {
            console.log(data);
          }
    });
  };

  return (
    <>
      <button onClick={getButtonHandler}>GET</button>
      <br />
      <button onClick={postformdataButtonHandler}>POST Form Data</button>
      <input
        type="file"
        multiple
        ref={inputRef}
        onChange={() => {
          setimage(inputRef.current.files);
        }}
      />
      <br />
      <button onClick={postButtonHandler}>POST</button>
    </>
  );
};

export default RequestHelperTest;
