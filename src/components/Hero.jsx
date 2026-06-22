import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    headline: "Premium Tiles & \n Building Materials",
    subhead: "Futuristic designs for your dream project. Elevate your space with our world-class collections.",
    rectImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    circImg: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800",
    badgeTitle: "No: 1",
    badgeSub: "Tiles Store in Melur"
  },
  {
    id: 2,
    headline: "Elegant Granite & \n Natural Stones",
    subhead: "Discover premium quality granite slabs for your kitchen countertops and flooring needs.",
    rectImg: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
    circImg: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
    badgeTitle: "Premium",
    badgeSub: "Quality Assured"
  },
  {
    id: 3,
    headline: "Modern Bathroom \n & Sanitary Ware",
    subhead: "Transform your bathroom into a luxury retreat with our modern fittings and accessories.",
    rectImg: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=1200",
    circImg: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800",
    badgeTitle: "100+",
    badgeSub: "Brands Available"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const slide = slides[currentSlide];

  return (
    <section id="home" className="relative bg-white pt-28 pb-20 lg:pt-36 lg:pb-32 overflow-hidden min-h-[90vh] flex items-center">
      
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-gray-50 to-white"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className={`lg:col-span-5 transition-all duration-700 transform ${isAnimating ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-100 px-5 py-2.5 rounded-full mb-8 shadow-sm">
              <div className="flex text-accent space-x-1">
                <Star size={14} className="fill-accent" />
                <Star size={14} className="fill-accent" />
                <Star size={14} className="fill-accent" />
              </div>
              <span className="font-tamil text-sm font-bold text-navy tracking-wide">கட்டிடப்பொருட்களின் சங்கமம்</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-navy leading-[1.15] mb-5 whitespace-pre-line tracking-tight">
              {slide.headline}
            </h1>
            
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-lg leading-relaxed font-light">
              {slide.subhead}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#products" className="bg-primary hover:bg-navy text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_10px_30px_rgba(0,127,255,0.3)] hover:shadow-[0_15px_40px_rgba(10,37,64,0.4)] flex items-center group">
                Explore Products
                <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="bg-white border-2 border-gray-200 text-navy hover:border-navy px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center">
                Contact Us
              </a>
            </div>
          </div>

          {/* Image Showcase */}
          <div className={`lg:col-span-7 relative h-[500px] lg:h-[700px] flex items-center justify-end transition-all duration-700 transform ${isAnimating ? 'opacity-0 translate-x-8 scale-95' : 'opacity-100 translate-x-0 scale-100'}`}>
            
            {/* Decorative Element */}
            <div className="absolute right-[10%] top-[10%] w-[60%] h-[80%] border-2 border-dashed border-gray-300 rounded-[2.5rem] -z-10"></div>

            {/* Rectangular Image */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[75%] h-[85%] rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-10 group">
              <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
              <img 
                src={slide.rectImg} 
                alt="Showcase" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            
            {/* Circular Image (Fixed & Enhanced) */}
            <div className="absolute left-0 bottom-[15%] w-[45%] aspect-square rounded-full p-2 bg-white/30 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-20">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/40 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
                <img 
                  src={slide.circImg} 
                  alt="Showcase Detail" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Premium Badge */}
            <div className="absolute top-[15%] left-[5%] bg-white/90 backdrop-blur-xl px-8 py-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-30 border border-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-inner">
                  <Star className="text-white fill-white w-6 h-6" />
                </div>
                <div>
                  <p className="font-serif font-black text-2xl text-navy leading-none mb-1">{slide.badgeTitle}</p>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{slide.badgeSub}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Carousel Controls */}
      <div className="absolute bottom-10 right-10 flex space-x-4 z-30 hidden lg:flex">
        <button 
          onClick={prevSlide}
          className="w-14 h-14 bg-white hover:bg-primary rounded-full flex items-center justify-center text-navy hover:text-white shadow-xl cursor-pointer transition-all duration-300 border border-gray-100 group"
        >
          <ChevronLeft size={24} className="transform group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-14 h-14 bg-white hover:bg-primary rounded-full flex items-center justify-center text-navy hover:text-white shadow-xl cursor-pointer transition-all duration-300 border border-gray-100 group"
        >
          <ChevronRight size={24} className="transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Minimal Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating || currentSlide === index) return;
              setIsAnimating(true);
              setCurrentSlide(index);
              setTimeout(() => setIsAnimating(false), 600);
            }}
            className={`h-2 rounded-full transition-all duration-500 ${
              currentSlide === index ? 'w-10 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
