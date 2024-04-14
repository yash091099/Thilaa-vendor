import React from "react";

export default function StatusField(props) {
    function getStyle(label){
        switch(label){
            case "Created": return "text-[#C428C7] bg-[#C428C729]";
            case "created": return "text-[#C428C7] bg-[#C428C729]";
            case "Fullfilled": return "text-[#FFA338] bg-[#FFF84C29]";
            case "fullfilled": return "text-[#FFA338] bg-[#FFF84C29]";
            case "Paid": return "text-[#1BB55C] bg-[#5ED5A829]";
            case "paid": return "text-[#1BB55C] bg-[#5ED5A829]";
            case "Refund": return "text-[#2855C7] bg-[#2855C729]";
            case "refund": return "text-[#2855C7] bg-[#2855C729]";
        }
    }
  return (
    <div
      className={`text-[0.8125rem] font-[600] leading-[0.825rem] px-[0.62rem] py-[0.31rem] rounded-[0.25rem] ${getStyle(props.label)}`}
    >
      {props.label}
    </div>
  );
}
