
import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";


export default async function Home() {
  const session = await getServerSession(authOptions)

  const barbeshops = await db.barbershop.findMany({})

  //verifica se usuario possui agendamentos, senao array vazio
 
  const [barbershops, recommendedBarbershops, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    db.barbershop.findMany({
      orderBy: {
        id: "asc",
      },
    }),
      session?.user 
        ? db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte:new Date(),
        }
      },
      include: {
        service: true,
        barbershop: true,
      },
    }) 
  : Promise.resolve([]),
  ]);

  return (
    <div>
      <Header/>

      <div className="px-5 pt-5">
      {session?.user ? `Olá, ${session.user.name?.split(" ")[0]}!` : "Olá! Vamos agendar um serviço hoje?"}
        <p className="captalize text-sm">
          {format(new Date(), "EEEE ',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </p>
        </div>

      <div className="px-5 mt-6">
        <Search/>
      </div>


      <div className="mt-6">
      {confirmedBookings.length > 0 && (
        <>
        <h2 className="pl-5 text-sm uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
        <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
        </>
      )}
      </div>
      
      <div className="mt-6">
        <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">Recomendados</h2>
        
        <div className="flex px-5 gap-4 overflow-x-auto [&:: -webkit-scrollbar]:hidden">
          {barbeshops.map((barbeshop) => (
            <BarbershopItem key={barbeshop.id} barbershop={barbeshop}/>
          ))}
        </div>
      </div>

      <div className="mt-6 mb-[4.5rem]">
        <h2 className="px-5 text-sm uppercase text-gray-400 font-bold mb-3">Populares</h2>
        
        <div className="flex px-5 gap-4 overflow-x-auto [&:: -webkit-scrollbar]:hidden">
        {recommendedBarbershops.map((barbershop) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
