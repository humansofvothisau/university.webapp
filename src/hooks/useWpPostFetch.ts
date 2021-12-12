import { useEffect, useState } from "react";
import IWpPost from "../interfaces/IWpPost";
import api from "../api";
import _ from "underscore";

export const useWpPostFetch = () => {
  const [posts, setPosts] = useState([] as Array<IWpPost>);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWpPosts = async () => {
    try {
      setError("");
      setLoading(true);

      var fetchedPosts = await api.fetchWpPosts();
      if (fetchedPosts && fetchedPosts.length > 0) {
        if (fetchedPosts.length <= 10) {
          setPosts(_.sample(fetchedPosts, fetchedPosts.length));
        } else {
          setPosts(_.sample(fetchedPosts, 10));
        }
      } else {
        setPosts([]);
      }
    } catch (error: any) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWpPosts();
  }, []);

  return { posts, error, loading };
};
