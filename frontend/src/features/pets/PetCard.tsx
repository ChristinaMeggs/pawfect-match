import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {toggleFavourite} from './petsSlice';
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

interface PetCardProps {
    id: string,
    name: string,
    description: string,
    age: number
}

export const PetCard = ({ id, name, description,age }: PetCardProps) => {
    const dispatch = useAppDispatch();

    const isFavourited = useAppSelector(state =>
        state.pets.items.find(p => p.id === id)?.isFavourited
    );



    return (
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium flex flex-col justify-around min-w-60 ">
            <Link to={`/pet/${id}`}>
                <div className={"mb-2 text-2xl font-semibold tracking-tight text-heading leading-8 text-bg"}>{name}</div>
            </Link>
            <div className={"text-sm mb-3 text-blue-400"}>age: {age}</div>

            <h4 className={"text-md mb-5"}>{description}</h4>


            <div className={"mt-auto flex flex-row justify-around w-full"}>
            <button onClick={() => dispatch(toggleFavourite(id))}>
                <div className={"flex flex-row text-sm"}>
                {isFavourited  ?
                    <><Heart className="w-5 h-5 text-red-500 mr-2"/>Unfavourite</>:
                    <><Heart className="w-5 h-5 text-white mr-2"/>Favourite</>
                }
                </div>
            </button>
            </div>
        </div>
    );
};