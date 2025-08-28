import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState("home"); // aktif sayfa

  // ✅ Kategori Çeviri Tablosu
  const categoryMap = {
    all: "Tümü",
    cabinet: "Dolap Kapakları",
    reliefs: "Rölyefler",
    strips: "Çıtalar",
    decor: "Dekorlar",
    products: "Ürünler",
    signs: "Tabelalar",
    door_panels: "Kapı Yüzleri",
    pet_houses: "Kedi/Köpek Kulübeleri",
    wall_panels: "Duvar Kaplamaları",
    custom: "Kişiye Özel"
  };

  // Backend'den ürünleri çek
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const uniqueCategories = ["all", ...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter(p => p.category === selectedCategory);

  // ✅ Ürünler (Ana sayfa)
  const Home = () => (
    <div>
      {/* Kategori Filtreleme */}
      <div
        style={{
          padding: "0.5rem 1rem",
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto", // mobilde sola kaydırmalı
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              flexShrink: 0,
              padding: "0.6rem 1.2rem",
              border: "1px solid #333",
              backgroundColor: selectedCategory === cat ? "#333" : "#fff",
              color: selectedCategory === cat ? "#fff" : "#333",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: selectedCategory === cat ? "600" : "400",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap"
            }}
          >
            {categoryMap[cat] || cat}
          </button>
        ))}
      </div>

      {/* Ürün Listesi */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "1rem",
          padding: "1rem"
        }}
      >
        {filteredProducts.map(product => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "white",
              boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
              transition: "transform 0.2s ease",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                height: "200px",
                overflow: "hidden"
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
            </div>
            <div style={{ padding: "0.8rem" }}>
              <h3
                style={{
                  margin: "0 0 0.4rem 0",
                  fontSize: "1.1rem",
                  color: "#222"
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#555",
                  lineHeight: "1.4"
                }}
              >
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ✅ Hakkımızda
  const About = () => (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#222" }}>
        Hakkımızda
      </h2>
      <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "#444" }}>
        Alanya CNC İşleme olarak mobilya, dekoratif ürünler, tabelalar ve özel
        tasarımlar üretiyoruz. Modern CNC makineleriyle kaliteli üretim
        sağlıyoruz. Yaratıcı ekibimiz ile müşterilerimizin hayallerini gerçeğe
        dönüştürüyoruz.
      </p>
      <p style={{ fontSize: "1rem", lineHeight: "1.6", color: "#444" }}>
        Kapı yüzeyleri, dolap kapakları, dekoratif çıtalar, oyuncaklar ve özel
        tasarım CNC işlerinde güvenilir çözüm ortağınızız.
      </p>
    </div>
  );

  // ✅ İletişim
  const Contact = () => (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "#222" }}>
        İletişim
      </h2>
      <p style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#444" }}>
        📞 Telefon: +90 535 648 23 88 
      </p>
      <p style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#444" }}>
        ✉️ Email: selmankambur0007@gmail.com
      </p>
      <p style={{ fontSize: "1rem", color: "#444" }}>
        📍 Adres: Çıplaklı, Bucakoğlu Cd. Alladin Güney Apt No/47, 07400 Alanya/Antalya
      </p>
    </div>
  );

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        backgroundColor: "#fafafa"
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          padding: "0.8rem 1rem",
          backgroundColor: "#333",
          color: "white",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.1rem", whiteSpace: "nowrap" }}>
          Alanya CNC İşleme
        </h1>

        <div style={{ display: "flex", gap: "0.8rem" }}>
          <button
            onClick={() => setPage("home")}
            style={{
              background: "none",
              border: "none",
              color: page === "home" ? "#ffd700" : "white",
              fontSize: "0.9rem",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            Anasayfa
          </button>
          <button
            onClick={() => setPage("about")}
            style={{
              background: "none",
              border: "none",
              color: page === "about" ? "#ffd700" : "white",
              fontSize: "0.9rem",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            Hakkımızda
          </button>
          <button
            onClick={() => setPage("contact")}
            style={{
              background: "none",
              border: "none",
              color: page === "contact" ? "#ffd700" : "white",
              fontSize: "0.9rem",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            İletişim
          </button>
        </div>
      </nav>

      {/* Sayfa içerikleri */}
      <div style={{ flex: "1 0 auto" }}>
        {page === "home" && <Home />}
        {page === "about" && <About />}
        {page === "contact" && <Contact />}
      </div>

      {/* Footer */}
      <footer
        style={{
          flexShrink: 0,
          padding: "1rem",
          backgroundColor: "#333",
          color: "white",
          textAlign: "center",
          fontSize: "0.9rem"
        }}
      >
        &copy; 2025 Alanya CNC İşleme - Tüm Hakları Saklıdır
      </footer>
    </div>
  );
}
