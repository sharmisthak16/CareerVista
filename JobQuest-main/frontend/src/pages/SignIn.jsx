// import { useState } from "react";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// // eslint-disable-next-line react/prop-types
// const SignIn = ({ onSubmit, switchToSignup }) => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       onSubmit({ email, password, isLogin: true });
//     };

//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
//           <h2 className="text-2xl font-bold text-center text-gray-900">
//             Sign In
//           </h2>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={email}
//                 autoComplete="off"
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={password}
//                                 autoComplete="off"

//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//             >
//               Sign In
//             </button>
//           </form>
//           <p className="text-center text-gray-600">
//             Don&apos;t have an account?{" "}
//             <button
//               className="text-blue-500 hover:underline ml-1"
//               onClick={switchToSignup}
//             >
//               Sign Up
//             </button>
//           </p>
//         </div>
//       </div>
//     );
//   };
// export default SignIn;


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// // eslint-disable-next-line react/prop-types
// const SignIn = ({  switchToSignup }) => {
//   const baseUrl = import.meta.env.VITE_BACKEND_URL;
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${baseUrl}/api/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         setError(data.message || "Invalid credentials. Please try again.");
//         setTimeout(() => setError(""), 5000); // Remove error after 5 seconds
//       } else {
//         // Save token and user data
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         // onSubmit(data);
//         navigate('/upload')
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       setError("Network error. Please try again.");
//       setTimeout(() => setError(""), 5000);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>

//         {error && <p className="text-red-500 text-center">{error}</p>}

//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={email}
//               autoComplete="off"
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               value={password}
//               autoComplete="off"
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//           >
//             Sign In
//           </button>
//         </form>
//         <p className="text-center text-gray-600">
//           Don&apos;t have an account?{" "}
//           <button
//             className="text-blue-500 hover:underline ml-1"
//             onClick={switchToSignup}
//           >
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

// eslint-disable-next-line react/prop-types
const SignIn = ({ setUser, switchToSignup }) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/login`, {
        email,
        password,
      });
      const data = await response.data;
      if (!response.status === 200) {
        setError(data.message || "Invalid credentials. Please try again.");
        setTimeout(() => setError(""), 5000);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
  
        setUser(data.user); 
        navigate("/upload");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Network error. Please try again.");
      setTimeout(() => setError(""), 5000);
    }
  };
 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">Sign In</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 cursor-pointer py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <button className="text-blue-500 cursor-pointer hover:underline ml-1" onClick={switchToSignup}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
