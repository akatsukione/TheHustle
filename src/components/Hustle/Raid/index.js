import React, { useState, useEffect, Component } from "react";
import RaidImg from "assets/images/hustle/raid.png";
import { useSelector } from "react-redux";
import Tippy from "@tippyjs/react";
import { FaInfoCircle, FaUserCircle } from "react-icons/fa";

import { refreshAll, G_XPRank, Leader_L_rank, MiningPowerRank, DropRank } from "BlockchainInteractionWax.js";

const columnNames = [
    "List",
    "Gang",
    "Safe size",
    "Action"
];

const fakeData = [
    {
        name: "temp1sssss",
        safeSize: [1]
    },
    {
        name: "reessdsesfs",
        safeSize: [0, 1]
    },
    {
        name: "grdgrasefs",
        safeSize: [1, 2]
    }
]

const power = [];
const laundering = [];
const rank = [];
const drops = [];

const Raid = ({ ual }) => {
    const [index, setIndex] = React.useState(0);
    const [data, setData] = React.useState([power, laundering, rank, drops]);
    const store = useSelector((state) => state);

    const fetchData = async () => {
        if (ual.activeUser) {
            const G_Rank = await G_XPRank(ual);
            const _Leader_L_rank = await Leader_L_rank(ual);
            const MiningP_Rank = await MiningPowerRank(ual);
            const Drop_Rank = await DropRank(ual);
            setData([MiningP_Rank, _Leader_L_rank, G_Rank, Drop_Rank]);
        }
        console.log('ual log', ual);
        console.log('data log', data);
    };

    useEffect(() => {
        fetchData();
    }, [store, ual, index]);

    const handleRaidClick = () => {
        window.alert('handle raid alert');
    }

    const handlePayInforClick = () => {
        window.alert('handle pay infor alert');
    }

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <img src={RaidImg} className="block w-[300px] h-[200px]" alt="" />
            <div className="text-center mt-[-20px]">
                <div className="w-full flex flex-col items-center justify-center mb-2 relative">
                    <TooltipRaidPageInfo />
                </div>
            </div>
            <div className="text-center mt-[50px]">
                <div className="w-full flex flex-col items-center justify-center mb-2 relative">
                    <button className="flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-2 px-7 text-lime-400 hover:bg-[#252525] block rounded-md" onClick={handlePayInforClick}>
                        Pay Informant
                    </button>
                </div>
            </div>
            <div className="text-center mt-[10px] mb-[30px]">
                <div className="w-full flex flex-col items-center justify-center mb-2 relative">
                    <TooltipPayInformant />
                </div>
            </div>
            <table className="w-full container text-white  text-center border-separate border-spacing-1 max-sm:text-[10px]">
                <thead className="mt-2">
                    <tr className="mt-2 flex w-full mx-auto border border-[#2F2F2E] p-1">
                        <th className="w-1/5 py-2 max-sm:w-1/1">
                            {columnNames[0]}
                        </th>
                        <th className="w-2/5 py-2 border-l border-[#2F2F2E] max-sm:w-2/6">
                            {columnNames[1]}
                        </th>
                        <th className="w-1/5 py-2 border-l border-[#2F2F2E] max-sm:w-2/6 max-sm:mx-[-2px]">
                            {columnNames[2]}
                        </th>
                        <th className="w-1/5 py-2 border-l border-[#2F2F2E] max-sm:w-1/6">
                            {columnNames[3]}
                        </th>
                    </tr>
                </thead>
                <tbody className="mt-2">
                    {fakeData.map((item, i) => (
                        <tr className="mt-2 my-5 flex w-full mx-auto border border-[#2F2F2E] p-1 " key={i} >
                            <td className="flex justify-center w-1/5 items-center " >
                                <div className="flex w-10 h-10 max-sm:w-6 max-sm:h-6 py-2 justify-center items-center">
                                    #{i + 1}
                                </div>
                            </td>
                            <td className=" flex w-2/5 py-2 border-l border-[#2F2F2E] justify-center items-center max-sm:w-2/6">
                                <div className="flex w-2/5 max-sm:w-0">

                                </div>
                                <div className="flex w-3/5 max-sm:w-full max-sm:justify-center max-sm:items-center">
                                    <FaUserCircle className="rounded-full mr-2 inline-block h-7 w-7 max-sm:h-3 max-sm:w-3" /> {item.name}
                                </div>
                            </td>
                            <td className=" flex w-1/5 border-l border-[#2F2F2E] justify-center items-center max-sm:w-2/6" >
                                <div className="w-full py-2">
                                    {
                                        item.safeSize.map((size, idx) => {
                                            switch (size) {
                                                case 0:
                                                    return ' Small';
                                                case 1:
                                                    return ' Medium';
                                                case 2:
                                                    return ' Large';
                                            }
                                        }).toString()
                                    }
                                </div>
                            </td>
                            <td className="flex w-1/5 border-l border-[#2F2F2E] justify-center items-center max-sm:w-1/6 max-sm:pl-[5px]" >
                                <button className="flex flex-col items-center justify-center rounded-lg border border-[#2F2F2E] py-2 px-7 max-sm:py-1 max-sm:px-4 text-lime-400 hover:bg-[#252525] block rounded-md " onClick={handleRaidClick}>
                                    Raid
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

class TooltipPayInformant extends Component {
    render() {
        return (
            <Tippy
                content={<span className="">In order to get access to Safe locations, you must pay the informant 10 Hustlers Token
                </span>}
                popperOptions={{
                    placement: "right",
                }}
            >
                <p className="text-xl text-white">
                    <FaInfoCircle />
                </p>
            </Tippy>
        );
    }
}

class TooltipRaidPageInfo extends Component {
    render() {
        return (
            <Tippy
                content={<span className="">You can access the raid at G Rank Level 250.
                </span>}
                popperOptions={{
                    placement: "right",
                }}
            >
                <p className="text-xl text-white">
                    <FaInfoCircle />
                </p>
            </Tippy>
        );
    }
}

export default Raid;
