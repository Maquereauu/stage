export const UpdateRdv = async (Rdv) => {
    const response = await fetch(
        'https://stage-dun.vercel.app/rdv/update', {
            method: 'POST', 
            headers: {
                'Accept': 'application/json', 
                'Content-Type':'application/json'
            },
            body : JSON.stringify(Rdv)
        }
    )
    const RdvList = await response.json()
    return RdvList
}