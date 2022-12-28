

import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <div>
            <h1>My App</h1>
            <nav>
                <Link to="/home">Home</Link> |{" "}
                <Link to="about">About</Link>
                <Link to="contact">Contact Us</Link>
            </nav>
        </div>
    );
}