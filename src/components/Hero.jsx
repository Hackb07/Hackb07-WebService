import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-16">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-8"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm text-gray-300">Available for new projects</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
                    >
                        Building the Future with
                        <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            Code & Intelligence
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto mb-10"
                    >
                        We fuse cutting-edge Web Development with Advanced AI/ML solutions to create digital experiences that define the next generation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <button className="group relative px-8 py-4 bg-white text-slate-950 rounded-lg font-bold overflow-hidden transition-all hover:scale-105">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
                                View Services <ArrowRight className="w-5 h-5" />
                            </span>
                        </button>

                        <button className="px-8 py-4 bg-slate-900 border border-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 transition-all hover:border-slate-600">
                            Contact Sales
                        </button>
                    </motion.div>
                </div>

                {/* Floating cards animation */}
                <div className="mt-20 relative h-64 w-full hidden md:block">
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute left-[10%] top-0 p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl max-w-xs"
                    >
                        <Code className="w-8 h-8 text-cyan-400 mb-4" />
                        <h3 className="text-white font-bold mb-2">Modern Web Apps</h3>
                        <p className="text-sm text-gray-400">React, Next.js, and scaling architecture.</p>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute right-[10%] top-10 p-6 bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-2xl max-w-xs"
                    >
                        <Cpu className="w-8 h-8 text-purple-400 mb-4" />
                        <h3 className="text-white font-bold mb-2">AI Integration</h3>
                        <p className="text-sm text-gray-400">LLMs, Predictive Models, and Automation.</p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
