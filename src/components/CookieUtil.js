import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function cookieWrite(name, content) {
    let d= new Date();
    d.setTime(d.getTime() +(360*60*1000))
    cookies.set(name, content, { path: '/', expires: d});
}

export function cookieRead(name) {
    return cookies.get(name);
}

export function cookieRemove(name) {
    cookies.remove(name)
}