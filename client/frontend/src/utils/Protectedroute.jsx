import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const [, payloadBase64] = token.split(".");
            const payload = JSON.parse(atob(payloadBase64));

            if (payload.exp * 1000 < Date.now()) {
                localStorage.removeItem("authToken");
                console.log("token expired")
                navigate("/login");
            }
        } catch (error) {
            console.error("Invalid token:", error);
            localStorage.removeItem("authToken");
            navigate("/login");
        }
    }, [navigate]);

    return children;
};

export default ProtectedRoute;
