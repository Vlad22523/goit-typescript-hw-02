import { useState, useEffect } from "react";
import { fetchData } from "../services/unsplash-api";
import { SearchBar } from "./SearchBar/SearchBar";
import Keys from "../services/ApiKEY.json";
import ImageGallery from "./ImageGallery/ImageGallery";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Loader from "./Loader/Loader";
import ImageModal from "./ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const notify = (message) => toast.error(message);

  const [modalUrls, setModalUrls] = useState("");
  const [alt, setAlt] = useState("");
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const onSubmitFunc = (e) => {
    e.preventDefault();

    const { nameImg } = e.target.elements;
    if (!nameImg.value.trim()) {
      return notify("Please enter a search query");
    }
    console.log(query);
    setQuery(nameImg.value);
    setImages([]);
    setError(false);
    setPage(1);
    e.target.reset();
  };

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (query) {
      const ApiKey = Keys.ApiKey;
      const fetchDatas = async () => {
        try {
          setError(false);
          setLoader(true);
          const res = await fetchData(ApiKey, query, page);
          if (res.results.length === 0) {
            setError(true);
          } else {
            setImages((prev) => [...prev, ...res.results]);
            setTotal(res.total_pages);
          }
        } catch (err) {
          setError(true);
        } finally {
          setLoader(false);
        }
      };
      fetchDatas();
    }
  }, [query, page]);

  const openModal = (alt, modalUrls) => {
    setModalIsOpened(true);
    setAlt(alt);
    setModalUrls(modalUrls);
  };
  const closeModal = () => {
    setModalIsOpened(false);
    setAlt("");
    setModalUrls("");
  };

  return (
    <>
      <SearchBar onSubmitFunc={onSubmitFunc} />
      <Toaster />
      {error && <ErrorMessage />}
      <ImageGallery openModal={openModal} images={images} />
      {loader && <Loader />}
      {total > page && !error && !loader && (
        <LoadMoreBtn onLoadMore={onLoadMore} />
      )}
      <ImageModal
        openModal={modalIsOpened}
        closeModal={closeModal}
        modalUrls={modalUrls}
        alt={alt}
      />
    </>
  );
}

export default App;
