import {useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setPetAsAdopted, toggleFavourite} from './petsSlice'
import {useAppSelector} from "../../app/hooks.ts";
import {Dog, Cat, Bird, Heart, Rabbit} from 'lucide-react';
import {adoptAPet} from "../adoptions/adoptionsSlice.ts";

const PetPage = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const pet = useAppSelector(state => state.pets.items.find(p => p.id === id))

    if (!pet) return <div className="p-8 text-center text-gray-400">Pet not found</div>

    const adopt = () => {
        dispatch(adoptAPet({id: pet.id, ownerName: "my--test-user"}))
        dispatch(setPetAsAdopted(pet.id))
    }

    return (
        <div className="max-w-2xl mx-auto p-8 min-w-150">
            <div className="border border-gray-700 rounded-xl overflow-hidden">

                <div className="bg-gray-900 p-6 flex items-center gap-6 border-b border-gray-700">
                    <div className="w-20 h-20 rounded-full bg-emerald-900 flex items-center justify-center text-4xl">
                        {pet.species === 'dog' && <Dog className="w-10 h-10 text-emerald-400"/>}
                        {pet.species === 'cat' && <Cat className="w-10 h-10 text-emerald-400"/>}
                        {pet.species === 'bird' && <Bird className="w-10 h-10 text-emerald-400"/>}
                        {pet.species === 'rabbit' && <Rabbit className="w-10 h-10 text-emerald-400"/>}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 flex-wrap min-h-[28px]">
                            <h1 className="text-2xl font-medium text-white">{pet.name}</h1>
                            <span
                                className="text-xs px-3 py-1 rounded-md bg-emerald-900 text-emerald-400 border border-emerald-700">{pet.status}</span>
                            <span
                                className={`text-xs px-3 py-1 rounded-md border ${pet.isFavourited ? 'bg-amber-900 text-amber-400 border-amber-700' : 'invisible'}`}>★ Favourited
                            </span>
                        </div>

                        <p className="text-sm text-gray-400 mt-1">{pet.breed} · {pet.species}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-gray-700 border-b border-gray-700 bg-gray-800">
                    <div className="p-4 text-center">
                        <p className="text-xs text-gray-500 mb-1">Age</p>
                        <p className="text-lg font-medium text-white">{pet.age} yrs</p>
                    </div>
                    <div className="p-4 text-center">
                        <p className="text-xs text-gray-500 mb-1">Species</p>
                        <p className="text-lg font-medium text-white">{pet.species}</p>
                    </div>
                    <div className="p-4 text-center">
                        <p className="text-xs text-gray-500 mb-1">Breed</p>
                        <p className="text-lg font-medium text-white">{pet.breed}</p>
                    </div>
                </div>

                <div className="p-6 bg-gray-800">
                    <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">About {pet.name}</h2>
                    <p className="text-sm leading-relaxed text-gray-300">{pet.description}</p>
                </div>

                <div className="px-6 pb-6 flex gap-3 bg-gray-800">
                    {pet.status === 'available' ?
                        <button
                            onClick={() => adopt()}
                            className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500">
                            Adopt {pet.name}
                        </button>
                        :
                        <button
                            className="flex-1 py-2.5 rounded-lg disabled: bg-red-400 text-white text-sm font-medium">
                            {pet.name} is unavailable
                        </button>
                    }
                    <button
                        onClick={() => dispatch(toggleFavourite(pet.id))}
                        className="flex-1 py-2.5 rounded-lg border border-gray-600 text-gray-300 text-sm hover:bg-gray-700 flex items-center justify-center gap-2"
                    >
                        <Heart className={`w-4 h-4 ${pet.isFavourited ? 'text-red-400' : 'text-gray-500'}`}/>
                        {pet.isFavourited ? 'Unfavourite' : 'Favourite'}
                    </button>
                </div>

            </div>
        </div>)
}

export default PetPage