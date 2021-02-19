import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export function request<T = any>(method: 'get' | 'post', url: string, data?: any) {
    return new Promise<T>((resolve, reject) => {
        axios({ method: method, url: BASE_URL + url, data: data, headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}
