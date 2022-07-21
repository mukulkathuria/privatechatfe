import { createGlobalStyle } from 'styled-components';

export interface Theme {
  dark?: boolean;
}

const GlobalStyle = createGlobalStyle<Theme>`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    body{
        background-color:${(props) => (props.dark ? 'black' : 'white')};
        color:${(props) => (props.dark ? 'white' : 'black')};
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
        "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
`;

export default GlobalStyle;
