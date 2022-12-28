

import { Link } from "react-router-dom";
import { Colors } from "assets/colors";
import logo from "assets/images/logo2.png"
export default function Navigation() {
    return (

        <nav style={{ background: Colors.primary }} className='flex items-center justify-between bg-red-200 p-1 px-3 text-white'>
            <img style={{ height: 60 }} src={logo}></img>
            <div className="flex">
                <Link className="flex" to="/home">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    <span className="pl-1">
                        Home
                    </span>
                </Link>
                <Link className="flex px-5" to="about">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                    <span className="pl-1">
                        About
                    </span>
                </Link>
                <Link to="contact">Contact Us</Link>
            </div>
            <div>logout</div>
        </nav>

    );
}