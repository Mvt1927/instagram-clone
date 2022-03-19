import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Messenger from './components/Messenger'
import Trending from './components/Trending'
import './App.css';
import './components/Style.css'

function App() {
    return (
        <div className="flex flex-col w-full h-screen overflow-hidden">
            <Header />
            <div className="bg-[#fafafa] flex flex-col items-center">
                <div className="flex flex-row lg:w-[935px] my-5">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/messenger" element={<Messenger />} />
                        <Route path="/trending" element={<Trending />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;
