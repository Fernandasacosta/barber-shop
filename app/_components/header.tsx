import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return ( 
    <Card>
      <CardContent className="p-5 justify-between flex flex-row items-center">
      <Image src="/logo.png" alt="fsw Barber" height={22} width={120}/>
      <Button className="h-8 w-8" variant="outline" size="icon">
        <MenuIcon size={16}/>
      </Button>
      </CardContent>
    </Card>
   );
}
 
export default Header;