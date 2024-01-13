"use client";
import React from "react";
import styled from "styled-components";

const LoadingBar = styled.div`
  width: 100%;
  height: 4px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: blue; // Adjust the color as needed
  transform: scaleX(${(props) => (props.isLoading ? 1 : 0)});
  transform-origin: left;
  transition: transform 0.3s ease;
  z-index: 9999;
`;
export const LoadingBarComponent = ({ isLoading }) => {
  return <LoadingBar isLoading={isLoading} />;
};
