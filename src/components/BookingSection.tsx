import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";

const specialties = [
  { name: "Cardiology", icon: "❤️" },
  { name: "Neurology", icon: "🧠" },
  { name: "Orthopedics", icon: "🦴" },
  { name: "Dermatology", icon: "✨" },
  { name: "Pulmonology", icon: "🫁" },
  { name: "Gastro", icon: "🔬" },
  { name: "Pediatrics", icon: "👶" },
  { name: "Ophthalmology", icon: "👁️" },
];

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM"];

const BookingSection = () => {
  const [step, setStep] = useState(0);
  const [specialty, setSpecialty] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [name, setName] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const handleConfirm = () => {
    if (name.trim()) setConfirmed(true);
  };

  return (
    <section id="booking" className="py-20 md:py-32 px-6 md:px-12 bg-mint" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Your journey starts <span className="italic text-primary">here</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-lg mx-auto">
            Three simple steps. No forms. No friction.
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {["Specialty", "Time", "Confirm"].map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-medium transition-all duration-500 ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                {confirmed && i === 2 ? "✓" : i + 1}
              </div>
              <span className="font-body text-sm text-muted-foreground hidden sm:inline">{label}</span>
              {i < 2 && <div className={`w-12 h-0.5 transition-colors duration-500 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div
          className="relative bg-surface rounded-3xl shadow-soft overflow-hidden mx-auto"
          style={{ minHeight: "380px", perspective: "1200px" }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1 */}
            {step === 0 && !confirmed && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="p-8"
              >
                <p className="font-display text-xl font-semibold mb-6 text-center">Choose a specialty</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {specialties.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => { setSpecialty(s.name); setStep(1); }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300 hover:border-primary/40 hover:shadow-soft ${
                        specialty === s.name ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <span className="text-2xl">{s.icon}</span>
                      <span className="font-body text-sm text-foreground">{s.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 1 && !confirmed && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="p-8"
              >
                <p className="font-display text-xl font-semibold mb-2 text-center">Choose a time</p>
                <p className="font-body text-sm text-muted-foreground text-center mb-6">{specialty} — Tomorrow</p>
                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => { setTimeSlot(slot); setStep(2); }}
                      className={`py-3 rounded-xl border font-body text-sm transition-all duration-300 hover:border-primary ${
                        timeSlot === slot ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStep(0)}
                  className="block mx-auto mt-6 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 2 && !confirmed && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="p-8 text-center"
              >
                <p className="font-display text-xl font-semibold mb-6">Confirm your visit</p>
                <div className="space-y-2 mb-6">
                  <p className="font-body text-muted-foreground"><span className="text-foreground font-medium">{specialty}</span> — Tomorrow at <span className="text-foreground font-medium">{timeSlot}</span></p>
                </div>
                <div className="max-w-xs mx-auto mb-6">
                  <label htmlFor="patient-name" className="font-body text-sm text-muted-foreground block text-left mb-2">Your name</label>
                  <input
                    id="patient-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <button
                  onClick={handleConfirm}
                  disabled={!name.trim()}
                  className="font-body font-medium bg-primary text-primary-foreground px-8 py-3 rounded-full hover:shadow-glow transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Appointment
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="block mx-auto mt-4 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              </motion.div>
            )}

            {/* Confirmed */}
            {confirmed && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="p-12 text-center flex flex-col items-center justify-center min-h-[380px]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 70, damping: 18 }}
                  className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6"
                >
                  <span className="text-primary-foreground text-3xl">✓</span>
                </motion.div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2">You're all set, {name}!</h3>
                <p className="font-body text-muted-foreground">
                  {specialty} — Tomorrow at {timeSlot}
                </p>
                <p className="font-body text-sm text-muted-foreground mt-4">We'll send a gentle reminder before your visit.</p>
                <button
                  onClick={() => { setStep(0); setSpecialty(""); setTimeSlot(""); setName(""); setConfirmed(false); }}
                  className="mt-6 font-body text-sm text-primary hover:text-foreground transition-colors"
                >
                  Book another appointment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
