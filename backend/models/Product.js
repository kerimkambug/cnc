import mongoose from "mongoose";

const categories = [
  "cabinet",       // Dolap Kapakları
  "reliefs",       // Rölyefler
  "strips",        // Çıtalar
  "decor",         // Dekorlar
  "products",      // Oyuncak araba, kesme tahtası vb.
  "signs",         // Tabelalar
  "door_panels",   // Kapı Yüzleri
  "pet_houses",    // Kedi/Köpek Kulübesi
  "wall_panels",   // Duvar Kaplama
  "custom"         // Kişiye Özel
];

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,      
  category: { type: String, enum: categories, required: true }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
