import React from "react";
import {Spacer} from "@nextui-org/react";
import CardSkeleton from "./CardSkeleton";

export default function CardSpacer() {
  return (
    <div className="flex justify-center items-center flex-wrap">
     <CardSkeleton  />
      <Spacer x={4}  />
      <CardSkeleton />
      <Spacer x={4} />
     <CardSkeleton />
      <Spacer x={4} />
      <CardSkeleton />
      <Spacer x={4} />
     <CardSkeleton />
      <Spacer x={4} />
     <CardSkeleton />
      <Spacer x={4} />
  

     
    </div>
  );
}
