function somaLista(lista) {
  let total = 0
  for (let i = 0; i < lista.length; i++) {
    total = total + lista[i]
  }
  return total
}
console.log(somaLista([1, 2, 3, 4]))
