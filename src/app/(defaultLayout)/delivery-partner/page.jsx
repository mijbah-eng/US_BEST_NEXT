import BreadCumb from "@src/app/Components/Common/BreadCumb";
import Delivery from "@src/app/Components/Delivery/Delivery";

const page = () => {
  return (
    <div>
      <BreadCumb
        bgimg="/assets/img/bg/breadcumb.jpg"
        Title="Delivery Partner"
      ></BreadCumb>
      <Delivery></Delivery>
    </div>
  );
};

export default page;
