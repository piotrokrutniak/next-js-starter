
export default async function GetIngredients(wildcard?: string, skip?: number){
    //const apiEndpoint = GetApiEndpoint()
    const data = {
        skip: skip ?? "",
        wildcard: wildcard ?? ""
    }

    let response = await fetch(`http://localhost:3004/ingredients/byName/`,
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