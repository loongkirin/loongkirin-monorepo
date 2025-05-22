export type DropdownOption = {
  label: string,
  value: string,
  disabled: boolean,
}

export interface CaptchaData{
  captcha_id: string;
  pic_path: string;
  captcha_length: number;
}

export interface Captcha{
  captcha_id: string;
  captcha_value: string;
}