import { useEffect, useState } from "react";
import { api } from "../services/api";
import IGenreResponseProps from "../types/IGenreResponseProps";
import { Button } from "./Button";

interface Props {
  selectedGenreId: number,
  handleClickButton(id: number): any
}

export function SideBar({ selectedGenreId, handleClickButton }: Props) {
  const [genres, setGenres] = useState<IGenreResponseProps[]>([]);

  useEffect(() => {
    api.get<IGenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}