import s from "./ImageCard.module.css";

export const ImageCard = ({ data, openModal }) => {
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
