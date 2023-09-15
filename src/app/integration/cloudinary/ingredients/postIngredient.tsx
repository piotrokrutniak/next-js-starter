
export default async function PostIngredient(data: { __id: string; name: string; vegan: boolean; vegetarian: boolean; }){
    //const apiEndpoint = GetApiEndpoint()
    console.log("inside function")
    console.log(data)
    let response = await fetch(`http://localhost:3004/ingredients/`,
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