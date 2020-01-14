import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            // main: '#1e90ff',
            // main: '#9c88ff',
            // main: '#44bd32',
            main:'#5c6ce8',
            // main:'#e94057',
        }, secondary: {
            main: '#a4b0be',
        }
    }
});

// export const gradientTheme = "linear-gradient(to right, #6441a5, #2a0845)";
export const gradientTheme = "linear-gradient(to right, #4776e6, #8e54e9)";

export default theme;

// background:'linear-gradient(to right, #ec6f66, #f3a183)'
//linear-gradient(to left, #ff8008, #ffc837)
// linear-gradient(to right, #4776e6, #8e54e9)
// linear-gradient(to left, #8a2387, #e94057, #f27121)

// background: "linear-gradient(to right, #ffb75e, #ed8f03)"
// background: "linear-gradient(to right, #e35d5b, #e53935)"
// background: "linear-gradient(to right, #36d1dc, #5b86e5)"