import { FaPerson } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaServer, FaOrcid } from "react-icons/fa";
import { BsCashCoin, BsBank } from "react-icons/bs";
import { GiBanknote } from "react-icons/gi";

function RightContainer() {
    return (
        <>
            <div className="p-5 flex flex-col items-end justify-between">
                <div className="flex items-end justify-end flex-col gap-3">
                    {/* <img className="w-32 mb-10" src="./public/havoc.png" alt="" /> */}
                    <div className=" flex flex-row gap-3 w-[27rem] text-xs">
                        <div id="time" className="w-[6.2rem] rounded-md bg-black bg-opacity-75 h-8 flex items-center justify-start px-2 gap-1.5">
                            <MdOutlineAccessTimeFilled className="w-5 h-5 p-1 rounded-sm bg-blue-500" />
                            <h1>00:00</h1>
                        </div>
                        <div id="players_online" className="w-[6.2rem] rounded-md bg-black bg-opacity-75 h-8 flex items-center justify-start px-2 gap-1.5">
                            <FaPerson className="w-5 h-5 p-1 rounded-sm bg-blue-500" />
                            <h1>2 / 100</h1>
                        </div>
                        <div id="server_id" className="w-[6.2rem] rounded-md bg-black bg-opacity-75 h-8 flex items-center justify-start px-2 gap-1.5">
                            <FaServer className="w-5 h-5 p-1 rounded-sm bg-blue-500" />
                            <h1>75</h1>
                        </div>
                        <div id="perm_id" className="w-[6.2rem] rounded-md bg-black bg-opacity-75 h-8 flex items-center justify-start px-2 gap-1.5">
                            <FaOrcid className="w-5 h-5 p-1 rounded-sm bg-blue-500" />
                            <h1>2</h1>
                        </div>
                    </div>
                    <div id="cash" className="w-[10.5rem] rounded-md bg-black bg-opacity-75 py-2 flex items-center justify-start px-2 gap-1.5">
                        <GiBanknote className="w-[1.4rem] h-[1.4rem] p-0.5 rounded-sm bg-blue-500" />
                        <h1>£3,500</h1>
                    </div>
                    <div id="bank" className="w-[10.5rem] rounded-md bg-black bg-opacity-75 py-2 flex items-center justify-start px-2 gap-1.5">
                        <BsBank className="w-[1.4rem] h-[1.4rem] p-1 rounded-sm bg-blue-500" />
                        <h1>£200,521</h1>
                    </div>
                </div>
            </div >
        </>
    )
}

export default RightContainer