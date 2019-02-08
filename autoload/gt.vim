function! gt#SuccessVimOutCallback(chan, msg)
  echo a:msg
endfunction

function! gt#ErrorVimOutCallback(chan, msg)
  echoerr a:msg
endfunction

" This function taken from the lh-vim repository
function! gt#GetVisualSelection()
  try
    let a_save = @a
    normal! gv"ay
    return @a
  finally
    let @a = a_save
  endtry
endfunction

function! gt#GetAvailableNodeCmd()
  for cmd in ['node']
    if executable(cmd)
      return cmd
    endif
  endfor

  return ""
endfunction
