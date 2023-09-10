import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { callFetchListBookById } from "../../services/api";
import ViewDetail from "../../components/Book/ViewDetail";

const BookPage = () => {
    const [dataBook, setDataBook] = useState()
    let location = useLocation();

    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // book id

    console.log(">>> check book id: ", id)

    useEffect(() => {
        fetchBook(id)
    }, [id]);

    const getImages = (raw) => {
        const images = [];
        if(raw.thumbnail){
            images.push(
                {
                    original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                    originalClass: "original-image",
                    thumbnailClass: "thumbnail-image",
                },
            )
        }
        if(raw.slider){
            raw.slider?.map(item =>{
                images.push(
                    {
                        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                        originalClass: "original-image",
                        thumbnailClass: "thumbnail-image",
                    }
                )
            })
        }
        return images;
    }
    
    const fetchBook = async (id) => {
        const res = await callFetchListBookById(id);
        if(res && res.data){
            let raw = res.data; 
            //process data
            raw.items = getImages(raw);
            
            setTimeout(() => {
                setDataBook(raw);
            }, 3000)
        }
    }



    return(
        <>
            <ViewDetail dataBook={dataBook}/>
        </>
    )
}

export default BookPage;