# Recuperação de Falhas V2

Categorias:
- código
- configuração
- dependência
- ferramenta
- ambiente
- rede
- quota
- contexto
- planejamento
- validação
- segurança

Pipeline:

DETECTAR
→ CLASSIFICAR
→ DIAGNOSTICAR
→ RECUPERAR
→ TESTAR
→ REVISAR

Regras:
- não repetir cegamente a mesma estratégia;
- registrar a causa;
- usar memória de erros;
- trocar ferramenta/modelo quando apropriado;
- replanejar quando a causa é estrutural;
- respeitar orçamento;
- declarar FALHA_HONESTA quando o limite é atingido.

Detecção de looping:
- mesmo erro repetido;
- mesma saída sem progresso;
- mesma estratégia após falha;
- nenhum artefato novo;
- nenhum critério de sucesso adicional satisfeito.
