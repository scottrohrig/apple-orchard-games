
const errorMsgs = [
  "This is not the page you're looking for",
  "Oops, nothing to see here",
  "No apples in this orchard",
]

const randomError = () => {
  const msgIndex = Math.floor(Math.random() * errorMsgs.length)
  console.log(msgIndex, errorMsgs[msgIndex]);
  return `404 ${errorMsgs[msgIndex]}` || '404'
}

const NoMatch = () => {
  return (
    <div>
      {/* Insert header component */}
      <div /* insert styling */ >{randomError()}</div>
    </div>

  )
}

export default NoMatch;
