const corsproxy = 'https://befake-cors-proxy.uped.workers.dev/corsproxy/?apiurl='
const sendotpUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/sendVerificationCode?key=AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA'
const verifyotpUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPhoneNumber?key=AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA'
const berealApiUrl = 'https://mobile.bereal.com/api'
const refreshTokenUrl = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyDwjfEeparokD7sXPVQli9NsTuhT6fJ6iA'

const commonOptions = {
    headers: {
        'Content-Type': 'application/json',
        'x-ios-bundle-identifier': 'AlexisBarreyat.BeReal'
    },
};


export const myFetch = async (url, options) => {
    const response = await fetch(
        `${corsproxy}${url}`,
        {
            ...commonOptions,
            ...options
        }
    )
    if (response.ok) return response;

    throw new Error(`Server responeded with status code ${response.status}.`)
}


export const sendotp = async (phoneNumber) => {
    const response = await myFetch(
        sendotpUrl,
        {
            method: 'POST',
            body: `{"phoneNumber":"${phoneNumber}","iosReceipt":"AEFDNu9QZBdycrEZ8bM_2-Ei5kn6XNrxHplCLx2HYOoJAWx-uSYzMldf66-gI1vOzqxfuT4uJeMXdreGJP5V1pNen_IKJVED3EdKl0ldUyYJflW5rDVjaQiXpN0Zu2BNc1c"}`
        }
    )

    const data = await response.json()
    localStorage.setItem("sessionInfo", data.sessionInfo)

}

export const verifyotp = async (code) => {
    const sessionInfo = localStorage.getItem("sessionInfo")
    const response = await myFetch(
        verifyotpUrl,
        {
            method: 'POST',
            body: `{"sessionInfo":"${sessionInfo}","code":"${code}","operation":"SIGN_UP_OR_IN"}`
        }
    )
    const data = await response.json()
    localStorage.setItem("idToken", data.idToken)
    localStorage.setItem("refreshToken", data.refreshToken)
    localStorage.setItem("expiresAt", `${Math.floor(Date.now() / 1000) + +data.expiresIn}`)
}

export const getFriendFeed = async () => {
    const token = localStorage.getItem("idToken")
    const response = await myFetch(
        `${berealApiUrl}/feeds/friends`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return await response.json()
}

export const refreshToken = async () => {
    const _refreshToken = localStorage.getItem("refreshToken")

    const response = await myFetch(
        refreshTokenUrl,
        {
            method: 'POST',
            body: `{"refresh_token":"${_refreshToken}","grant_type":"refresh_token"}`
        }
    )

    // dry
    const data = await response.json()
    localStorage.setItem("idToken", data.id_token)
    localStorage.setItem("refreshToken", data.refresh_token)
    localStorage.setItem("expiresAt", `${Math.floor(Date.now() / 1000) + +data.expires_in}`)
}