const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button className="more-button" onClick={onLoadMore} type="button">
      Load More
    </button>
  );
};

export default LoadMoreBtn;
