import React, { useContext, useEffect, useState } from "react";
import Context from "../context";

const KEY_SETTINGS = "home:settings";
const defaults = {
  image1: "images/car1.jpg",
  image2: "images/car2.jpg",
  image3: "images/car3.jpg",
  text1: "Opis 1",
  text2: "Opis 2",
  text3: "Opis 3",
  imageWidth: 100,
  textSize: 16,
  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
  border1: 8,
  border2: 8,
  border3: 8,
};

export default function Aside() {
  const ctx = useContext(Context) || {};
  const [settings, setSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY_SETTINGS)) || defaults;
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY_SETTINGS) {
        try {
          setSettings(JSON.parse(e.newValue) || defaults);
        } catch {
          setSettings(defaults);
        }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (settings.fontFamily)
      document.body.style.fontFamily = settings.fontFamily;
  }, [settings.fontFamily]);

  const images = [settings.image1, settings.image2, settings.image3];
  const texts = [settings.text1, settings.text2, settings.text3];
  const borders = [settings.border1, settings.border2, settings.border3];

  return (
    <aside style={{ padding: 16 }}>
      {ctx.slider && (
        <div
          style={{
            height: 200,
            width: "100%",
            background: ctx.slider_background,
            borderRadius: 10,
            padding: 10,
          }}
        >
          <h2>Welcome in new Techni CMS</h2>
          <h3>Create what you want!</h3>
        </div>
      )}

      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <h1>TopCars</h1>
        <p>Witaj na stronie</p>
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{ width: `${settings.imageWidth}%`, maxWidth: 320 }}
          >
            <img
              src={src}
              alt={`car${i}`}
              style={{
                width: "100%",
                borderRadius: borders[i],
              }}
              onError={(e) => (e.currentTarget.src = "images/car1.jpg")}
            />
            <p style={{ fontSize: settings.textSize }}>{texts[i]}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
