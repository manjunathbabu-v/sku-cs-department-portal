import React, { useState } from 'react';

const images = Array.from({ length: 8 }, (_, i) => ({
  src: `/gallery/image${i + 1}.jpg`,
  alt: `Image ${i + 1}`,
}));

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <h2 className="fw-bold text-center text-primary mb-5">Gallery</h2>

        <div className="row g-4">
          {images.map((image, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3">
              <div className="card border-0 shadow-sm overflow-hidden h-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="card-img-top"
                  style={{
                    height: 200,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    transition: 'transform 0.3s'
                  }}
                  onClick={() => setSelectedImage(image)}   // 🔥 OPEN MODAL
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  onError={e => { e.target.src = '/logo.png'; }}
                />

                <div className="card-footer text-center text-muted small bg-white border-0">
                  {image.alt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
          style={{ zIndex: 9999 }}
          onClick={() => setSelectedImage(null)} // click outside to close
        >
          <div className="position-relative" onClick={(e) => e.stopPropagation()}>
            
            <button
              className="btn btn-danger position-absolute top-0 end-0 m-2"
              onClick={() => setSelectedImage(null)}
            >
              x
            </button>

            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                borderRadius: '10px'
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;