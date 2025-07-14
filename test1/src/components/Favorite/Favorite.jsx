import './Favorite.css';

export default function Favorite({ id, isFavorite, toggleHeart, isDetail }) {
  return (
    <>
      {isDetail ? (
        <h1 className="hearts" onClick={() => toggleHeart(id)}>
          {isFavorite ? '❤️' : '🤍'}
        </h1>
      ) : (
        <p className="hearts" onClick={() => toggleHeart(id)}>
          {isFavorite ? '❤️' : '🤍'}
        </p>
      )}
    </>
  );
}
