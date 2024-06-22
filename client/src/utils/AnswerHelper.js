import { backendUrl } from "./Config";

export const addanswer = async (answer) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/answer/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answer),
        });
        const formattedResponse = await response.json();
        return formattedResponse;

    } catch (error) {
        throw new Error(`Error creating answer: ${error.message}`);
    }
};

export const fetchAllAnswers = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/answer/que/${id}`, {
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
        console.error("Error fetching answer:", error);
        throw new Error(`Error fetching answer: ${error.message}`);
    }
}

// fetch all answers of a user with ':id'
export const fetchAnswersOfaUser = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/answer/owner/${id}`, {
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
        console.error("Error fetching answer:", error);
        throw new Error(`Error fetching answer: ${error.message}`);
    }
}

export const deleteAnswer = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/answer/delete/${id}`, {
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