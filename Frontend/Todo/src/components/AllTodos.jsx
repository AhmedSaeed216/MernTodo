import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
const AllData = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // fetching the data
    async function getData() {
        const responce = await fetch("http://localhost:3000");
        const result = await responce.json();

        if (!responce.ok) {
            console.log("error in fetching");
            setError(result.error);
        }
        if (responce.ok) {
            const incompleteTodos = result.filter((todo) => todo.Completed === false);
            setData(incompleteTodos);

        }
    }

    useEffect(() => {
        getData();

    }, [])



    // delete
    const handleDelete = async (id) => {
        const responce = await fetch(`http://localhost:3000/${id}`, {
            method: "DELETE"
        });

        const result = await responce.json()

        if (!responce.ok) {
            console.log("error in deleting the todo");
            setError(result.error);
        }
        else {
            setError("Todo Removed successfully");
            setTimeout(() => {
                setError("");
                // Update the data by filtering out the deleted item
                setData((prevData) => prevData.filter((item) => item._id !== id));
                // setData(result);
            }, 1500);
        }

    }

    // handle compete

    const handleComplete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Completed: true }), // Update Completed status
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error completing the todo:", errorData);
                setError(errorData.error || "Failed to mark as completed.");
                return;
            }

            const updatedTodo = await response.json();
            console.log("Todo marked as completed:", updatedTodo);

            // Update the local state: Remove the completed todo from the UI
            setData((prevData) =>
                prevData.filter((item) => item._id !== id) // Remove the completed todo
            );
            navigate("/completed")
        } catch (err) {
            console.error("Network error:", err);
            setError("Failed to mark as completed. Please check your network connection.");
        }
    };



    return (
        <div className="container mx-auto mt-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                </div>
            )}
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                All Todos
            </h2>
            <div className="flex flex-wrap -mx-2">
                {Array.isArray(data) &&
                    data.map((e) => (
                        // <Card key={item._id} data={item} handleDelete={handleDelete} />
                        <div key={e._id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                            <div className="bg-white shadow-md rounded-lg p-4">
                                <div className="mb-4">
                                    <h5 className="text-lg font-semibold text-gray-800">{e.Todoname}</h5>
                                    <h6 className="text-sm text-gray-500">{e.Description}</h6>
                                    <p className="text-gray-700">{e.Completed}</p>
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        className="text-red-500 hover:underline bg-black  p-2  rounded-md m-2 hover:cursor-pointer hover:bg-white hover:text-black"
                                        onClick={() => handleDelete(e._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="text-blue-500 hover:underline bg-black text-green-600 p-2  rounded-md m-2 hover:cursor-pointer hover:bg-white hover:text-black"
                                        onClick={() => handleComplete(e._id)}
                                    >
                                        Completed
                                    </button>
                                    
                                </div>
                            </div>
                        </div>

                    ))}
            </div>
        </div>
    );
};

export default AllData;
