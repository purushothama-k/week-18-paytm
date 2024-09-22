import { getServerSession } from "next-auth";
import { P2pTransactions } from "../../../components/P2pTransactions";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getP2pTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });
  return txns.map((t) => ({
    timeStamp: t.timestamp,
    amount: t.amount,
  }));
}

export default async function page() {
  const transactions = await getP2pTransactions();
  return (
    <div className=" w-full">
      <SendCard />

      <div className=" p-12">
        <P2pTransactions transactions={transactions} />
      </div>
    </div>
  );
}
