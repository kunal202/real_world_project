const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function getRandomString(length){
    let buff =[]
    while(buff.length<length){
        const charcode = parseInt(Math.random() *(61))
        buff.push(ALPHABET.charAt(charcode))
    }
    return buff.join('')
}

module.exports= {
    getRandomString
}