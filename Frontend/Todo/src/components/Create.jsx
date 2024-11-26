import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Create = () => {
    const [error, setError] = useState("");
    const [Todoname, setTodoName] = useState("");
    const [Description, setDescription] = useState("");
    const [Completed, setComplete] = useState(false);

    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const AddTodo = { Todoname, Description, Completed };

        try {
            const responce = await fetch("http://localhost:3000", {
                method: "POST",
                body: JSON.stringify(AddTodo),
                headers: { "Content-type": "application/json" }
            })

            if(!responce.ok){
                const errorMessage=await responce.text();
                console.log("error occur : ",errorMessage);
                setError(errorMessage);
            }
            else{
                const result=await responce.json();
                console.log("success",result);

                setComplete(false);
                setTodoName("");
                setDescription("");
                navigate("/all-todos")
            }
        } catch (error) {
            console.log("failed in uploading the todo");
            setError("Error occur while adding the Todo..");
        }
    }



    return (
        <>
            <div className="container mx-auto my-4 p-4 max-w-md">
                {/* Display the error message as an alert */}
                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-400 rounded-md p-3 mb-4">
                        {error}
                    </div>
                )}

                <h2 className="text-center text-2xl font-semibold mb-6">Enter a Todo</h2>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Todo Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={Todoname}
                            onChange={(e) => setTodoName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Description
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            Completed
                        </label>
                        <input
                            type="checkbox"
                            className="rounded text-blue-500 focus:ring-blue-500"
                            checked={Completed}
                            onChange={(e) => setComplete(e.target.checked)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default Create;
