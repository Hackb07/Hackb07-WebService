import React from 'react';
import { Terminal, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                <div className="flex items-center gap-2">
                    <Terminal className="text-cyan-400 w-6 h-6" />
                    <span className="font-bold text-xl text-white">
                        Hack<span className="text-cyan-400">b07</span>
                    </span>
                </div>

                <div className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Hackb07 Services. All rights reserved.
                </div>

                <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        <span className="sr-only">GitHub</span>
                        <Github className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        <span className="sr-only">Twitter</span>
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
