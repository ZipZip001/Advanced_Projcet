import { useEffect, useState } from "react";
import { callListBookOut } from "../../services/api";
import axios from "axios";
const OutSideBook = () => {
    const [books, setBooks] = useState([]);

    // useEffect(() => {

    //     fetchData();
    // }, []); 

    // const fetchData = async () => {
    //     const response = await callListBookOut();
    //     setBooks(response.data); // Giả sử dữ liệu API trả về một mảng các cuốn sách
    //     console.log(response)
    // };


    useEffect(() => {
        // Gọi API để lấy dữ liệu sách khi thành phần được tạo
        axios.get("http://localhost:8080/api/books")
          .then((response) => {
            setBooks(response.data); // Lưu trữ dữ liệu sách vào state books
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []);
    
      return (
        <div>
          {books.map((book) => (
            <div key={book.id}>
              <h2>{book.maintext}</h2>
              <p>Author: {book.author}</p>
              <p>Category: {book.category}</p>
              <p>Price: ${book.price}</p>
              <p>Sold: {book.sold}</p>
              <p>Quantity: {book.quantity}</p>
              <p>Create Date: {book.createAt}</p>
              <p>Update Date: {book.updateAt}</p>
    
              {/* Hiển thị ảnh từ URL */}
              <img src={book.thumnail} alt={book.maintext} />
              
            </div>
          ))}
        </div>
      );
}

export default OutSideBook
