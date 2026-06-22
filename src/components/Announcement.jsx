
const Announcement = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white border-2 border-primary/20 rounded-2xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#007FFF 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
          
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-navy mb-4 relative z-10">
            Sri Amman Tiles: Your One-Stop Building Materials Store in Melur
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto relative z-10">
            From premium tiles to granite slabs, we provide everything you need for your dream construction project.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Announcement;
