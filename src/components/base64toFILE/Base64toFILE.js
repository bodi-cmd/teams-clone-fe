const Base64toFILE = async (content, type) => {
    const url = "data:"+type+";base64,"+content;
    const response = await fetch(url)
    const blob = await response.blob();
    const file = new File([blob], "ImageGeneratedByConvertor",{ type: type })
    return file;
}

export default Base64toFILE