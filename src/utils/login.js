export default async function login({username, password}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username ==='king' && password === 'kong') {
                resolve()
            } else {
                reject()
            }
        }, 1000)
    })
}