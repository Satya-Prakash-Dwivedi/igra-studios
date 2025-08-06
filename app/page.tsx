'use client'
import { useSearchParams } from "next/navigation"
import Dashboard from "@/components/SidbarComponents/Dashboard"
import Orders from "@/components/SidbarComponents/Orders"
import Credits from "@/components/SidbarComponents/Credits"
import Invoices from "@/components/SidbarComponents/Invoices"
import Message from "@/components/SidbarComponents/Message"
import Channel from "@/components/SidbarComponents/Channel"
import Profile from "@/components/SidbarComponents/Profile"
import Support from "@/components/SidbarComponents/Support"
import Logout from "@/components/SidbarComponents/Logout"
import Report from "@/components/SidbarComponents/Report"
import CreateOrder from "@/components/InnerComponents/CreateOrder"

export default function Layout({ children }: { children: React.ReactNode }) {

  const SearchParams = useSearchParams();
  const tab = SearchParams.get("tab") || "Dashboard";

  let ContentComponent;
  switch (tab) {
    case "Orders":
      ContentComponent = Orders;
      break;
    case "Credits":
      ContentComponent = Credits;
      break;
    case "Invoices":
      ContentComponent = Invoices;
      break;
    case "Messages":
      ContentComponent = Message;
      break;
    case "Channel":
      ContentComponent = Channel;
      break;
    case "My Profile":
      ContentComponent = Profile;
      break;
    case "Support":
      ContentComponent = Support;
      break;
    case "Logout":
      ContentComponent = Logout;
      break;
    case "Report a bug":
      ContentComponent = Report;
      break;
    case "Create order":
      ContentComponent = CreateOrder;
      break;
    case "Dashboard":
    default:
      ContentComponent = Dashboard;

  }
  return (

    <main>
      <div className="p-4 overflow-auto">
        <ContentComponent />
      </div>
    </main>
  )
}