import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Globe, ShoppingBag, Bot, BarChart, Server, Code, Book, Layout, Database, Cpu, Layers } from 'lucide-react';

const iconMap = {
    Globe: Globe,
    ShoppingBag: ShoppingBag,
    Bot: Bot,
    BarChart: BarChart,
    Server: Server,
    Code: Code,
    Book: Book,
    Layout: Layout,
    Database: Database,
    Cpu: Cpu,
    Layers: Layers
};

const currencyConfig = {
    USD: { symbol: '$', rate: 1, locale: 'en-US' },
    INR: { symbol: '₹', rate: 86, locale: 'en-IN' },
    EUR: { symbol: '€', rate: 0.92, locale: 'de-DE' },
    GBP: { symbol: '£', rate: 0.78, locale: 'en-GB' }
};

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState('USD');

    // Auto-detect user region
    useEffect(() => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (userTimeZone.includes('Calcutta') || userTimeZone.includes('Kolkata') || userTimeZone.includes('India')) {
            setCurrency('INR');
        } else if (userTimeZone.includes('London')) {
            setCurrency('GBP');
        } else if (userTimeZone.includes('Berlin') || userTimeZone.includes('Paris') || userTimeZone.includes('Europe')) {
            setCurrency('EUR');
        }
        // Default to USD otherwise
    }, []);

    const formatPrice = (priceInUSD) => {
        const config = currencyConfig[currency];
        const convertedPrice = Math.round(priceInUSD * config.rate);

        // Use Intl.NumberFormat for proper formatting (e.g., 1,00,000 for INR or 100,000 for USD)
        return new Intl.NumberFormat(config.locale, {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(convertedPrice);
    };

    // Fallback data if Supabase is not connected or empty
    const fallbackServices = [
        {
            id: '1',
            title: 'Full Stack Web App',
            description: 'End-to-end web application using MERN Stack or Next.js with secure authentication and database.',
            category: 'Web Dev',
            min_price: 250,
            icon: 'Layers'
        },
        {
            id: '2',
            title: 'E-commerce Solutions',
            description: 'Custom online stores with payment gateway integration, inventory, and admin dashboard.',
            category: 'Web Dev',
            min_price: 300,
            icon: 'ShoppingBag'
        },
        {
            id: '3',
            title: 'API Development',
            description: 'RESTful or GraphQL APIs using Node.js/Python (FastAPI/Django) for mobile and web apps.',
            category: 'Web Dev',
            min_price: 100,
            icon: 'Server'
        },
        {
            id: '4',
            title: 'Portfolio & Landing Pages',
            description: 'High-converting, SEO-optimized landing pages with modern animations.',
            category: 'Web Dev',
            min_price: 80,
            icon: 'Globe'
        },
        {
            id: '5',
            title: 'AI/ML Projects',
            description: 'Custom Machine Learning models, predictive analytics, and classification systems.',
            category: 'AI/ML',
            min_price: 200,
            icon: 'Cpu'
        },
        {
            id: '6',
            title: 'NLP & Chatbots',
            description: 'Intelligent chatbots using RAG (Retrieval Augmented Generation) and LLM handling.',
            category: 'AI/ML',
            min_price: 250,
            icon: 'Bot'
        },
        {
            id: '7',
            title: 'Computer Vision',
            description: 'Object detection, face recognition, and image processing solutions using OpenCV/YOLO.',
            category: 'AI/ML',
            min_price: 220,
            icon: 'Database'
        },
        {
            id: '8',
            title: 'Python Automation',
            description: 'Scripts for web scraping, data entry automation, and workflow optimization.',
            category: 'Python',
            min_price: 50,
            icon: 'Code'
        },
        {
            id: '9',
            title: 'Final Year Projects',
            description: 'IEEE academic projects with documentation and implementation for CS/IT students.',
            category: 'Projects',
            min_price: 40,
            icon: 'Book'
        }
    ];

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .order('min_price', { ascending: true });

                if (error) {
                    console.warn('Supabase fetch error (using fallback):', error.message);
                    setServices(fallbackServices);
                } else if (data && data.length > 0) {
                    setServices(data);
                } else {
                    setServices(fallbackServices);
                }
            } catch (err) {
                console.warn('Supabase connection failed (using fallback). Check .env variables.');
                setServices(fallbackServices);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section id="services" className="py-20 bg-slate-950 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Services</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Premium solutions tailored to your needs. Transparent pricing starting at the rates below.
                    </p>

                    {/* Currency Toggle */}
                    <div className="inline-flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                        {Object.keys(currencyConfig).map((cur) => (
                            <button
                                key={cur}
                                onClick={() => setCurrency(cur)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${currency === cur
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {cur}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {services.map((service) => {
                        const Icon = iconMap[service.icon] || Code;
                        return (
                            <motion.div
                                key={service.id}
                                variants={item}
                                className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative z-10">
                                    <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-6 h-6 text-cyan-400" />
                                    </div>

                                    <div className="inline-block px-2 py-1 rounded-md bg-slate-800/50 text-xs font-medium text-gray-400 mb-3 border border-slate-700">
                                        {service.category}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                    <p className="text-gray-400 text-sm mb-6 h-20 overflow-hidden text-ellipsis">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-sm text-gray-400">Starting at</span>
                                        <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                                            {formatPrice(service.min_price)}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
