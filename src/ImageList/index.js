import './index.css'

const ImageList = ({image, score}) => {
  const {thumbnailUrl, id} = image
  return (
    <li>
      <button onClick={() => score(id)}>
        <img className="thumb-img" src={thumbnailUrl} alt="thumbnail" />
      </button>
    </li>
  )
}
export default ImageList
