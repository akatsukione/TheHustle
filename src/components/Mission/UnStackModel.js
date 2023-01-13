import React from "react";
import { FaTimes } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import icon3 from "assets/images/icons/clean-cash.png";
import icon4 from "assets/images/icons/hst-final.png";
import icon2 from "assets/images/icons/hustler-clean-cash-token.png";
import icon1 from "assets/images/icons/slot.png";
import Modal from "components/shared/Modal";
import { styled, TextField } from "@mui/material";
import { Box } from "@mui/system";

const MyTextField = styled(TextField)({
  marginTop: '6px',
  marginBottom: '6px',
});

const data = [
  {
    id: uuid(),
    icon: icon2,
  },
  {
    id: uuid(),
    icon: icon3,
  },
  {
    id: uuid(),
    icon: icon4,
  },
  {
    id: uuid(),
    icon: icon1,
  },
];

const UnStackModel = ({ isUnStackOpen, setIsUnStackOpen }) => {
  return (
    <Modal
      isOpen={isUnStackOpen}
      onRequestClose={() => setIsUnStackOpen(false)}
    //   className='w-8/12'
    >
      <div
        className="w-full bg-[#1a1b1f] border rounded-xl border-[#252525] py-4 px-6 font-Montserrat"
        style={{ boxShadow: "#a5a5a5eb 0px 0px 9px 0px" }}
      >
        <>
          <div className="mb-2 flex items-center justify-between relative">
            <h2 className="w-full py-2 text-center text-white text-lg text-white">
              Unstake
            </h2>
            <FaTimes
              className="block text-lg text-white hover:cursor-pointer absolute right-0 top-0"
              onClick={() => setIsUnStackOpen(false)}
            />
          </div>
          <div className="flex flex-col items-center">
            {data.map((item) => (
                <Box className="w-full" key={Math.random()}>
                  <Box className="text-end text-white w-full">234 Staked</Box>
                  <MyTextField
                    className="bg-white w-full rounded-[10px]"
                    placeholder="insert amount"
                    focused={false}
                    InputProps={{
                      endAdornment: (
                        <img className="h-12 w-16" src={item.icon} alt={item.icon} />
                      ),
                    }}
                  />
                </Box>
            ))}
          </div>
          <div className="my-5 flex justify-center">
            <button
              className="px-6 py-3 text-lime-400 hover:bg-[#252525] focus:bg-[#252525] border border-[#2F2F2E] rounded-lg"
              onClick={() => {
                setIsUnStackOpen(false);
              }}
            >
              Unstake
            </button>
          </div>
        </>
      </div>
    </Modal>
  );
};

export default UnStackModel;
