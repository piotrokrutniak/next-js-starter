"use client"
import GetAlbumById from "@/app/integration/jsonApi/getAlbumById"
import GetAlbumPhotos from "@/app/integration/jsonApi/getAlbumPhotos"
import GetAlbumsByUserId from "@/app/integration/jsonApi/getAlbumsByUserId"
import GetUser from "@/app/integration/jsonApi/getUser"
import { Album, Photo, User } from "@/app/types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { FaUser, FaImages, FaAngleUp, FaImage } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    const data = pageData.params
    const [user, setUser] = useState<User>()
    const [album, setAlbum] = useState<Album>()
    const [selectedPhoto, setSelectedPhoto] = useState<Photo>()
    const [photos, setPhotos] = useState<Photo[]>([])
    
    useEffect(() => {
        GetAlbumById(data.id)
            .then((x) => {
                setAlbum(x.body);
                return x.body;
            })
            .then(x => {
                GetUser(x.userId)
                    .then(x => setUser(x));
                return x;
            })
            .then(x => GetAlbumPhotos(x.id, 1)
                .then(x => {
                    setPhotos([...x.body]);
                    setSelectedPhoto(x.body[0])
                    }
            ))
    }, [])

    return(
        <>
        <section id="header-section" className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 m-auto w-full rounded-xl shadow-md shadow-black/40 text-white p-4 sm:p-8 relative'>
            <div className="flex gap-10 justify-between place-items-center px-4 py-2">
                <div className="h-fit gap-3 md:gap-5 flex place-items-center">
                    <FaImages className="w-12 h-2/3"/>
                    <h1 className="capitalize-first text-md md:text-2xl font-semibold">{album?.title ?? "-"}</h1>
                </div>
            </div>
            <div id="photo-section" className="w-full h-full sm:h-screen-1/2 flex aspect-square place-items-center justify-center relative">
                {selectedPhoto?.url == ""  || !selectedPhoto ? <FaImage className="w-20 h-20 md:w-12 opacity-30 flex"/> : <Image layout="fill" objectFit="contain" src={selectedPhoto?.url ?? ""} alt="Album thumbnail" className="aspect-square h-full"/>}
            </div>
            <div id="user-info" className="flex max-xs:justify-between px-2 flex-row-reverse gap-5">
                <Link href={"/users/" + user?.id}>
                <div className="flex flex-col place-items-end">
                    <span className="text:xl md:text-lg whitespace-nowrap font-semibold">
                        {user?.name}
                    </span>
                    <span className="text-sm md:text-base opacity-80">
                        @{user?.username ?? "guest"}
                    </span>
                </div>
                </Link>
                <Link href={"/users/" + user?.id}>
                    <div className="w-10 h-10 rounded-full bg-slate-600 flex justify-center place-items-center">
                            <FaUser className="w-full h-2/3"/>
                    </div>
                </Link>
            </div>
            <div className="text-xl md:text-3xl font-semibold px-2 sm:px-8">Photos </div>
            <div id="gallery" className="grid gap-2 md:gap-4 grid-auto-fit-mobile 2xs:grid-auto-fit-2xs sm:p-4 shadow-inner shadow-black/40 rounded-lg ">
                {photos.length > 0 ? photos.map(x => <GalleryPanel setPhoto={setSelectedPhoto} photo={x}/>) : "This gallery is empty."}
            </div>
        </section>
        </>
    )
}

function GalleryPanel({photo, setPhoto}:{
    photo: Photo;
    setPhoto: Dispatch<SetStateAction<Photo | undefined>>;}){
    return(
        <div className="relative aspect-square">
            <Image layout="fill" objectFit="contain" src={photo.thumbnailUrl ?? ""} alt="Album thumbnail" className="max-h-96 h-full cursor-pointer active:opacity-80 transition-all" onClick={() => setPhoto(photo)}/>
        </div>
    )
}