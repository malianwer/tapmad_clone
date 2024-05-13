import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home/Home";
import DetailPage from "../pages/Home/DetailPage";
import ReactPlayer from "./ReactPlayer";

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/play/:name/:id/:channel" element={<DetailPage />} />
        <Route path="/live" element={<ReactPlayer />} />
      </Route>
    </Routes>
  );
};

export default Root;
