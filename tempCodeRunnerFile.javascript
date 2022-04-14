const list = [{ id: 2 }, { id: 3 }]

const result = list.map(item => {
  return `id=${item.id}`
})
console.log(result.join('&'))
