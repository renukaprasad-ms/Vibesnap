import { useEffect, useState } from "react";
import Post from "../components/Post";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
const Home = ({ setDisplayProfileBar, setDisplaySideBarSm }) => {
  const [posts, setPosts] = useState([]);
  const postCollectionRef = collection(db, "posts")
  const handleHomePage = () => {
    setDisplayProfileBar(true);
    setDisplaySideBarSm(true);
  };
  const getPosts = async() => {
    try{
      const data = await getDocs(postCollectionRef)
      const firestoreData = data.docs.map((doc) => ({...doc.data(), id:doc.id}))
      setPosts(firestoreData)
    }catch(err) {
      console.error(err)
    }
  };

  useEffect(() => {
    handleHomePage();
    getPosts();
  }, []);


  return (
    <div className="w-full h-auto lg:w-[60%] overflow-scroll scroll-container">
      <p className="font-bold text-xl ml-6 lg:text-4xl lg:m-8">Feeds</p>
      <div className="w-full h-full flex flex-col gap-6 items-center">
        {posts.map((post) => (<Post key={post.id} post={post}/>))}
      </div>
    </div>
  );
};

export default Home;
