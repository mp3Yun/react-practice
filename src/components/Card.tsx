function Card(props: any) {
  return (
    <div className="h-auto w-auto border-2 border-solid border-stone-300 rounded-md ">
      {props.children}
    </div>
  )
}

export default Card
