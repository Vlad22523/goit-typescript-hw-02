import s from "./SearchBar.module.css";

export const SearchBar = ({ onSubmitFunc }) => {
  return (
    <header className={s.header}>
      <form onSubmit={onSubmitFunc}>
        <input
          name="nameImg"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
    </header>
  );
};
