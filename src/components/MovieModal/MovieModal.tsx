import type { Movie } from "../../types/movie";
import {useEffect} from "react";
import css from "../MovieModal/MovieModal.module.css";
import { createPortal } from "react-dom";

interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
};

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
    useEffect(() => {
        const onEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onEsc);
        return () => window.removeEventListener("keydown", onEsc);
    }, [onClose]);

    useEffect(() => {
        const originalStyle = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    const handleBackdrop = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return createPortal(
        <div className={css.backdrop} onClick={handleBackdrop} role="dialog"  aria-modal="true">
            <div className={css.modal}>
                <button className={css.closeButton} onClick={onClose} aria-label="Close modal">&times;</button>
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className={css.image}
                />
               <div className={css.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
            </div>
        </div>,
        document.body
    );
};

export default MovieModal;