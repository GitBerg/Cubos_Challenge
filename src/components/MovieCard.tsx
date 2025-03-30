import { useGenreStore } from "@/services/api";
import Image from "next/image";
import Link from "next/link";


const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original'

interface MovieCardProps {
    id: number;
    title: string;
    posterPath: string;
    genre: number []
  }

export const MovieCard = ({ id, title, posterPath, genre }: MovieCardProps) => {

    const { genres } = useGenreStore();

    const genre_names = genre.map((id) => {
        return genres.find((g) => g.id === id)?.name;
    } )

    return (
        <Link href={`/${id}`} className="block group">
        <div className="cursor-pointer w-full h-full relative flex flex-col items-center rounded overflow-hidden min-h-[280px] min-w-[180px]  group">
            <Image className="z-0 w-[100%] h-[100%] object-cover group-hover:scale-110 transition-all duration-300"  src={`${BASE_IMG_URL}${posterPath}`} alt={title.toUpperCase()} width={1000} height={1000}/>
            <span className="absolute z-2 bottom-0 left-0 p-4 transform translate-y-0 group-hover:translate-y-[-30px] transition-all duration-300">
                <h1 className="text-[var(--color-text-title-card)] text-left text-base font-semibold">{title}</h1>
            </span>
            <span className="overflow-hidden absolute z-2 bottom-0 left-0 p-4 opacity-0 group-hover:opacity-100 translate-x-0 transition-all duration-300">
                <h1 className="text-justify text-wrap text-[var(--color-text-desc-card)] text-xs font-normal">{genre_names.join(', ')}</h1>
            </span>
            <span className="absolute z-1 bottom-0 left-0 w-full h-24 bg-linear-to-t from-black to-transparent "></span>
        </div>
        </Link>
    );
};