-- Reset: Drop existing tables if they exist
drop table if exists services;
drop table if exists leads;

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Services Table
create table services (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  category text not null,
  min_price integer not null,
  icon text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Leads Table
create table leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table services enable row level security;
alter table leads enable row level security;

-- Public read access for services
create policy "Public services are viewable by everyone"
  on services for select
  using ( true );

-- Insert access for leads (anyone can submit)
create policy "Anyone can insert leads"
  on leads for insert
  with check ( true );

-- Seed Data (Expanded List)
insert into services (title, description, category, min_price, icon) values
('Full Stack Web App', 'End-to-end web application using MERN Stack or Next.js with secure authentication and database.', 'Web Dev', 250, 'Layers'),
('E-commerce Solutions', 'Custom online stores with payment gateway integration, inventory, and admin dashboard.', 'Web Dev', 300, 'ShoppingBag'),
('API Development', 'RESTful or GraphQL APIs using Node.js/Python (FastAPI/Django) for mobile and web apps.', 'Web Dev', 100, 'Server'),
('Portfolio & Landing Pages', 'High-converting, SEO-optimized landing pages with modern animations.', 'Web Dev', 80, 'Globe'),
('AI/ML Projects', 'Custom Machine Learning models, predictive analytics, and classification systems.', 'AI/ML', 200, 'Cpu'),
('NLP & Chatbots', 'Intelligent chatbots using RAG (Retrieval Augmented Generation) and LLM handling.', 'AI/ML', 250, 'Bot'),
('Computer Vision', 'Object detection, face recognition, and image processing solutions using OpenCV/YOLO.', 'AI/ML', 220, 'Database'),
('Python Automation', 'Scripts for web scraping, data entry automation, and workflow optimization.', 'Python', 50, 'Code'),
('Final Year Projects', 'IEEE academic projects with documentation and implementation for CS/IT students.', 'Projects', 40, 'Book');
