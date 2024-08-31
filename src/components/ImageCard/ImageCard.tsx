import { UnsplashImage } from "../../types/types";
import s from "./ImageCard.module.css";

interface ImageCardProps {
  data: UnsplashImage;
  openModal: (alt: string, modalUrls: string) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ data, openModal }) => {
  return (
    <div className={s.card}>
      <img
        onClick={() => openModal(data.alt_description, data.urls.regular)}
        src={data.urls.small}
        alt={data.alt_description}
      />
    </div>
  );
};
