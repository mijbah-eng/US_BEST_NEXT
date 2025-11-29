import BreadCumb from "@/app/Components/Common/BreadCumb";
import Delivery from "@/app/Components/Delivery/Delivery";


const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/breadcumb.jpg"
        Title="Delivery Partner"
        pageName={"Delivery Partners"} pageKey={"Delivery"}
      ></BreadCumb>
      <Delivery></Delivery>
    </div>
  );
};

export default page;
