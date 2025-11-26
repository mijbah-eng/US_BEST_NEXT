import Link from "next/link";

const Delivery = () => {

    const brandContent = [
        {img:'/assets/img/gallery/galleryThumb2_1.jpg',addclass:'col-lg-5'},
        {img:'/assets/img/gallery/galleryThumb2_2.jpg',addclass:'col-lg-4'},

      ];

    return (
        <div className="gallery-section section-padding fix">
        <div className="container">
            <div className="row gy-4 mb-4">
            {brandContent.map((item, i) => (
                <div key={i} className={item.addclass}>
                    <div className="gallery-thumb style2">
                        <Link href="/menu">
                            <img src={item.img} alt="thumb" />
                            <div className="icon"><img src="/assets/img/icon/arrow_icon.png" alt="icon" /></div>
                        </Link>
                    </div>
                </div>
                ))}
            
            </div>
        </div>
    </div>
    );
};

export default Delivery;