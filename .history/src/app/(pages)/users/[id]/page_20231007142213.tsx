"use client"
import GetAlbumsByUserId from "@/app/integration/jsonApi/getAlbumsByUserId";
import GetUser from "@/app/integration/jsonApi/getUser";
import { Album, User } from "@/app/types";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaImage, FaUser } from "react-icons/fa";

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    const data = pageData.params
    const [user, setUser] = useState<User>()
    const [albums, setAlbums] = useState<Album[]>([])

    useEffect(() => {
      GetUser(data.id)
        .then(x => setUser(x))
        .then(() => GetAlbumsByUserId(1, user?.id))
        .then(x => setAlbums(x.body))
    }, [])
    

    return(
        <>
        <section id="header-section" className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 m-auto w-full  rounded-xl mt-4 shadow-md shadow-black/40 text-white'>
            <div className="flex justify-between place-items-center p-8">
                <div className="w-32 h-32 rounded-full bg-slate-600 flex justify-center place-items-center">
                    <FaUser className="w-full h-2/3"/>
                </div>
                <div className="flex flex-col place-items-end">
                    <span className="text-2xl font-semibold">
                        {user?.name}
                    </span>
                    <span className="text-lg opacity-80">
                        @{user?.username}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-4 p-8 bg-slate-500/20">
                <h1 className="text-2xl font-bold">Contact Information</h1>
                <ul className="flex flex-col gap-4">
                    <li>
                        <h2 className="text-lg font-semibold">Email</h2>
                        <p className="lowercase">{user?.email ?? "-"}</p>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold">Phone</h2>
                        <p>{user?.phone ?? "-"}</p>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold">Company</h2>
                        <p>{user?.company?.name ?? "-"}</p>
                    </li>
                    <li>
                        <h2 className="text-lg font-semibold">Website</h2>
                        <p className="lowercase">{user?.website ?? "-"}</p>
                    </li>
                </ul>
            </div>
        </section>
        <section id="header-section" className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 m-auto w-full rounded-xl mt-4 shadow-md shadow-black/40 text-white'>
            <div className="flex flex-col gap-4 p-8 bg-slate-500/20">
                <h1 className="text-2xl font-bold">Albums</h1>
                <ul className="grid gap-4 grid-auto-fit-md">
                        {albums.length > 0 ? 
                        albums.map((x: Album) => <AlbumPanel album={x}/>):
                        "This has no albums"}
                        {/* <AlbumPanel/>
                        <AlbumPanel/>
                        <AlbumPanel/>
                        <AlbumPanel/> */}
                </ul>
            </div>
        </section>
        </>
    )
}   

function AlbumPanel({album} : {album: Album}){
    return(
        <div className="h-72 bg-slate-500/20 rounded-lg overflow-hidden flex flex-col shadow-md shadow-black/20">
            <div className="h-full bg-black flex place-items-center justify-center">
                <Link href={"/albums/" + album.id}>
                    <FaImage className="w-20 h-20 md:w-12 opacity-30 flex"/>
                </Link>
            </div>
            <div className="h-fit p-4 whitespace-nowrap hover:whitespace-normal">
                <h1 className="font-semibold overflow-ellipsis overflow-hidden ">
                    Title is here Title is here Title is here Title is here Title is here 
                </h1>
            </div>
        </div>
    )
}