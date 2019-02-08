" Preprocessing {{{
" if exists('g:loaded_google_translate')
"   finish
" endif

" let g:loaded_google_translate = 1
" Preprocessing }}}

" install
let s:translator_file = expand('<sfile>:p:h') . "/google.js"
let s:translator = {'stdout_buffered': v:true, 'stderr_buffered': v:true}

" " " 0代表安装中 1安装成功 -1安装失败
" let s:status = 0
" let s:status_info = '依赖正在安装中...请稍后'

" func! SuccessHandler(channel, msg)
"   let s:status = 1
"   let s:status_info = '依赖安装成功'
"   echom s:status_info
" endfunc

" func! ErrHandler(channel, msg)
"   let s:status = -1
"   let s:status_info = '依赖安装失败 '.a:msg
"   echom s:status_info
" endfunc

" echom "123"
" let s:installJob = job_start('npm i -S request @vitalets/google-translate-api', {'out_cb': 'SuccessHandler', 'err_cb': 'ErrHandler'})


" function! s:translator.on_stdout(jobid, data, event)
"   if !empty(a:data) | echo join(a:data) | endif
" endfunction
" let s:translator.on_stderr = function(s:translator.on_stdout)

function! s:translator.start(lines)
  " if s:status != 1
  "   echoerr s:status_info
  "   return -1
  " endif

  let node_cmd = gt#GetAvailableNodeCmd()
  if empty(node_cmd)
    echoerr "[GoogleTranslator] [Error]: node neeeds to be installed!"
    return -1
  endif

  let cmd = printf("%s %s %s", node_cmd, s:translator_file, a:lines)
  if exists('*jobstart')
    return jobstart(cmd, self)
  elseif exists('*job_start')
    " elseif exists('*job_start') && ! has("gui_macvim")
    return job_start(cmd, {'out_cb': "gt#SuccessVimOutCallback", 'err_cb': 'gt#ErrorVimOutCallback'})
  else
    echo system(cmd)
  endif
endfunction

function! s:GoogleVisualTranslate()
  call s:translator.start(gt#GetVisualSelection())
endfunction

function! s:GoogleCursorTranslate()
  call s:translator.start(expand("<cword>"))
endfunction

" " function! s:YoudaoEnterTranslate()
" "     let word = input("Please enter the word: ")
" "     redraw!
" "     call s:translator.start(word)
" " endfunction

command! Gtv call <SID>GoogleVisualTranslate()
command! Gtc call <SID>GoogleCursorTranslate()
" command! Yde call <SID>YoudaoEnterTranslate()

