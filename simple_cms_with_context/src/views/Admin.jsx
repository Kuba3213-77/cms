import React, { useEffect, useState } from "react";
import { SignJWT } from "jose";

const KEY_ADMIN = "isAdmin";
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

const loginApi = async (credentials) => {
  const { login, password } = credentials;

  if (login === "admin" && password === "test123") {
    const secret = new TextEncoder().encode(
      "bardzo-tajny-klucz-tylko-dla-frontu"
    );
    const salt = ".";
    const token = await new SignJWT({ login, password })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .sign(secret);

    return { success: true, token: salt + token };
  }

  return { success: false };
};

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem(KEY_ADMIN) === "1"
  );
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [settings, setSettings] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY_SETTINGS)) || defaults;
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === KEY_SETTINGS) {
        try {
          setSettings(JSON.parse(e.newValue) || defaults);
        } catch {
          setSettings(defaults);
        }
      } else if (e.key === KEY_ADMIN) {
        setIsAdmin(localStorage.getItem(KEY_ADMIN) === "1");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const update = (k, v) => setSettings((s) => ({ ...s, [k]: v }));

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginApi({ login: loginUser, password: loginPass });
    if (res.success) {
      localStorage.setItem("logged", res.token);
      localStorage.setItem(KEY_ADMIN, "1");
      setIsAdmin(true);
    } else {
      alert("Błędny login lub hasło");
    }
  };

  // 🚪 Wylogowanie
  const handleLogout = () => {
    localStorage.removeItem(KEY_ADMIN);
    localStorage.removeItem("logged");
    setIsAdmin(false);
  };

  if (!isAdmin) {
    return (
      <div className="admin admin-login">
        <h2>Logowanie</h2>
        <form onSubmit={handleLogin} className="admin-form">
          <input
            className="input"
            placeholder="Login"
            value={loginUser}
            onChange={(e) => setLoginUser(e.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Hasło"
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
          />
          <button className="btn" type="submit">Zaloguj</button>
        </form>
      </div>
    );
  }

  const fields = [
    { key: "image1", label: "Adres obrazka 1" },
    { key: "image2", label: "Adres obrazka 2" },
    { key: "image3", label: "Adres obrazka 3" },
    { key: "text1", label: "Tekst 1" },
    { key: "text2", label: "Tekst 2" },
    { key: "text3", label: "Tekst 3" },
  ];

  const borders = ["border1", "border2", "border3"];

  return (
    <div className="admin admin-panel">
      <div className="admin-header">
        <h2>Panel administracyjny</h2>
        <button className="btn btn-logout" onClick={handleLogout}>Wyloguj</button>
      </div>
      <hr />

      <div className="admin-grid">
        <div className="admin-fields">
          {fields.map(({ key, label }) => (
            <div key={key} className="field">
              <label>{label}</label>
              <input
                className="input"
                value={settings[key]}
                onChange={(e) => update(key, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="admin-controls">
          <div className="field">
            <label>Szerokość obrazków: {settings.imageWidth}%</label>
            <input
              className="range"
              type="range"
              min="50"
              max="200"
              value={settings.imageWidth}
              onChange={(e) => update("imageWidth", +e.target.value)}
            />
          </div>

          <div className="field">
            <label>Rozmiar tekstu: {settings.textSize}px</label>
            <input
              className="range"
              type="range"
              min="12"
              max="48"
              value={settings.textSize}
              onChange={(e) => update("textSize", +e.target.value)}
            />
          </div>

          <div className="field">
            <label>Czcionka</label>
            <select
              className="select"
              value={settings.fontFamily}
              onChange={(e) => update("fontFamily", e.target.value)}
            >
              <option value={defaults.fontFamily}>System / Inter</option>
              <option value='Roboto, "Helvetica Neue", Arial, sans-serif'>
                Roboto
              </option>
              <option value='Georgia, "Times New Roman", Times, serif'>
                Georgia
              </option>
              <option value='"Courier New", Courier, monospace'>Courier</option>
            </select>
          </div>

          {borders.map((k, i) => (
            <div key={k} className="field">
              <label>
                Zaokrąglenie obrazka {i + 1}: {settings[k]}px
              </label>
              <input
                className="range"
                type="range"
                min="0"
                max="100"
                value={settings[k]}
                onChange={(e) => update(k, +e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
