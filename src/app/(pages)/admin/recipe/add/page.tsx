"use client";
import Image, { StaticImageData } from 'next/image'
import Rating from '@/app/components/generic/rating'
import Button from '@/app/components/generic/button'
import { FaBookmark, FaRegBookmark, FaClock, FaSave, FaTrashAlt } from 'react-icons/fa'
import { BsClock, BsBookFill, BsCardList, BsShopWindow, BsUpload, BsPlusCircle, BsArrowClockwise, BsTrash, BsCloudUploadFill, BsFolder, BsFolderFill, BsImageFill, BsX } from 'react-icons/bs'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import FormInput from '@/app/components/generic/formInput';
import TextArea from '@/app/components/generic/textArea';
import IngredientList from '@/app/components/recipeForm/ingredientFormList';
import { Checkbox } from '@mui/material';
import FormCheckbox from '@/app/components/generic/formCheckbox';
import { start } from 'repl';
import FormPopup from '@/app/components/generic/formPopup';
import Router from 'next/router';
import Link from 'next/link';

export default function RecipePage(){
    const [isSaved, setSaved] = useState(false)
    const [discardStarted, setDiscardStarted] = useState(false)
    const [popupOpen, setPopupOpen] = useState(false)
    const [uploadOpen, setUploadOpen] = useState(false)
    const [thumbnail, setThumbnail] = useState<FileOrUndefined>(undefined)

    type FileOrUndefined = File | undefined;

    const [fileToUpload, setFileToUpload] = useState<FileOrUndefined>()

    const fileInput = useRef<HTMLInputElement | null>(null)

    function Discard(){
        if(discardStarted){
            //method to discard the whole draft
            Router.push('/');
            return setDiscardStarted(false)
        }    
        return setDiscardStarted(true)
    }

    function SaveThumbnail(){
        setThumbnail(fileToUpload)
        console.log(thumbnail)
    }

    function ImageUploadDiscard(){
        setFileToUpload(undefined)
    }

    const [ingredients, setIngredients] = useState(
        [
            {name: "strawberries", desc: "4 cups fresh strawberries, hulled and sliced", key: 0},
            {name: "sugar", desc: "1 cup sugar", key: 1},
            {name: "lemon juice", desc: "1 tablespoon lemon juice", key: 2},
            {name: "flour", desc: "2 cups flour", key: 3}
        ]
    )

    function TriggerFileInput(){
        fileInput.current?.click();
    }

    function HandleFileChange(event: any){
        setFileToUpload(event.target.files[0])
        setThumbnail(event.target.files[0])
    }
    
    function AddRecipeIngredient(){
        let updatedIngredients = ingredients
        updatedIngredients.push({name: "", desc: "", key: 4})
        setIngredients([...updatedIngredients])
        console.log(ingredients)
    }

    return(
        <main className="flex flex-col m-auto max-xl:mx-3 gap-4">
            {uploadOpen && 
            <div className="w-full h-full fixed top-0 left-0 bg-black/50 backdrop-blur-md z-50 text-white">
                    <FormPopup className="w-112" headerText="Upload Image" uploadFunction={() => console.log("click")} setPopUpOpen={setUploadOpen} popupOpen={uploadOpen} 
                        triggerDiscard={ImageUploadDiscard} triggerSave={SaveThumbnail}>
                            <h2>Choose a file to upload:</h2>
                            <input ref={fileInput} type="file" accept=".jpg,.jpeg,.png,.pneg" className="hidden" onChange={(e) => HandleFileChange(e)} />
                            <Button onClick={(e) => TriggerFileInput()} className="w-fit mt-2 mb-6">
                                Browse <BsFolderFill className="mt-1"/>
                            </Button>

                            <div className="flex aspect-square w-full bg-slate-400/30 relative rounded-lg overflow-hidden place-items-center justify-center">
                                
                                {fileToUpload ? <Image layout="fill" objectFit="cover" className="w-full h-full" src={URL.createObjectURL(fileToUpload)} alt="Image to be uploaded"/> : <BsImageFill className="w-24 h-24 opacity-50"/>}
                                {fileToUpload ? 
                                <BsX className="absolute top-0 right-0 w-10 h-10 cursor-pointer opacity-60 hover:opacity-100 transition-all active:opacity-30 duration-100"
                                    onClick={() => setFileToUpload(undefined)}/> : 
                                <></>}
                            </div>
                            {fileToUpload && <h3 className="text-sm w-full break-words">{fileToUpload?.name}</h3>}
                    </FormPopup>
            </div>
            }
            <section id="header-section" className='max-w-7xl h-112 min-h-fit bg-black/90 flex m-auto w-full rounded-xl mt-4 shadow-md shadow-black/40 overflow-clip'>
                <div id="image-section" className="w-112 shrink-0 h-full relative group cursor-pointer" onClick={() => setUploadOpen(true)}>
                        <div className={`${thumbnail ? "bg-black/90" : "bg-slate-400/50 group-hover:bg-slate-400/40 group-active:bg-slate-400/30"} w-full h-full flex   transition-all`}>
                            <BsUpload className="h-16 w-16 place-self-center m-auto fill-white/80 group-hover:scale-110 group-active:scale-100 transition-all z-10"/> 
                            {thumbnail === undefined ? "" : <Image layout="fill" objectFit="cover" className="w-full h-full group-active:opacity-70 group-hover:opacity-80" 
                                src={thumbnail === undefined ? "" : URL.createObjectURL(thumbnail)} alt=""/>}
                        </div>
                </div>
                <div id="title-section" className="p-8 flex text-white w-full">
                    <div className="flex flex-col self-center w-full">
                        <div className='flex gap-5 place-content-between content-center mb-6'>
                            <FormInput className="w-full" label="Recipe Name" placeholder="Enter recipe name"/>
                            <Rating  rating={4.2}/>
                        </div>
                        <TextArea label="Recipe Summary" placeholder="Enter short recipe description"/>
                        <div className="flex flex-row place-content-between mt-10">
                            <div className="flex gap-2">
                                <BsClock className="h-4 w-4 place-self-center"/> 
                                <p className="place-self-center place-items-center text-white/80 flex gap-2">
                                    Preparation time:
                                    <FormInput className="w-16" inputClassName="w-fit text-center" placeholder="0"/> 
                                    minutes
                                </p>
                            </div>
                            <div className="flex flex-row-reverse gap-2">
                                <Button className="bg-green-500/70 hover:bg-green-500/90 active:opacity-80 text-sm font-normal py-1 transition-all flex items-center gap-2"
                                    onClick={() => setSaved(x => !x)}> 
                                    {isSaved ? <>Uploading <BsArrowClockwise className="animate-spin h-4 w-4"/></> : <>Create <BsCloudUploadFill/></>}
                                </Button>

                                {discardStarted ? 
                                <Link className='' href={"/"}>
                                    <Button className="hover:bg-vermilion-500/90 bg-vermilion-500/80
                                    active:opacity-80 text-sm font-normal py-4 transition-all flex items-center gap-2"
                                    onClick={() => Discard()}> 
                                    <> Are you sure? <BsTrash/></>
                                </Button>
                                </Link>:
                                <Button className="bg-slate-700/40 hover:bg-vermilion-500/90
                                active:opacity-80 text-sm font-normal py-3 transition-all flex items-center gap-2"
                                onClick={() => Discard()}> 
                                <>Discard <BsTrash/></>
                                </Button>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section id="ingredients-section" className='max-w-7xl overflow-hidden bg-black flex flex-col m-auto w-full relative text-lg p-8 rounded-xl mt-4 shadow-md shadow-black/40 text-white'>
                <h2 className="text-4xl font-semibold flex gap-2 mb-6">
                    <BsShopWindow className="h-7 w-7 place-self-center fill-vermilion-400"/> 
                    Igredients
                </h2>
                <h2 className="text-xl mb-5">
                    What you'll need:
                </h2>
                <p>
                    <ul className="list-disc flex flex-col gap-2 ml-10">
                        <IngredientList setPopupOpen={setPopupOpen} ingredients={ingredients} setIngredients={setIngredients}/>
                        <li className="flex p-3 px-5 rounded-lg mt-2 bg-slate-700/30 w-fit place-items-center gap-2 cursor-pointer
                            hover:bg-slate-700/50 transition-all active:hover:bg-slate-700/40 select-none"
                            onClick={() => AddRecipeIngredient()}> 
                            Add <BsPlusCircle/> 
                        </li>
                    </ul>
                    <br/>
                    <TextArea inputClassName="mt-5"  label="Ingredients Notes" placeholder="Enter short recipe description"/>
                </p>

                {popupOpen && <AddIngredientPopup setPopUpOpen={setPopupOpen} popupOpen={popupOpen}/>}
            </section>

            <section id="recipe-section"className='max-w-7xl bg-black text-lg mb-8 m-auto w-full p-8 rounded-xl text-white mt-4 shadow-md shadow-black/40'>
                <h2 className="text-4xl font-semibold flex gap-2 mb-6">
                    <BsCardList className="h-7 w-7 place-self-center fill-vermilion-400"/> 
                    Instructions
                </h2>
                <TextArea inputClassName="mt-5 h-96"  label="Detailed Recipe Instructions" placeholder="Enter detailed recipe instructions"/>
            </section>
        </main>
    )
}


function AddIngredientPopup({setPopUpOpen, popupOpen} : {setPopUpOpen: any, popupOpen: boolean}){
    const [isSaved, setSaved] = useState(false)
    const [discardStarted, setDiscardStarted] = useState(false)

    function Discard(){
        if(discardStarted){
            setPopUpOpen(false)
            return setDiscardStarted(false)
        }    
        return setDiscardStarted(true)
    }

    return(
        <div className="w-full text-base h-full bg-black/60 backdrop-blur-sm flex absolute top-0 left-0 justify-center">
            <div className="w-96 h-fit mt-32 rounded-lg shadow-md shadow-black/40 overflow-hidden bg-black">
                <div className="w-full flex gap-2 flex-col p-10 h-full bg-slate-700/20">
                    <h2 className="font-semibold text-2xl mb-5">Add New Ingredient</h2>
                    <FormInput label="Name" inputClassName="w-fit p-3 mb-6" placeholder="Enter ingredient name"/>
                    <FormCheckbox className="w-44" label="Vegan?"/>
                    <FormCheckbox className="w-44 mb-6" label="Vegetarian?"/>
                    <FormCheckbox className="w-44 mb-6" label="Vegatbular?"/>
                    <div className="flex flex-row-reverse gap-2">
                        <Button className="bg-green-500/70 hover:bg-green-500/90 active:opacity-80 text-sm font-normal py-1 transition-all flex items-center gap-2"
                            onClick={() => setSaved(x => !x)}> 
                            {isSaved ? <>Saving <BsArrowClockwise className="animate-spin h-4 w-4"/></> : <>Save <FaSave/></>}
                        </Button>
                        <Button className={`${discardStarted ? "hover:bg-vermilion-500/90 bg-vermilion-500/80" : "bg-slate-700/40 hover:bg-vermilion-500/90"} 
                            active:opacity-80 text-sm font-normal py-1 transition-all flex items-center gap-2`}
                            onClick={() => Discard()}> 
                            {discardStarted ? <> Are you sure? <BsTrash/></> : <>Discard <BsTrash/></>}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}