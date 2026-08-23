import React from 'react';
import Navbar from "./components/youtube";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '24px' }}>
        <h1 style={{ color: '#fff', marginBottom: '16px' }}>YouTube Clone</h1>
        <button style={{ padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>search</button>
      </main>

      <Footer />
    </div>
  );
}

export default App;
