import { useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from "lucide-react";

const cities = [
  { name: "Kyoto", country: "Japan", temp: 12, condition: "Partly Cloudy", humidity: 65, wind: 8, icon: Cloud },
  { name: "Santorini", country: "Greece", temp: 18, condition: "Sunny", humidity: 50, wind: 12, icon: Sun },
  { name: "Marrakech", country: "Morocco", temp: 24, condition: "Sunny", humidity: 35, wind: 6, icon: Sun },
  { name: "Bali", country: "Indonesia", temp: 28, condition: "Rainy", humidity: 80, wind: 10, icon: CloudRain },
  { name: "Fjords", country: "Norway", temp: 2, condition: "Cloudy", humidity: 72, wind: 18, icon: Cloud },
  { name: "Patagonia", country: "Argentina", temp: 8, condition: "Windy", humidity: 55, wind: 35, icon: Wind },
];

const WeatherSection = () => {
  const [selected, setSelected] = useState(0);
  const city = cities[selected];

  return (
    <section id="weather" className="py-24 md:py-32 bg-section-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">Weather Info</p>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">Before you go</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Current weather conditions at our featured destinations.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {cities.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setSelected(i)}
              className={`px-4 py-2 text-xs tracking-[0.1em] uppercase rounded-full border transition-all duration-300 ${
                selected === i
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <motion.div
          key={city.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-md mx-auto bg-card border border-border rounded-lg p-8 text-center"
        >
          <city.icon className="w-16 h-16 text-accent mx-auto mb-4" />
          <h3 className="text-2xl font-serif text-foreground">{city.name}</h3>
          <p className="text-xs text-muted-foreground mb-6">{city.country}</p>

          <p className="text-6xl font-serif text-foreground mb-2">{city.temp}°C</p>
          <p className="text-sm text-muted-foreground mb-8">{city.condition}</p>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <Thermometer size={16} className="mx-auto text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground">Feels like</p>
              <p className="text-sm text-foreground">{city.temp - 2}°C</p>
            </div>
            <div className="text-center">
              <Droplets size={16} className="mx-auto text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-sm text-foreground">{city.humidity}%</p>
            </div>
            <div className="text-center">
              <Wind size={16} className="mx-auto text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="text-sm text-foreground">{city.wind} km/h</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeatherSection;
