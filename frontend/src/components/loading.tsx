import React from "react";
import Circles from "./circles-menu-1.gif";

type LoadingProps = {
  className?: string;
};
export default function Loading(props: LoadingProps) {
  return <img src={Circles} width="200px" {...props} />;
}
