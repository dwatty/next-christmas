import { AppWrapper } from "../context/context";
import "../styles/global.scss";

function App({ Component, pageProps }) {
    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    );
}

export default App;
