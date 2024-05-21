"use client"
import UpdateUserDataForm from "@/components/updateUserData";
import { useSession } from "next-auth/react";
import Loading from "./loading";



function User() {

    const { data: session, status } = useSession(); 
    if (status === "loading") {
        return <Loading />;
    }
    if (!session) {
        return <div>Not authenticated</div>;
    }
    const userData ={
        name: session?.user?.user?.name!,
        email: session?.user?.user?.email!,
    }


  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <UpdateUserDataForm initialData={userData}/>
    </div>
  );
}

export default User;
