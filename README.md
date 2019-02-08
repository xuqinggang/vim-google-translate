# vim-google-translate

vim google翻译插件，利用google api翻译单词或语句


## install

预装环境node、python2

1. 先利用vundle安装
```sh
Bundle 'xuqinggang/vim-google-translate'
```
2. 切换到 vim-google-translate/plugin目录下安装node相关包
```sh
eg:  cd ~/.vim/bundle/vim-google-translate/plugin
npm i -S request @vitalets/google-translate-api
```


## 在 ~/.vimrc中配置快捷键

```sh
vnoremap <silent> <C-g> :<C-u>Gtv<CR>
nnoremap <silent> <C-g> :<C-u>Gtc<CR>
```


## 使用方式

在普通模式下，按 ctrl+t， 会翻译当前光标下的单词；

在 visual 模式下选中单词或语句，按 ctrl+t，会翻译选择的单词或语句；

点击引导键再点y，d，可以在命令行输入要翻译的单词或语句；

译文将会在编辑器底部的命令栏显示


