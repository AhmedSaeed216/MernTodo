import React, { useEffect, useState } from "react";

const CompletedTodos = () => {
    const [completedTodos, setCompletedTodos] = useState([]);
    const [error, setError] = useState("");

    // delete
    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/${id}`, {
            method: "DELETE",
        });

        const result = await response.json();

        if (!response.ok) {
            console.log("Error in deleting the todo");
            setError(result.error);
        } else {
            setError("Todo Removed successfully");
            setTimeout(() => {
                setError("");
                // Update the data by filtering out the deleted item
                setCompletedTodos((prevData) => prevData.filter((item) => item._id !== id));
            }, 1500);
        }
    };

    // Fetch completed todos from the server
    useEffect(() => {
        const fetchCompletedTodos = async () => {
            try {
                const response = await fetch("http://localhost:3000/"); // Replace with your correct API URL
                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || "Failed to fetch completed todos");
                }

                // Filter for todos with Completed status set to true
                const completed = result.filter((todo) => todo.Completed === true);
                setCompletedTodos(completed);
            } catch (err) {
                console.error("Error fetching completed todos:", err);
                setError("Failed to fetch completed todos.");
            }
        };

        fetchCompletedTodos();
    }, []);

    return (
        <div className="container mx-auto mt-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                    {error}
                </div>
            )}
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                Completed Todos
            </h2>
            <div className="flex flex-wrap -mx-2">
                {completedTodos.length > 0 ? (
                    completedTodos.map((e) => (
                        <div key={e._id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                            <div className="bg-green-100 shadow-md rounded-lg p-4">
                                <h5 className="text-lg font-semibold text-gray-800">{e.Todoname}</h5>
                                <p className="text-gray-700">{e.Description}</p>
                                <button
                                    className="bg-black text-yellow-50 p-2  rounded-md m-2 hover:cursor-pointer hover:bg-white hover:text-black"
                                    onClick={() => handleDelete(e._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No completed todos yet.</p>
                )}
            </div>
        </div>
    );
};

export default CompletedTodos;
