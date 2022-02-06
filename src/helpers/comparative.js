

export const comparative = (character) =>{

    let comparatorCharacters = [character]
    let resp={ok:0, message:''}

    if(localStorage.getItem("comparative") === null){
        localStorage.setItem('comparative', JSON.stringify(comparatorCharacters))

        return {ok:1, message:'OK'}
    }else{
        comparatorCharacters = JSON.parse(localStorage.getItem('comparative'))

        if(comparatorCharacters.length>=3){
            return {ok:0, message:'ERROR_FULL_COMPARATOR'}
        }else{
            const filter = comparatorCharacters.filter(data => data.id == character.id)
        
            //verify that it already exists
            if(filter.length==0){
                comparatorCharacters.push(character)
                localStorage.setItem('comparative', JSON.stringify(comparatorCharacters))

                return {ok:1, message:'OK'}
            }else{
                return {ok:0, message:'ERROR_CHARACTER_IN_COMPARATOR'}
            }
        }
    }
}

export const deleteCharacterComparative = (character) =>{

    let comparatorCharacters = JSON.parse(localStorage.getItem('comparative'))

    const filter = comparatorCharacters.filter(data => data.id != character.id)

    localStorage.setItem('comparative', JSON.stringify(filter))

    return {ok:1, message:'DELETED_CHARACTER', data: filter}
}