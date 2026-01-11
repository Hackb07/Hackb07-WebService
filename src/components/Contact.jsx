import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // 1. Send to Email (FormSubmit)
            const emailResponse = await fetch("https://formsubmit.co/ajax/balat4880@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `New Enquiry from ${formData.name}`,
                })
            });

            if (!emailResponse.ok) console.warn('Email sending failed, but continuing to DB save.');

            // 2. Save to Supabase (Database Backup)
            const { error } = await supabase
                .from('leads')
                .insert([formData]);

            if (error) {
                // Ignore missing keys error as it's just a backup
                if (error.message === 'Supabase keys missing') {
                    console.warn('Supabase backup skipped: keys missing');
                } else {
                    throw error;
                }
            }

            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start Your Project</h2>
                        <p className="text-gray-400">
                            Ready to bring your ideas to life? Fill out the form below and we'll verify the feasibility and get back to you with a quote.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition-all resize-none"
                                placeholder="Tell us about your project needs..."
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={status === 'submitting'}
                            type="submit"
                            className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${status === 'success'
                                ? 'bg-green-600 text-white'
                                : status === 'error'
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                                }`}
                        >
                            {status === 'submitting' ? (
                                <span className="animate-pulse">Sending...</span>
                            ) : status === 'success' ? (
                                <>Sent Successfully <CheckCircle className="w-5 h-5" /></>
                            ) : status === 'error' ? (
                                <>Failed to Send <AlertCircle className="w-5 h-5" /></>
                            ) : (
                                <>Send Request <Send className="w-5 h-5" /></>
                            )}
                        </motion.button>

                        {status === 'error' && (
                            <p className="text-red-400 text-sm text-center mt-2">
                                Something went wrong. Please ensure Supabase is configured or try again later.
                            </p>
                        )}
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
