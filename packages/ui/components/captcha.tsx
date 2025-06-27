"use client"

import React from "react";
import Image from "next/image";
import { Spinner } from "./spinner";
import { Input } from "./input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";
import { CaptchaData } from "../types/ui-types";

const imageSizes = {
  sm: { width: 80, height: 24 },
  md: { width: 96, height: 32 },
  lg: { width: 120, height: 40 },
  xl: { width: 144, height: 48 },
  "2xl": { width: 168, height: 56 },
} as const;

const captchaVariants = cva("flex gap-2", {
  variants: {
    orientation: {  
      horizontal: "flex-row items-center justify-center",
      vertical: "flex-col",
    },
    imageSize: imageSizes,
  },
  defaultVariants: {
    orientation: "horizontal",
    imageSize: "md",
  }
});

export type CaptchaProps = { 
  fetchUrl: string,
  isLoading: boolean, 
  errorMessage: string, 
  captchaData: CaptchaData, 
  fetchCaptcha: (url: string) => Promise<void>,
} & React.ComponentProps<"input"> & VariantProps<typeof captchaVariants>

function Captcha ({ 
  fetchUrl,
  isLoading, 
  errorMessage, 
  captchaData, 
  fetchCaptcha,
  className,
  orientation,
  imageSize="md",
  placeholder = "Verify code",
  ...props
}: CaptchaProps) {
  return (
    <div>
      {isLoading && <Spinner size="sm" />}
      {!isLoading && !errorMessage && (
        <div className={cn(captchaVariants({ orientation }))}>
          <Image 
            alt="captcha" 
            src={captchaData.pic_path} 
            width={imageSizes[imageSize || 'sm'].width} 
            height={imageSizes[imageSize || 'sm'].height} 
            onClick={() => fetchCaptcha(fetchUrl)} 
            className="cursor-pointer bg-gray-200 rounded-sm"            
          />
          <Input 
            id={captchaData.captcha_id} 
            placeholder={placeholder}
            className={cn(className)}
            maxLength={captchaData.captcha_length}
            {...props}
          />
        </div>
      )}
      {errorMessage && <div className='cursor-pointer' onClick={() => fetchCaptcha(fetchUrl)}>{errorMessage}</div>}
    </div>
  )
}

export { Captcha };