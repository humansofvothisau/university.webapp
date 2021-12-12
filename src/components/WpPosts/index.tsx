import { Alert } from "antd";
import React from "react";
import { useWpPostFetch } from "../../hooks/useWpPostFetch";
import Marquee from "react-fast-marquee";
import { convertUnicode } from "../../utils/stringUtils";

const WpPosts: React.FC = () => {
  const { posts, error, loading } = useWpPostFetch();
  // console.log(posts);

  return loading ? (
    <></>
  ) : error ? (
    <Alert type="warning" message={`Có lỗi xảy ra. Nội dung lỗi: ${error}`} />
  ) : posts.length > 0 ? (
    <Alert
      type="info"
      message={
        <Marquee pauseOnHover gradient={false} speed={40}>
          {posts.map((post) => {
            return (
              <a
                href={post.link}
                key={post.id}
                target="_blank"
                rel="noreferrer"
                dangerouslySetInnerHTML={{
                  __html: convertUnicode(post.title.rendered),
                }}
                style={{ marginRight: "40px" }}
              ></a>
              // "Trần Phong"
            );
          })}
        </Marquee>
      }
    />
  ) : (
    <Alert type="info" message="Không có bài viết nào..." />
  );
};

export default WpPosts;
