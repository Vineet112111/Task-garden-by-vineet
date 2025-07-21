import React from 'react';
import Clock from './Clock.jsx';



const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center sticky top-0 ">
            <div className="flex items-center space-x-3">
                <img
                    src="VMlogo.jpg"
                    alt="Logo"
                    className="w-10 h-10 rounded-full border border-white shadow-md"
                />
                <h1 className="text-white text-xl font-bold">ToGrow by Vineet</h1>
            </div>
            <div>
                 <div className="text-white border-2 rounded-2xl px-2 hover:text-cyan-700">
                    <Clock />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
