import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import imageCompression from "browser-image-compression";
import "../styles/newProductAdd.css";

const NewProductAdd = () => {
  const temp = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [errorAdding, setErrorAdding] = useState("");
  const [progressBar, setProgressBar] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [imageTimeout, setImageTimeout] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  const [sareeName, setSareeName] = useState("");

  const [sareeId, setSareeId] = useState("");

  const [sareeDesc, setSareeDesc] = useState("");
  const [category, setCategory] = useState("Banarasi");
  const [fabric, setFabric] = useState("Silk");
  const [workType, setWorkType] = useState("Zari");
  const [occasion, setOccasion] = useState("Casual");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [bestSelling, setBestSelling] = useState(false);
  const [images, setImages] = useState([]);

  console.log(bestSelling);

  const handleFileUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageTimeout(false);
    const timeout = setTimeout(() => setImageTimeout(true), 10000);

    const previewUrl = URL.createObjectURL(file);

    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index] = { file, preview: previewUrl };
      return newImages;
    });

    clearTimeout(timeout);
  };

  // Submit Form
  const handleSubmitNewSaree = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorAdding("");
    setConfirmMessage("");
    setProgressText("Uploading your images...");
    setProgressBar(30);

    setTimeout(() => {
      setProgressText("Verifying saree details...");
      setProgressBar(50);
    }, 3000);

    setTimeout(() => {
      setProgressText("Finalizing your listing...");
      setProgressBar(70);
    }, 5000);

    if (!sareeName || !sareeDesc || !price || !color || images.length < 4) {
      setErrorAdding("Please fill all required fields and upload images.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", sareeName);
    formData.append("sareeId", sareeId);
    formData.append("description", sareeDesc);
    formData.append("price", price);
    formData.append("fabric", fabric);
    formData.append("category", category);
    formData.append("workType", workType);
    formData.append("occasion", occasion);
    formData.append("color", color);
    formData.append("featured", featured);
    formData.append("bestSelling", bestSelling);

    images.forEach(({ file }) => formData.append("images", file));

    try {
      const response = await fetch(`${temp}/saree-related/add-saree`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setLoading(false);
      setProgressBar(100);
      setProgressText("Done! Your saree is added!");
      setShowSuccessAnimation(true);

      setTimeout(() => {
        setProgressBar(0);
      }, 3000);

      if (!response.ok || !data.success) {
        setErrorAdding(data.message || "Failed to add saree.");
        return;
      }

      setConfirmMessage(data.message);
      setSareeName("");
      setSareeId("");
      setSareeDesc("");
      setCategory("Banarasi");
      setFabric("Silk");
      setWorkType("Zari");
      setOccasion("Casual");
      setColor("");
      setPrice("");
      setFeatured(false);
      setBestSelling(false);
      setImages([]);
    } catch (error) {
      console.error("Error:", error);
      setErrorAdding("Error adding saree. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">
      {errorAdding && <p className="message-succ-fail error">{errorAdding}</p>}

      <label>Saree Images</label>
      <div className="upload-section-yash">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="upload-wrapper">
            <input
              type="file"
              accept="image/*"
              id={`file-upload-${index}`}
              onChange={(e) => handleFileUpload(e, index)}
              className="hide-original"
            />

            <label htmlFor={`file-upload-${index}`} className="upload-box-yash">
              <IoCloudUploadOutline />
            </label>

            {images[index] && images[index].preview ? (
              <img
                src={images[index].preview}
                alt="Preview"
                className="image-preview"
              />
            ) : (
              images[index] && (
                <p className="file-name">{images[index].file.name}</p>
              )
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmitNewSaree} encType="multipart/form-data">
        <label>Saree Name</label>
        <input
          type="text"
          placeholder="Enter saree name"
          required
          value={sareeName}
          onChange={(e) => setSareeName(e.target.value)}
        />

        <label>Saree Description</label>
        <textarea
          placeholder="Write details about the saree"
          required
          value={sareeDesc}
          onChange={(e) => setSareeDesc(e.target.value)}
        ></textarea>

        <div className="product-details-yash">
          <div>
            <label htmlFor="saree-id ">
              Saree Id
              <input
                type="text"
                placeholder="Enter saree Id"
                id="saree-id"
                required
                value={sareeId}
                onChange={(e) => setSareeId(e.target.value)}
              />
            </label>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Banarasi</option>
              <option>Kanjeevaram</option>
              <option>Chiffon</option>
              <option>Cotton</option>
              <option>Silk</option>
              <option>Handloom</option>
            </select>
          </div>

          <div>
            <label>Fabric</label>
            <select value={fabric} onChange={(e) => setFabric(e.target.value)}>
              <option>Silk</option>
              <option>Cotton</option>
              <option>Chiffon</option>
              <option>Georgette</option>
              <option>Net</option>
            </select>
          </div>

          <div>
            <label>Work Type</label>
            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
            >
              <option>Zari</option>
              <option>Embroidery</option>
              <option>Handwoven</option>
              <option>Printed</option>
              <option>Stone Work</option>
            </select>
          </div>
        </div>

        <div className="product-details-yash-svnit">
          <div>
            <label>Occasion</label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
            >
              <option>Casual</option>
              <option>Party</option>
              <option>Wedding</option>
              <option>Festive</option>
              <option>Bridal</option>
            </select>
          </div>

          <div>
            <label>Color</label>
            <input
              type="text"
              placeholder="Enter color (e.g., Red & Gold)"
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
        </div>

        <label>Price</label>
        <input
          type="number"
          placeholder="Enter price"
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="featured-checkbox">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <label htmlFor="featured">Add to Featured</label>
        </div>
        <div className="featured-checkbox">
          <input
            type="checkbox"
            id="bestSelling"
            checked={bestSelling}
            onChange={(e) => setBestSelling(e.target.checked)}
          />
          <label htmlFor="bestSelling">Add to Best selling</label>
        </div>
        <div className="btn-div">
          <button
            type="submit"
            className={`add-product-btn ${loading ? "uploading-text" : ""} `}
            disabled={loading}
          >
            {" "}
            {loading ? "ADDING..." : " ADD SAREE"}
          </button>
        </div>
      </form>

      {progressBar > 0 && (
        <>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressBar}% ` }}
            ></div>
          </div>
          <p className="progress-text">{progressText}</p>
          {imageTimeout && (
            <p className="progress-text">looks like images are too HD...</p>
          )}
        </>
      )}

      {confirmMessage && (
        <p className="message-succ-fail success">{confirmMessage}</p>
      )}
    </div>
  );
};

export default NewProductAdd;
