"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setImage("");

      const response = await axios.post(
        "https://ai-image-sc2b.onrender.com/api/generate-image",
        { userPrompt: prompt }
      );

      const images = response.data.images;

      if (!images || images.length === 0) {
        setError("No image returned");
        return;
      }

      setImage(images[0]);
    } catch {
      setError("Image generation failed");
    } finally {
      setLoading(false);
    }
  };
useEffect(()=>{
  if(prompt===""){
  setImage("")
}
})
  return (
    <div className="ai-page">

      <div className="ai-header">
        <h1>AI Image Generator</h1>
        <p>Describe anything and let AI create it ✨</p>
      </div>

      <div className="ai-output">
        {loading && (
  <div className="ai-spinner-wrapper">
    <div className="ai-spinner"></div>
    <p className="ai-loading-text">Generating image</p>
  </div>
)}

        {error && <p className="ai-error">{error}</p>}

        {image && (
          <div className="ai-image-box">
            <img src={image} className="alt-text" alt="The Thing You Entered Is Not Allowed To Generate" />
          </div>
        )}
      </div>

     <div className="ai-input-bar">
  <div className="ai-input-group">
    <input
      className="ai-input"
      placeholder="A boy playing cricket"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
    />
    <button className="ai-btn" onClick={handleGenerateImage} disabled={loading}>
      Generate
    </button>
  </div>
</div>

    </div>
  );
};

export default Home;
