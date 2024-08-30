import { ImageCard } from "../ImageCard/ImageCard.jsx";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={s.gallery}>
      {images.map((item) => (
        <li key={item.id} className={s.galleryItem}>
          <ImageCard openModal={openModal} data={item} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
