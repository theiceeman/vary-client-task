import { useEffect, useState } from "react";
import "./App.css";
import { Request } from "./helpers/https";
import jsonData from "./db";

function App() {
  const [books, setBooks] = useState<any>([]);
  const [currentLimit, setCurrentLimit] = useState<number>(20);
  const [mainBooks, setMainBooks] = useState<any>([]);
  // const [bookLength, setBookLength] = useState<number>(0);

  const searchBooks = (text: string) => {
    let result = mainBooks.filter((e: any) =>
      e.title.toLowerCase().includes(text.toLowerCase())
    );
    setBooks(result);
  };

  function paginateData(data: Array<any>, pageSize: any, pageNumber: any) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);
    // console.log({paginatedData})
    return paginatedData;
  }

  // Get the target element you want to observe
  const targetElement = document.querySelector("#footer-eleme");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          console.log("Element is in view!");
          // if(books.length !==){
          await getBooks(currentLimit + 10);
          setCurrentLimit(currentLimit + 10);
          // }
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Start observing the target element
  targetElement && observer.observe(targetElement);

  const getBooks = async (limit: any) => {
    // let res = await Request.get(`http://localhost:3333/books/view/1/${limit}`);
    // setBooks(res.data.data.data.data);
    // setMainBooks(res.data.data.data.data);

    let res = await paginateData(jsonData, limit, 1);
    setBooks(res);
    setMainBooks(res);
  };

  useEffect(() => {
    getBooks(currentLimit);
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row bg-[#00453e] py-4">
          <div className="flex">
            <h4 className="text-white ml-5 my-auto">BookStore</h4>
          </div>
          <div className="flex mx-auto">
            <input
              type="text"
              onKeyDown={(e: any) => searchBooks(e.target.value)}
              className=" bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 h-9"
              placeholder="search..."
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 mx-16 mt-10 border-l border-solid border-[#d5dbdb]">
          {books?.map((e: any, key: any) => (
            <div
              key={key}
              className="flex flex-col text-center items-center py-8 px-3 border-r  border-t border-b border-solid border-[#d5dbdb]"
            >
              <img src={e.cover_image} alt=" " width="127px" height="127px" />
              <p className="capitalize text-xs ">{e.title}</p>
              <p className="capitalize text-xs ">
                <b>Author:</b> {e.writer}
              </p>
              <p className="capitalize text-xs ">
                <b>Tags:</b> {e.tags}
              </p>
              <p className="text-red-600 text-sm">${e.price}</p>
            </div>
          ))}
          <div id="footer-eleme" className="w-full h-10"></div>
        </div>
      </div>
    </>
  );
}

export default App;
