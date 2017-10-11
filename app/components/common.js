

export function makeTimer(propsDate) {
  const feedDate = new Date(propsDate)
  const feedHour = (feedDate.getHours() > 12) ?
    `오후 ${feedDate.getHours()-12}` :
    ((feedDate.getHours() === 0) ? `오전 12` : `오전 ${feedDate.getHours()}`)
  const feedMinutes = ((feedDate.getMinutes() < 10) ? '0': '') + feedDate.getMinutes()

  return `${feedDate.getMonth()+1}월 ${feedDate.getDate()}일 ${feedHour}:${feedMinutes}`
}
