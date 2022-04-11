import axios, {CancelToken} from 'axios';
import OAuth from 'oauth-1.0a';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

export const config = {
    WC_BASE_URL: 'http://shevastore.unas.cz',
    WC_API_URL: '/wp-json/wc/v3',
    WC_CONSUMER_KEY: 'ck_0dd9139daabcf2b801fa4123f0b477d3ed84ea68',
    WC_CONSUMER_SECRET: 'cs_0c6fdb18eb462f9279acb787d07753506e382f12'
};

const _getOAuth = (): OAuth => new OAuth({
    consumer: {
        key: config.WC_CONSUMER_KEY,
        secret: config.WC_CONSUMER_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function: (baseString: string, key: string) => Base64.stringify(
        hmacSHA1(baseString, key)
    )
});

export const get = async (path: string, cancelToken: undefined | CancelToken = undefined) => {
    const request = {
        url: `${config.WC_BASE_URL}${config.WC_API_URL}${path}`,
        method: 'GET'
    };
    const oauth = _getOAuth().authorize(request);
    if (!cancelToken)
        return axios.get(request.url, {params: oauth})
    else return axios.get(request.url, {params: oauth, cancelToken: cancelToken})
};


