import { useEffect, useState } from "react";
import AllFoodsCard from "./AllFoodsCard";
import { useLoaderData } from "react-router-dom";
import './AllFoods.css'

const AllFoods = () => {
    const [allFoods, setAllFoods] = useState([]);
    const {count} = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0);
    const itemPerPage = 9;
    const numberOfPages = Math.ceil(count/itemPerPage);
    const pages = [];
    for(let i = 0; i< numberOfPages; i++){
        pages.push(i);
    }
    useEffect(() => {
        fetch(`https://flavor-fusion-server-two.vercel.app/all-foods?page=${currentPage}&size=${itemPerPage}`)
        .then(res => res.json())
        .then(data => {
            setAllFoods(data);
        })
    }, [currentPage, itemPerPage])
    return (
        <div>
            <h2 className="text-4xl text-center font-extrabold text-yellow-400 mb-5 mt-6">All Foods</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {
                    allFoods?.map(food => <AllFoodsCard key={food._id} food={food}></AllFoodsCard>)
                }
            </div>
            <div className="flex items-center justify-center mt-5">
                {
                    pages.map(page => <button 
                        onClick={() => setCurrentPage(page)}
                        className={`btn ml-3 ${page === currentPage ? "selected-button" : ""}`} key={page}>{page}</button>)
                }
            </div>
        </div>
    );
};

export default AllFoods;