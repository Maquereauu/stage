export const InsertTraitement = async (traitement) => {
    const response = await fetch(
        'https://stage-dun.vercel.app/traitement/insert', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            },
            body : JSON.stringify(traitement)
        }
    )
    const TraitementList = await response.json()
    return TraitementList
}