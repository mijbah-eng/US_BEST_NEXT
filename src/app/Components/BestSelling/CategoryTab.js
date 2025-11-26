"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import basecatagories from "../../../../utility/config";

function CategoryTab({
  data,
  onCategorySelect,
  selectedCategoryId,
}) {
  const [selectcategoryId, setselectcategoryId] = useState(null);

  useEffect(() => {
    if (selectedCategoryId) {
      setselectcategoryId(selectedCategoryId);
    } else if (data.length > 0) {
      setselectcategoryId(data[0].categoryId);
      onCategorySelect?.(data[0].categoryId);
    }
  }, [selectedCategoryId, data, onCategorySelect]);
  return (
    <>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        {data?.length &&
          data?.map((item) => {
            const imageUrl = `${basecatagories}category/${encodeURIComponent(
              item.icon
            )}`;
            const isSelected =
              String(selectcategoryId) === String(item.categoryId);

            return (
              <li
                className={`nav-item ${
                  isSelected ? "active" : ""
                }`}
                key={item?.categoryId}
                onClick={(e) => {
                    e.preventDefault();
                    setselectcategoryId(item?.categoryId);
                    onCategorySelect?.(item?.categoryId);
                }}
              >
                <button className="nav-link">
                  <Image
                    src={imageUrl}
                    alt={item?.categoryName}
                    width={36}
                    height={36}
                  />
                  {item?.categoryName}
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default CategoryTab;
