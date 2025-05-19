// "use client";
// import { useEffect, useState } from "react";

// export default function Home() {
//     const [count, setCount] = useState(0);

//     // This effect runs every time `count` changes
//     useEffect(() => {
//         console.log("🌀 Count changed! Now:", count);
//     }, []); // Only run when `count` changes

//     return (
//         <div className="p-8">
//             <h1 className="text-2xl font-bold mb-4">useEffect Example</h1>
//             <p className="text-lg">You clicked {count} times</p>
//             <button
//                 className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
//                 onClick={() => setCount(count + 1)}
//             >
//                 Click Me
//             </button>
//         </div>
//     );
// }

