// extrai_soma.go
// Arquivo que contém a função soma extraída do utils.js
package main

import "fmt"

// somaExtraida é a cópia exata da função soma de utils.js
// Original:
// function soma(a, b) {
//   return a + b;
// }
func somaExtraida(a int, b int) int {
  return a + b
}

func main() {
  fmt.Println("Função soma extraída:")
  fmt.Println(somaExtraida(2, 3)) // exemplo: 5
}
