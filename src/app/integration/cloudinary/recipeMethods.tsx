import { Recipe } from "@/app/types";
import {Cloudinary} from "@cloudinary/url-gen";
import { url } from "inspector";
import { Url } from "next/dist/shared/lib/router/router";

function CloudinaryInstance(){
    const cloud = new Cloudinary({cloud: {cloudName: 'recipefy'}});
}

export async function UploadImage(file: File){
    let formData = new FormData();
    // append your fields to it
    formData.append("file", file);
    formData.append("upload_preset", "default");
    formData.append("api_key", "955791326567249");

    let response = await fetch("https://api.cloudinary.com/v1_1/recipefy/image/upload/",
        {
            method: 'POST',
            mode: 'cors',
            body: formData
        }
    )

    let body = await response.json() 
    return body.url
}

export async function PostRecipe(data: Recipe){
    //const apiEndpoint = GetApiEndpoint()
    console.log("inside function")
    console.log(data)
    let response = await fetch(`http://localhost:3004/recipes/`,
                        {
                            method: 'POST',
                            mode: 'cors',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }
    )

    let body = await response.json()    
    return await body
}

export async function GetRecipe({data}:{data: any}){
    //const apiEndpoint = GetApiEndpoint()
    let response = await fetch(`http://localhost:3004/recipes/`,
                        {
                            method: 'GET',
                            mode: 'cors',
                            headers:{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }
    )

    let body = await response.json()          
    return await body
}
