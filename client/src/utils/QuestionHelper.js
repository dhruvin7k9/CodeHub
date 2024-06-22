import { backendUrl } from "./Config";

export const addquestion = async (question) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/question/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(question),
        });
        const formattedResponse = await response.json();
        return formattedResponse;

    } catch (error) {
        throw new Error(`Error creating question: ${error.message}`);
    }
};

export const updateQuestion = async (id, question) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/question/update/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(question),
        });

        const formattedResponse = await response.json();
        return formattedResponse;

    } catch (error) {
        throw new Error(`Error updating question: ${error.message}`);
    }
};

export const deleteQuestion = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/question/delete/${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
        });
        const formattedResponse = await response.json();
        return formattedResponse;

    } catch (error) {
        throw new Error(`Error deleting question: ${error.message}`);
    }
};

export const getAllQuestions = async () => {
    try {
        const response = await fetch(`${backendUrl}/codehub/question`, {
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
        console.error("Error fetching question:", error);
        throw new Error(`Error fetching question: ${error.message}`);
    }
}

export const getQuestionById = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/question/${id}`, {
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
        console.error("Error fetching question:", error);
        throw new Error(`Error fetching question: ${error.message}`);
    }
}


export const upvoteQuestion = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/question/upvote/${id}`, {
            method: "POST",
            credentials: "include",
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
        console.error("Error fetching question:", error);
        throw new Error(`Error fetching question: ${error.message}`);
    }
}

export const getvoteQuestion = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/question/getvote/${id}`, {
            method: "GET",
            credentials: "include",
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
        console.error("Error fetching question:", error);
        throw new Error(`Error fetching question: ${error.message}`);
    }
}


export const downvoteQuestion = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/question/downvote/${id}`, {
            method: "POST",
            credentials: "include",
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
        console.error("Error fetching question:", error);
        throw new Error(`Error fetching question: ${error.message}`);
    }
}


// fetch all questions of a user with ':id'
export const fetchQuestionsOfaUser = async (id) => {
    try {
        const response = await fetch(`${backendUrl}/codehub/question/owner/${id}`, {
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