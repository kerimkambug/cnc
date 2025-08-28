import { useState, useEffect } from "react";

const ADMIN_PASSWORD = "Kerim126.";

const categories = [
  "cabinet","reliefs","strips","decor","products",
  "signs","door_panels","pet_houses","wall_panels","custom"
];

function Admin() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) { console.log(err); }
  };

  const addProduct = async () => {
    if (!name || !category) return alert("İsim ve kategori gerekli!");
    try {
      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": ADMIN_PASSWORD,
        },
        body: JSON.stringify({ name, description, category, image }),
      });
      setName(""); setDescription(""); setCategory(categories[0]); setImage("");
      fetchProducts();
    } catch (err) { console.log(err); }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": ADMIN_PASSWORD },
      });
      fetchProducts();
    } catch (err) { console.log(err); }
  };

const openEditModal = (product) => {
  console.log(product._id); // buraya bak, doğru id mi?
  setEditingProduct(product);
};

  const closeEditModal = () => setEditingProduct(null);

  const saveEdit = async () => {
    try {
      await fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": ADMIN_PASSWORD,
        },
        body: JSON.stringify(editingProduct),
      });
      closeEditModal();
      fetchProducts();
    } catch (err) { console.log(err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const CARD_WIDTH = 250;
  const CARD_HEIGHT = 350;

  const styles = {
    container: { minHeight: "100vh", backgroundColor: "#f0f2f5", padding: "20px", fontFamily: "'Roboto', sans-serif" },
    header: { textAlign: "center", fontSize: "36px", fontWeight: "bold", marginBottom: "20px", color: "#333" },
    formContainer: { backgroundColor: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "30px", maxWidth: "900px", margin: "0 auto 30px" },
    input: { flex: "1 1 200px", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px", fontSize: "14px", outline: "none" },
    select: { flex: "1 1 200px", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "10px", fontSize: "14px", outline: "none" },
    addButton: { width: "100%", padding: "12px", backgroundColor: "#6200ee", color: "white", fontWeight: "bold", borderRadius: "6px", border: "none", cursor: "pointer", transition: "background 0.3s" },
    grid: { display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${CARD_WIDTH}px, 1fr))`, gridAutoRows: `${CARD_HEIGHT}px`, gap: "20px", maxWidth: "1200px", margin: "0 auto", justifyContent: "start" },
    card: { backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", overflow: "hidden", width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`, cursor: "pointer" },
    cardImg: { width: "100%", height: "180px", objectFit: "cover", flexShrink: 0 },
    cardContent: { padding: "12px", display: "flex", flexDirection: "column", flexGrow: 1 },
    deleteButton: { marginTop: "auto", backgroundColor: "#d32f2f", color: "white", border: "none", padding: "10px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" },
    cardTitle: { fontSize: "18px", fontWeight: "bold", color: "#212121", marginBottom: "4px" },
    cardCategory: { color: "#757575", marginBottom: "8px" },
    cardDesc: { color: "#424242", flexGrow: 1, fontSize: "14px" },

    modalOverlay: { position: "fixed", top:0, left:0, width:"100%", height:"100%", backgroundColor:"rgba(0,0,0,0.5)", display:"flex", justifyContent:"center", alignItems:"center", zIndex: 1000 },
    modal: { backgroundColor:"white", padding:"20px", borderRadius:"10px", width:"400px", maxWidth:"90%", position:"relative", display:"flex", flexDirection:"column", gap:"10px" },
    modalInput: { padding:"10px", borderRadius:"6px", border:"1px solid #ccc", fontSize:"14px" },
    modalSelect: { padding:"10px", borderRadius:"6px", border:"1px solid #ccc", fontSize:"14px" },
    modalButtonContainer: { display:"flex", justifyContent:"flex-end", gap:"10px", marginTop:"10px" },
    modalButton: { padding:"10px 15px", borderRadius:"6px", border:"none", cursor:"pointer", fontWeight:"bold" },
    saveButton: { backgroundColor:"#6200ee", color:"white" },
    cancelButton: { backgroundColor:"#d32f2f", color:"white" },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Admin Panel</h1>

      <div style={styles.formContainer}>
        <h2 style={{ fontSize: "22px", marginBottom: "10px", color: "#212121" }}>Yeni Ürün Ekle</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          <input type="text" placeholder="Ürün adı" value={name} onChange={e=>setName(e.target.value)} style={styles.input}/>
          <input type="text" placeholder="Açıklama" value={description} onChange={e=>setDescription(e.target.value)} style={styles.input}/>
          <input type="text" placeholder="Resim URL" value={image} onChange={e=>setImage(e.target.value)} style={styles.input}/>
          <select value={category} onChange={e=>setCategory(e.target.value)} style={styles.select}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <button onClick={addProduct} style={styles.addButton}>Ürün Ekle</button>
      </div>

      <div style={styles.grid}>
        {products.map(p => (
          <div key={p._id} style={styles.card} onClick={()=>openEditModal(p)}>
            {p.image && <img src={p.image} alt={p.name} style={styles.cardImg} />}
            <div style={styles.cardContent}>
              <h3 style={styles.cardTitle}>{p.name}</h3>
              <p style={styles.cardCategory}>{p.category}</p>
              {p.description && <p style={styles.cardDesc}>{p.description}</p>}
              <button onClick={e => { e.stopPropagation(); deleteProduct(p._id); }} style={styles.deleteButton}>Sil</button>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div style={styles.modalOverlay} onClick={closeEditModal}>
          <div style={styles.modal} onClick={e=>e.stopPropagation()}>
            <h2>Düzenle</h2>
            <input style={styles.modalInput} value={editingProduct.name} onChange={e=>setEditingProduct(prev=>({...prev, name:e.target.value}))} />
            <input style={styles.modalInput} value={editingProduct.description} onChange={e=>setEditingProduct(prev=>({...prev, description:e.target.value}))} />
            <input style={styles.modalInput} value={editingProduct.image} onChange={e=>setEditingProduct(prev=>({...prev, image:e.target.value}))} />
            <select style={styles.modalSelect} value={editingProduct.category} onChange={e=>setEditingProduct(prev=>({...prev, category:e.target.value}))}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <div style={styles.modalButtonContainer}>
              <button style={{...styles.modalButton, ...styles.cancelButton}} onClick={closeEditModal}>İptal</button>
              <button style={{...styles.modalButton, ...styles.saveButton}} onClick={saveEdit}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
