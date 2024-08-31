import { useState, useEffect, FormEvent } from "react";
import { fetchData } from "../services/unsplash-api";
import { SearchBar } from "./SearchBar/SearchBar";
import Keys from "../services/ApiKEY.json";
import ImageGallery from "./ImageGallery/ImageGallery";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Loader from "./Loader/Loader";
import ImageModal from "./ImageModal/ImageModal";
import { UnsplashImage } from "../types/types";

function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const notify = (message: string) => toast.error(message);

  const [modalUrls, setModalUrls] = useState<string>("");
  const [alt, setAlt] = useState<string>("");
  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);

  const onSubmitFunc = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const nameImgInput = form.elements.namedItem("nameImg") as HTMLInputElement;

    if (!nameImgInput.value.trim()) {
      return notify("Please enter a search query");
    }

    setQuery(nameImgInput.value);
    setImages([]);
    setError(false);
    setPage(1);
    e.currentTarget.reset();
  };

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (query) {
      const ApiKey: string = Keys.ApiKey;
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

  const openModal = (alt: string, modalUrls: string) => {
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
