import { useState } from "react";

const useUploadImage = () =>{
  const [pathImage, setPathImage] = useState("");
  const [errUpload, setErrUpload] = useState("")

  const onChangeFile = (file: FileList) =>{

    if(!file[0].type.startsWith('image')){
      return setErrUpload("Image only...!")
    }
    const reader= new FileReader()
    reader.readAsDataURL(file[0])

    reader.onloadend = () =>{
      setPathImage(reader.result as string)
      setErrUpload("")
    }
  }

  return { onChangeFile, pathImage, errUpload }
}

export default useUploadImage