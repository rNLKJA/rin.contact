"use client";
import styled from "styled-components";
import { cn } from "@/lib/utils";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: 1536px;
  padding: 0 16px;

  @media (min-width: 640px) {
    padding: 0 24px;
  }

  @media (min-width: 768px) {
    padding: 0 32px;
  }

  ${cn()}
`;
