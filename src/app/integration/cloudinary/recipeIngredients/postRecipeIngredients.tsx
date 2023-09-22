import { RecipeIngredient } from "@/app/types";

export default async function PostRecipeIngredients(data: { _id: string; name: string; desc: string; ingredientId: string; key: number;}[], recipeId: string){
    const ingredients: RecipeIngredient[] = []

    data.forEach(e => {
        ingredients.push({
            recipeId: recipeId,
            ingredientId: e.ingredientId,
            desc: e.desc
        })
    });

    let response = await fetch(`http://localhost:3004/recipeIngredients/`,
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