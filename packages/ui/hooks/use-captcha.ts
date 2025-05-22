"use client"
import { useEffect, useState } from 'react';
import { CaptchaData } from '../types/ui-types';

const useCaptcha = (url: string) => {
    const [fetchUrl, setFetchUrl] = useState(url);
    const [isLoading, setIsLoading] = useState(true);
    const [captchaData, setCaptchaData] = useState<CaptchaData>({ captcha_id: "", pic_path: "", captcha_length: 0 });
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchCaptcha(fetchUrl);        
    }, [])

    const fetchCaptcha = async (url: string) => {
        try {
            setIsLoading(true);
            setErrorMessage("");
            const response = await fetch(url);
            // console.log("fetch captcha response", response);
            if (!response.ok) {
                setErrorMessage(`HTTP error! status: ${response.status}`);
                return;
            }
            const data = await response.json();
            // console.log("fetch captcha data", data);
            // const captchaData: CaptchaData = { CaptchaId: data.captcha_id, PicPath: data.pic_path, CaptchaLength: data.captcha_length };
            const captchaData: CaptchaData = { ...data.data };
            // console.log("captchaData", captchaData);
            setCaptchaData(captchaData);    
        } catch {
            // console.log("fetch captcha failure", err);
            setErrorMessage("Captcha load failed. Tap to retry.");
        } finally {
            setIsLoading(false);
        }
    }
    return {setFetchUrl, isLoading, captchaData, errorMessage, fetchCaptcha};
}

export default useCaptcha;