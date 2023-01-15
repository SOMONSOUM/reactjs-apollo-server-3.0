import React from "react";
import "./loading.scss";

export default function Loading() {
  return (
    <>
      <div className="loading-container">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
