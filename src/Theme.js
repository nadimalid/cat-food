import { ThemeProvider,createGlobalStyle } from "styled-components";
import Exo2 from "./assets/fonts/Exo2.0-Thin.otf";
import TrebuchetMS from "./assets/fonts/TrebuchetMS.ttf";
const GlobalStyle = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    @font-face {
        font-family: "Exo2.0";
        src: url(${Exo2}) format("opentype");
    }

    @font-face {
        font-family: "Trebuchet MS";
        src: url(${TrebuchetMS}) format("truetype");
        font-style: normal;
    }


    body {
        font-family: "Trebuchet MS";
    }
`

const basicTheme = {
    colors: {
        defaultColor: "#1698D9",
        defaultHoverColor: "#2EA8E6",
        selectedColor: "#D91667",
        selectedHoverColor: "#E52E7A",
        disabledColor: "#B3B3B3",

        defaultTextColor: "#FFFFFF",
        disabledTextColor: "#FFFF66",

        cardBackgroundColor: "#F2F2F2",
        cardTextMain: "#000000",
        cardTextSecondary: "#666666",
    }
}

const Theme = (props) => {
    return  <ThemeProvider theme={basicTheme}>
                <GlobalStyle />
                {props.children}
            </ThemeProvider>
}

export default Theme;