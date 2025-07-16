'use client';
import Image from "next/image";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Users, Sparkles, Target, BarChart2, Clock, Zap, Check, Search, FileText, ShieldCheck, Award, Briefcase, X, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/services/supabaseClient";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [paused, setPaused] = useState(false);

  // Refs for smooth scrolling
  const featuresRef = useRef(null);
  const pricingRef = useRef(null);
  const aboutRef = useRef(null);

  // Navigation handlers for navbar buttons
  const goToCandidate = () => router.push("/auth?page=candidate");
  const goToRecruiter = () => router.push("/auth?page=recruiter");
  const goToAdmin = () => router.push("/auth?page=admin");
  const goToSysAdmin = () => router.push("/auth?page=sysadmin");

  // Scroll to section
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Show modal for demo
  const goToDemo = () => setShowDemoModal(true);
  const closeDemoModal = () => setShowDemoModal(false);

  // Start Interview/Login logic
  const goToInterview = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push("/dashboard");
    } else {
      // You can use your Google login or show a login modal here
      await signInWithGoogle();
    }
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) console.error(error.message);
  };

  useEffect(() => {
    // This code checks for a session and redirects if found
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/');
      }
    };
    
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/dashboard');
      }
    });

    return () => {
      if (authListener?.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, [router]);

  const clientLogos = [
    { logo: "/clientLogos/tata.png" },
    { logo: "/clientLogos/techmahindra.png" },
    { logo: "/clientLogos/eeshanya.png" },
    { logo: "/clientLogos/hrh.jpeg" },
    { logo: "/clientLogos/google.png" },
  ];

  const testimonials = [
    {
      quote: "From intuitive front-end design to seamless backend integration, the site is a true showcase of full-stack excellence.",
      author: "Dhanshree",
      image: "/user Photos/Dhanshree.jpeg",
      role: "Full Stack Developer, GreatHire",
      avatar: "/avatar2.jpg"
    },
    {
      quote: "Built with security at its core, the site ensures robust protection against vulnerabilities while maintaining smooth performance.",
      author: "Moiz",
      image: "/user Photos/MoizImg.jpg",
      role: "Full Stack Developer, GreatHire",
      avatar: "/avatar3.jpg"
    },
    {
      quote: "We sincerely thank Great Hire Company for providing our learners with valuable internship opportunities that have significantly contributed to their skill development and career growth. Your support plays a vital role in shaping the future of aspiring professionals from ITVEDANT Institute.",
      author: "Kamini ",
      image: "/user Photos/Gen1.jpeg",
      role: "HR and corporate relations executive",
      avatar: "/avatar3.jpg"
    },
    {
      quote: "The platform is secure, reliable, and delivers consistently smooth performance.",      
      author: "Tanmai",
      image: "/user Photos/Tanmai.jpeg",
      role: "Hiring Manager",
      avatar: "/avatar3.jpg"
    },
    {
      quote: "Great Hire has consistently delivered top-tier candidates who align with both our job requirements and our values. Their attention to understanding our team dynamics makes all the difference  'Raviraj pvt limited'. ",
      name: "Raviraj ",
      image: "/user Photos/Gen17.jpg",
      role: "Manager",
      avatar: "/avatar4.jpg"
    },
    {
      quote: "We've partnered with several recruiting services in the past, but none have matched the personalized approach of Great Hire. Their candidates are not only qualified but also passionate and eager to contribute.",
      name: "Srinivas",
      image: "/user Photos/Gen19.jpg",
      role: "Director of Operations",
      avatar: "/avatar5.jpg"
    },
    {
      quote: "Great Hire doesn’t just send resumes—they send the right people. Every candidate they’ve placed with us came prepared and passionate, ready to support our busy agents from day one.",
      name: "Navaneeth ",
      image: "/user Photos/Navaneeth.jpeg",
      role: "Human Resource",
      avatar: "/avatar6.jpg"
    },
    {
      quote: "Real estate is about relationships, and Great Hire understands that. They found us a listing assistant who blends perfectly with our team and impresses clients consistently lead agent. ",
      name: "Tabassum",
      image: "/user Photos/Gen11.jpeg",
      role: "Lead Agent",
      avatar: "/avatar7.jpg"
    },
    {
      quote: "We had trouble finding talent who could keep up with the demands of a high-volume brokerage. Great Hire delivered professionals who not only kept pace but helped us grow.",
      name: " Darshini",
      image: "/user Photos/Gen13.jpeg",
      role: "Sales Managers",
      avatar: "/avatar8.jpg"
    },

    {
      quote: "As a fast-growing startup, we needed to find candidates quickly, and Great Hire delivered. The talent pool is extensive, and the platform’s sorting tools allowed us to quickly narrow down our search to candidates who matched our needs. I can confidently say that Great Hire is an essential for our recruiting strategy.",
      name: "Anirban Barman",
      image: "/user Photos/Gen15.jpg",
      role: "Assistant Manager",
      avatar: "/avatar9.jpg"
    },
    {
      quote: "As a business owner, I have been using Great Hire for the past year to find top-tier talent for our team. The platform’s user-friendly ui and wide range of highly skilled candidates have made it a fantastic resource. The hiring process has been smooth, and able to connect with candidates.",
      name: "Ahmed Shakeel",
      image: "/user Photos/Gen16.jpg",
      role: "Business Owner",
      avatar: "/avatar10.jpg"
    },
    {
      quote: "I’ve worked with numerous job platforms, but Great Hire stands out because of its ability to match us with candidates who not only have the technical skills we need but also fit our company culture. We've hired a number of employees through Great Hire, and each has brought something unique to the table.",
      name: "Raghav Naidu",
      image: "/user Photos/Gen18.jpg",
      role: "Hiring Manager",
      avatar: "/avatar11.jpg"
    },
    {
      quote: "Finding the right candidates used to be a challenge, but Great Hire has made it effortless. The platform connects us with top talent that perfectly fits our company’s needs. Highly recommend for any recruiter!",
      name: "Karan Jaiswal",  
      image: "/user Photos/Gen19.jpg",
      role: "Talent Acquisition Manager",
      avatar: "/avatar12.jpg"
    },
  ];

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, testimonials.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ff] via-[#f6f9ff] to-[#f0fdfa]">
      {/* Navbar */}
      <nav className="w-full bg-white/70 backdrop-blur-md shadow-lg py-3 px-6 flex items-center justify-between fixed top-0 left-0 z-50 border-b border-blue-100 rounded-b-2xl">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-[#6366f1] to-[#3b82f6] text-white font-bold rounded-lg px-2 py-1 text-lg flex items-center shadow-md"><span className="mr-1">AI</span></div>
          <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#3b82f6] tracking-tight">RecruiterAI</span>
        </div>
        <div className="hidden md:flex gap-8 text-gray-700 font-semibold">
          <button className="hover:text-[#6366f1] transition bg-transparent" onClick={() => scrollToSection(featuresRef)}>Features</button>
          <button className="hover:text-[#6366f1] transition bg-transparent" onClick={() => scrollToSection(pricingRef)}>Pricing</button>
          <button className="hover:text-[#6366f1] transition bg-transparent" onClick={() => scrollToSection(aboutRef)}>About</button>
          <button className="hover:text-[#6366f1] transition bg-transparent" onClick={goToDemo}>Demo</button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-xs px-3 py-1 border-blue-200 flex items-center"
            onClick={() => router.push("/auth/candidate")}
          >
            <ArrowRight className="w-4 h-4 mr-1" />Candidate
          </Button>
          <Button
            variant="outline"
            className="text-xs px-3 py-1 border-blue-200 flex items-center"
            onClick={() => router.push("/auth/recruiter")}
          >
            <ArrowRight className="w-4 h-4 mr-1" />Recruiter
          </Button>
          <Button
            variant="outline"
            className="text-xs px-3 py-1 border-blue-200"
            onClick={() => router.push("/auth/admin")}
          >
            <ArrowRight className="w-4 h-4 mr-1"/>Admin
          </Button>
        </div>
      </nav>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={closeDemoModal}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="350"
                src="https://www.youtube.com/embed/2ePf9rue1Ao?autoplay=1"
                title="AI Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4 text-center font-semibold text-lg">AI Interview Demo</div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen relative z-10 pt-32">
        {/* Hero Section */}
        <div className="text-center space-y-8 max-w-4xl w-full mx-auto">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gradient-to-tr from-[#6366f1] to-[#3b82f6] rounded-2xl w-28 h-28 flex items-center justify-center mb-6 shadow-xl border-4 border-white/60">
              <Users className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#3b82f6] mb-2 leading-tight drop-shadow-lg">AI-Powered Recruiting</h1>
            <p className="text-lg sm:text-2xl text-gray-700 mb-8 font-medium">Revolutionize hiring with smart interviews, instant analytics, and actionable insights.<br className="hidden sm:block"/> Hire the best, faster and fairer.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-[#6366f1] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#6366f1] text-white px-10 py-5 text-xl font-bold flex items-center gap-2" onClick={goToInterview}><Clock className="w-6 h-6" /> Start Interview</Button>
              <Button size="lg" variant="outline" className="border-[#6366f1] text-[#6366f1] px-10 py-5 text-xl font-bold shadow-lg hover:bg-[#6366f1]/10 transition-all" onClick={goToDemo}>Watch Demo</Button>
            </div>
          </div>
        </div>

        {/* Unique Stats Section */}
        <div className="w-full max-w-5xl mx-auto mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-8 border-t-4 border-[#6366f1]">
            <span className="text-4xl font-extrabold text-[#6366f1] drop-shadow">95%</span>
            <span className="text-gray-700 mt-2 font-semibold">Accuracy Rate</span>
          </div>
          <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-8 border-t-4 border-[#3b82f6]">
            <span className="text-4xl font-extrabold text-[#3b82f6] drop-shadow">50%</span>
            <span className="text-gray-700 mt-2 font-semibold">Time Saved</span>
          </div>
          <div className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-8 border-t-4 border-[#a21caf]">
            <span className="text-4xl font-extrabold text-[#a21caf] drop-shadow">10k+</span>
            <span className="text-gray-700 mt-2 font-semibold">Interviews Conducted</span>
          </div>
        </div>

        {/* Stats Section */}
        <div className="w-full max-w-7xl mx-auto mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                value: "85%", 
                label: "Reduction in time-to-hire", 
                icon: <Clock className="w-8 h-8 text-blue-500" />,
                description: "Companies using our platform fill positions faster"
              },
              { 
                value: "3.2x", 
                label: "Better candidate matches", 
                icon: <Check className="w-8 h-8 text-green-500" />,
                description: "Higher quality candidates through AI matching"
              },
              { 
                value: "95%", 
                label: "Accuracy rate", 
                icon: <BarChart2 className="w-8 h-8 text-indigo-500" />,
                description: "Precision in candidate-job matching"
              }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-50 rounded-lg mr-4">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-lg font-medium text-gray-700">{stat.label}</div>
                  </div>
                </div>
                <p className="text-gray-500">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="w-full max-w-7xl mx-auto mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How TalentAI Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Our intelligent platform transforms your hiring process in three simple steps</p>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="hidden absolute left-1/2 top-0 h-full w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-16 md:space-y-0">
              {[
                {
                  // step: "1",
                  title: "Define Your Needs",
                  description: "Tell us about your open position and ideal candidate profile. Our AI learns your requirements.",
                  icon:<FileText className="w-8 h-8 text-blue-500" />,
                  direction: "left"
                },
                {
                  // step: "2",
                  title: "Smart Candidate Matching",
                  description: "Our algorithm analyzes thousands of profiles to find the best matches based on skills, experience, and culture fit.",
                  icon: <Search className="w-8 h-8 text-red-500" />,
                  direction: "right"
                },
                {
                  // step: "3",
                  title: "Review & Interview",
                  description: "Receive a curated shortlist of top candidates with AI-generated insights to guide your interviews.",
                  icon: <Users className="w-8 h-8 text-purple-500" />,
                  direction: "left"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col items-center ${item.direction === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
                >
                  <div className={`flex-1 ${item.direction === 'left' ? 'md:text-right' : 'md:text-left'} order-2 md:order-1`}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold mb-4 md:hidden">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  
                  <div className={`order-1 md:order-2 flex-shrink-0 relative ${item.direction === 'left' ? 'md:-mr-8' : 'md:-ml-8'}`}>
                    {/* <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center text-blue-600 font-bold z-10">
                      {item.step}
                    </div> */}
                    <div className="w-18 h-18 rounded-3xl bg-white shadow-lg border border-gray-100 flex  items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <section ref={aboutRef} id="about" className="w-full max-w-7xl mx-auto mt-32 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">About RecruiterAI</h2>
          <p className="text-lg text-gray-700 mb-4">
            RecruiterAI revolutionizes the hiring process by combining artificial intelligence with human expertise to create the most efficient and effective interview experience.
          </p>
          <p className="text-base text-gray-600 mb-8">
            Our platform streamlines candidate evaluation, reduces bias, and helps organizations find the best talent faster than ever before. With advanced AI-powered questions, real-time analysis, and comprehensive reporting, we're transforming how companies hire.
          </p>
          <div className="flex flex-wrap justify-center gap-12 mt-8">
            <div>
              <span className="text-3xl font-extrabold text-blue-600">10,000+</span>
              <div className="text-gray-700">Interviews Conducted</div>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-green-600">95%</span>
              <div className="text-gray-700">Customer Satisfaction</div>
            </div>
            <div>
              <span className="text-3xl font-extrabold text-purple-600">500+</span>
              <div className="text-gray-700">Companies Trust Us</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} id="features" className="w-full max-w-7xl mx-auto mt-32 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">Everything you need to conduct professional, AI-enhanced interviews</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">Smart Scheduling</div>
              <div className="text-gray-600">AI-powered interview scheduling that adapts to candidate and recruiter availability.</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">Real-time Analysis</div>
              <div className="text-gray-600">Get instant insights on candidate responses with sentiment analysis and keyword matching.</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">Customizable Interviews</div>
              <div className="text-gray-600">Create tailored interview experiences for different roles and experience levels.</div>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">Detailed Reports</div>
              <div className="text-gray-600">Comprehensive interview reports with transcripts, analysis, and actionable insights.</div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section ref={pricingRef} id="pricing" className="w-full max-w-7xl mx-auto mt-32 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Pricing</h2>
          <p className="text-lg text-gray-700 mb-2">All plans include a 14-day free trial • No setup fees • Cancel anytime</p>
          <a href="#" className="text-blue-600 font-semibold hover:underline">Compare all features →</a>
          {/* Add your pricing cards here */}
        </section>

        {/* Testimonials Section */}
        <div className="w-full max-w-5xl mx-auto mt-32 rounded-2xl shadow-xl overflow-hidden mb-10 relative group">
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-blue-600/90 to-indigo-600/90">
            {/* Left: Trusted by HR */}
            <div className="p-12 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Trusted by HR Teams Worldwide</h2>
              <p className="text-blue-100 mb-8">
                Join thousands of companies who have transformed their hiring with TalentAI
              </p>
              <div className="flex flex-wrap gap-4">
                {clientLogos.map((client, i) => (
                  <div key={i} className="h-12 w-12 bg-white rounded-lg flex items-center justify-center shadow-md">
                    <img
                      src={client.logo}
                      alt={`Client Logo ${i + 1}`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Right: Testimonial Carousel */}
            <div className="relative bg-white/90 flex flex-col justify-center items-center px-8 py-12 min-h-[340px]">
              {/* Carousel Controls */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/80 text-blue-700 rounded-full p-2 shadow transition-opacity opacity-0 group-hover:opacity-100 z-10"
                onClick={() => {
                  setCurrentTestimonial((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  );
                }}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/80 text-blue-700 rounded-full p-2 shadow transition-opacity opacity-0 group-hover:opacity-100 z-10"
                onClick={() => {
                  setCurrentTestimonial((prev) =>
                    prev === testimonials.length - 1 ? 0 : prev + 1
                  );
                }}
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              {/* Testimonial Content */}
              <div
                className="w-full flex flex-col items-center transition-all duration-500"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                style={{ minHeight: 220, maxWidth: 480, margin: "0 auto" }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.7 }}
                    className="w-full"
                  >
                    <div className="text-xl sm:text-2xl font-medium text-gray-800 mb-6 leading-relaxed text-center break-words">
                      “{testimonials[currentTestimonial].quote}”
                    </div>
                    <div className="flex items-center justify-center mt-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden border-2 border-blue-200">
                        {testimonials[currentTestimonial].image ? (
                          <Image
                            src={testimonials[currentTestimonial].image}
                            alt={testimonials[currentTestimonial].author || testimonials[currentTestimonial].name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-500">
                            {(testimonials[currentTestimonial].author || testimonials[currentTestimonial].name || "U").charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {testimonials[currentTestimonial].author || testimonials[currentTestimonial].name}
                        </div>
                        <div className="text-gray-500 text-sm">{testimonials[currentTestimonial].role}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentTestimonial(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentTestimonial === idx
                        ? "bg-blue-600 scale-125 shadow"
                        : "bg-gray-300 hover:bg-blue-400"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-15px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
      `}</style>
    </div>

  );}