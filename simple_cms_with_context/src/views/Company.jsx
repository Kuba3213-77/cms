import React from "react";

export default function Company() {
  return (
    <section className="about-me">
      <h2>About Me</h2>

      <div className="author">
        <div className="author-info">
          <h3>Jan Kowalski</h3>
          <p>
            Jestem pasjonatem tworzenia stron i aplikacji webowych. Lubię uczyć się nowych technologii
            i eksperymentować z projektami React. W tym projekcie pokazuję moje umiejętności w tworzeniu
            interaktywnych komponentów i zarządzaniu stanem aplikacji.
          </p>
        </div>
      </div>


      <div className="project-doc">
        <h3>Dokumentacja Projektu</h3>
        <ul>
          <li>Technologie: React, JavaScript, CSS</li>
          <li>Funkcje: panel admina, dynamiczne ustawienia, galeria obrazów</li>
          <li>LocalStorage: przechowywanie ustawień i logowanie użytkownika</li>
          <li>UI: responsywne komponenty, slider, formularze</li>
        </ul>
      </div>
    </section>
  );
}