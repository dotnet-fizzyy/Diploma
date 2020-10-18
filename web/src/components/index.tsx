import React from "react";
import { useLocation } from "react-router-dom";
import BoardContainer from "./board/BoardContainer";

const BoardApplication = () => {
  const params = useLocation();
  console.log(params);

  return <BoardContainer />;
};

export default BoardApplication;
