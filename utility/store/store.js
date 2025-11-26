import { configureStore } from "@reduxjs/toolkit";
import GetcategorymenuReducer from "../slice/GetcategorymenuSlice";
import GetCategoryMenumainReducer from "../slice/GetCategoryMenumain";
import GetDeliveryPartnerReducer from "../slice/GetDeliveryPartner";
import GetGalleryReducer from "../slice/getGallery";

const store = configureStore({
  reducer: {
    menu: GetcategorymenuReducer,
    itemCategorymenu: GetCategoryMenumainReducer,
    deliveryPartner: GetDeliveryPartnerReducer,
    imageGallery:GetGalleryReducer
  },
});

export default store;