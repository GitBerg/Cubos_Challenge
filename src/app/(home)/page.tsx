'use client'

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

import { getMoviesPerName, getNowPlayingMovies, Movie } from "@/services/api";
import { useEffect, useState } from "react";
import { MovieCard } from "@/components/MovieCard";
import { useGenreStore } from "@/services/api";
import {  Skeleton } from "@mui/material";


export default function Home() {
  const { genres, fetchGenres } = useGenreStore();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [ showFilter, setShowFilter ] = useState(false);


  useEffect(() => {
    if (genres.length === 0) fetchGenres();
    if (value === "") {
      const fetchMovies = async () => {
        try {
          const { results, total_pages } = await getNowPlayingMovies(currentPage);
          setMovies(results);
          setTotalPages(total_pages);
          setLoading(false);
        } catch (error) {
          console.error("Erro ao carregar os filmes.", error);
        }
      };
      fetchMovies();
    } else {

      getMoviesPerName(value, setMovies, setValue, setTotalPages, currentPage)
      setLoading(false);
    }

  }, [currentPage]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startPage = Math.max(1, currentPage - Math.floor(5 / 2));
  const endPage = Math.min(totalPages, startPage + 5 - 1);
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="w-full h-full flex flex-col overflow-y-scroll no-scrollbar">
      <main className="my-4 w-full h-full flex flex-col justify-center items-center gap-4 mb-22">

        <section className="flex items-center justify-center gap-2 w-full px-4 relative">
          <div className="w-md flex items-center border-1 border-[var(--color-border)] bg-[var(--color-secondary)] rounded px-4 md:mx-0 focus-within:border-[var(--color-primary-hover)] transition-all duration-300">
            <input type="text" placeholder="Pesquise por filmes" onChange={handleChange} value={value} className="w-full py-4 outline-none placeholder-[var(--color-border)] text-[var(--color-text)]" />
            <button onClick={() => {
              getMoviesPerName(value, setMovies, setValue, setTotalPages, currentPage);
              setCurrentPage(1);
            }} className="cursor-pointer text-[var(--color-text)]">
              <SearchIcon />
            </button>
          </div>
          <span onClick={() => setShowFilter(!showFilter)} className="flex text-[var(--color-text)] items-center justify-center min-w-[56px] min-h-[56px] cursor-pointer bg-[var(--color-primary)]  hover:bg-[var(--color-primary-hover)] p-4 active:bg-[var(--color-primary-act)]/70 rounded">
            <TuneIcon className='transform rotate-90' />
          </span>
        </section>

        <section className="w-full h-full p-2 relative flex sm:w-8/10 ">
          <div className="w-full h-full bg-[var(--color-menu)] h-full opacity-[var(--opacity-menu)] backdrop-blur-xs z-[-1] absolute bottom-0 left-0 rounded"></div>
          <div className="z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 w-full">
            {loading
              ? Array.from({ length: 10 }).map((_, index) => (
                <Skeleton sx={{ bgcolor: 'rgba(128,128,128, 0.2)' }} key={index} variant="rounded" animation="wave" width={200} height={300} />
              ))
              :
              movies.map((item, index) => (
                <MovieCard key={index} id={item.id} title={item.title} genre={item.genre_ids} posterPath={item.poster_path} />
              ))
            }

          </div>
        </section>

        <section className="flex justify-center gap-2 mx-4 md:mx:0 text-[var(--color-text-title-card)]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="cursor-pointer flex items-center justify-center px-4 w-12 h-10 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]  active:bg-[var(--color-primary-act)] disabled:bg-[var(--color-primary-dis)] rounded"
          >
            <KeyboardArrowLeftIcon />
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`cursor-pointer px-4 w-12 h-10 ${page === currentPage ? "bg-[var(--color-primary-dis)] rounded" : "bg-[var(--color-primary)] active:bg-[var(--color-primary-act)] hover:bg-[var(--color-primary-hover)] rounded"
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="cursor-pointer flex items-center justify-center px-4 w-12 h-10 bg-[var(--color-primary)] disabled:bg-[var(--color-primary-dis)] hover:bg-[var(--color-primary-hover)] active:bg-[var(--color-primary-act)] rounded"
          >
            <KeyboardArrowRightIcon />
          </button>
        </section>
      </main>

    </div>
  );
}
