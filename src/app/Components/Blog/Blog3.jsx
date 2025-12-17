"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import basecatagories, { base_url, resturantId } from "../../../../utility/config";

const Blog3 = () => {
    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${base_url}/api/GetBlog`,{resturantId: resturantId,});
            setBlog(response.data?.data || []);
            console.log('blog', response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching menu details:", error);
        }
    };

    return (
        <section className="blog-section section-padding fix">
            <div className="blog-wrapper style3 mt-n30">
                <div className="container">
                    <div className="blog-card-wrap style3">
                        {blog?.map((item, i) => (
                            <div key={i} className="blog-card style1 wow fadeInUp" data-wow-delay="0.2s">
                                <div className="blog-thumb">
                                    <Image src={`${basecatagories}blog/${encodeURIComponent(item?.image)}`} alt="img" width={412} height={267} />
                                </div>
                                <div className="blog-content">
                                    <div className="blog-meta">
                                        <div className="item1">
                                            <p>
                                                {new Date(item?.createdOn).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                        <div className="item2">
                                            <div className="icon"><Image src="/assets/img/icon/user.svg" alt="img" width={20} height={20} /><span>By
                                                Admin</span></div>
                                        </div>
                                        {/* <div className="item3">
                                            <div className="icon"><Image src="/assets/img/icon/tag.svg" alt="img" width={20} height={20} /><span>Noodles</span>
                                            </div>
                                        </div> */}
                                    </div>
                                    <Link href={{ pathname: "/blog/blog-details", query: { blogId: item?.blogId },}}>
                                        <h3>{item.title}</h3>
                                    </Link>
                                    <Link href={{ pathname: "/blog/blog-details", query: { blogId: item?.blogId },}} className="link-btn">
                                        <span>Read More</span> <i className="fa-solid fa-arrow-right-long"></i>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog3;