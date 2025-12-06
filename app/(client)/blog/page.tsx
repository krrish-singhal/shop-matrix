import Container from "@/components/Container";
import Title from "@/components/Title";
import { urlFor } from "@/sanity/lib/image";
import { getAllBlogs } from "@/sanity/queries";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
  const blogs = await getAllBlogs(6);

  return (
    <div>
      <Container>
        <Title>Our Latest Articles</Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {blogs?.map((blog) => (
            <div key={blog?._id} className="rounded-lg overflow-hidden flex flex-col h-full bg-gray-100 dark:bg-[#161d53] shadow-lg hover:shadow-xl transition-shadow duration-300">
              {blog?.mainImage && (
                <Link href={`/blog/${blog?.slug?.current}`} className="overflow-hidden block">
                  <Image
                    src={urlFor(blog?.mainImage).url()}
                    alt="blogImage"
                    width={500}
                    height={500}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <div className="text-xs flex items-center gap-5">
                  <div className="flex items-center relative group cursor-pointer">
                    {blog?.blogcategories?.map((item, index) => (
                      <p
                        key={index}
                        className="font-semibold text-shop_dark_green dark:text-[#3ab8a3] tracking-wider"
                      >
                        {item?.title}
                      </p>
                    ))}
                    <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hover:cursor-pointer hoverEffect" />
                  </div>
                  <p className="flex items-center gap-1 text-gray-600 dark:text-gray-300 relative group hover:cursor-pointer hover:text-shop_dark_green hoverEffect">
                    <Calendar size={15} />{" "}
                    {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                    <span className="absolute left-0 -bottom-1.5 bg-lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect" />
                  </p>
                </div>
                <Link
                  href={`/blog/${blog?.slug?.current}`}
                  className="text-base font-semibold tracking-wide mt-3 line-clamp-2 text-gray-800 dark:text-white hover:text-shop_dark_green hoverEffect block"
                >
                  {blog?.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
