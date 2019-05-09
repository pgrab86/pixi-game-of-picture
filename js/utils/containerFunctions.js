export function resizeToAppSize(elem, size, container) {
    let originWidth = elem.width,
        originHeight = elem.height,
        ratio = originWidth / originHeight;
        
    let objNewWidth = container.width * size,
        objNewHeight = objNewWidth / ratio;

        elem.width = objNewWidth;
        elem.height = objNewHeight;    
}