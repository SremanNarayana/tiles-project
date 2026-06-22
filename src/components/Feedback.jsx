import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const Feedback = () => {
  const [formData, setFormData] = useState({ username: '', phone: '', comment: '' });
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Please select a rating before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username.trim(),
          rating,
          comment: formData.comment.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to submit your feedback right now.');
      }

      setSubmitted(true);
      setFormData({ username: '', phone: '', comment: '' });
      setRating(0);
      setTimeout(() => setSubmitted(false), 5000);
      window.dispatchEvent(new Event('reviews:updated'));
    } catch (err) {
      setError(err.message || 'Unable to submit your feedback right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(6,182,212,0.14)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s ease',
  };

  return (
    <section
      className="section-spacing"
      style={{ background: 'rgba(2,10,22,0.72)', borderTop: '1px solid rgba(6,182,212,0.08)' }}
    >
      <div className="glass-card max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(6,182,212,0.12)',
            boxShadow: '0 8px 48px rgba(1,8,16,0.6)',
          }}
        >
          {/* Cyan top accent */}
          <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #06B6D4, #22D3EE, #0891B2)' }} />

          <div className="grid md:grid-cols-5">
            {/* Left info panel */}
            <div
              className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.06) 0%, rgba(4,18,40,0.8) 100%)' }}
            >
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none"
                style={{ background: 'rgba(6,182,212,0.08)', transform: 'translate(30%, -30%)' }} />
              <div className="relative z-10">
                <h3 className="font-display text-2xl mb-4" style={{ color: '#ffffff' }}>We Value Your Feedback</h3>
                <p className="text-sm leading-relaxed mb-6 font-sans" style={{ color: 'rgba(184,214,238,0.55)' }}>
                  Your opinion helps us improve our services and product collection. Let us know how your experience was at Sri Amman Tiles!
                </p>
                <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'rgba(6,182,212,0.55)' }}>Thank you for helping us grow.</p>
              </div>
            </div>

            {/* Right form */}
            <div className="md:col-span-3 p-8 md:p-10">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.25)' }}
                  >
                    <CheckCircle className="w-8 h-8" style={{ color: '#22D3EE' }} />
                  </div>
                  <h4 className="text-xl font-display mb-2" style={{ color: '#ffffff' }}>Feedback Received!</h4>
                  <p className="text-sm font-sans" style={{ color: 'rgba(184,214,238,0.55)' }}>Thank you for taking the time to share your thoughts. We greatly appreciate it!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold tracking-wide uppercase mb-1.5" style={{ color: 'rgba(6,182,212,0.55)' }}>Full Name *</label>
                      <input
                        type="text"
                        name="username"
                        required
                        minLength={3}
                        value={formData.username}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="Your name"
                        onFocus={e => { e.target.style.borderColor = 'rgba(6,182,212,0.45)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(6,182,212,0.14)'; }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold tracking-wide uppercase mb-1.5" style={{ color: 'rgba(6,182,212,0.55)' }}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={inputStyle}
                        placeholder="+91 99423 79987"
                        onFocus={e => { e.target.style.borderColor = 'rgba(6,182,212,0.45)'; }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(6,182,212,0.14)'; }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-wide uppercase mb-2" style={{ color: 'rgba(6,182,212,0.55)' }}>Your Rating *</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s} type="button"
                          onMouseEnter={() => setHovered(s)}
                          onMouseLeave={() => setHovered(0)}
                          onClick={() => setRating(s)}
                          className="focus:outline-none hover:scale-110 transition-transform"
                        >
                          <Star
                            size={28}
                            className={`transition-colors duration-150 ${
                              s <= (hovered || rating) ? 'text-gold-400 fill-gold-400' : ''
                            }`}
                            style={{ color: s <= (hovered || rating) ? undefined : 'rgba(6,182,212,0.15)', fill: s <= (hovered || rating) ? undefined : 'rgba(6,182,212,0.10)' }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold tracking-wide uppercase mb-1.5" style={{ color: 'rgba(6,182,212,0.55)' }}>Feedback *</label>
                    <textarea
                      required
                      rows="4"
                      name="comment"
                      maxLength={500}
                      value={formData.comment}
                      onChange={handleChange}
                      style={{ ...inputStyle, resize: 'none' }}
                      placeholder="Tell us what you loved, or what we can do better..."
                      onFocus={e => { e.target.style.borderColor = 'rgba(6,182,212,0.45)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(6,182,212,0.14)'; }}
                    />
                  </div>

                  {error && (
                    <p className="text-sm font-sans" style={{ color: '#FCA5A5' }}>
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn-gold w-full justify-center mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feedback;
