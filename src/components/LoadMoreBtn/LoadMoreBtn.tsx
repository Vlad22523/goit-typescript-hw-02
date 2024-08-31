interface LoadMoreBtnProps {
  onLoadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMore }) => {
  return (
    <button className="more-button" onClick={onLoadMore} type="button">
      Load More
    </button>
  );
};

export default LoadMoreBtn;
