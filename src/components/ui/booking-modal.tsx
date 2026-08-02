import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = ({ isOpen, onClose }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "General Inquiry",
    details: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Basic calendar logic for current month
  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      alert("Please select a date from the calendar first!");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "271416f8-8382-4d15-bf3b-dc8dbc00594c", 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          purpose: formData.purpose,
          meeting_date: `${currentMonth} ${selectedDate}, ${currentYear}`,
          message: formData.details,
          subject: "New Meeting Request from Portfolio",
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus("success");
        setTimeout(() => {
          onClose();
          setStatus("idle");
          setFormData({ name: "", email: "", phone: "", purpose: "General Inquiry", details: "" });
          setSelectedDate(null);
        }, 3000);
      } else {
        console.error("Web3Forms Error:", result);
        setStatus("error");
      }
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus("error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-[95%] md:w-full max-w-5xl bg-neutral-950 border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
            >
              
              {/* Left Side: Calendar */}
              <div className="w-full md:w-1/2 p-4 md:p-10 bg-neutral-900/50 border-b md:border-b-0 md:border-r border-neutral-800">
                <h3 className="text-2xl font-syne font-bold text-white mb-6">Select a Date</h3>
                
                <div className="mb-4 flex items-center justify-between text-neutral-300 font-medium">
                  <span>{currentMonth} {currentYear}</span>
                </div>

                <div className="grid grid-cols-7 gap-1 md:gap-2 text-center mb-2 text-xs font-semibold text-neutral-500 uppercase">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => (
                    <div key={day}>{day}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 md:gap-2">
                  {blanks.map(b => (
                    <div key={`blank-${b}`} className="aspect-square"></div>
                  ))}
                  {days.map(day => (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      disabled={day < today.getDate()}
                      className={`aspect-square flex items-center justify-center rounded-full text-sm transition-all
                        ${day < today.getDate() 
                          ? "text-neutral-700 cursor-not-allowed" 
                          : selectedDate === day 
                            ? "bg-[#e8702a] text-white shadow-lg shadow-[#e8702a]/40 scale-110 font-bold" 
                            : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                        }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div className="mt-8 text-neutral-500 text-sm border-t border-neutral-800 pt-6">
                  <p>All meetings are scheduled via Google Meet.</p>
                  <p className="mt-2">Timezone: Local Time</p>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="w-full md:w-1/2 p-4 md:p-10 relative">
                
                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

                <h3 className="text-2xl font-syne font-bold text-white mb-6">Your Details</h3>
                
                {status === "success" ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pb-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white">Meeting Requested!</h4>
                    <p className="text-neutral-400">I have received your request and will get back to you shortly to confirm the time.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Name</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e8702a] focus:ring-1 focus:ring-[#e8702a] transition-all" placeholder="John Doe" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Phone</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e8702a] focus:ring-1 focus:ring-[#e8702a] transition-all" placeholder="+1 234 567 890" />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Email</label>
                      <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e8702a] focus:ring-1 focus:ring-[#e8702a] transition-all" placeholder="john@example.com" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Purpose</label>
                      <select name="purpose" value={formData.purpose} onChange={handleInputChange} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#e8702a] focus:ring-1 focus:ring-[#e8702a] transition-all appearance-none">
                        <option>General Inquiry</option>
                        <option>Freelance Project</option>
                        <option>Job Opportunity</option>
                        <option>Collaboration</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">Details</label>
                      <textarea required name="details" value={formData.details} onChange={handleInputChange} rows={3} className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-[#e8702a] focus:ring-1 focus:ring-[#e8702a] transition-all resize-none" placeholder="Tell me a bit about what you'd like to discuss..."></textarea>
                    </div>

                    {status === "error" && (
                      <p className="text-red-400 text-sm">Failed to send request. Make sure you added your Web3Forms Access Key!</p>
                    )}

                    <button 
                      type="submit" 
                      disabled={status === "submitting" || !selectedDate}
                      className={`w-full py-4 rounded-lg font-bold tracking-wide transition-all ${
                        !selectedDate 
                          ? "bg-neutral-800 text-neutral-500 cursor-not-allowed" 
                          : "bg-[#e8702a] hover:bg-[#d2611f] text-white hover:shadow-lg hover:shadow-[#e8702a]/30"
                      }`}
                    >
                      {status === "submitting" ? "Sending Request..." : !selectedDate ? "Select a Date First" : "Confirm Request"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
