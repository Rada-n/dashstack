import React from "react";
import InactiveLike from '../../assets/like/InactiveLike.svg'
import ActiveLike from "../../assets/like/ActiveLike.svg";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { setLike, unsetLike } from "../../fetch/productsApi";

interface LikeProps {
  productId: number;
}

const Like: React.FC<LikeProps> = ({ productId }) => {
  const dispatch = useDispatch();
  const { likedProducts } = useSelector((state: RootState) => state.products);

  const isLiked = likedProducts.some((p) => p.id === productId);

  const toggleLike = () => {
    if (isLiked) {
      dispatch(unsetLike(productId));
    } else {
      dispatch(setLike(productId));
    }
  };

  return (
    <button
      onClick={toggleLike}
      style={{ width: '19px', height: '15px', padding: '0' }}
    >
      <img
        src={isLiked ? ActiveLike : InactiveLike}
        alt="Like"
        style={{ width: '100%' }}
      />
    </button>
  );
};

export default Like;
