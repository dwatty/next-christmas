import Lights from "../components/lights/lights";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";

export default function Custom404() {
    return (
        <div className={utilStyles.fourohfour}>
            <Lights />
            <div>
                <h1>Ho Ho Oh No!</h1>
                <p>This is certainly naughty list worthy.</p>
                <p>
                    Please use your browser's back button to get out here. Or click <Link href="/">here</Link> to go home.
                </p>
            </div>
        </div>
    );
}
