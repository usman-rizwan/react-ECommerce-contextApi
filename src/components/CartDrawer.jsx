
import {  Drawer } from 'antd';
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

const CartDrawer = ({open , setOpen}) => {

const cartData = JSON.parse(localStorage.getItem('cart')) || [];
 
return (
  <>
 { cartData.map((value,i)=>(
  
  <Drawer title="Cart Details" open={open} onClose={()=>setOpen(false)}  key={i}   >
      <Card  className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={value.image}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{value.title}</p>
          <p className="text-small text-default-500">{value.category}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>{value.description}</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
      </Drawer>
 )) 
    }
    </>
  );
};
export default CartDrawer;