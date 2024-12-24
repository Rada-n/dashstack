import React from "react";
import InactiveLike from '../../assets/like/InactiveLike.svg'
import ActiveLike from "../../assets/like/ActiveLike.svg";
import { useActions } from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Like: React.FC<{productId: number}> = ({ productId }) => {
  const { toggleLike } = useActions();
  const { likedProducts } = useSelector((state: RootState) => state.favoriteProduct);

  return (
    <button onClick={() => toggleLike(productId)} style={{width: "19px", height: "15px", padding: '0'}}>
        <img
          src={likedProducts[productId] ? ActiveLike : InactiveLike}
          alt="Like"
          style={{width: '100%' }}
        />
    </button>
  );
};

export default Like;
