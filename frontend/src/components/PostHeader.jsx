const PostHeader = ({item}) => {
  return (
    <div className="my-2">
      {item.type !== 'microtale' ? item.title : item._id}
    </div>
  )
}

export default PostHeader