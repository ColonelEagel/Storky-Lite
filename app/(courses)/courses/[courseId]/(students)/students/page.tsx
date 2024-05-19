import BillboardClient from "./components/client";
import { StudentColumn } from "./components/columns";

const StudentsPage = async ({ params }: { params: { storeId: string } }) => {
  return (
    <>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          {/* <BillboardClient data={formattedCategories} /> */}(
          {params.storeId})
        </div>
      </div>
    </>
  );
};

export default StudentsPage;
