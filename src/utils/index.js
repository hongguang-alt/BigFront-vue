export const getHashUrl = (url) => {
    let res = url.split('?')[1].split('&')
    let newRes = res.map(item => {
        return item.split('=')
    })
    return Object.fromEntries(newRes)
}