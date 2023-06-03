import {BrowserRouter, Route} from "react-router-dom";
import React from "react";
//
// function App() {
//     return (
//         <>
//             <BrowserRouter>
//                 <div>APP HELLO
//                     <Route path={"/hello"} render={()=><HelloMessage message={"Hello"}/>}/>
//                     <Route path={"/bye"} render={()=><HelloMessage message={"Bye"}/>}/>
//                 </div>
//             </BrowserRouter>
//         </>
//     )
// }
//
// type MessageType = {
//     message: string
// }
// // либо типизир пропсы
// export const HelloMessage = (props:MessageType) => {
//     return (
//         <h1>{props.message}</h1>
//     );
// };
//
// // либо типизир саму функц компоненту
// export const ByeMessage: React.FC<MessageType> = (props) => {
//     return (
//         <h1>{props.message}</h1>
//     );
// };
// export default App;
