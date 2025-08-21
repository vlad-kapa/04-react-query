import toast from 'react-hot-toast';
import styles from "./SearchBar.module.css";

interface SearchBarProps {
    onSubmit: (query: string) => void;
}

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleFormAction = (FormData: FormData) => {
    const searchData = FormData.get("query") as string;
    if (!searchData.trim()) {
      toast.error('Please enter your search query.');
      return;
    }
    onSubmit(searchData);
  }


    return (
        <header className={styles.header}>
          <div className={styles.container}>
            <a
              className={styles.link}
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by TMDB
            </a>
            <form className={styles.form} action={handleFormAction}>
              <input
                className={styles.input}
                type="text"
                name="query"
                autoComplete="off"
                placeholder="Search movies..."
                autoFocus
              />
              <button className={styles.button} type="submit">Search</button>
            </form>
          </div>
        </header>
      );
};
    
export default SearchBar;