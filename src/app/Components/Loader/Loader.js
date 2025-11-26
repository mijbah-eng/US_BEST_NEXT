"use client";
import React from "react";

export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(5px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src="assets/img/loading_gray.gif" alt="Loading..." style={{ width: "80px", height: "80px" }} />
    </div>
  );
}
