"use client";
import React from "react";
import wrapper from "@/redux/store.js";

function ReduxProvider({ children }) {
  return <div>{children}</div>;
}

export default wrapper.withRedux(ReduxProvider);
