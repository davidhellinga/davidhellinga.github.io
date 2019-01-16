import {cookieRead} from "./CookieUtil";

export async function validate() {
    let yee = await fetch("https://chrono-omega.herokuapp.com/api/verifytoken?token=" + cookieRead("token"), {
        method: 'GET'
    }).then(result => {
        return result.text();
    }).then(data => {
        return data;
    });
    return yee;
}

