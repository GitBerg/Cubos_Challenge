"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { tmdbApi } from "@/services/api"
import Image from "next/image";
import { CardDesc } from "@/components/CardDesc";

export default function MovieDetails() {
    const params = useParams();
    const movieId = params.id as string;
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await tmdbApi.get(`/movie/${movieId}`);
                setMovie(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do filme:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchMovieDetails();
    }, [movieId]);

    if (loading) return <p>Carregando...</p>;
    if (!movie) return <p>Filme não encontrado</p>;

    return (
        <div className="container h-full mx-auto flex flex-col sm:w-2/3 md:w-4/5">
            <section className={`flex flex-col w-full gap-4 mt-4 py-6 px-4 h-3/5  relative rounded md:flex-row`}>
                <Image alt="bg" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} fill className="absolute top-0 left-0 z-[-1] opacity-30 object-cover object-center invisible rounded overflow-hidden  md:visible" />
                <div className="absolute top-0 left-0 z-[-1] w-full h-full bg-linear-to-r from-[var(--color-mask)] from-10% to-white/10 invisible md:visible"></div>
                <div className="md:w-1/3">
                    <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={500} className="w-full h-full object-cover rounded opacity-100" />
                </div>
                <div className="flex flex-col gap-4 md:w-2/3">
                    <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                        <div className="px-4">
                            <h1 className="text-[var(--color-text)] text-left text-2xl font-normal text-4xl">{movie.title}</h1>
                            <p className="text-[var(--color-border)] text-left text-base font-normal text-base">Titulo Original: {movie.original_title}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <CardDesc title="Popularidade" desc={movie.popularity.toFixed(3)} />
                            <CardDesc title="Votos" desc={movie.vote_count} />
                        </div>
                    </div>
                    <div className="md:flex md:gap-4 md:w-full ">
                        <div className="flex flex-col gap-4 md:w-1/2 ">
                            <CardDesc title="Sinopse" desc={movie.overview} />
                        </div>
                        <div className="flex flex-col gap-4 md:w-1/2">
                            <div className="grid grid-cols-2 gap-4">
                                <CardDesc title="Lançamento" desc={movie.release_date} />
                                <CardDesc title="Duração" desc={movie.runtime} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <CardDesc title="Situação" desc={movie.status} />
                                <CardDesc title="Idioma" desc={movie.original_language} />
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <CardDesc title="Votação Média" desc={movie.vote_average} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full h-4/5 flex flex-col mb-32 gap-4">
                <h2 className="text-[var(--color-text)] text-left text-2xl font-semibold pl-4">
                    Trailer
                </h2>
                <Image src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} width={1920} height={1080} className="w-full h-full object-cover rounded" />
            </section>
        </div>
    );
}