import React from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

export default function PopOver({val,title}) {
  return (
    <Popover placement="bottom" showArrow={true}  backdrop={"opaque"}>
      <PopoverTrigger>
        <Button color="primary"  variant="flat" disabled={true}> {title}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 ">
          <div className=" text-md " >{val}</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
