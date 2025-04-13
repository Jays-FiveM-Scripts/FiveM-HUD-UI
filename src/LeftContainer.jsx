import React, { useState, useEffect } from "react";
import { GiKevlarVest, GiHamburger } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";
import { RiDrinks2Fill } from "react-icons/ri";
import KeysContainer from "./KeysContainer";

function LeftContainer() {
    const [health, setHealth] = useState(7);
    const [armour, setArmour] = useState(90);
    const [hunger, setHunger] = useState(30);
    const [thirst, setThirst] = useState(40);

    useEffect(() => {
        const handleHealthUpdate = (event) => setHealth(event.detail.health);
        const handleArmourUpdate = (event) => setArmour(event.detail.armour);
        const handleHungerUpdate = (event) => setHunger(event.detail.hunger);
        const handleThirstUpdate = (event) => setThirst(event.detail.thirst);

        window.addEventListener("healthUpdate", handleHealthUpdate);
        window.addEventListener("armourUpdate", handleArmourUpdate);
        window.addEventListener("hungerUpdate", handleHungerUpdate);
        window.addEventListener("thirstUpdate", handleThirstUpdate);

        return () => {
            window.removeEventListener("healthUpdate", handleHealthUpdate);
            window.removeEventListener("armourUpdate", handleArmourUpdate);
            window.removeEventListener("hungerUpdate", handleHungerUpdate);
            window.removeEventListener("thirstUpdate", handleThirstUpdate);
        };
    }, []);

    const getIconStyle = (value) => ({
        opacity: value / 100,
    });

    const getBlinkClass = (value) => (value < 20 ? "blink" : "");

    const getBackgroundHeight = (value) => `${value / 1.47}%`;

    return (
        <div id="left_container" className="flex flex-col items-center justify-between p-2">
            <KeysContainer />
            <div className="flex flex-col items-center gap-2">
                <img
                    className="relative w-[17rem] rounded-[.3rem] ring-2 ring-black ring-opacity-10 mx-2 opacity-90"
                    src="./public/minimap2.png"
                    alt=""
                />
                <div id="need_container" className="m-1 flex gap-5">
                    {/* Health */}
                    <div className="flex flex-col gap-2 items-center relative">
                        <div
                            id="health-background"
                            className={`absolute inset-0 bg-red-900 rounded-md w-[3.2rem] bottom-0 ring-opacity-55 ring-2`}
                            style={{ height: getBackgroundHeight(health) }}
                        ></div>
                        <div
                            id="health"
                            className={`relative z-10 rounded-md bg-red-900 bg-opacity-75 ring-offset-1 ring-offset-gray-400 w-[3.2rem] h-[2.2rem] ring-red-300 ring-opacity-55 ring-2 flex items-center justify-center ${getBlinkClass(health)}`}
                            style={getIconStyle(health)}
                        >
                            <FaHeartbeat />
                        </div>
                        <h1>{health}%</h1>
                    </div>
                    {/* Armour */}
                    <div className="flex flex-col gap-2 items-center relative">
                        <div
                            id="armour-background"
                            className={`absolute inset-0 bg-blue-900 rounded-md w-[3.2rem] bottom-0 ring-opacity-55 ring-2`}
                            style={{ height: getBackgroundHeight(armour) }}
                        ></div>
                        <div
                            id="armour"
                            className={`relative z-10 rounded-md bg-blue-900 bg-opacity-75 ring-offset-1 ring-offset-gray-400 w-[3.2rem] h-[2.2rem] ring-blue-300 ring-opacity-55 ring-2 flex items-center justify-center ${getBlinkClass(armour)}`}
                            style={getIconStyle(armour)}
                        >
                            <GiKevlarVest />
                        </div>
                        <h1>{armour}%</h1>
                    </div>
                    {/* Hunger */}
                    <div className="flex flex-col gap-2 items-center relative">
                        <div
                            id="hunger-background"
                            className={`absolute inset-0 bg-orange-900 rounded-md w-[3.2rem] bottom-0`}
                            style={{ height: getBackgroundHeight(hunger) }}
                        ></div>
                        <div
                            id="hunger"
                            className={`relative z-10 rounded-md bg-orange-900 bg-opacity-75 ring-offset-1 ring-offset-gray-400 w-[3.2rem] h-[2.2rem] ring-orange-300 ring-opacity-55 ring-2 flex items-center justify-center ${getBlinkClass(hunger)}`}
                            style={getIconStyle(hunger)}
                        >
                            <GiHamburger />
                        </div>
                        <h1>{hunger}%</h1>
                    </div>
                    {/* Thirst */}
                    <div className="flex flex-col gap-2 items-center relative">
                        <div
                            id="thirst-background"
                            className={`absolute inset-0 bg-green-900 rounded-md w-[3.2rem]`}
                            style={{ height: getBackgroundHeight(thirst) }}
                        ></div>
                        <div
                            id="thirst"
                            className={`relative z-10 rounded-md bg-green-900 bg-opacity-75 ring-offset-1 ring-offset-gray-400 w-[3.2rem] h-[2.2rem] ring-green-300 ring-opacity-55 ring-2 flex items-center justify-center ${getBlinkClass(thirst)}`}
                            style={getIconStyle(thirst)}
                        >
                            <RiDrinks2Fill />
                        </div>
                        <h1>{thirst}%</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftContainer;
