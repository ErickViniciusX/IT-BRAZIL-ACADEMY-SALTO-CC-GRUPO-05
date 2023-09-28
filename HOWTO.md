## Iniciando os trabalhos com git

### Configurando a máquina com suas credenciais GIT
Isso é necessário para que o git reconheça voce e que registre o seu trabalho para o time indentificar quem fez cada parte do código.
```
git config --global user.name "username" // username do github
git config --global user.email "email address" // e-mail do github
```

### Clonando o repositório na máquina de trabalho
Rode o comando abaixo no terminal dentro da pasta que deseja baixar o projeto
```
git clone https://github.com/ErickViniciusX/IT-BRAZIL-ACADEMY-SALTO-CC-GRUPO-05.git
```

### Criando uma nova branch a partir da `main`
Esse processo é utilizado na construção de uma nova feature
```
git checkout -b <feature_name>
```

### Fazendo um commit na branch de feature
Esse processo deve ser efetuado quando uma feature é finalizada e voce deseja salvar na sua branch as suas alterações

```
git add .

git commit -m "breve descrição da sua alteração"

git push // caso tenha um erro nessa etapa, executar o comando abaixo

git push origin -u <branch_feature> 
```


