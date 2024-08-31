import Modal from "react-modal";
import s from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ImageModalProps {
  openModal: boolean;
  closeModal: () => void;
  modalUrls: string;
  alt: string;
}

const ImageModal: React.FC<ImageModalProps> = ({
  openModal,
  closeModal,
  modalUrls,
  alt,
}) => {
  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        className={s.content}
        overlayClassName={s.overlay}
        contentLabel="Image Modal"
      >
        <img src={modalUrls} alt={alt} className={s.image} />
      </Modal>
    </div>
  );
};
export default ImageModal;
