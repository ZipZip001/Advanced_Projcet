import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { callFetchListBookByIdOut } from "../../services/api";
import ViewDetail from "../../components/Book/ViewDetail";

const BookPage = () => {
    const [dataBook, setDataBook] = useState(null); // Khởi tạo ban đầu là null
    let location = useLocation();

    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // book id

    console.log(">>> check book id: ", id);

    useEffect(() => {
        fetchBook(id);
    }, [id]);

    const fetchBook = async (id) => {
        const res = await callFetchListBookByIdOut(id);
        if (res) {
            let raw = res.data; 
            //process data
            raw.items = getImages(raw);

            setTimeout(() => {
                setDataBook(raw);
            }, 1000);
        }
    }

    const getImages = (raw) => {
        const images = [];
        if (raw.thumnail) {
            images.push(
                {
                    original: `${raw.thumnail}`, // Sử dụng đường dẫn thumbnail từ dữ liệu API
                    thumbnail: `${raw.thumnail}`,
                    originalClass: "original-image",
                    thumbnailClass: "thumbnail-image",
                },
            );
        }

        return images;
    }

    return (
        <>
            {dataBook && (
                <div>

                    {/* Hiển thị các thông tin khác về sách */}
                    <ViewDetail dataBook={dataBook} />
                </div>
            )}
        </>
    );
}

export default BookPage;
