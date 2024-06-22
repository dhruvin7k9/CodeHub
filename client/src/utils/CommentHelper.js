import { backendUrl } from "./Config";

export const addComment = async (comment) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/comment/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment),
        });
        const formattedResponse = await response.json();
        return formattedResponse;

    } catch (error) {
        throw new Error(`Error creating comment: ${error.message}`);
    }
};


export const AllcommentsByQuestion = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/comment/que/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const formattedResponse = await response.json();
        return formattedResponse;
    } catch (error) {
        console.error("Error fetching comment:", error);
        throw new Error(`Error fetching comment: ${error.message}`);
    }
}


export const AllcommentsByBlog = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/comment/blg/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const formattedResponse = await response.json();
        return formattedResponse;
    } catch (error) {
        console.error("Error fetching comment:", error);
        throw new Error(`Error fetching comment: ${error.message}`);
    }
}

export const deleteComment = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/comment/delete/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const formattedResponse = await response.json();
        return formattedResponse;

    } catch (error) {
        throw new Error(`Error deleting comment: ${error.message}`);
    }
};