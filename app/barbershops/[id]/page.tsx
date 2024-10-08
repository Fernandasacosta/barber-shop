
import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";


interface BarbershopDetailsPage {
  params: {
    id?: string;
  }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPage) => {
  const session = await getServerSession(authOptions);
    if(!params.id){
      //todo redirecionar homepage
      return null;
    }
    const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services:true,
    }
  });

  if(!barbershop ){
      //todo redirecionar homepage
    return null;
  }

  return (
  
  <div>
    <BarbershopInfo barbershop={barbershop}/>
   
   <div className="px-5 flex flex-col gap-4 py-6">
    {barbershop.services.map(service => (
        <ServiceItem key={service.id} barbershop={barbershop} service={service} isAuthenticated={!!session?.user} />
      ))}
   </div>
  </div>
  
  );
};
 
export default BarbershopDetailsPage;