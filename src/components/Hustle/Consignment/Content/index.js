import React, { useState } from "react";
import {LeftContent} from "./LeftContent";
import MiddleContent from "./MiddleContent";
import RightContent from "./RightContent";
import { useDispatch, useSelector } from "react-redux";
import { refreshAll } from "BlockchainInteractionWax";

const Content = ({ ual }) => {
  const [assetId, setAssetId] = useState('');

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAssetIdChange = (value) => {
    if(value != assetId)
    {
    setAssetId(value);
    refreshAll(dispatch)
    }
  };

  return (
    <div>
      <div className="flex flex-col flex-wrap items-center justify-between pb-6 md:flex-row md:items-start md:gap-y-5">
        <LeftContent ual={ual} onAssetIdChange={handleAssetIdChange} />
        <MiddleContent ual={ual} assetId={assetId} />
        <RightContent ual={ual}/>
      </div>
    </div>
  );
};

export default Content;
