import { UnsplashImage } from "../../types/types.js";
import { ImageCard } from "../ImageCard/ImageCard.js";
import s from "./ImageGallery.module.css";

interface ImageGalleryProps {
  images: UnsplashImage[];
  openModal: (alt: string, modalUrls: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
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
