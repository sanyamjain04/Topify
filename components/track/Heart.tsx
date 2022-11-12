import { AiFillHeart } from "react-icons/ai";

interface HeartProps {
  hasLiked: boolean;
  handleLike: () => void;
}

const Heart = ({ hasLiked, handleLike }: HeartProps) => {
  
  const handleLikeButton = (e: any) => {
    e.stopPropagation();
    handleLike()
  }
  return (
    <>
      <AiFillHeart
        className={`text-xl ml-3 icon ${
          hasLiked ? "text-[#1ED760]" : "text-[#868686]"
        }`}
        onClick={(e)=>{handleLikeButton(e)}}
      />
    </>
  );
};

export default Heart;
