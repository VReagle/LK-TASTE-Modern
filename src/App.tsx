import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, Star, Leaf, Heart, Flame, ArrowRight, CheckCircle2 } from 'lucide-react';

const MENU_CATEGORIES = ["All", "Curries", "Sambols", "Rice", "Desserts"];

const MENU_ITEMS = [
  { id: 1, name: "Ceylon Chicken Curry", category: "Curries", price: "$14.99", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80", description: "Rich coconut milk gravy with roasted Sri Lankan spices." },
  { id: 2, name: "Pol Sambol (Coconut)", category: "Sambols", price: "$6.99", image: "https://images.unsplash.com/photo-1548602088-9d12a4f9c10f?auto=format&fit=crop&w=800&q=80", description: "Freshly grated coconut, dried chilies, lime, and red onions." },
  { id: 3, name: "Fragrant Yellow Rice", category: "Rice", price: "$8.99", image: "https://images.unsplash.com/photo-1627904423075-d069818816c4?auto=format&fit=crop&w=800&q=80", description: "Basmati rice cooked in turmeric, coconut milk, and cardamom." },
  { id: 4, name: "Watalappam", category: "Desserts", price: "$7.99", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80", description: "Traditional coconut custard pudding made with kithul jaggery." },
  { id: 5, name: "Black Pork Curry", category: "Curries", price: "$16.99", image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80", description: "Intensely flavored dark roasted curry with tender pork pieces." },
  { id: 6, name: "Lunu Miris", category: "Sambols", price: "$5.99", image: "https://images.unsplash.com/photo-1625860644026-6f345511af41?auto=format&fit=crop&w=800&q=80", description: "Spicy onion and chili paste, the fiery heart of Sri Lankan meals." }
];

const TESTIMONIALS = [
  { id: 1, name: "Sarah Jenkins", role: "Food Critic", text: "The most authentic Sri Lankan flavors I've tasted outside of Colombo. The Black Pork Curry is a masterpiece.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
  { id: 2, name: "David Chen", role: "Local Guide", text: "Every bite is packed with spices and soul. The delivery was fast, but the taste lingered all day.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" }
];

// Reusable animation variants
const fadeUpProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredMenu = activeCategory === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen font-sans bg-offwhite text-charcoal">
      
      {/* Floating Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-black/5' : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          <a href="#" className="font-sans text-[24px] font-[800] tracking-[-1px] text-charcoal flex items-center gap-2">
            <span className="text-cinnamon">LK</span>-<span className="uppercase">Taste</span>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-[14px] font-[600] uppercase tracking-[1px] hover:text-cinnamon transition-colors">Why Us</a>
            <a href="#menu" className="text-[14px] font-[600] uppercase tracking-[1px] hover:text-cinnamon transition-colors">Menu</a>
            <a href="#reviews" className="text-[14px] font-[600] uppercase tracking-[1px] hover:text-cinnamon transition-colors">Reviews</a>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <button className="flex items-center gap-2 text-[14px] font-[600] uppercase tracking-[1px] hover:text-cinnamon transition-colors group">
              <ShoppingCart className="w-4 h-4 text-charcoal group-hover:text-cinnamon transition-colors" />
              CART ({cartCount})
            </button>
            <button className="bg-cinnamon text-white px-7 py-3.5 rounded text-[14px] font-[700] uppercase tracking-[1px] hover:bg-[#b85b18] hover:scale-105 transition-all active:scale-95 shadow-none">
              Order Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-charcoal"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-[14px] font-[600] uppercase tracking-[1px]">Why Us</a>
                <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="text-[14px] font-[600] uppercase tracking-[1px]">Menu</a>
                <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-[14px] font-[600] uppercase tracking-[1px]">Reviews</a>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="font-[600] text-[14px] uppercase tracking-[1px] flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Cart ({cartCount})
                  </span>
                  <button className="bg-cinnamon text-white px-6 py-3 rounded font-[700] uppercase tracking-[1px] text-[14px]">
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* The "Golden Ratio" Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <motion.div 
                className="flex-1 text-center lg:text-left z-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="text-[12px] font-bold uppercase tracking-[2px] text-cinnamon mb-4">
                  Authentic Sri Lankan
                </div>
                <h1 className="font-serif text-5xl lg:text-[56px] font-normal leading-tight mb-6 text-charcoal">
                  Flavors that speak<br/>
                  to the soul.
                </h1>
                <p className="text-base text-charcoal/80 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Discover the vibrant spice markets of Colombo delivered right to your door. Fresh sambols, slow-cooked curries, and aromatic rice.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button className="w-full sm:w-auto bg-cinnamon text-white px-7 py-3.5 rounded font-bold uppercase text-sm hover:opacity-90 transition-opacity">
                    Order Now
                  </button>
                  <a href="#menu" className="w-full sm:w-auto bg-charcoal text-white px-7 py-3.5 rounded font-bold uppercase text-sm hover:bg-black transition-colors text-center">
                    View Menu
                  </a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex-1 relative w-full max-w-lg lg:max-w-none flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              >
                <div className="relative w-full max-w-[400px] aspect-[4/3] bg-gradient-to-br from-gold to-cinnamon rounded-[120px_20px_120px_20px] shadow-[20px_20px_60px_rgba(0,0,0,0.1)] flex items-center justify-center p-8 overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=80" 
                    alt="Delicious Sri Lankan Curry" 
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50 group-hover:opacity-80 transition-opacity duration-700"
                  />
                  <div className="relative z-10 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] border-4 border-dashed border-white rounded-full flex items-center justify-center text-white font-bold text-center text-[20px] sm:text-[24px] leading-tight flex-col shadow-sm">
                    JAFFNA<br/>CRAB CURRY
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* The Trust Engine */}
        <section id="about" className="bg-charcoal text-white border-b-4 border-gold">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 h-auto md:h-[100px] divide-y md:divide-y-0 md:divide-x divide-white/10">
              {[
                { title: "Family Recipes", desc: "Passed down for 3 generations" },
                { title: "Organic Spices", desc: "Sourced from the hill country" },
                { title: "Fast Delivery", desc: "Fresh & Hot within 30 mins" },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center p-6 md:p-0">
                  <strong className="text-[14px] uppercase tracking-[1px] font-bold mb-1">{feature.title}</strong>
                  <span className="text-[11px] opacity-70">{feature.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The "Hunger" Gallery (Menu) */}
        <section id="menu" className="py-24 bg-offwhite">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" {...fadeUpProps}>
              <div>
                <h2 className="font-serif text-[40px] text-charcoal leading-tight mb-2">Explore Our Menu</h2>
                <p className="text-charcoal/70 max-w-lg">Curated selections of our finest dishes, ready to satisfy your cravings.</p>
              </div>
              
              {/* Dynamic Menu Filter */}
              <div className="flex flex-wrap gap-2">
                {MENU_CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded text-[12px] uppercase tracking-[1px] font-[600] transition-all border ${
                      activeCategory === category 
                        ? 'border-charcoal bg-charcoal text-white' 
                        : 'border-transparent bg-white text-charcoal hover:border-black/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* CSS-Grid / Masonry inspired layout */}
            <motion.div 
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredMenu.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white border border-black/5 rounded-[8px] p-5 flex flex-col h-full group transition-shadow hover:shadow-md"
                  >
                    <div className="relative overflow-hidden aspect-[4/3] mb-4 bg-gray-100 rounded-[4px]">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="mb-4">
                        <h3 className="font-serif text-[18px] font-bold mb-1 group-hover:text-cinnamon transition-colors">{item.name}</h3>
                        <p className="text-gray-500 text-[13px] line-clamp-2 mb-2">{item.description}</p>
                        <span className="font-[800] text-cinnamon text-[16px]">{item.price}</span>
                      </div>
                      <button 
                        onClick={handleAddToCart}
                        className="w-[36px] h-[36px] bg-gold text-charcoal rounded-full flex items-center justify-center font-bold text-xl self-end hover:scale-110 active:scale-95 transition-transform shadow-sm"
                      >
                        +
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Social Proof Loop */}
        <section id="reviews" className="py-24 bg-white border-t border-black/5 overflow-hidden">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div className="text-center mb-16" {...fadeUpProps}>
              <h2 className="font-serif text-[40px] text-charcoal leading-tight mb-4">Loved by Foodies</h2>
              <p className="text-charcoal/70 max-w-2xl mx-auto">Don't just take our word for it. See what our community has to say.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {TESTIMONIALS.map((testimonial, i) => (
                <motion.div 
                  key={testimonial.id}
                  className="bg-offwhite border border-black/5 p-8 rounded-[8px]"
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <div className="flex gap-1 text-cinnamon mb-6">
                    {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="font-serif text-xl italic mb-8 leading-relaxed text-charcoal">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-black/10" />
                    <div>
                      <h4 className="font-bold text-[14px] text-charcoal">{testimonial.name}</h4>
                      <p className="text-[12px] text-charcoal/60 uppercase tracking-[1px]">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer & Lead Capture */}
      <footer className="bg-white border-t border-black/10 pt-16 pb-8">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
            
            <div className="lg:col-span-2">
              <a href="#" className="font-sans text-[24px] font-[800] tracking-[-1px] text-charcoal mb-4 flex items-center gap-2">
                <span className="text-cinnamon">LK</span>-<span className="uppercase">Taste</span>
              </a>
              <p className="text-charcoal/70 mb-6 max-w-sm leading-relaxed text-[14px]">
                Evoking the taste of Sri Lanka through authentic ingredients and traditional recipes.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="font-semibold text-charcoal text-[13px] uppercase tracking-[1px]">Join the Spice Club</span>
                <form className="flex gap-2 w-full sm:w-auto" onSubmit={(e) => e.preventDefault()}>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="border border-[#ddd] px-3 py-2 rounded-[4px] w-full sm:w-[200px] outline-none focus:border-cinnamon transition-colors bg-white text-[12px]"
                    required
                  />
                  <button type="submit" className="bg-charcoal text-white px-4 py-2 rounded-[4px] cursor-pointer hover:bg-black transition-colors border-none text-[12px] font-bold tracking-[1px] uppercase">
                    Join
                  </button>
                </form>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[13px] uppercase tracking-[1px] mb-4">Quick Links</h4>
              <ul className="space-y-3 text-[14px] text-charcoal/70">
                <li><a href="#about" className="hover:text-cinnamon transition-colors">Our Roots</a></li>
                <li><a href="#menu" className="hover:text-cinnamon transition-colors">The Menu</a></li>
                <li><a href="#reviews" className="hover:text-cinnamon transition-colors">Locations</a></li>
                <li><a href="#" className="hover:text-cinnamon transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[13px] uppercase tracking-[1px] mb-4">Contact</h4>
              <ul className="space-y-3 text-[14px] text-charcoal/70">
                <li>24 Spice Avenue<br/>Colombo District, 00100</li>
                <li>hello@lktaste.com</li>
                <li>+94 77 123 4567</li>
              </ul>
            </div>

          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-black/10 text-charcoal/60 text-[12px]">
            <p>&copy; {new Date().getFullYear()} LK-Taste. All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-cinnamon transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cinnamon transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
