"use client"
import { useEffect, useState } from "react";
import loadBackgroudImages from "../Common/loadBackgroudImages";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import basecatagories, { base_url, resturantId } from "../../../../utility/config";

const BlogDetails = () => {
    const [blogId, setBlogId] = useState("");
    const [blogDetails, setBlogDetails] = useState("");
    const [blogData, setBlogData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const blog = params.get("blogId");
            setBlogId(blog);
        }
    }, []);

    useEffect(() => {
        if (blogId) {
            fetchBlogDetails();
            GetBlog();
        }
    }, [blogId]);

    const fetchBlogDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${base_url}/api/GetBlogDetails`,
                {
                    resturantId: resturantId,
                    blogId: blogId,
                }
            );
            setBlogDetails(response.data?.data || {});
            console.log('blog details', response.data?.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching Blog details:", error);
        }
    };
    const GetBlog = async () => {
        try {
            const res = await axios.post(`${base_url}/api/GetBlog`,{resturantId: resturantId,});
            const data = res?.data?.data;
            // setLoading(false);
            if (Array.isArray(data)) {
                const filtered = data
                    .filter((item) => item.blogId !== Number(blogId))   // remove current blog
                    .sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn)) // latest first
                    .slice(0, 4);  // pick only latest 4

                setBlogData(filtered);
            } else {
                setBlogData([]); // fallback if API returns weird data
            }
        } catch (error) {
            console.error("Add to cart failed:", error);
            setBlogData([]);
        }
    };
    const imageUrl = `${basecatagories}blog/${encodeURIComponent(blogDetails?.image)}`;
    const stripHtml = (html) => {
        if (typeof window === "undefined") return html; // SSR safe
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    };
    const description = stripHtml(blogDetails.description);

    return (
        <div className="blog-details-section section-padding fix">
            <div className="container">
                <div className="blog-details-area">
                    <div className="row g-5">
                        <div className="col-12 col-lg-8">
                            <div className="blog-post-details">
                                <div className="single-blog-post">
                                    <div
                                        className="post-featured-thumb background-image"
                                        data-background={imageUrl}
                                        style={{
                                            backgroundImage: `url(${imageUrl})`,
                                        }}
                                    >
                                    </div>
                                    <div className="post-content">
                                        <ul className="post-list d-flex align-items-center wow fadeInUp" data-wow-delay=".2s">
                                            <li>
                                                <i className="fa-light fa-user"></i>
                                                By Admin
                                            </li>
                                            <li>
                                                <i className="fa-light fa-comments"></i>
                                                2 Comments
                                            </li>
                                            <li>
                                                <i className="fa-regular fa-tag"></i>
                                                Fast Food Services
                                            </li>
                                        </ul>
                                        <h3 className="wow fadeInUp" data-wow-delay=".4s">{blogDetails.title}</h3>
                                        <p>{description}</p>
                                    </div>
                                </div>
                                <div className="row tag-share-wrap mb-30 wow fadeInUp" data-wow-delay=".8s">
                                    <div className="col-lg-8 col-12">
                                        <div className="tagcloud">
                                            <h6 className="d-inline me-2">Tags: </h6>
                                            <a href="#">News</a>
                                            <a className="active" href="#">business</a>
                                            <a href="#">marketing</a>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-12 mt-3 mt-lg-0 text-lg-end wow fadeInUp"
                                        data-wow-delay="1.2s">
                                        <div className="social-share">
                                            <span className="me-3">Share:</span>
                                            <a href="#"><i className="bi bi-facebook"></i></a>
                                            <a href="#"><i className="bi bi-twitter-x"></i></a>
                                            <a href="#"><i className="bi bi-linkedin"></i></a>
                                            <a href="#"><i className="bi bi-youtube"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="comments-area wow fadeInUp" data-wow-delay="1.2s">
                                    <div className="comments-heading">
                                        <h3>02 Comments</h3>
                                    </div>
                                    <div className="blog-single-comment d-flex gap-4 pt-30 pb-30">
                                        <div className="image">
                                            <Image src="/assets/img/blog/comment-author1.png" alt="img" width={96} height={96} />
                                        </div>
                                        <div className="content">
                                            <div
                                                className="head d-flex flex-wrap gap-2 align-items-center justify-content-between">
                                                <div className="con">
                                                    <h5><a href="#">Albert Flores</a></h5>
                                                    <span>March 20, 2024 at 2:37 pm</span>
                                                </div>
                                                <div className="btn">
                                                    <a href="#" className="reply">Reply</a>
                                                </div>
                                            </div>
                                            <p className="mt-10 mb-0">Neque porro est qui dolorem ipsum quia quaed inventor
                                                veritatis et quasi
                                                architecto var sed efficitur turpis gilla sed
                                                sit amet finibus eros. Lorem Ipsum is simply dummy
                                            </p>
                                        </div>
                                    </div>
                                    <div className="blog-single-comment d-flex gap-4 pt-30 pb-30">
                                        <div className="image">
                                            <Image src="/assets/img/blog/comment-author2.png" alt="img" width={96} height={96} />
                                        </div>
                                        <div className="content">
                                            <div
                                                className="head d-flex flex-wrap gap-2 align-items-center justify-content-between">
                                                <div className="con">
                                                    <h5><a href="#">Alex Flores</a></h5>
                                                    <span>March 20, 2024 at 2:37 pm</span>
                                                </div>
                                                <div className="btn">
                                                    <a href="#" className="reply">Reply</a>
                                                </div>
                                            </div>
                                            <p className="mt-10 mb-0">Neque porro est qui dolorem ipsum quia quaed inventor
                                                veritatis et quasi
                                                architecto var sed efficitur turpis gilla sed
                                                sit amet finibus eros. Lorem Ipsum is simply dummy
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="comment-form-wrap pt-5 wow fadeInUp" data-wow-delay="1.2s">
                                    <h3>Leave a comments</h3>
                                    <form action="#" id="contact-form" method="POST">
                                        <div className="row g-4">
                                            <div className="col-lg-6">
                                                <div className="form-clt">
                                                    <input type="text" name="name" id="name" placeholder="Your Name" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-clt">
                                                    <input type="text" name="email" id="email2" placeholder="Your Email" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-clt">
                                                    <textarea name="message" id="message"
                                                        placeholder="Write Message"></textarea>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <button type="submit" className="theme-btn">
                                                    Post a Comment <i className="bi bi-arrow-right bg-transparent text-white ms-1"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="main-sidebar2">
                                <div className="single-sidebar-widget wow fadeInUp" data-wow-delay=".6s">
                                    <div className="wid-title">
                                        <h3>Recent Post</h3>
                                    </div>
                                    <div className="recent-post-area">
                                        {blogData?.map((item, i) => (
                                        <div className="recent-items">
                                            <div className="recent-thumb">
                                                <Image src={`${basecatagories}blog/${encodeURIComponent(item?.image)}`} alt="img" width={78} height={79} />
                                            </div>
                                            <div className="recent-content">
                                                <ul>
                                                    <li>
                                                        <Image src="/assets/img/icon/calendarIcon.png" alt="img" width={20} height={20} />
                                                        18 Dec, 2024
                                                    </li>
                                                </ul>
                                                <h6>
                                                    <Link href={{ pathname: "/blog/blog-details", query: { blogId: item?.blogId },}}>
                                                        <h3>{item.title}</h3>
                                                    </Link>
                                                </h6>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;