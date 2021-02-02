import React from "react";
import spinner from "./spinner.svg";

export default ({ size }) => {
  return <img src={spinner} alt="..." height={size ? size : 26} />;
};
