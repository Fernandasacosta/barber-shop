import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface BarbershopDetailsPage {
  params: {
    id?: string;
  }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPage) => {
 
    if(!params.id){
      //todo redirecionar homepage
      return null;
    }
    const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  if(!barbershop ){
      //todo redirecionar homepage
    return null;
  }

  return ( 
    <div>
      <div className="h-[250px] w-full relative">
        <Button size="icon" variant="outline" className="z-50 top-4 left-4 absolute">
          <ChevronLeftIcon/>
        </Button>

        <Button size="icon" variant="outline" className="z-50 top-4 right-4 absolute">
          <MenuIcon/>
        </Button>

        <Image 
          src={barbershop.imageUrl} 
          fill 
          alt={barbershop.name} 
          style={{
            objectFit:"cover",
          }}
          className="opacity-75"
        />
      </div>

      <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="flex items-center gap-1 mt-2">
          <MapPinIcon className="text-primary" size={18}/>
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <StarIcon className="text-primary" size={18}/>
          <p className="text-sm">5,0 (345 avaliações)</p>
        </div>

      </div>

    </div>
   );
}
 
export default BarbershopDetailsPage;