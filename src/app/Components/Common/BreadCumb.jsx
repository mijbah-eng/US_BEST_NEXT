"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import loadBackgroudImages from "./loadBackgroudImages";
import basecatagories, { base_url } from "../../../../utility/config";

const BreadCumb = ({ pageName, pageKey, bgimg, Title }) => {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadBackgroudImages();
  }, []);
  useEffect(() => {
    getBannerData();
  }, []);

  const getBannerData = async () => {
    setLoading(true);
    const res = await axios.post(`${base_url}/api/GetBanner`, {
      resturantId: resturantId,
      page: pageKey,
    });
    setBannerData(res.data?.data);
    setLoading(false);
  };
  console.log( "bannerData =>" ,bannerData);
  
  return (
    <div className="breadcumb-section">
      <div className="breadcumb-wrapper" data-background={bannerData && bannerData[0]?.image ? `${basecatagories}slider/${encodeURIComponent(bannerData[0].image)}` : bgimg }>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">{pageName || Title}</h1>
                <ul className="breadcumb-menu">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li className="text-white">/</li>
                  <li className="active">{pageName || Title}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadCumb;
