"use client";
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 6rem;
    min-height: 100vh;
  }
`;