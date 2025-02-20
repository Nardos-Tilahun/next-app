'use client'
import React, { useState } from 'react'
import { CldUploadWidget, CldImage } from 'next-cloudinary';

interface CloudinaryResult {
    public_id: string;
}

const UploadPage = () => {

    const [publicId, setPublicId] = useState('');
    return (
        <>
            {publicId && <CldImage src={publicId} width={270} height={180} alt="image" />}
            <CldUploadWidget
                uploadPreset='drmcvrls'
                options={{
                    sources: ['local'],
                    multiple: false,
                    maxFiles: 5,
                    styles: {
                        palette: {
                            window: "#ffffff",
                            sourceBg: "#134669",
                            windowBorder: "#90a0b3",
                            tabIcon: "#000000",
                            inactiveTabIcon: "#555a5f",
                            menuIcons: "#555a5f",
                            link: "#716565",
                            action: "#339933",
                            inProgress: "#0433ff",
                            complete: "#339933",
                            error: "#cc0000",
                            textDark: "#000000",
                            textLight: "#fcfffd"
                        },
                        fonts: {
                            default: null,
                            "sans-serif": {
                                url: null,
                                active: true
                            }
                        }
                    }
                }}
                onSuccess={(result, widget) => {
                    if (result.event !== 'success') return;
                    const info = result.info as CloudinaryResult
                    setPublicId(info.public_id);
                }}>
                {({ open }) => <button className='btn btn-primary' onClick={() => open()}>Upload</button>}
            </CldUploadWidget>
        </>
    )
}

export default UploadPage
