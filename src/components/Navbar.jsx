import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Terminal, Brain } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { title: 'Services', href: '#services' },
        { title: 'Work', href: '#work' },
        { title: 'Contact', href: '#contact' },
    ];

    return (
        <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <div className="relative">
                            <Terminal className="text-cyan-400 w-8 h-8 relative z-10" />
                            <motion.div
                                className="absolute inset-0 bg-cyan-500 blur-lg opacity-50"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                        <Brain className="text-purple-500 w-8 h-8" />
                        <span className="font-bold text-xl tracking-tight text-white">
                            Hack<span className="text-cyan-400">b07</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.title}
                                    href={link.href}
                                    className="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                >
                                    {link.title}
                                </a>
                            ))}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-cyan-500/50 transition-shadow"
                            >
                                Get Started
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
                        >
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-slate-900 border-b border-slate-800"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.title}
                                href={link.href}
                                className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.title}
                            </a>
                        ))}
                        <button className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium">
                            Get Started
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
