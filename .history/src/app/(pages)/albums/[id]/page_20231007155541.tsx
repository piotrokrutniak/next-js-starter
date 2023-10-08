"use client"
import GetAlbumsByUserId from "@/app/integration/jsonApi/getAlbumsByUserId"
import GetUser from "@/app/integration/jsonApi/getUser"
import { Album, Photo, User } from "@/app/types"
import { useEffect, useState } from "react"
import { FaUser, FaImages } from "react-icons/fa"

export default function UserPage(pageData: {params: {id: number}, searchParams: any}){
    const data = pageData.params
    const [user, setUser] = useState<User>()
    const [albums, setAlbums] = useState<Album[]>([])

    const [photos, setPhotos] = useState<Photo[]>([])
    
    useEffect(() => {
      GetUser(data.id)
        .then(x => setUser(x))
        .then(() => GetAlbumsByUserId(1, user?.id))
        .then(x => setAlbums(x.body))
    }, [])

    return(
        <section id="header-section" className='max-w-7xl flex flex-col overflow-hidden gap-5 bg-black/90 m-auto w-full  rounded-xl mt-4 shadow-md shadow-black/40 text-white'>
            <div className="flex justify-between place-items-center p-8">
                <div className="w-32 h-32 flex justify-center place-items-center">
                    <FaImages className="w-full h-2/3"/>
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
        </section>
    )
}