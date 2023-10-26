import React, { ChangeEvent, useState } from 'react'
import { Avatar, Button} from '@radix-ui/themes'

interface FormImageUploadField {
    regFunc: any
    label?: string
}

const FormImageUploadField = ({regFunc, label} : FormImageUploadField) => {
    const [uploadedImage, setUploadedImage] = useState<any>()
    const onButtonClick = () => {
        document.getElementById('file')!.click()
    };

    return (
        <div>
            <div className='absolute left-36 -top-1'>
                <Avatar src={uploadedImage} fallback='!'/>
            </div>
            <label>
                <input type='file' id='file' ref={{...regFunc}}  style={{display: 'none'}} accept='image/*' onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e?.target?.files?.[0]) {
                        const file = e.target.files[0]                       
                        const reader = new FileReader()
                        reader.onloadend = () =>{
                            setUploadedImage(reader.result)
                        }
                        reader.readAsDataURL(file)
                    }
                }}/>
                <Button onClick={onButtonClick}>{label}</Button>
            </label>
        </div>
    )
}

export default FormImageUploadField
